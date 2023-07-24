const { checkSchema } = require('express-validator');

const validateEvaluationRegistration = checkSchema(
  {
    // titulo: {
    //   isLength: {
    //     options: { min: 1, max: 1000 },
    //     errorMessage: 'O título deve ter no mínimo 1 e no máximo 1000 caracteres',
    //   },
    //   isString: {
    //     errorMessage: 'O título deve ser uma string',
    //   },
    // },
    // descricao: {
    //   isLength: {
    //     options: { max: 5000 },
    //     errorMessage: 'a descricao deve ter no 5000 caracteres',
    //   },
    //   isString: {
    //     errorMessage: 'a descricao deve ser uma string',
    //   },
    // },
    // concluida: {
    //   isBoolean: {
    //     errorMessage: 'A propriedade concluida deve ser um boolean',
    //   },
    //   optional: true,
    // },
  },
  ['body'],
);

const AssessmentsUpdateValidator = checkSchema(
  {
    // titulo: {
    //   optional: true,
    //   isString: {
    //     errorMessage: 'O título deve ser uma string',
    //   },
    //   isLength: {
    //     options: { min: 1, max: 1000 },
    //     errorMessage: 'O título deve ter no mínimo 1 e no máximo 1000 caracteres',
    //   },
    // },
    // descricao: {
    //   isLength: {
    //     options: { min: 1, max: 5000 },
    //     errorMessage: 'a descricao deve ter no 5000 caracteres',
    //   },
    //   isString: {
    //     errorMessage: 'a descricao deve ser uma string',
    //   },
    // },
    // concluida: {
    //   isBoolean: {
    //     errorMessage: 'A propriedade concluida deve ser um boolean',
    //   },
    //   optional: true,
    // },
  },
  ['body'],
);

module.exports = {
    validateEvaluationRegistration,
    AssessmentsUpdateValidator,
};
