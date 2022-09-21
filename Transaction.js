const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database')

class Transaction extends Model { }


Transaction.init({
    paymentid: {
        type: DataTypes.STRING
    },
    product: {
        type: DataTypes.STRING
    },
    stock: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.STRING
    },
    quantity: {
        type: DataTypes.STRING
    },
    total: {
        type: DataTypes.STRING
    }
}, {

    sequelize,
    modelName: 'transaction',
    timestamps: false,
    indexes: [
        {
            unique: false,
            fields: ['paymentid']
        },
        {
            unique: false,
            fields: ['product']
        }
    ],
})

module.exports = Transaction;