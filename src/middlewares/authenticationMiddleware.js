exports.authenticationMiddleware = function authenticationMiddleware(
    req,
    res,
    next
) {
    if (!req.signedCookies.ssid) {
        res.redirect('/login');
        return;
    }
    
    next();
};