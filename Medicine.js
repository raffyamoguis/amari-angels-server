const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database')

class Medicine extends Model { }

Medicine.init({
    batchno: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    specification: {
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
    modelName: 'medicine',
    indexes: [
        {
            unique: false,
            fields: ['name']
        }
    ],
})

module.exports = Medicine;