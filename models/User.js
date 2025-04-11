const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
},
  {
    // sequelize model hooks let you run custom logic before or after certain operations on a model
    // in this case, we want to hash passwords before saving
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    timestamps: false
  }
);

// this is adding a custom method called checkPassword to every instance of the User model
// uses bcrypt to compare
// loginPw: the password the user typed in during login
// this.password: the hashed password stored in the database
// compareSync() returns true if the plain-text password matches the hashed one, otherwise false
User.prototype.checkPassword = function (loginPw) {
  return bcrypt.compareSync(loginPw, this.password);
};

module.exports = User;
