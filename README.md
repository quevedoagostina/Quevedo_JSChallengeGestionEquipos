# Gestión de Equipo de Fútbol

Este proyecto es un challenge que utiliza promesas y async/await para gestionar un equipo de fútbol utilizando un servidor basado en Express. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para los jugadores.

## Requisitos Previos

Asegúrate de tener instalado Node.js en tu sistema para poder ejecutar el servidor y gestionar las dependencias. Puedes descargarlo e instalarlo desde [nodejs.org](https://nodejs.org/).

## Configuración

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. **Clona el repositorio:**

   Utiliza el siguiente comando para clonar el repositorio y navegar al directorio del proyecto:

   ```bash
   git clone git@github.com:quevedoagostina/Quevedo_JSChallengeGestionEquipos.git
   cd Quevedo_JSChallengeGestionEquipos
   ```

2. **Instala las dependencias:**

   Desde la terminal, ejecuta el siguiente comando para instalar todas las dependencias necesarias para el proyecto, incluyendo `cors` para manejar solicitudes de origen cruzado:

   ```bash
   npm install
   npm install cors
   ```

3. **Configura el puerto y otras variables de entorno (opcional):**

   Aunque el proyecto está configurado para correr en el puerto 3000 por defecto, puedes especificar un puerto diferente creando un archivo `.env` en la raíz del proyecto y estableciendo la variable `PORT`:

   ```plaintext
   PORT=3000
   ```

   Asegúrate de modificar el archivo `index.js` para usar esta variable de entorno si es necesario.

## Ejecución

Para iniciar el servidor, tienes dos opciones:

- **Modo de desarrollo (con nodemon):**

  ```bash
  npm install --save-dev nodemon
  npm run dev
  ```

  Esto iniciará el servidor con `nodemon`, lo que permitirá que el servidor se reinicie automáticamente al hacer cambios en los archivos.

- **Modo de producción:**

  ```bash
  npm start
  ```

  Este comando ejecuta `node index.js`, iniciando el servidor en modo producción.

Ambos comandos iniciarán el servidor en `http://localhost:3000` (o en el puerto que hayas especificado en `.env`). Puedes acceder a los endpoints definidos a través de un navegador o utilizando herramientas como Postman para hacer solicitudes HTTP.

## Endpoints

Los endpoints disponibles en la aplicación son los siguientes:

- **POST `/players`**: Agrega un nuevo jugador al sistema.
- **GET `/players`**: Lista todos los jugadores registrados.
- **GET `/players/:id`**: Obtiene información detallada de un jugador específico.
- **PUT `/players/:id`**: Actualiza la información de un jugador específico.
- **DELETE `/players/:id`**: Elimina un jugador del sistema.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

- `/data` - Contiene archivos de datos como `players.json` para almacenar los datos de los jugadores.
- `/public` - Alberga archivos estáticos como scripts de JavaScript del lado del cliente, hojas de estilo y recursos de imágenes.
- `/public/js` - Scripts de JavaScript para la interacción del lado del cliente.
- `/public/css` - Hojas de estilo CSS para la interfaz de usuario.
- `index.js` - El archivo principal del servidor que configura y ejecuta el servidor Express.
- `package.json` - Contiene metadatos del proyecto y gestiona las dependencias del proyecto.