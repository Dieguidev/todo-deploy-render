const jwt = require('jsonwebtoken');
const AuthService = require('../services/auth.service');
require('dotenv').config();

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await AuthService.login(email, password);
    //isValid puede ser true o false
    if (response.isValid) {
      const data = {
        email: response.result.email,
        username: response.result.username,
        id: response.result.id,
      }
      //firmamos un nuevo toquen
      const token = jwt.sign(data, process.env.JWT_SECRET, { algorithm: 'HS512', expiresIn: 60 });  //lo que esta entre llaves son los options de jwt
      data.token = token
      console.log(data);
      res.json(data);
    } else {
      res.status(401).json({ message: 'Credenciales invalidas' });
    }

  } catch (error) {
    res.status(400).json(error.message)
  }
}

module.exports = { userLogin }