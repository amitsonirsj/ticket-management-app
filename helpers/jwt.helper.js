require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PASSWORD_SALT,JWT_SECRET} = process.env;

async function encryptPassword(password) {
  return bcrypt.hash(password, +PASSWORD_SALT);
}

async function comparePassword(plainPassword, hashPassword) {
  return bcrypt.compare(plainPassword, hashPassword);
}

async function createJwtToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '5h',
  });
}

async function verifyJwtToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  encryptPassword,
  comparePassword,
  createJwtToken,
  verifyJwtToken,
};
