const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database')

class OtherSupplies extends Model { }

OtherSupplies.init({
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.STRING
    },
    expiry: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'othersupplies',
    indexes: [
        {
            unique: false,
            fields: ['name']
        }
    ],
})

module.exports = OtherSupplies;