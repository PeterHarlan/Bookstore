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


//Insert book function
app.post("/insert", function (req, res) {

    //Grab book information from post object
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

    //Create query string
    let sql = 'INSERT INTO books (isbn, title, author, qty, pub, ed, price, reorder, img, descript)' +
        'VALUES("'+isbn+'","'+title+'","'+author+'",'+qty+',"'+pub+'",'+ed+','+price+','+reorder+',"'+img+'","'+descript+'")';

    //Submit query to database
    let query = DB.query(sql, (err, results) => {
        //if error display results
        if (err) throw err;

        //send completion statement to thank you page.
        var statement = 'The book "' + title + '" has been added to the store';
        res.render('thanks', { message: statement });
    });

});


//Insert book function
app.post("/newUser", function (req, res) {

    //Grab book information from post object
    fname = req.body.fname;
    lname = req.body.lname;
    email = req.body.email;
    password = req.body.password;

    street1 = req.body.street1;
    street2 = req.body.street2;
    city = req.body.city;
    state = req.body.state;
    zip = req.body.zip;

    phone = req.body.phone; 

    //Create query string for user table
    let userSQL = 'INSERT INTO users (fname,lname,login,password,email,manager)' +
        'VALUES("'+fname+'","'+lname+'","'+email+'","'+password+'","'+email+'", false)';

    //Submit insert user query to database
    let userInsert = DB.query(userSQL, (err, userResults) => {
        //if error display results
        if (err) throw err;
        else{
            //Create insert address statement
            let addressSQL = 'INSERT INTO addresses (aFname, aLname, street1, street2, city, st, zip)' +
            'VALUES("'+fname+'","'+lname+'","'+street1+'","'+street2+'","'+city+'","'+state+'",'+zip+')';

            //submit insert address query to database
            let addressInsert = DB.query(addressSQL, (err, addressResults) => {
                if (err) throw err;
                else {
                    //Find user ID and address ID to associate residence
                    let findUS = "SELECT usID FROM users WHERE email="+mysql.escape(email)+" AND password="+mysql.escape(password)+";"
                    let userIDquery = DB.query(findUS, (err, userID) => {
                        if (err) throw err;
                        else {

                            let findAdd = 'SELECT aID FROM addresses WHERE street1="'+street1+'" AND zip='+zip;
                            let addressIDquery = DB.query(findAdd, (err, addressID) => {
                                //if error display results
                                if (err) throw err;
                                else {
                                    console.log(userID[0].usID);
                                    //create residence insert
                                    let residenceSQL = 'INSERT INTO residence (userID, addID)' +
                                    'VALUES('+userID[0].usID+','+addressID[0].aID+')';
                                
                                    //submit insert residence query to database
                                    let residenceInsert = DB.query(residenceSQL, (err, residenceResults) => {
                                        if (err) throw err;
                                    });


                                    let phoneSQL = 'INSERT INTO phoneNums (userNum, phone)' +
                                    'VALUES('+userID[0].usID+',"'+phone+'")';
                                
                                    //submit insert phone query to database
                                    let phoneInsert = DB.query(phoneSQL, (err, phoneResults) => {
                                        if (err) throw err;
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });


    //send completion statement to thank you page.
    var statement = 'The user "' + fname + " " + lname + '" has been added to the store';
    res.render('thanks', { message: statement });

});

//Buy the book with passed isbn
app.get("/buy:isbn", function (req, res) {
    phrase = req.params.query.slice(1);
});

// Start server listening
app.listen('3000', () => {
    console.log('Server started on port 3000');
});
