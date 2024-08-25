const express = require('express');
const i18m = require('i18n');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const ejs = require('ejs');
const { resCode } = require('./functions/response');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser())
app.set("view-engine", "ejs");

app.get("/", (req, res) => {
    try {
        resCode(res, 200, "Success")
    } catch (error) {
        console.error(error);
        
    }
})

app.listen(3000, () => {
    console.log("Server started!");
    
})

