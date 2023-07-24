
/************************************************************************ */
//                    TEACHERS VALIDATION
/************************************************************************ */



/********************* REQUIRES *********************************** */
const { checkSchema } = require('express-validator');
/************************************************************************ */


const v_Login = checkSchema(
    {
        email: {
            isEmail: {
                errorMessage: 'Informe um endereço de e-mail Válido',
            },
            isLength: {
                options: { min: 1, max: 256 },
                errorMessage: 'Seu e-mail deve conter no mínimo 1 e no máximo 256 caracteres',
            },
            notEmpty: {
                errorMessage: 'O e-mail é um Campo Obrigatório',
            },
        },
        password: {
            isLength: {
                options: { min: 8, max: 16 },
                errorMessage: 'Sua senha deve conter no mínimo 8 e no máximo 16 caracteres',
            },
            notEmpty: {
                errorMessage: 'Campo Senha é Obrigatório',
            },
        },
    },
    ['body'],
);

const v_Cadastro = checkSchema(
    {
        name: {
            isLength: {
                options: { min: 4, max: 200 },
                errorMessage: 'Seu nome deve ter no mínimo 4 e no máximo 200 caracteres',
            },
            notEmpty: {
                errorMessage: 'O nome é um campo Obrigatório',
            },
            isString: {
                errorMessage: 'O nome deve ser uma string',
            },
        },
        email: {
            isEmail: {
                errorMessage: 'Informe um endereço de e-mail Válido',
            },
            isLength: {
                options: { min: 1, max: 256 },
                errorMessage: 'Seu e-mail deve conter no mínimo 1 e no máximo 256 caracteres',
            },
            notEmpty: {
                errorMessage: 'O e-mail é um Campo Obrigatório',
            },
            isString: {
                errorMessage: 'O email deve ser uma string',
            },
        },
        password: {
            isLength: {
                options: { min: 8, max: 16 },
                errorMessage: 'A senha deve conter no mínimo 8 e no máximo 16 caracteres',
            },
            notEmpty: {
                errorMessage: 'A senha é um campo Obrigatório',
            },
            isString: {
                errorMessage: 'A senha deve ser uma string',
            },
        },
    },
    ['body'],
);

module.exports = {
    v_Login,
    v_Cadastro,
};
