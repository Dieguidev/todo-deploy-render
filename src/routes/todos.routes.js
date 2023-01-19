const { Router } = require("express");
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTodosWithCategories,
} = require("../controllers/todos.controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const { route } = require("./users.routes");


const router = Router();

router.get("/todos", authMiddleware, getAllTasks);

router.get("/todos/:id", authMiddleware, getTaskById);

//obtener un todo con sus categorias
router.get('/todos/:id/categories', authMiddleware, getTodosWithCategories);

router.post("/todos", authMiddleware, createTask);

router.put("/todos/:id", authMiddleware, updateTask);

router.delete("/todos/:id", authMiddleware, deleteTask);

module.exports = router;