const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(require('./app/routes/router'))
app.set('view engine', 'ejs')
const port = 8080;
app.listen(port, (()=>{console.log(`server.js running on ${port}`)}))