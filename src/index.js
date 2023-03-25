const express = require('express');
const path = require('path');
const cors = require('cors');
const dotEnv = require('dotenv');

dotEnv.config();
const app = express();
const serverPort = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const router = require('./routes/router');
app.use(router);





app.listen(serverPort, (error) => {
    if (error) {
        console.log(`Erro ao iniciar servidor = ${err}`);
        return;
    };

    console.log(`Iniciado na porta ${serverPort}`);
});