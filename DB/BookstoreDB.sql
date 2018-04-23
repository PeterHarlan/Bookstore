CREATE TABLE users (

	usID int NOT NULL AUTO_INCREMENT,
	fname varchar(20) NOT NULL,
	lname varchar(20) NOT NULL,
	login varchar(20) NOT NULL,
	password varchar(20) NOT NULL,
	email varchar(75) NOT NULL,
	manager boolean NOT NULL,
    
    PRIMARY KEY (usID)

);




CREATE TABLE residence (
    
	userID int NOT NULL,
	addID int NOT NULL,
    
	PRIMARY KEY  (userID, addID)
);



CREATE TABLE addresses (
    
	aID int NOT NULL AUTO_INCREMENT,
	aFname varchar(20) NOT NULL,
	aLname varchar(25) NOT NULL,
	street1 varchar(75) NOT NULL,
	street2 varchar(75),
	city varchar(40) NOT NULL,
	st char(2) NOT NULL,
	zip int(5) NOT NULL,
	attn varchar(35),
    
    PRIMARY KEY (aID)

);


CREATE TABLE payments (

	ccNum char(16) NOT NULL,
	custID int NOT NULL,
	cvv varchar(4) NOT NULL,
	expir char(4) NOT NULL,
	addressID int NOT NULL,

	PRIMARY KEY  (ccNum)

);



CREATE TABLE orders (

	oID int NOT NULL AUTO_INCREMENT,
	buyer int NOT NULL,
	address int NOT NULL,
	expedited boolean NOT NULL,
	payment char(16) NOT NULL,
    
	PRIMARY KEY (oID)
);


CREATE TABLE books (

	isbn varchar(13) NOT NULL,
	title varchar(100) NOT NULL,
	author varchar(50) NOT NULL,
	qty int NOT NULL,
	pub varchar(45) NOT NULL,
	ed int NOT NULL,
	price decimal(13,2) NOT NULL,
	reorder int NOT NULL,
	img text(500) NOT NULL,
	descript text(10000) NOT NULL,
    
	PRIMARY KEY  (isbn)

);


CREATE TABLE orderList (

	orderID int NOT NULL,
	bookID varchar(13) NOT NULL,
	PRIMARY KEY  (orderID, bookID)

);


CREATE TABLE shipments (

	shipID int NOT NULL AUTO_INCREMENT,
	shipAddID int NOT NULL,
	orderNum int NOT NULL,
	
	PRIMARY KEY (shipID)

);


CREATE TABLE phoneNums (

	userNum int NOT NULL,
	phone char(10) NOT NULL,
    
	PRIMARY KEY  (userNum, phone)

);



Alter table residence add FOREIGN KEY(userID) REFERENCES users(usID);
Alter table residence add FOREIGN KEY(addID) REFERENCES addresses(aID);
Alter table payments add FOREIGN KEY(custID) REFERENCES users(usID);
Alter table payments add FOREIGN KEY(addressID) REFERENCES addresses(aID);
Alter table orders add FOREIGN KEY(address) REFERENCES addresses(aID);
Alter table orders add FOREIGN KEY(payment) REFERENCES payments(ccNum);
ALTER TABLE orders add FOREIGN KEY(buyer) REFERENCES users(usID);
Alter table orderList add FOREIGN KEY(orderID) REFERENCES orders(oID);
Alter table orderList add FOREIGN KEY(bookID) REFERENCES books(isbn);
Alter table phoneNums add FOREIGN KEY(userNum) REFERENCES users(usID);


INSERT INTO books VALUES("9780345816023", "12 Rules for Life: An Antidote to Chaos", "Melinda Leigh", 1, "Random House Canada", 7, 13.99, 5, "https://images.isbndb.com/covers/60/23/9780345816023.jpg", "Jordan Peterson is a beacon of light in this chaotic world, a psychologist whose writing combines science and common sense. One of his talents is his ability to articulate complex ideas to a wide audience. Regardless of whether you have a background in psychology or not, you will understand this book. It covers his twelve rules for life, which are intended not only as a guide for life of the individual, but as a remedy for society’s present ills. Peterson believes that the cure for society starts with curing the individual, the smallest unit of society. Peterson’s well-known advice to clean your room is a reflection of the truth that if you can’t even manage the most basic and mundane responsibilities of life, then you have no business dictating to others how to fix society.  One of the main themes of this book is: Personal change is possible. There's no doubt you can be slightly better today than you were yesterday. Because of Pareto's Principle (small changes can have disproportionately large results), this movement towards the good increases massively, and this upward trajectory can take your life out of hell more rapidly than you could believe. Life is tragic and full of suffering and malevolence. But there's something you can start putting right, and we can't imagine what good things are in store for us if we just fix the things that are within our power to do so.");
INSERT INTO books VALUES("9780321652898", "Campbell Essential Biology", "Eric J. Simon", 4, "Benjamin/Cummings Pub Co.", 6, 6.99, 3, "https://images.isbndb.com/covers/28/98/9780321652898.jpg", "As you might guess, I bought this for a college biology course. I think it is one of the better science textbooks I have come across so far; everything is explained in easy to understand language, there are tons of illustrations and diagrams, and the text even repeats some of the more complex information more than once in a chapter (in case you didn't understand it the first time). It is well organized. Rarely do I read the supplemental fun fact type stories in textbooks but the ones in here are very interesting and actually add to the rest of the material.");
INSERT INTO books VALUES("9781457309281", "The Official SAT Study Guide, 2018", "The College Board", 1, "College Board", 5, 18.99, 2, "https://images.isbndb.com/covers/92/81/9781457309281.jpg", "The Official SAT Study Guide, 2018 Edition (currently $16) is the most essential preparation book for the new, revised SAT and PSAT, which began in March 2016 and October 2015, respectively, because it’s the only physical source of official revised SATs—the practice SATs in other third-party books are nothing more than subpar imitations of the real thing. However, the PDFs of all 8 tests in this book, along with moderately helpful answer explanations, can also be downloaded from the College Board / Khan Academy websites for free (googl: SAT Practice Tests - The College Board).");
INSERT INTO books VALUES("9780874479829", "Getting Financial Aid 2013", "The College Board", 7, "College Board", 8, 8.99, 4, "https://images.isbndb.com/covers/98/29/9780874479829.jpg", "A must-have book in todayâs economy, Getting Financial Aid 2013 is for parents and students challenged by the cost of college. The all-important FAFSA form is explained with step-by-step instructions, and the College Boardâs CSS/Financial Aid PROFILEÂ® form is explained by the people who administer it. The guide includes information and advice from experts on how to apply for aid, plus easy-to-compare college profiles giving the 'financial aid picture' for over 3,000 four-year and two-year colleges and technical schools. The guide also shows award amounts and scholarship requirements - no other directory has this level of detail. Completely revised to reflect current federal laws and college policies!");

INSERT INTO users(fname,lname,login,password,email,manager) VALUES("John", "Smith", "jsmith", "wordpass", "jsmith@nowhere.com", true);

INSERT INTO addresses(aFname,aLname,street1,street2,city,st,zip,attn) VALUES("John", "Smith", "320 Moneymaker Ln.", "Apt 2", "Cacheflow", "MT", "87664", "Clarice");

INSERT INTO payments VALUES("1234567898745612", 1, "168", "0410", 1);

