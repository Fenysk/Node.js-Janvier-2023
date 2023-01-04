const { findUserById } = require('../repositories/userRepository');

exports.getWs = function getWs(app, sockets) {
    app.ws('/ws', async (ws, req) => { // On définit un routeur WebSocket à l'URL '/ws'
        const user = await findUserById(req.signedCookies.ssid);
        const ssid = req.signedCookies.ssid;
        
        if (!user) {
            ws.close();
            return;
        }
        sockets.set(ssid, ws);
        
        ws.on('message', (msg) => { // On définit un gestionnaire d'événements pour les messages reçus
            console.log(msg); // On affiche le message reçu dans la console
            sockets.forEach((socket) => {
                if (socket !== ws) {
                    socket.send(`${user.name}: ${msg}`);
                }
            })
        });

        ws.on('close', () => {
            sockets.delete(ssid);
        })
    });
}