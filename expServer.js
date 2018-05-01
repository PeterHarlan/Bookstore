//require Node & express modules
const express = require('express'); // Express Server
const mysql = require('mysql'); // Allows connection to MySql
const path = require('path'); // For manipulating paths
const bodyParser = require('body-parser'); // For parsing response bodies from POST operations
const session = require('express-session'); // Manages session variables

//Create Mysql connection
const DB = mysql.createConnection({
    host: "den1.mysql3.gear.host",
    user: "cs351book",
    password: "Zr7Mx47~Kl?b",
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

// Stores sessions
app.use(
    session({
        secret: "kahebnt8xcnwtkd7bnzoei2907vhsb23k50",
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: false
        }
    })
);

//Log out operation
app.get('/logout', function (req, res) {
    req.session.destroy(); // destroy all session variables
    res.sendFile(path.join(__dirname + '/'));
});


// Login action for customers (POST, so there's no web page)
app.post("/login", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    console.log(req.body);

    let sql = 'SELECT * FROM users WHERE login=' + mysql.escape(username) + ' AND password="' + password + '"';

    let query = DB.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            res.send("Login failed");
        } else if (Object.keys(results).length === 0)
            res.send("No user/password found.");
        else {
            req.session.user = results[0]["usID"];
            req.session.firstname = results[0]["fname"];
            req.session.lastname = results[0]["lname"];
            req.session.email = results[0]["email"];
            req.session.authority = results[0]["manager"]

            

            res.redirect("/");
        }
    });
});


//Page for specific book
app.get('/bookPage:isbn', function (req, res) {
    if (!req.session.user){
        res.render('thanks', {
        message: "You are currently not logged in, please log in or sign up at the top of the page to continue"
    });
    } else {
        bookIsbn = req.params.isbn.slice(1);
        let sql = 'SELECT * FROM books WHERE ISBN = ' + bookIsbn + ';';
        let query = DB.query(sql, (err, results) => {
            //if error or not found display results
            if (err) throw err;
            if (results[0] == undefined) {
                res.sendFile(path.join(__dirname + '/error404.html'));
            //else send book info to the page
            } else {
                res.render('bookPage', {
                    bookInfo: results[0],
                    user: req.session.user
                });
            }
        });
    }
});




//Shopping cart page
app.get('/shoppingCart:usID', function (req, res) {
    if (!req.session.user){
        res.render('thanks', {
        message: "You are currently not logged in, please log in or sign up at the top of the page to continue"
    });
    } else {
        userID = req.session.user;
        let sql = 'SELECT oID FROM orders WHERE buyer='+userID+' AND active=true';
        let query = DB.query(sql, (err, results) => {
            //if error or not found display results
            if (err) throw err;
            if (results[0] == undefined) {
                res.render('thanks', {
                    message: "Sorry, your shopping cart is empty"
                });
            //else send book info to the page
            } else {
                let bookSQL = 'SELECT isbn, orderQty, title, price FROM orderList, books ' +
                    'WHERE bookID=isbn AND orderID='+ results[0]["oID"]+';';

                let bookQuery = DB.query(bookSQL, (err, bookResults) => {
                    //if error or not found display results
                    if (err) throw err;

                    var i = 0;
                    var subTotal = 0;
                    while(bookResults[i] != undefined){
                        var bookTotal = Number(bookResults[i].price) * Number(bookResults[i++].orderQty);
                        subTotal = Number(subTotal) + Number(bookTotal);
                    }

                    res.render('shoppingCart', {
                        bookInfo: bookResults,
                        user: req.session.user,
                        subTotal: subTotal
                    });
                });
            }
        });
     }
});


//Page for specific book
app.get('/shipPayment:subTotal', function (req, res) {
    if (!req.session.user){
        res.render('thanks', {
        message: "You are currently not logged in, please log in or sign up at the top of the page to continue"
    });
    } else {
        let sql = 'SELECT * FROM addresses, residence ' +
            'WHERE aID=addID AND userID=' + req.session.user;
        let query = DB.query(sql, (err, results) => {
            //if error or not found display results
            if (err) throw err;
            if (results[0] == undefined) {
                res.sendFile(path.join(__dirname + '/error404.html'));
            //else send book info to the page
            } else {
                res.render('shipPayment', {
                    addresses: results,
                    subtotal: req.params.subTotal.slice(1)
                });
            }
        });
    }
});

//Search result page
app.post('/searchRes', function (req, res) {
    if (!req.session.user)
    res.render('thanks', {
        message: "You are currently not logged in, please log in or sign up at the top of the page to continue"
    });
    else {
        phrase = req.body.searchInput;
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
    }
});


//check Admin
app.get("/adminCheck:usID", function (req, res) {
    if (!req.session.authority || req.session.authority != 1)
        res.render('thanks', {
            message: "This function is for managers only.  Please log in with your manager account to continue"
        });
    else {
        res.render('commandCenter');
    }
});

