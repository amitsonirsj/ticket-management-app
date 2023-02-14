const { create, assign, updateStatus, getStaffTickets, getAllTickets, getNormalUserTickets } = require("../services/ticket.service");

exports.create = async (req, res) => {
    try {
        const data = await create(req.body, req.user.id);
        res.send(data);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.assign = async (req, res) => {
    try {
        const data = await assign(req.body);
        res.send(data);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.updateStatus = async (req, res) => {
    try {
        const data = await updateStatus(req.body);
        res.send(data);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.getTickets = async (req, res) => {
    try {
        let data = [];
        switch (req.user.role) {
            case 'Admin':
                data = await getAllTickets();
                break;
            case 'Staff':
                data = await getStaffTickets(req.user.id);
                break;
            default:
                data = await getNormalUserTickets(req.user.id);
                break;
        }
        res.send(data);
    } catch (error) {
        res.status(400).send(error);
    }
}