const bcrypt = require('bcryptjs');

const hop = bcrypt.genSaltSync(10);

const hPassword = (password) => bcrypt.hashSync(password, hop);

const cPassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = {
    hPassword,
    cPassword,
};
