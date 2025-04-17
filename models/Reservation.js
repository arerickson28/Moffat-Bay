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
  confirmation_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[A-Za-z0-9]{8}$/ // Allows a-z, A-Z, 0-9, Number of characters, 8
    }
  }
},
  {
    timestamps: false
  }
);

module.exports = Reservation;
