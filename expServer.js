//require Node & express modules
const express = require('express'); // Express Server
const mysql = require('mysql'); // Allows connection to MySql
const path = require('path'); // For manipulating paths
const bodyParser = require('body-parser'); // For parsing response bodies from POST operations
const session = require('express-session'); // Manages session variables

//Create Mysql connection
const DB = mysql.createConnection({
    host: "den1.mysql5.gear.host",
    user: "cs351book",
    password: "Od70v439_NR!",
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
const app = express();
app.use(express.static(__dirname));

//Use Pug to render our HTML pages
app.set('view engine', 'pug');

//Body Parser for JSON-Encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

app.get('/book', function (req, res) {
    res.sendFile(path.join(__dirname + '/links.html'));
});

//Page for specific book
app.get('/bookPage:isbn', function (req, res) {
    bookIsbn = req.params.isbn.slice(1);
    let sql = 'SELECT * FROM books WHERE ISBN = ' + bookIsbn + ';';
    let query = DB.query(sql, (err, results) => {
        //if error or not found display results
        if (err) throw err;
        if (results[0] == undefined) {
            res.sendFile(path.join(__dirname + '/error404.html'));
        //else send book info to the page
        } else 
{            res.render('bookPage', 
{                bookInfo: results[0]
            });
        }
    });
});

//Search result page
app.get('/searchRes:query', function (req, res) {
    phrase = req.params.query.slice(1);
    let sql = 'SELECT * FROM books ' +
    'WHERE author LIKE "%' + phrase + '%" OR ' +
    'title LIKE "%' + phrase + '%" OR ' +
    'isbn LIKE "%' + phrase + '%" OR ' +
    'pub LIKE "%' + phrase + '%"';

    let query = DB.query(sql, (err, results) => {
        //if error or not found display results
        if (err) throw err;
        if (results[0] == undefined) {
            res.sendFile(path.join(__dirname + '/error404.html'));
        //else send book info to the page
        } else {
            res.render('searchRes', {
                books: results
            });
        }
    });
});

app.post("/insert", function (req, res) {

    title = req.body.title;
    author = req.body.author;
    img = req.body.imLink;
    isbn = req.body.isbn;
    pub = req.body.pub;
    ed = req.body.ed;
    qty = req.body.qty;
    reorder = req.body.qtyMin;
    price = req.body.bPrice;
    descript = req.body.descript; 

    console.log(title + " " + author + " " + img + " " + isbn + " " + pub + " " + ed + " " + qty + " " + reorder + " " + price + " " + descript);
    //Try "INSERT INTO books (isbn, title) VALUES ('12345', '7 habbits')
    let sql = 'INSERT INTO books (isbn, title, author, qty, pub, ed, price, reorder, img, descript)' +
        'VALUES("'+isbn+'","'+title+'","'+author+'",'+qty+',"'+pub+'",'+ed+','+price+','+reorder+',"'+img+'","'+descript+'")';

    let query = DB.query(sql, (err, results) => {
        //if error or not found display results
        if (err) throw err;
        var statement = 'The book "' + title + '" has been added to the store';
        res.render('thanks', { statement });
    });

});

// app.post("/insert", function (req, res) {
//     var username = req.body.username;
//     var password = req.body.password;


//     console.log("insertHello");
//     let sql = "SELECT * FROM Manager WHERE UserName = '" + username + "' AND UserPassword = '" + password + "';"
//     let query = db.query(sql, (err, results) => {
//         if (err) {
//             console.log(err);
//             res.send("Login failed");
//         } else if (Object.keys(results).length === 0)
//             res.send("No user/password found.");
//         else {
//             req.session.managerusername = results[0]["Username"];
//             req.session.managerfirstname = results[0]["FirstName"];
//             req.session.managerlastname = results[0]["LastName"];
//             req.session.save(); //save session variables

//             //Then render the check stock page once logged in
//             res.redirect("/checkstock");
//         }
//     });
// });

//Buy the book with passed isbn
app.get("/buy:isbn", function (req, res) {
    phrase = req.params.query.slice(1);
});

// Start server listening
app.listen('3000', () => {
    console.log('Server started on port 3000');
});
