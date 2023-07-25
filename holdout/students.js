const { checkSchema, validationResult } = require('express-validator');

const validateStudentRegistration = checkSchema({
  name: {
    isLength: {
      options: { min: 4, max: 200 },
      errorMessage: 'O nome do aluno deve conter no mínimo 4 e no máximo 200 caracteres',
    },
    isString: {
      errorMessage: 'O nome do aluno deve ser uma string',
    },
  },
  gender: {
    isIn: {
      options: [['M', 'F']],
      errorMessage: 'O gênero do aluno deve ser "M" ou "F"',
    },
  },
  age: {
    isInt: {
      options: { min: 1, max: 120 },
      errorMessage: 'A idade do aluno deve ser um número inteiro entre 1 e 120',
    },
  },
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
});

const studentsUpdateValidator = checkSchema(
    {
    //   titulo: {
    //     optional: true,
    //     isString: {
    //       errorMessage: 'O título deve ser uma string',
    //     },
    //     isLength: {
    //       options: { min: 1, max: 1000 },
    //       errorMessage: 'O título deve ter no mínimo 1 e no máximo 1000 caracteres',
    //     },
    //   },
    //   descricao: {
    //     isLength: {
    //       options: { min: 1, max: 5000 },
    //       errorMessage: 'a descricao deve ter no 5000 caracteres',
    //     },
    //     isString: {
    //       errorMessage: 'a descricao deve ser uma string',
    //     },
    //   },
    //   concluida: {
    //     isBoolean: {
    //       errorMessage: 'A propriedade concluida deve ser um boolean',
    //     },
    //     optional: true,
    //   },
    },
    ['body'],
  );
  

module.exports = {
  validateStudentRegistration,
  studentsUpdateValidator,
};
