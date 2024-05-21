const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_PATH = path.join(__dirname, 'data', 'players.json');

app.use(bodyParser.json());
app.use(express.static('public'));

async function readData() {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT' || error instanceof SyntaxError) {
            return []; 
        }
        throw error;
    }
}

app.post('/players', async (req, res) => {
    try {
        const { name, age, position } = req.body;
        let players = await readData();

        const newPlayer = {
            name,
            age,
            position,
            status: 'suplente',
            id: players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1
        };

        players.push(newPlayer);
        await fs.writeFile(DATA_PATH, JSON.stringify(players, null, 2));

        res.status(201).send(newPlayer);
    } catch (error) {
        res.status(500).send({ error: 'Error al agregar un jugador' });
    }
});

app.get('/players', async (req, res) => {
    try {
        const players = await readData();
        res.json(players);  
    } catch (error) {
        console.error('Failed to get players:', error);
        res.status(500).send({ error: 'Error al obtener los jugadores' });
    }
});

app.delete('/players/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        let players = await readData();
        const filteredPlayers = players.filter(player => player.id !== id);

        await fs.writeFile(DATA_PATH, JSON.stringify(filteredPlayers, null, 2));
        res.status(200).send({ message: 'Jugador eliminado' });
    } catch (error) {
        res.status(500).send({ error: 'Error al eliminar jugador' });
    }
});

app.put('/players/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, age, position, status } = req.body;
        let players = await readData();
        const playerIndex = players.findIndex(player => player.id === id);

        if (playerIndex !== -1) {
            players[playerIndex] = { ...players[playerIndex], name, age, position, status };
            await fs.writeFile(DATA_PATH, JSON.stringify(players, null, 2));
            res.status(200).send(players[playerIndex]);
        } else {
            res.status(404).send({ message: 'Jugador no encontrado' });
        }
    } catch (error) {
        console.error('Error updating player:', error);
        res.status(500).send({ error: 'Error al actualizar jugador' });
    }
});

app.get('/players/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, age, position, status } = req.body;
        let players = await readData();
        const playerIndex = players.find(player => player.id === id);
        res.json(playerIndex);  

    } catch (error) {
        console.error('Error updating player:', error);
        res.status(500).send({ error: 'Error al actualizar jugador' });
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
