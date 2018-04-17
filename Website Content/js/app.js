//require Node & express modules
const express = require('express'); // Express Server
const mysql = require('mysql'); // Allows connection to MySql
const path = require('path'); // For manipulating paths
const bodyParser = require('body-parser'); // For parsing response bodies from POST operations
const session = require('express-session'); // Manages session variables

//Create Mysql connection
const DB = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "IIgU86ZjAlyeJekr",
    database: "bookstore"
});

//Connect to DB using Connection Object
DB.connect((error) => {
    if (error) {
        throw error;
    } else
        console.log('Sucessfully connected to the database'); //Print success
});

//Create Express object for server
const app = express();
app.use(express.static(__dirname));

// Use Pug to render our HTML pages
app.set('view engine', 'pug');

// Body Parser for JSON-Encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
