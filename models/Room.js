const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Room = sequelize.define('Room', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    price_per_night: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
    {
        timestamps: false
    }
);

module.exports = Room;