const { comparePassword, createJwtToken, encryptPassword } = require("../helpers/jwt.helper");
const db = require("../models");
const userModel = db.User;
const Op = require('sequelize').Op;

const login = async ({ email, password }) => {
    const user = await userModel.findOne({ where: { email: email } });
    if (!user) {
        throw { message: "User not found. Please signup!" };
    }
    const isPasswordSame = await comparePassword(password, user.password);
    if (!isPasswordSame) {
        throw { message: "The Email or Password doesn't match. Please try again!" };
    }
    const response = {
        id: user.id,
        role: user.role,
        email: user.email,
        name: user.name
    }
    const token = await createJwtToken(response);
    return { ...response, token };
};

const signup = async ({ name, email, password }) => {
    const user = await userModel.findOne({ where: { email: email } });
    if (user) {
        throw { message: "Email already registered. Please login!" };
    }
    const encryptedPassword = await encryptPassword(password);

    const createdUser = await userModel.create({
        email,
        name,
        password: encryptedPassword,
        role: 'Normal User'
    });

    const response = {
        id: createdUser.id,
        role: createdUser.role,
        email: createdUser.email,
        name: createdUser.name
    }
    const token = await createJwtToken(response);
    return { ...response, token };
};

const usersList = async (userId) => {
    return await userModel.findAndCountAll({
        where: {
            role: 'Staff'
        }
    });
};

module.exports = {
    login,
    signup,
    usersList
};
