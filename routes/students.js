const express = require('express');
const { middlewareAuthentication } = require('../middlewares/authenticates');
const Assessments = require('../templates/Assessments');
const { check_Validation_Result } = require('../holdout');
const Students = require('../templates/Students');
const { validateStudentRegistration, studentsUpdateValidator } = require('../holdout/students');
const { rankImc } = require('../usefulness/rankImc')
const router = express.Router();



router.post('/', middlewareAuthentication, validateStudentRegistration, async (req, res) => {
  if (check_Validation_Result(req, res)) {
    return;
  }

  try {
    const { userLogged, body } = req;

    const { name, gender, age, height, weight } = body;

    const result = await Students.create({
      name,
      gender,
      age,
      height,
      weight,
      id_teachers: userLogged.id,
    });

    const student = await Students.findByPk(result.get('id'));
    const height_ = student.height * 2;
    const imc = student.weight / height_; // Correção no cálculo do IMC
    const rank_imc =  rankImc.find((rank) => imc >= rank.minImc && (!rank.maxImc || imc <= rank.maxImc));
    // Salvar a avaliação do estudante com IMC e classificação do IMC
    await Assessments.create({
      id_students: student.id,
      id_teachers: userLogged.id,
      imc,
      rank_imc: rank_imc?.rank,
    });

    res.status(201).json(student);
    console.log('Cadastro de aluno realizado com sucesso!');
  } catch (error) {
    console.warn(error);
    res.status(500).send();
  }
},
);
/**
 * Consulta de tarefas do usuário logado
 */
router.get(
  '/',
  middlewareAuthentication,
  async (req, res) => {
    try {
      const { userLogged } = req;

      const students = await Students.findAll({
        where: {
          id_teachers: userLogged.id,
        },
      });
      
      const assessments = await Assessments.findAll({
        where: {
          id_students: students.map((student) => student.id),
        },
      });

      // Mapear cada estudante e adicionar as informações de IMC e classificação
      const studentsWithImcAndRank = students.map((student) => {
        // Encontrar a avaliação correspondente ao estudante
        const assessment = assessments.find((assessment) => assessment.id_students === student.id);

        // Obter as informações de IMC e classificação
        const imc = assessment ? assessment.imc : null;
        const rank_imc = assessment ? assessment.rank_imc : 'Classificação desconhecida';

        // Retornar o estudante com as informações de IMC e classificação
        return {
          ...student.toJSON(),
          imc,
          rank_imc,
        };
      });

      res.status(200).json(studentsWithImcAndRank);
  
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);

/*
/**
 * Retorna tarefa por ID do usuário logado
 */
router.get(
  '/:studentId',
  middlewareAuthentication,
  async (req, res) => {
    try {
      const { usuarioLogado, params } = req;

      const { studentId } = params;

      const result = await Students.findOne({
        where: {
          id: studentId,
          usuario_id: usuarioLogado.id,
        },
      });

      if (!result) {
        res.status(404).send('Estudante não encontrado');
        return;
      }

    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);

const updateAssessments = async (teachersId, studentId) => {
  const result = await Students.findOne({
    where: {
      id: studentId,
      id_teachers: teachersId,
    },
  });

  if (!result) {
    return null;
  }

  await result.save();

  return result;
};



router.patch('/:studentId', middlewareAuthentication, studentsUpdateValidator,
  async (req, res) => {
    if (check_Validation_Result(req, res)) {
      return;
    }

    try {
      const { userLogged, params, body } = req;

      const { studentId } = params;
      const { name, gender, age, height, weight } = body;

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


      // const height_ = height * 2; 
      // const imc = weight / height_;
      // const rank_imc =  rankImc.find((rank) => imc >= rank.minImc && (!rank.maxImc || imc <= rank.maxImc));

      // await Assessments.create({
      //   id_students: studentId,
      //   id_teachers: userLogged.id,
      //   imc,
      //   rank_imc: rank_imc?.rank,
      // });

      await Students.update(
        {
          name,
          gender,
          age,
          height,
          weight,
        },
        {
          where: {
            id: studentId,
          },
        },
      );

      await student.reload();


      res.status(200).json(student);
    } catch (error) {
      console.warn(error);
      res.status(500).send();
    }
  },
);


router.delete(
  '/:studentId',
  middlewareAuthentication,
  async (req, res) => {
    try {
      const { userLogged, params } = req;
      const { studentId } = params;

      const result = await Students.destroy({
        where: {
          id: studentId,
          id_teachers: userLogged.id,
        },
      });

      if (!result) {
        res.status(404).send('Estudante Não foi encontrada');
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
