const path = require("path");

exports.getLogin = function getLogin(app) {
    app.get("/login", (req, res) => {
        if (req.signedCookies.ssid) {
            res.redirect('/');
            return;
        }

        res.sendFile(path.join(__dirname, "../../pages/login.html"));
    });
}