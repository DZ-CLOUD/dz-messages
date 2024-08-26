const express = require('express');
const i18n = require('i18n');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const ejs = require('ejs');
const { resCode } = require('./functions/response');
const apiV1 = require('./routers/ApiV1');
const { protected, protectedAPI } = require('./middleware/verifyToken');

const app = express();

express.static("./public");
app.use(bodyParser.json());
app.use(cookieParser())
app.set("view-engine", "ejs");
app.disable("x-powered-by");

// Verbindungsaufbau zur Datenbank
const dbUrl = "mongodb://localhost:27017/dz-messages"
mongoose.connect(dbUrl);

// Überprüfe die Verbindungsstatus
const db = mongoose.connection;
db.on('error', () => {
  throw new Error("Failed to connect to MongoDB:\n Problems can be IP-Adress is invalid");
});
db.once('open', () => {
  console.log('Verbindung zur MongoDB hergestellt!');
});

//Main
app.get("/", (req, res) => {
  try {
    resCode(res, 200, "Success")
  } catch (error) {
    console.error(error);

  }
});

app.use("/api/v1", protectedAPI, apiV1);

app.listen(3000, () => {
  console.log("Server started!");

})

