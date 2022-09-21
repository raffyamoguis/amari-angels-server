const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database')

class Stock extends Model { }

Stock.init({
    stockfor: {
        type: DataTypes.STRING
    },
    quantity: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: 'stock',
    indexes: [
        {
            unique: false,
            fields: ['stockfor']
        },
        {
            unique: false,
            fields: ['quantity']
        }
    ],
})

module.exports = Stock;