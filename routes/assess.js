
const express = require('express');
const { middlewareAuthentication } = require('../middlewares/authenticates');
const Assessments = require('../templates/Assessments');
const { check_Validation_Result } = require('../holdout');
const { validationImc } = require('../holdout/assessments');
const Students = require('../templates/Students');

const router = express.Router();


router.post('/:studentId', middlewareAuthentication, async (req, res) => {
  if (check_Validation_Result(req, res)) {
    return;
  }

  try {
    const { userLogged, params, body } = req;
    const { studentId } = params;
    const { name, height, weight } = body;

    const student = await Students.findOne({
      where: {
        id: studentId,
        id_teachers: userLogged.id,
      },
    });

    if (!student) {
      res.status(404).send('Estudante não encontrado');
      return;
    }

    const imc = student.weight / (student.height * 2);

    const assessment_value = await Assessments.create({
      id_students: studentId,
      id_teachers: userLogged.id,
      imc,
    });

    const Data = {
      imc,
      classification: DisplayImcRank(imc),
    };


    res.status(200).json(Data);

  } catch (error) {
    console.warn(error);
    res.status(500).send();
  }
});


router.get(
  '/',
  middlewareAuthentication,
  async (req, res) => {
    try {
      const { userLogged } = req;

      const result = await Assessments.findAll({
        where: {
          id_teachers: userLogged.id,
        },
      });

      res.status(200).json(result);
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);


router.get(
  '/:assessmentId',
  middlewareAuthentication,
  async (req, res) => {
    try {
      const { userLogged, params } = req;

      const { assessmentId } = params;

      const result = await Assessments.findOne({
        where: {
          id: assessmentId,
          id_teachers: userLogged.id,
        },
      });

      if (!result) {
        res.status(404).send('Avaliação não encontrada');
        return;
      }

      res.status(200).json(result);
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);


router.delete(
  '/:assessmentId',
  middlewareAuthentication,
  async (req, res) => {
    try {
      const { userLogged, params } = req;
      const { assessmentId } = params;

      const result = await Assessments.destroy({
        where: {
          id: assessmentId,
          id_teachers: userLogged.id,
        },
      });

      if (!result) {
        res.status(404).send('Avaliação Não foi encontrada');
        return;
      }

      res.status(204).send();

    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);

module.exports = router;
