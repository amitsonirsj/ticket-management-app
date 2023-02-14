const { verifyJwtToken } = require("../helpers/jwt.helper");

module.exports = async (req, res, next) => {
    if (!req.header('Authorization')) {
        res.status(401).send("Unauthorized");
        return;
    }

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).send("Unauthorized");
    }
    const decodedToken = await verifyJwtToken(token);
    if (Date.now() > decodedToken.exp * 1000) {
        res.status(401).send("Unauthorized");
    }
    req.user = decodedToken;
    next();
};
