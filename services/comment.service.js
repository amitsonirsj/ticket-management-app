const db = require("../models");
const commentModel = db.Comment;
const userModel = db.User;

const create = async ({ content, ticketId }, createdBy) => {
    const comment = await commentModel.create({
        content,
        ticketId,
        createdBy
    });
    return commentModel.findByPk(comment.id,{
        include: [
            {
                model: userModel,
                as: 'createdByDetail',
                attributes: ['name', 'email']
            }
        ]
    });
};

module.exports = {
    create
};