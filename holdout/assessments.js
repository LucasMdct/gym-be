const { checkSchema } = require('express-validator');


const validationImc = checkSchema({
  height: {
    custom: {
      options: (value) => {
        const height = parseFloat(value);
        return height >= 0.00 && height <= 3.00;
      },
      errorMessage: 'A altura deve ser um valor decimal entre 0,00 e 3,00',
    },
  },
  weight: {
    custom: {
      options: (value) => {
        const weight = parseFloat(value);
        return weight >= 0.00 && weight <= 280.00;
      },
      errorMessage: 'O peso deve ser um valor decimal entre 0 e 280.00',
    },
  },
  imc: {
    custom: {
      options: (value) => {
        const imc = parseFloat(value);
        return imc >= 0.00 && imc <= 100.00;
      },
      errorMessage: 'O IMC deve ser um valor decimal entre 0.00 e 100.00',
    },
  },
});


module.exports = {
  validationImc,
};