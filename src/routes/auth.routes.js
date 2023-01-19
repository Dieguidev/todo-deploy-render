const { Router } = require('express');
const { userLogin } = require('../controllers/auth.controller');

const router = Router();


//para hacer un login se utiliza el metodo post
router.post('/auth/login', userLogin);

module.exports = router;