// models/contact.js
module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('Contact', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        honeypot: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ipAddress: DataTypes.STRING,
        userAgent: DataTypes.TEXT
    });

    return Contact;
};