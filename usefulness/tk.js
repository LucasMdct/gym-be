const jwt = require('jsonwebtoken');

const { JWT_TOKEN } = process.env;

const gTokenUser = (users) => jwt.sign(users, JWT_TOKEN, {
  expiresIn: '3d',
});


const holdoutTokenUsers = (token) => jwt.verify(token, JWT_TOKEN);

module.exports = {
  gTokenUser,
  holdoutTokenUsers,
};
