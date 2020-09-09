require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
//const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Habilitar carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

//Configuración global de rutas
app.use(require('./routes/index'));

mongoose.connect(process.env.urlDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false },
    (err, res) => {
        if (err) throw err;
        console.log('Base de datos online');

    });

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})