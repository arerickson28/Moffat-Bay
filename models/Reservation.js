// Group 1 Capstone Database
// Roald Medendorp
// Austen Erickson 
// Deena Linehan 
// Giabella Apo 
// Kristina Vasquez 
// Thunder Harding 
// Violet Gonzalez 

const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  check_in_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  check_out_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  guest_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Confirmed', 'Pending'),
    defaultValue: 'Pending',
  },
  room_id: {
    type: DataTypes.INTEGER,
    references: {
      model: require('./Room'),
      key: 'id',
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: require('./User'),
      key: 'id',
    },
  },
},
  {
    timestamps: false
  }
);

module.exports = Reservation;
