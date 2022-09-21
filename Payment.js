const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database')

class Payment extends Model { }


Payment.init({
    overalltotal: {
        type: DataTypes.STRING
    },
    amount: {
        type: DataTypes.STRING
    },
    change: {
        type: DataTypes.STRING
    },
    orderdate: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'payment',
    timestamps: false,
    indexes: [
        {
            unique: false,
            fields: ['orderdate']
        }
    ],
})

module.exports = Payment;