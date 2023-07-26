

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
}

router.post('/:studentId', middlewareAuthentication, async (req, res) => {
  if (check_Validation_Result(req, res)) {
    return;
  }

  try {
    const { userLogged, params } = req;
    const { studentId } = params;


    // Busque o estudante pelo ID
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

    const height = (student.height * 2);
    const imc = student.weight / height;

    const assessment_value = await Assessments.create({
      id_students: studentId,
      id_teachers: userLogged.id,
      imc,
    });



    const responseData = {
      imc,
      classification: rankImc(imc),
    };


    res.status(200).json(responseData);

    console.log('Atualização do IMC realizado com sucesso!');
  } catch (error) {
    console.warn(error);
    res.status(500).send();
  }
});


/*ROTA DE CADASTRO PARA AVALIAÇÕES*/

// router.patch('/:studentId', middlewareAuthentication, async (req, res) => {
//   if (check_Validation_Result(req, res)) {
//     return;
//   }

//   try {
//     const { userLogged, params, body } = req;
//     const { studentId} = params;
//     const { height, weight } = body;


//     const imc = (weight / (height * height)).toFixed(2);

//     const assessment_value = await Assessments.create({
//       id_students: studentId,
//       id_teachers: userLogged.id, // Use o ID do professor logado
//       imc,
//     });

//     if (!assessment_value) {
//       res.status(404).send('Erro, Não foi encontrado');
//       return;
//     }

//     await assessment_value.reload();
//     res.status(200).json(assessment_value);
// const assessment_value = await Assessments.create({
//   where: {
//     id_students: studentId,
//     id_teachers: userLogged.id, // Use o ID do professor logado
//   },
// });

// if (!assessment_value) {
//   res.status(404).send('Erro, Não foi encontrado');
//   return;
// }

// await assessment_value.update(
//   {
//       id_students: studentId,
//       id_teachers: userLogged.id, // Use o ID do professor logado
//       imc,
//   },
//   {
//     where: {
//       id_students: studentId,
//       id_teachers: userLogged.id,
//     },
//   },
// );
// await assessment_value.reload();
// res.status(200).json(assessment_value);
//   console.log('Atualização do IMC realizado com sucesso!');
//   } catch (error) {
//     console.warn(error);
//     res.status(500).send();
//   }
// },
// );

// /**
//  * Consulta de tarefas do usuário logado
//  */
// router.get(
//   '/',
//   middlewareAutenticacao,
//   async (req, res) => {
//     try {
//       const { userLogged } = req;

//       const result = await Tarefas.findAll({
//         where: {
//           usuario_id: userLogged.id,
//         },
//       });

//       res.status(200).json(result);
//     } catch (error) {
//       console.warn(error);
//       res.status(500).send();
//     }
//   },
// );

// /**
//  * Retorna tarefa por ID do usuário logado
//  */
// router.get(
//   '/:tarefaId',
//   middlewareAutenticacao,
//   async (req, res) => {
//     try {
//       const { usuarioLogado, params } = req;

//       const { tarefaId } = params;

//       const result = await Tarefas.findOne({
//         where: {
//           id: tarefaId,
//           usuario_id: usuarioLogado.id,
//         },
//       });

//       if (!result) {
//         res.status(404).send('Tarefa não encontrada');
//         return;
//       }

//       res.status(200).json(result);
//     } catch (error) {
//       console.warn(error);
//       res.status(500).send();
//     }
//   },
// );

// /**
//  * Atualiza a tarefa alterando o valor da coluna "concluida" para true ou false.
//  *
//  * Em caso de sucesso retorna o objeto da tarefa atualizada.
//  *
//  * Caso não encontre a tarefa retorna "null".
//  *
//  * @param {number} usuarioId
//  * @param {number} tarefaId
//  * @param {boolean} concluida
//  * @returns {object|null}
//  */
// const atualizaSituacaoTarefa = async (usuarioId, tarefaId, concluida) => {
//   const result = await Tarefas.findOne({
//     where: {
//       id: tarefaId,
//       usuario_id: usuarioId,
//     },
//   });

