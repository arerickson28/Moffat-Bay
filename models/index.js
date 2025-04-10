// Group 1 Capstone Database
// Roald Medendorp
// Austen Erickson 
// Deena Linehan 
// Giabella Apo 
// Kristina Vasquez 
// Thunder Harding 
// Violet Gonzalez 

// Import your models
const User = require('./User');
const Reservation = require('./Reservation');
const Room = require('./Room')

// Define associations
User.hasMany(Reservation, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Reservation.belongsTo(User, {
  foreignKey: 'user_id'
})

Reservation.belongsTo(Room, {
  foreignKey: 'room_id'
})

// Export models and sequelize
module.exports = {
  User,
  Reservation,
  Room
};
