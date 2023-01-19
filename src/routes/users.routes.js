const { Router } = require('express');
const { getAllUsers, getUsersById, createUser, updateUser, deleteUser, getUserWithTasks, getUserWithTasksWithCategories, getUserWithCategories } = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();


//localhost:8000/users
//controlador
router.get('/users', authMiddleware, getAllUsers);

router.get('/users/:id', authMiddleware, getUsersById);

//obtener a un usuario con sus tareas
router.get('/users/:id/todos', authMiddleware, getUserWithTasks);

//obtener usuario con sus tareas con sus categorias
router.get('/users/:id/todos/categories', authMiddleware, getUserWithTasksWithCategories);

//llamando las categorias por usuario
router.get('/users/:id/categories', authMiddleware, getUserWithCategories);

router.post('/users', createUser);

router.put('/users/:id', authMiddleware, updateUser);

router.delete('/users/:id', authMiddleware, deleteUser);

module.exports = router;