const path = require("path");

exports.getRegister = function getRegister(app) {
    app.get("/register", (req, res) => {
        if (req.signedCookies.ssid) {
            res.redirect('/');
            return;
        }

        res.sendFile(path.join(__dirname, "../../pages/register.html"));
    });
}