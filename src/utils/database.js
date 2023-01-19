const { Sequelize } = require('sequelize');
require('dotenv').config()

//crear una instancia con parametros de confiiguracion de la database
//necesitamos qun objeto de configuracion que no es mas que las credenciales de mi database
const db = new Sequelize({
  database: process.env.DB_NAME,   //*********** */
  username: process.env.DB_USER,      //nuestro usuario
  host: process.env.DB_HOST,      //127.0.0.1
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,     //tu propia contraseña
  dialect: "postgres",     //la base de datos que estamos usando
  logging: false, //silencia toda la informacion que da el sequelize en la consola
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false}}   //esto soluciona el error en render
})

module.exports = db;

