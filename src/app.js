//importar expres
const express = require('express');
const db = require(`./utils/database`);
const initModels = require('./models/init.model');
const Users = require('./models/users.model');
const Todos = require('./models/todos.models');
const userRoutes = require('./routes/users.routes');
const todosRoutes = require('./routes/todos.routes');
const authRoutes = require('./routes/auth.routes')
const cors = require('cors');
require('dotenv').config();
//crear una instancia de express
const app = express();

app.use(express.json());
app.use(cors());


//const PORT = 8000;
const PORT = process.env.PORT;

//probando la conexion a la base de datos
db.authenticate()
  .then(() => console.log('autenticacion exitosa'))
  .catch((error) => console.log(error));

initModels();
//vamos a usar el metodo sync la ionformacion de nuestra db
db.sync({ force: false }) //devuelve una promesa
  .then(() => console.log('bd sincronizada'))
  .catch((error) => console.log(error))


app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to server' });
});

//estas son las rutas para controller y services
app.use('/api/v1', userRoutes);
app.use("/api/v1", todosRoutes);
app.use('/api/v1', authRoutes);

//definir las rutas de nuestros endpoint(de ahora en adelante ep)
//pra todas las consultas de usuarios
//localhost:8000/users --> todo para usuarios
//localhost:8000/todos -->todo para tareas

//GET a /users
app.get('/users', async (req, res) => {
  try {
    //vamos a obtener el resutlado de consultar a todos los usuario de la bd
    const result = await Users.findAll();  //es lo mismo que select * from users
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

//obtener un usuario sabiendo su id
app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Users.findByPk(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});


//obtener un usuario por username
app.get('/users/username/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const result = await Users.findOne({ where: { username } });  //select * form users where username = iannacus
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
})

//creando un usuario
app.post('/users', async (req, res) => {
  try {
    const user = req.body;
    const result = await Users.create(user);
    res.status(201).json(result);

  } catch (error) {
    res.status(400).json(error.message);
    console.log(error);
  }
})

//actualizar un usuario,solo podemos cambiar el password
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const field = req.body;
    const result = await Users.update(field, {
      where: { id }
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
})

//eliminar un usuario por su id
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Users.destroy({
      where: { id }
    });
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error.message);
  }
})

//GET a /todos
app.get('/todos', async (req, res) => {
  try {
    //vamos a obtener el resutlado de consultar a todos los usuario de la bd
    const result = await Todos.findAll();  //es lo mismo que select * from users
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

//obtener un tarea sabiendo su id
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todos.findByPk(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

//creando una tarea
app.post('/todos', async (req, res) => {
  try {
    const user = req.body;
    const result = await Todos.create(user);
    res.status(201).json(result);

  } catch (error) {
    res.status(400).json(error.message);
    console.log(error);
  }
})

//actualizar un todo,solo podemos cambiar el isComplete
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const field = req.body;
    const result = await Todos.update(field, {
      where: { id }
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
})



//eliminar un todo por su id
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todos.destroy({
      where: { id }
    });
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error.message);
  }
})

app.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto ${PORT}`);
})