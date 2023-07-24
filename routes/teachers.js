
const express = require('express');
const { ValidationError } = require('sequelize');

const Teachers = require('../templates/teachers');
const { cPassword } = require('../usefulness/password');
const { gTokenUser } = require('../usefulness/tk');
const { check_Validation_Result } = require('../holdout');
const { v_Login, v_Cadastro } = require('../holdout/teachers');

const router = express.Router();

function duplicate_email (error) {
  if (!(error instanceof ValidationError)) {
    return false;
  }

  return error.errors.find((databaseError) => (
    databaseError.type === 'unique violation' && databaseError.path === 'user_email'
  ));
}

/**
 * Cadastro de usuários
 */
router.post(
  '/',
  v_Cadastro,
  async (req, res) => {
    if (check_Validation_Result(req, res)) {
      return;
    }

    try {
      const { name, email, password } = req.body;

      const result = await Teachers.create({
        name,
        email,
        password,
      });

      const user = await Teachers.findByPk(result.get('id'));
      
      delete 
      res.status(201).json(user);
    } catch (error) {
      console.warn(error);
      if (duplicate_email(error)) {
        res.status(422).send('Já foi cadastrado este E-mail no Sistema!');
        return;
      }
      res.status(500).send();
    }
  },
);

/**
 * Login de usuários
 */
router.post(
  '/login',
  v_Login,
  async (req, res) => {
    if (check_Validation_Result(req, res)) {
      return;
    }

    try {
      const { email, password } = req.body;

      const teacher = await Teachers.unscoped().findOne({
        where: {
          email,
        },
      });

      if (!teacher) {
        res.status(401).send();
        return;
      }

      if (!cPassword(password, teacher.get('password'))) {
        res.status(401).send();
        return;
      }

      const teacher_return = teacher.toJSON();
      delete teacher_return.password;

      const tkn = gTokenUser(teacher_return);

      res.status(200).json({
        teacher: teacher_return,
        tkn,
      });
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);

module.exports = router;
