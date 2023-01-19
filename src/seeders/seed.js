const db = require('../utils/database');
const Users = require('../models/users.model');
const Todos = require('../models/todos.models');
const Categories = require('../models/categories.models');
const TodosCategories = require('../models/todos-categories.models');


const users = [
  { username: 'Diego', email: 'diegogaraycullas@gmail.com', password: '1234' },
  { username: 'Miky', email: 'babymiky@gmail.com', password: '1234' },
  { username: 'Ana', email: 'analuisacullas@gmail.com', password: '1234' },
];

const todos = [
  { title: 'Estudiar node', description: 'Descripcion para 1', userId: 1 },
  { title: 'Pasear al perro', description: 'Descripcion para 2', userId: 1 },
  { title: 'Lavar platos', userId: 2 },
  { title: 'Ir chequeo mensual', description: 'Descripcion para 3', userId: 3 },
];




const todosCategories = [
  { categoryId: 1, todoId: 1 },
  { categoryId: 2, todoId: 1 },
  { categoryId: 4, todoId: 1 },
  { categoryId: 1, todoId: 2 },
  { categoryId: 7, todoId: 2 },
  { categoryId: 10, todoId: 2 },
  { categoryId: 3, todoId: 2 },
  { categoryId: 5, todoId: 3 },
  { categoryId: 6, todoId: 3 },
  { categoryId: 1, todoId: 4 },
  { categoryId: 3, todoId: 4 },
];

const categories = [
  {name: 'personal', userId: 1},  //1
  {name: 'educacion', userId: 3},  //2
  {name: 'salud', userId: 3},  //3
  {name: 'trabajo', userId: 2},  //4
  {name: 'hogar', userId: 2},      //5
  {name: 'cocina', userId: 1},    //6
  {name: 'deporte', userId: 2},   //7
  {name: 'ocio', userId: 3},    //8
  {name: 'financiero', userId: 1},   //9
  {name: 'entretenimiento', userId: 1},   //10
];

db.sync({ force: true })
  .then(() => {
    console.log('iniciando con el sembradio');
    users.forEach((user) => Users.create(user)); //el create nos dice que estamops insertando informacion dentro de la tabla de usuareios
    setTimeout(()=>{
      todos.forEach(todo=>Todos.create(todo));
    }, 100);
    setTimeout(()=>{
      categories.forEach(category=>Categories.create(category));
    }, 100);
    setTimeout(()=>{
      todosCategories.forEach(tc=>TodosCategories.create(tc));
    }, 100);
  })
  .catch(error=> console.log(error));