const express = require('express');
const { middlewareAuthentication } = require('../middlewares/authenticates');
const Assessments = require('../templates/Assessments');
const { check_Validation_Result } = require('../holdout');
const Students = require('../templates/Students');
const { validateStudentRegistration, studentsUpdateValidator } = require('../holdout/students');


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

        res.status(201).json(student);
        console.log('Cadastro de aluno realizado com sucesso!');
    } catch (error) {
        console.warn(error);
        res.status(500).send();
    }
},
);


// /**
//  * Atualiza os dados da tarefa do usuário de forma parcial
//  */
router.patch('/:studentId',middlewareAuthentication,studentsUpdateValidator,
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


            await student.update(
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

module.exports = router;
