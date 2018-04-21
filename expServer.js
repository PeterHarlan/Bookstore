//require Node & express modules
const express = require('express'); // Express Server
const mysql = require('mysql'); // Allows connection to MySql
const path = require('path'); // For manipulating paths
const bodyParser = require('body-parser'); // For parsing response bodies from POST operations
const session = require('express-session'); // Manages session variables

//Create Mysql connection
const DB = mysql.createConnection({
    host: "den1.mssql6.gear.host",
    user: "cs351book",
    password: "Xy2r?axE_n7q",
    database: "cs351book"
});

//Connect to DB using Connection Object
DB.connect((error) => {
    if (error) {
        throw error;
    } else
        console.log('Sucessfully connected to the database'); //Print success
});

//Create Express object for server
//const app = express();
//app.use(express.static(__dirname));

//Use Pug to render our HTML pages
//app.set('view engine', 'pug');


const app = express();

app.get('/', (req, res) => { 
    res.send('Hello World!');
});

//app.listen(3000, () => console.log('Example app listening on port 3000!'))



//Body Parser for JSON-Encoded bodies
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({
//   extended: true
//}));

//Page for specific book
//app.get('/bookPage:isbn', function (req, res) {
//   console.log('hello');
//    bookIsbn = req.params.isbn.slice(1);
//    let sql = 'SELECT * FROM Book WHERE ISBN = "' + isbn + '"';
//    let query = db.query(sql, (err, results) => {
//        //if error or not found display results
//        if (err) throw err;
//        if (results[0] == undefined) {
//            res.sendFile(path.join(__dirname + '/static/pagenotfound.html'));
//        //else send bookdata to the page
//        } else {
//            res.render('bookPage', {
//                bookdata: results[0]
//               });
//        }
//    });
//});


// Direct to "Page Not Found" page for any other routing or for errors
//app.get('/*', (req, res) => {
//    res.sendFile(path.join(__dirname + '/static/pagenotfound.html'));
//});

// Start server listening
app.listen('3000', () => {
    console.log('Server started on port 3000');
});
