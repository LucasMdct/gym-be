const jwt = require('jsonwebtoken');

const { JWT_TOKEN } = process.env;

const gTokenUser = (teachers) => jwt.sign(teachers, JWT_TOKEN, {
  expiresIn: '7d',
});


const holdoutTokenUsers = (tkn) => jwt.verify(tkn, JWT_TOKEN);

module.exports = {
  gTokenUser,
  holdoutTokenUsers,
};
