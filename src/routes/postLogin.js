const path = require('path');
const bodyParser = require('body-parser');
const { findUserByEmail } = require('../repositories/userRepository');

exports.postLogin = function postLogin (app) {
    app.post('/login',bodyParser.urlencoded(),
    async (req, res) => {
        const email = req.body.email;
        const user = await findUserByEmail(email);

        if (!user) {
            res.status(401).send('Invalid email');
            return;
        }
        res.cookie(
            'ssid',
            user.id,
            { signed: true, httpOnly: true, sameSite: true }
        );
        res.redirect('/');
    } catch (e) {
        res.status(500).send('Internal server error');
    }
    );
}