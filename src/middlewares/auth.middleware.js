const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  //para obtener el authorization puedo hacerlo asi
  let { authorization: token } = req.headers;
  token = token?.replace('Bearer ', '');


  //o tambien asi
  //const token = req.headers.authorization;
  console.log(token);
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET,  //aqui iba la palabra secreta pero va a ir los env
      { algorithms: 'HS512' },
      (err, decoded) => {
        if (err) {
          res.status(400).json({
            error: 'invalid token',
            message: 'El token no es válido o ya expiro, envía un token correcto'
          });
        } else {
          console.log(decoded);
          next();
        }
      }
    );
  } else {
    res.status(400).json({
      error: "no token provided",
      message: "No se esta enviando un token de autenticacion"
    })
  }

}

module.exports = authMiddleware;

//vamos a validar el token

//si el token es valido lo dejamos pasar a la ruta

//si es invalido no lo dejamos entrar