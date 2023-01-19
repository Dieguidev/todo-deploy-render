
const { where } = require('sequelize');
const Categories = require('../models/categories.models');
const TodosCategories = require('../models/todos-categories.models');
const Todos = require('../models/todos.models');
const Users = require('../models/users.model');

class UserServices {
  static async getAll() {    //stattic es como una funcion pero parecido a una plkantilla
    try {
      const result = await Users.findAll();
      return result;
    } catch (error) {
      throw new error;
    }
  }

  static async getById(id) {
    try {
      const result = await Users.findByPk(id);
      return result;
    } catch (error) {
      throw new error;
    }
  }

  static async getUserWithTasks(id) {
    try {
      const result = await Users.findOne({
        where: { id },
        // attributes: ['username', 'email'],
        // attributes:{exclude:['password']},
        include: {
          model: Todos,
          as: 'task'
        }
      })
      return result;
    } catch (error) {
      throw new error;
    }
  }

  static async getUserWithTasksWithCategories(id) {
    try {
      const result=await Users.findOne({
        where: {id},
        attributes:{exclude: ['password']},
        include: {
          model: Todos,
          as: 'task',
          include: {
            model: TodosCategories,
            as: 'category',
            include: {
              model: Categories,
              as: 'category',
            }
          }
        }
      })
      return result;
    } catch (error) {
      throw new error;
    }
  }

  static async createUser(user) {
    try {
      const result = await Users.create(user);
      return result;
    } catch (error) {
      throw new error;
    }
  }

  static async updateUserById(field, id) {
    try {
      const result = await Users.update(field, {
        where: { id }
      });
      return result;
    } catch (error) {
      throw new error;
    }
  }
  
  static async deleteUser(id) {
    try {
      const result = await Users.destroy({where:{id}});
      return result;
    } catch (error) {
      throw new error;
    }
  }

  static async getUserWithCategories(id) {
    try {
      const result = await Users.findOne({
        where: { id },
        
        attributes:{exclude: ['password']},
        include: {
        model: Categories,
        as: 'categories',
        }
      })
      return result;
    } catch (error) {
      throw new error;
    }
  }
}

module.exports = UserServices;