//Search result page
app.get('/checkStock:usID', function (req, res) {
    if (!req.session.authority || req.session.authority != 1)
        res.render('thanks', {
            message: "This function is for managers only.  Please log in with your manager account to continue"
        });
    else {
        phrase = req.body.searchInput;
        let sql = 'SELECT * FROM books ' +
        'WHERE qty<reorder';

        let query = DB.query(sql, (err, results) => {
            //if error or not found display results
            if (err) throw err;
            if (results[0] == undefined) {
                res.sendFile(path.join(__dirname + '/error404.html'));
            //else send book info to the page
            } else {
                res.render('checkStock', {
                    books: results
                });
            }
        });
    }
});

//Insert book function
app.post("/insert", function (req, res) {
    if (!req.session.authority || req.session.authority != 1)
        res.render('thanks', {
            message: "This function is for managers only.  Please log in with your manager account to continue"
        });
    else {
        //Grab book information from post object

        console.log(req.body);
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
            'VALUES("' + isbn + '","' + title + '","' + author + '",' + qty + ',"' + pub + '",' + ed + ',' + price + ',' + reorder + ',"' + img + '","' + descript + '")';

        //Submit query to database
        let query = DB.query(sql, (err, results) => {
            //if error display results
            if (err) throw err;

            //send completion statement to thank you page.
            var statement = 'The book "' + title + '" has been added to the store';
            res.render('thanks', { message: statement });
        });
    }
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
app.post("/buy", function (req, res) {
    qty = req.body.qty;
    user = req.session.user;
    isbn = req.body.isbn;

    //Select current user's active order
    let orderQuery = 'SELECT oID FROM orders ' +
        'WHERE buyer=' + user + ' AND active=true';

    // if not active orders, create new and select ID
    let selectOrder = DB.query(orderQuery, (err, results) => {
        if (err) throw err;
        if (results[0] == undefined) {

            let createQuery = 'INSERT INTO orders (buyer,active)' +
            'VALUES('+user+',true)';
            
            let createOrder = DB.query(createQuery, (err, results) => {
                if (err) throw err;

                let selectLast = DB.query('SELECT LAST_INSERT_ID()', (err,results) => {
                    if (err) throw err;
                    console.log(results[0]["LAST_INSERT_ID()"]);
                    currentOrder = results[0]["LAST_INSERT_ID()"];

                });
            });
        //Otherwise, assign current order to active order
        } else { currentOrder = results[0]["oID"]; }

        console.log(currentOrder);
        //Add book to order
        let orderListQuery = 'INSERT INTO orderList(orderID, bookID, orderQty) ' +
            'VALUES('+currentOrder+',"'+isbn+'",'+qty+')';   

        let addBookOrder = DB.query(orderListQuery, (err, results) => {
            if (err) throw err;
        });

        //send completion statement to thank you page.
        var statement = req.session.firstname + ", the book has been placed in your shopping cart";
        res.render('thanks', { message: statement });

    });
});

//Buy the book with passed isbn
app.post("/checkoutFinal", function (req, res) {
    if (!req.session.user)
        res.render('thanks', {
            message: "You are currently not logged in, please log in or sign up at the top of the page to continue"
        });
    else {
        shipID = req.body.shipRadio;
        billID = req.body.billRadio;
        shipType = req.body.shipType;
        ccNum = req.body.ccNum;
        exp = req.body.exp;
        cvv = req.body.cvv;

        //Select current user's active order
        let orderQuery = 'SELECT oID FROM orders ' +
            'WHERE buyer=' + req.session.user + ' AND active=true';

        // if not active orders, create new and select ID
        let selectOrder = DB.query(orderQuery, (err, orderResults) => {
            if (err) throw err;
            if (orderResults[0] == undefined) {
                res.sendFile(path.join(__dirname + '/error404.html'));

                //Otherwise, assign current order to active order
            } else { currentOrder = orderResults[0]["oID"]; }
            console.log(currentOrder);


            let paymentQuery = "INSERT INTO payments(ccNum,custID,cvv,expir,addressID) " +
                "VALUES(" + ccNum + "," + req.session.user + "," + cvv + "," + exp + "," + billID + ")";
            console.log(paymentQuery);
            let paymentInsert = DB.query(paymentQuery, (err, paymentRes) => {
                if (err) throw err;

                    //Add book to order
                    let orderQuery = 'UPDATE orders SET address=' + shipID + ', buyer=' + req.session.user + ', payment=' + ccNum + ', active=false' +
                        ' WHERE oID=' + currentOrder;
                    console.log(orderQuery);
                    let updateOrder = DB.query(orderQuery, (err, updateResults) => {
                        if (err) throw err;
                    });

            });
        });

        //send completion statement to thank you page.
        var statement = req.session.firstname + ", your order has been placed";
        res.render('thanks', { message: statement });
    }
});

// Start server listening
app.listen('3000', () => {
    console.log('Server started on port 3000');
});
