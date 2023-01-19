// instancia para la conexion de la database
const db = require('../utils/database');

//tipos de datos de sequelize varchar (SQL) -> string
const { DataTypes } = require('sequelize');
const Users = require('./users.model');

//definir el modelo de usuarios
//los modelos se definen coin una mayuscula

//parametros
//nombre de la tabla
//los atributos de las tablas dentro de un objketo
const Todos = db.define("todos", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,

  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  isComplete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: "is_complete"     //asi es como se llamaria en la tabla
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
    references: {
      model: Users,
      key: 'id'
    }
  }
});

module.exports = Todos;