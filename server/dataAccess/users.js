var Sequelize = require('sequelize');
var smartyfile = require('./dataAccess').connection;
const {
  folder
} = require('../dataAccess/folders')

class User_Model {

  constructor() {

    this.user = smartyfile.define('Login', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      user_name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email_adress: {
        type: Sequelize.STRING
      },
      is_active: {
        type: Sequelize.BOOLEAN
      },
      user_img:{
        type:Sequelize.STRING
      }

    }, {
      freezeTableName: {
        type: true
      }
    });

  }


  getAllUsers() {
    return this.user.findAll().then((data) => {
      return data
    }, err => {
      console.error(err)
    })
  }


  getOneUser(userName, password) {
    return this.user.findOne({
      where: {
        user_name: userName,
        password: password
      }
    }).then((data) => {
      return data
    }, err => {
      console.error(err)
    })
  }

  createUser(userData) {
    console.log(userData)
    return this.user.build({
      user_id: null,
      first_name: userData.first_name,
      last_name: userData.last_name,
      user_name: userData.user_name,
      password: userData.password,
      email_adress: userData.email_adress,
      is_active: true,
      user_img:userData.user_img
    }).save().then((data) => {
      return data
    }, err => {
      console.error(err)
    })
  }
  updateUser(id,userData){
    return this.user.update(userData,{
      where:{
        id:id
      }
    })
  }

} // end of class

var userInc = new User_Model();

module.exports = userInc;
