const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require("./routes")
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', routes);


const mongoURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(mongoURL, { dbName: `${process.env.MONGO_DBNAME}` , useNewUrlParser: true , useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// ---- INIT Server ----
const port = 3000;
const host = '127.0.0.1';

const server = app.listen(port, host, () => {
  
  console.log(`\n-> NodeJS palvelin käynnissä osoitteessa http://${host}:${port}`);
});

