const Teachers = require('../templates/Teachers'); 
const Students = require('../templates/Students');

const { holdoutTokenUsers } = require('../usefulness/tkn');

 
const obtainsTokenAuthentication = (authorization) => {
  if (!authorization) return null;

  const pieces = authorization.split(' ');
  return pieces[1];
};

const middlewareAuthentication = async (request, response, next) => {
  const tkn = obtainsTokenAuthentication(request.headers.authorization);

  if (!tkn) {
    response.status(401).send('Token não informado.');
    return;
  }

  try {
    const payload = holdoutTokenUsers(tkn);

    const teachersId = payload.id;
    
    const teachers = await Teachers.findByPk(teachersId);


    if (!teachers) {
      response.status(401).send('Usuário não encontrado.');
      return;
    }

    request.userLogged = teachers.toJSON();
    next();
  } catch (error) {
    console.warn(error);
    response.status(401).send('Token inválido.');
  }
};

module.exports = {
    middlewareAuthentication,
};
