const { create } = require("../services/comment.service");

exports.create = async (req, res) => {
    try {
        const data = await create(req.body, req.user.id);
        res.send(data);
    } catch (error) {
        res.status(400).send(error);
    }
}