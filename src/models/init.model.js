//vamos a importar todos nuestros modelos creados
const Categories = require('./categories.models');
const TodosCategories = require('./todos-categories.models');
const Todos = require('./todos.models');
const Users = require('./users.model');

const initModels = () => {

  //vamos a crear las relaciones
  //hasOne  ->tiene uno
  //hasMany -> tiene muchios
  //belongsTo -> pertenece a
  Todos.belongsTo(Users, { as: 'author', foreignKey: 'user_id' }); //todos pertenece a users
  Users.hasMany(Todos, { as: 'task', foreignKey: 'user_id' });  // users tiene muchois todos

  //relacion muchos a muchos entre categories y toidos
  TodosCategories.belongsTo(Todos, {as: 'task',foreignKey:'todo_id'});
  Todos.hasMany(TodosCategories,{as:'category', foreignKey:'todo_id'});
  
  TodosCategories.belongsTo(Categories, {as: 'category',foreignKey:'category_id'});
  Categories.hasMany(TodosCategories,{as:'task', foreignKey:'category_id'});

  Categories.belongsTo(Users, { as: 'author', foreignKey: 'users_id' }); //****************** */
  Users.hasMany(Categories, { as: 'categories', foreignKey: 'users_id' });  // **********
}

module.exports = initModels;