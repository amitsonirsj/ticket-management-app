const db = require("../models");
const ticketModel = db.Ticket;
const userModel = db.User;
const commentModel = db.Comment;
const Op = require('sequelize').Op;

const create = async ({ title, description, productType }, createdBy) => {
    return await ticketModel.create({
        title,
        description,
        productType,
        createdBy
    });
};

const assign = async ({ ticketId, assignedTo }) => {
    return await ticketModel.update({
        assignedTo,
        status: 'Assigned'
    }, {
        where: {
            id: ticketId
        }
    });
};

const updateStatus = async ({ ticketId, status }) => {
    return await ticketModel.update({
        status
    }, {
        where: {
            id: ticketId
        }
    });
};

const ticketsAssociatedQuery = [
    {
        model: userModel,
        as: 'createdByDetail',
        attributes: ['name', 'email']
    },
    {
        model: userModel,
        as: 'assignedToDetail',
        attributes: ['name', 'email']
    },
    {
        model: commentModel,
        as: 'comments',
        include: [
            {
                model: userModel,
                as: 'createdByDetail',
                attributes: ['name', 'email']
            }
        ]
    }
]

const getNormalUserTickets = async (userId) => {
    return await ticketModel.findAndCountAll({
        where: {
            createdBy: userId
        },
        include: ticketsAssociatedQuery
    });
};

const getStaffTickets = async (staffId) => {
    return await ticketModel.findAndCountAll({
        where: {
            [Op.or]: {
                createdBy: staffId,
                assignedTo: staffId
            }
        },
        include: ticketsAssociatedQuery
    });
};

const getAllTickets = async () => {
    return await ticketModel.findAndCountAll({
        include: ticketsAssociatedQuery
    });
};

module.exports = {
    create,
    assign,
    updateStatus,
    getStaffTickets,
    getAllTickets,
    getNormalUserTickets
};