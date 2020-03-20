const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//declaracao dos models
const Product = require('./models/product');



mongoose.connect("mongodb://bruno:bruno@192.168.0.104:27017", { useNewUrlParser: true, useUnifiedTopology: true });
//declaracao das rotas
const indexRoute = require("./routes/index-route");
const productRoute = require("./routes/product-route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use('/', indexRoute);
app.use('/products', productRoute);



module.exports = app;