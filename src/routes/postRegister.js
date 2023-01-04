const createUser = require('../repositories/userRepository');

exports.postRegister = function postRegister(app) {
    app.post(
        '/register',
        bodyParser.urlencoded(),
        async (req, res) => {
            const { email, name } = req.body;
            if (!email || !name) {
                res.status(400).send('Invalid email or name');
                return;
            }
            const existingUser = await findUserByEmail(email);
            if (existingUser) {
                res.status(400).send('User already exists');
                return;
            }
            const user = createUser(email, name);
            res.cookie(
                'ssid',
                user.id,
                { signed: true, httpOnly: true, sameSite: true }
            );
            res.redirect('/');
        }
    );
};