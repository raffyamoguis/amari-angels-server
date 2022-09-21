const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database')

class User extends Model { }

User.init({
    account: {
        type: DataTypes.STRING,
        defaultValue: 'Admin'
    },
    username: {
        type: DataTypes.STRING,
        defaultValue: 'admin'
    },
    password: {
        type: DataTypes.STRING,
        defaultValue: 'admin'
    }
}, {
    sequelize,
    modelName: 'user',
    timestamps: false,
})

module.exports = User;