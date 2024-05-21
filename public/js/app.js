document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('playerForm');
    const playersContainer = document.getElementById('playersContainer');
    const editPlayerForm = document.getElementById('editPlayerForm');
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    let editPlayerId = null;
    let deletePlayerId = null;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {
            name: document.getElementById('name').value,
            age: parseInt(document.getElementById('age').value),
            position: document.getElementById('position').value
        };

        fetch('/players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Jugador agregado con éxito');
            form.reset();
            loadPlayers();
        })
        .catch((error) => {
            alert('Error al agregar jugador');
            console.error('Error:', error);
        });
    });

    function loadPlayers() {
        fetch('/players')
        .then(response => response.json())
        .then(players => {
            playersContainer.innerHTML = ''; 
            players.forEach(player => {
                const playerCard = `
                <div class="player-card p-3">
                    <div class="card-body">
                        <h5 class="card-title">${player.name}</h5>
                        <p class="card-text">Edad: ${player.age}</p>
                        <p class="card-text">Posición: ${player.position}</p>
                        <div class="player-controls">
                            <button class="btn btn-primary me-2" onclick="editPlayer(${player.id})"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-danger me-2" onclick="confirmDeletePlayer(${player.id})"><i class="fas fa-trash-alt"></i></button>
                            <button class="btn btn-info" onclick="detailsPlayer(${player.id})"><i class="fas fa-info-circle"></i></button>
                        </div>
                    </div>
                </div>
                `;
                playersContainer.innerHTML += playerCard; // Añade cada tarjeta al contenedor
            });
        });
    }

    loadPlayers(); 

    window.editPlayer = function(id) {
        fetch(`/players/${id}`)
        .then(response => response.json())
        .then(player => {
            if (player) {
                editPlayerId = id;
                document.getElementById('editName').value = player.name;
                document.getElementById('editAge').value = player.age;
                document.getElementById('editPosition').value = player.position;
                const editModal = new bootstrap.Modal(document.getElementById('editPlayerModal'));
                editModal.show();
            } else {
                alert('No se encontró información del jugador');
            }
        })
        .catch(error => console.error('Error:', error));
    };

    editPlayerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {
            name: document.getElementById('editName').value,
            age: parseInt(document.getElementById('editAge').value),
            position: document.getElementById('editPosition').value
        };

        if (editPlayerId !== null) {
            fetch(`/players/${editPlayerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                alert('Jugador actualizado con éxito');
                editPlayerId = null;
                const editModal = bootstrap.Modal.getInstance(document.getElementById('editPlayerModal'));
                editModal.hide();
                loadPlayers();
            })
            .catch(error => console.error('Error:', error));
        }
    });

    window.confirmDeletePlayer = function(id) {
        deletePlayerId = id;
        const deleteModal = new bootstrap.Modal(document.getElementById('deletePlayerModal'));
        deleteModal.show();
    };

    confirmDeleteButton.addEventListener('click', function() {
        if (deletePlayerId !== null) {
            fetch(`/players/${deletePlayerId}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    alert('Jugador eliminado');
                    deletePlayerId = null;
                    const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deletePlayerModal'));
                    deleteModal.hide();
                    loadPlayers();
                }
            })
            .catch(error => console.error('Error:', error));
        }
    });

    window.detailsPlayer = function(id) {
        fetch(`/players/${id}`)
        .then(response => response.json())
        .then(player => {
            if (player) {
                const details = `
                    <strong>Nombre:</strong> ${player.name}<br>
                    <strong>Edad:</strong> ${player.age}<br>
                    <strong>Posición:</strong> ${player.position}
                `;
                document.getElementById('viewPlayerDetails').innerHTML = details;
                const viewModal = new bootstrap.Modal(document.getElementById('viewPlayerModal'));
                viewModal.show();
            } else {
                alert('No se encontró información del jugador');
            }
        })
        .catch(error => console.error('Error:', error));
    };
});
