const express = require("express");
const sequelize = require('./database')
const Supplier = require('./Supplier')
const OtherSupplies = require('./OtherSupplies')
const Medicine = require('./Medicine')
const Stock = require('./Stock')
const Transaction = require('./Transaction')
const Payment = require('./Payment')
const User = require('./User')

//{ force: true } force create new
sequelize.sync().then(() => console.log('DB is ready'));

const app = express();

var cors = require('cors');
app.use(cors());

app.use(express.json());

// Supplier REST
app.post('/api/supplier', async (req, res) => {//Add
    await Supplier.create(req.body);
    res.send('Supplier is inserted');
})

app.get('/api/supplier', async (req, res) => {//Retrieve
    const suppliers = await Supplier.findAll();
    res.send(suppliers);
})

app.get('/api/supplier/:id', async (req, res) => {//Retrieve only one
    const requestedId = req.params.id;
    const supplier = await Supplier.findOne({ where: { id: requestedId } })
    res.send(supplier)
})

app.put('/api/supplier/:id', async (req, res) => {//Update
    const requestedId = req.params.id;
    const supplier = await Supplier.findOne({ where: { id: requestedId } })
    supplier.name = req.body.name;
    await supplier.save();
    res.send('Updated')
})

app.delete('/api/supplier/:id', async (req, res) => {
    const requestedId = req.params.id;
    await Supplier.destroy({ where: { id: requestedId } });
    res.send('removed');
})

//OtherSupply REST
app.post('/api/othersupply', async (req, res) => {//Add
    await OtherSupplies.create(req.body);
    res.send('Other Supply Inserted.');
});

app.get('/api/othersupply', async (req, res) => {//Get All
    const othersupplies = await OtherSupplies.findAll({
        order: [['id', 'DESC']],
        limit: 10,
    });
    res.send(othersupplies);
})

app.get('/api/countothersupply', async (req, res) => {//Get All
    const othersupplies = await OtherSupplies.count();
    res.send({ total: othersupplies });
})

app.get('/api/othersupply/search', async (req, res) => {//Search for medicine
    const { Op } = require("sequelize");
    const searchquery = req.query;
    const medicines = await OtherSupplies.findAll({
        where: {
            name: {
                [Op.like]: '%' + searchquery['name'] + '%'
            }
        }
    })
    res.send(medicines)
})

app.put('/api/othersupply/:id', async (req, res) => {//Update
    const requestedId = req.params.id;
    const other = await OtherSupplies.findOne({ where: { id: requestedId } })
    if (req.body.name) {
        other.name = req.body.name;
    }
    if (req.body.description) {
        other.description = req.body.description;
    }
    if (req.body.price) {
        other.price = req.body.price;
    }
    if (req.body.expiry) {
        other.expiry = req.body.expiry;
    }
    other.save();
    res.send('Updated')
})

app.delete('/api/othersupply/:id', async (req, res) => {//Delete
    const requestedId = req.params.id;
    await OtherSupplies.destroy({ where: { id: requestedId } });
    res.send('removed');
})

//Medicine Rest
app.post('/api/medicine', async (req, res) => {
    await Medicine.create(req.body);
    res.send('Medicine Inserted.');
})

app.get('/api/medicine', async (req, res) => {//Get All
    const medicine = await Medicine.findAll({
        order: [['id', 'DESC']],
        limit: 10,
    });
    res.send(medicine);
})

app.get('/api/countMedicine', async (req, res) => {
    const total = await Medicine.count();
    res.send({ total: total });
});

app.get('/api/searchRedundant/:medicine', async (req, res) => {
    const requestedName = req.params.medicine;
    const result = await Medicine.findOne({ where: { name: requestedName } });
    let isRedundant = false;
    if (result) isRedundant = true;
    res.send(isRedundant);
})

app.get('/api/medicine/search', async (req, res) => {//Search for medicine
    const { Op } = require("sequelize");
    const searchquery = req.query;
    const medicines = await Medicine.findAll({
        where: {
            name: {
                [Op.like]: '%' + searchquery['name'] + '%'
            }
        }
    })

    res.send(medicines)
})

app.put('/api/medicine/:id', async (req, res) => {//Update
    const requestedId = req.params.id;
    const medicine = await Medicine.findOne({ where: { id: requestedId } })
    if (req.body.batchno) {
        medicine.batchno = req.body.batchno;
    }
    if (req.body.name) {
        medicine.name = req.body.name;
    }
    if (req.body.specification) {
        medicine.specification = req.body.specification;
    }
    if (req.body.price) {
        medicine.price = req.body.price;
    }
    if (req.body.expiry) {
        medicine.expiry = req.body.expiry;
    }
    medicine.save();
    res.send('Updated')
})

app.delete('/api/medicine/:id', async (req, res) => {//Delete
    const requestedId = req.params.id;
    await Medicine.destroy({ where: { id: requestedId } });
    res.send('removed');
})

//Stocks
app.get('/api/stockfor', async (req, res) => {
    const stockfor = [];
    await Medicine.findAll({ attributes: ['name'] }).then(function (medicine) {
        for (let i of medicine) {
            stockfor.push(i);
        }
    })
    await OtherSupplies.findAll({ attributes: ['name'] }).then(function (othersupply) {
        for (let i of othersupply) {
            stockfor.push(i);
        }
    })
    res.send(stockfor)
})

app.post('/api/stock', async (req, res) => {
    await Stock.create(req.body);
    res.send('Stock created');
})

app.get('/api/stock', async (req, res) => {
    const stocks = await Stock.findAll({
        order: [['id', 'DESC']],
        limit: 10,
    });
    res.send(stocks)
})