//   if (!result) {
//     return null;
//   }

//   /**
//    * Atualiza o valor da coluna "concluida"
//    * Docs: https://sequelize.org/docs/v6/core-concepts/model-instances/#updating-an-instance
//    */
//   result.concluida = concluida;
//   await result.save();

//   return result;
// };

// /**
//  * Marca a tarefa do usuário como concluída
//  */
// router.put(
//   '/:tarefaId/concluida',
//   middlewareAutenticacao,
//   async (req, res) => {
//     try {
//       const { usuarioLogado, params } = req;

//       const { tarefaId } = params;

//       const result = await atualizaSituacaoTarefa(
//         usuarioLogado.id,
//         tarefaId,
//         true,
//       );

//       if (!result) {
//         res.status(404).send('Tarefa não encontrada');
//         return;
//       }

//       res.status(200).json(result);
//     } catch (error) {
//       console.warn(error);
//       res.status(500).send();
//     }
//   },
// );

// /**
//  * Marca a tarefa do usuário como pendente
//  */
// router.put(
//   '/:tarefaId/pendente',
//   middlewareAutenticacao,
//   async (req, res) => {
//     try {
//       const { usuarioLogado, params } = req;

//       const { tarefaId } = params;

//       const result = await atualizaSituacaoTarefa(
//         usuarioLogado.id,
//         tarefaId,
//         false,
//       );

//       if (!result) {
//         res.status(404).send('Tarefa não encontrada');
//         return;
//       }

//       res.status(200).json(result);
//     } catch (error) {
//       console.warn(error);
//       res.status(500).send();
//     }
//   },
// );

// /**
//  * Atualiza os dados da tarefa do usuário de forma parcial
//  */
// router.patch(
//   '/:tarefaId',
//   middlewareAutenticacao,
//   validadorAtualizacaoTarefa,
//   async (req, res) => {
//     if (checarResultadoValidacao(req, res)) {
//       return;
//     }

//     try {
//       const { usuarioLogado, params, body } = req;

//       const { tarefaId } = params;
//       const { titulo, concluida } = body;

//       const tarefa = await Tarefas.findOne({
//         where: {
//           id: tarefaId,
//           usuario_id: usuarioLogado.id,
//         },
//       });

//       if (!tarefa) {
//         res.status(404).send('Tarefa não encontrada');
//         return;
//       }

//       /**
//        * Realiza o update da tarefa direto no banco de dados e não via "save()" como na
//        * atualização da situação.
//        * Isso é necessário para que seja possível realizar a atualização parcial dos dados,
//        * ou seja, pode ser atualizado só um coluna ou todas.
//        * Docs: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-update-queries
//        */
//       await Tarefas.update(
//         {
//           titulo,
//           concluida,
//         },
//         {
//           where: {
//             id: tarefaId,
//           },
//         },
//       );

//       await tarefa.reload();

//       res.status(200).json(tarefa);
//     } catch (error) {
//       console.warn(error);
//       res.status(500).send();
//     }
//   },
// );

// /**
//  * Rota de exclusão de tarefas
//  * DELETE /tarefas/1
//  */
// router.delete(
//   '/:tarefaId',
//   middlewareAutenticacao,
//   async (req, res) => {
//     try {
//       const { usuarioLogado, params } = req;
//       const { tarefaId } = params;

//       const result = await Tarefas.destroy({
//         where: {
//           id: tarefaId,
//           usuario_id: usuarioLogado.id,
//         },
//       });

//       if (!result) {
//         res.status(404).send('Tarefa não encontrada');
//         return;
//       }

//       res.status(204).send();
//     } catch (error) {
//       console.warn(error);
//       res.status(500).send();
//     }
//   },
// );

module.exports = router;
