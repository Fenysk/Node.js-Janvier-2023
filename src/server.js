const express = require('express'); // On importe Express
const expressWs = require('express-ws'); // On importe express-ws
const { WebSocketServer } = require('ws'); // On importe le module ws et on récupère la classe WebSocketServer
const path = require('path'); // On importe le module path
const cookieParser = require('cookie-parser');
const { getRoot } = require('./routes/getRoot');
const { getLogin } = require('./routes/getLogin');
const { getWs } = require('./routes/getWs');
const { postLogin } = require('./routes/postLogin');
const { authenticationMiddleware } = require('./middlewares/authenticationMiddleware');
const { getRegister } = require('./routes/getRegister');

const SECRET_KEY = 'MySecretKeyIsAwesome'

function main () {
    const app = express(); // On crée une instance d'Express
    expressWs(app); // On initialise express-ws avec notre instance d'Express
    const sockets = new Map();

    app.use(cookieParser(SECRET_KEY));
    app.use(express.static(path.join(__dirname, '../public'))); // On définit le dossier public comme dossier statique


    getLogin(app);
    postLogin(app);
    getRegister(app);
    
    app.use(authenticationMiddleware);

    getRoot(app);
    getWs(app, sockets);

    app.use((error, req, res, next) => {
        console.error(error);
        res.status(500).send('Internal server error');

        next();
    });


    app.listen(3000, () => { // On démarre notre serveur en écoutant les requêtes sur le port 3000
        console.log('Le serveur écoute sur le port 3000');
    });
}

main(); // On appelle la fonction main
