const { login, signup, usersList } = require("../services/user.service");

exports.login = async (req, res) => {
    try {
        const data = await login(req.body);
        res.send(data);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.signup = async (req, res) => {
    try {
        const data = await signup(req.body);
        res.send(data);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.userList = async (req, res) => {
    try {
        const data = await usersList(req.user.id);
        res.send(data);
    } catch (error) {
        res.status(400).send(error);
    }
}