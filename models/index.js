// Group 1 Capstone Database
// Roald Medendorp
// Austen Erickson 
// Deena Linehan 
// Giabella Apo 
// Kristina Vasquez 
// Thunder Harding 
// Violet Gonzalez 

// Import your models
const User = require('./user');
const Reservation = require('./reservation');

// Define associations
User.hasMany(Reservation, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Reservation.belongsTo(User, {
  foreignKey: 'user_id'
})

// Export models and sequelize
module.exports = {
  User,
  Reservation
};