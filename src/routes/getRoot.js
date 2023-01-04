const path = require("path");
const { findUserById } = require("../repositories/userRepository");
const { authenticationMiddleware } = require("../middlewares/authenticationMiddleware");

exports.getRoot = function getRoot(app) {
    app.get("/", async (req, res) => {

        if (!req.signedCookies.ssid) {
            res.redirect("/login");
            return;
        }

        const user = await findUserById(req.signedCookies.ssid);
        if (!user) {
            res.clearCookie("ssid");
            res.redirect("/login");
            return;
        }

        res.sendFile(path.join(__dirname, "../../pages/index.html"));
    });
}