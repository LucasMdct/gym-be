
const express = require('express');
const { middlewareAuthentication } = require('../middlewares/authenticates');
const Assessments = require('../templates/Assessments');
const { check_Validation_Result } = require('../holdout');
const { validationImc } = require('../holdout/assessments');
const Students = require('../templates/Students');

const router = express.Router();

function rankImc(imc) {
  if (imc < 17) {
    return 'Muito abaixo do peso';
  } else if (imc <= 18.49) {
    return 'Abaixo do peso';
  } else if (imc >= 18.5 && imc < 24.9) {
    return 'Peso normal';
  } else if (imc >= 25 && imc < 29.9) {
    return 'Acima do Peso';
  } else if (imc >= 30 && imc < 34.9) {
    return 'Obesidade I';
  } else if (imc >= 35 && imc < 39.9) {
    return 'Obesidade II (severa)';
  } else {
    return 'Obesidade III (mórbida)';
  }
};

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

    const resData = {
      imc,
      classification: rankImc(imc),
    };


    res.status(200).json(resData);

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
