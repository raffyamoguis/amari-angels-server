const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('test-db', 'user', 'pass', {
    dialect: 'sqlite',
    host: './db/pharmacy-db.sqlite'
})

module.exports = sequelize;