app.get('/api/stock/s', async (req, res) => {
    const { Op } = require("sequelize");
    const stocks = await Stock.findAll({
        where: {
            quantity: {
                [Op.lte]: 20
            }
        },
        order: [['quantity', 'ASC']],
    });
    res.send(stocks)
})

app.get('/api/stock/search', async (req, res) => {//Search for medicine
    const { Op } = require("sequelize");
    const searchquery = req.query;
    const stocks = await Stock.findAll({
        where: {
            stockfor: {
                [Op.like]: '%' + searchquery['name'] + '%'
            }
        }
    })

    res.send(stocks)
})

app.put('/api/stock/:id', async (req, res) => {
    const requestedId = req.params.id;
    const stock = await Stock.findOne({ where: { id: requestedId } })
    stock.quantity = req.body.quantity;
    stock.save();
    res.send('updated')
})

app.put('/api/edit/stock/:name', async (req, res) => {
    const requestedName = req.params.name;
    const stock = await Stock.findOne({ where: { stockfor: requestedName } })
    stock.stockfor = req.body.newname;
    stock.save();
    res.send(stock);
});

app.put('/api/reducestock/:name', async (req, res) => {
    const name = req.params.name;
    const stock = await Stock.findOne({ where: { stockfor: name } })
    stock.quantity = req.body.q;
    stock.save();
    res.send('Updated.')
})

app.delete('/api/stock/:id', async (req, res) => {
    const requestedId = req.params.id;
    await Stock.destroy({ where: { id: requestedId } });
    res.send('removed');
})

app.delete('/api/stockn/:name', async (req, res) => {
    const requestedName = req.params.name;
    await Stock.destroy({ where: { stockfor: requestedName } });
    res.send('removed');
})


//Transactions
app.get('/api/products', async (req, res) => {
    const { Op } = require("sequelize");
    const userquery = req.query;
    const products = await Stock.findAll({
        where: {
            stockfor: {
                [Op.like]: '%' + userquery['name'] + '%'
            }
        }
    })

    res.send(products)
})

app.get('/api/products/:name', async (req, res) => {
    const userquery = req.params.name;
    console.log(userquery);
    let product = await Medicine.findOne({ where: { name: userquery } })
    console.log(userquery);
    if (!product) {
        product = await OtherSupplies.findOne({ where: { name: userquery } })
    }
    res.send(product)
})

app.post('/api/transaction', async (req, res) => {
    await Transaction.create(req.body);
    res.send('Transaction created');
})

app.get('/api/transaction', async (req, res) => {
    const transactions = await Transaction.findAll();
    res.send(transactions);
})

app.post('/api/payment', async (req, res) => {
    await Payment.create(req.body);
    res.send('Payment Created!');
})

app.get('/api/payment', async (req, res) => {
    const payments = await Payment.findAll({
        order: [['id', 'DESC']],
        limit: 15,
    });
    res.send(payments);
})

app.get('/api/payment/total', async (req, res) => {
    const { Op } = require("sequelize");
    const date = new Date();
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currdate = date.getFullYear() + '-' + month[date.getMonth()] + '-' + date.getDate();
    const payments = await Payment.findAll({
        where: {
            orderdate: {
                [Op.like]: currdate + '%'
            }
        }
    });
    res.send(payments);
})

app.get('/api/test', async (req, res) => {
    const { Op } = require("sequelize");
    const date = new Date();
    const currdate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    // exports.getMaxPrice = () => Item.findAll({
    //     attributes: [[sequelize.fn('max', sequelize.col('price')), 'maxPrice']],
    //     raw: true,
    //   });
    const result = await Transaction.findAll({
        where: {
            paymentid: {
                [Op.like]: currdate + '%'
            }
        }
    })

    res.send(result)
})

app.get('/api/transactions/total', async (req, res) => {
    const { Op } = require("sequelize");
    const date = new Date();
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currdate = date.getFullYear() + '-' + month[date.getMonth()] + '-' + date.getDate();
    const payments = await Transaction.findAll({
        where: {
            paymentid: {
                [Op.like]: currdate + '%'
            }
        },
        order: [
            ['product', 'ASC']
        ]
    });
    res.send(payments);
})

app.get('/api/viewtransaction/:id', async (req, res) => {
    const requestedId = req.params.id;
    const result = await Transaction.findAll({
        where: {
            paymentid: requestedId
        }
    })
    res.send(result);
})

app.get('/api/request/payment/:date', async (req, res) => {
    const { Op } = require("sequelize");
    const date = req.params.date;
    const result = await Payment.findAll({
        where: {
            orderdate: {
                [Op.like]: date + '%'
            }
        }
    })
    res.send(result)
})

app.get('/api/login', async (req, res) => {
    const result = await User.findAll();
    res.send(result);
});

app.put('/api/login', async (req, res) => {
    const account = await User.findOne({ where: { id: 1 } });
    if (req.body.username) {
        account.username = req.body.username;
    }
    if (req.body.password) {
        account.password = req.body.password;
    }
    account.save();
    res.send('Updated Account');
})

app.post('/api/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findAll();

    let response = {};

    user.forEach((u) => {
        if (username === u.username && password === u.password) {
            response = { 'message': 'Username and password is ok' };
        } else {
            response = { 'message': 'Username or password is incorrect' };
        }
    })

    res.send(response)
})

//Test 
app.get('/api/return', async (req, res) => {
    res.send('Return');
})

app.listen(3001, () => {
    console.log("app is running");
});