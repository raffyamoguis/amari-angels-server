const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database')

class Supplier extends Model { }

Supplier.init({
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'supplier'
})

module.exports = Supplier;