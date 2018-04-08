CREATE TABLE users (

	usID int IDENTITY(1,1) PRIMARY KEY,

	fname varchar(20) NOT NULL,

	lname varchar(20) NOT NULL,
	
	login varchar(20) NOT NULL,

	password varchar(20) NOT NULL,

	email varchar(75) NOT NULL,

	manager boolean NOT NULL

);




CREATE TABLE residence (

	userID int NOT NULL,

	addID int NOT NULL,

	PRIMARY KEY  (userID, addID)

);



CREATE TABLE addresses (

	aID int IDENTITY(1,1) PRIMARY KEY,

	street1 varchar(75) NOT NULL,

	street2 varchar(75),

	city varchar(40) NOT NULL,

	st char(2) NOT NULL,
	
	zip int(5) NOT NULL,
	
	attn varchar(35)

);





CREATE TABLE payments (

	ccNum int(16) NOT NULL,

	custID int NOT NULL,

	cvv int NOT NULL,

	expir int(4) NOT NULL,

	addressID int NOT NULL,

	PRIMARY KEY  (ccNum)

);



CREATE TABLE orders (

	oID int IDENTITY(1,1) PRIMARY KEY,

	address int NOT NULL,

	expedited boolean NOT NULL,

	payment int NOT NULL
	
);

CREATE TABLE buyers (

	orderNum int NOT NULL,

	buyer int NOT NULL,

	PRIMARY KEY  (orderNum, buyer)

);


CREATE TABLE books (

	isbn int NOT NULL,

	title varchar(100) NOT NULL,

	author varchar(50) NOT NULL,

	qty int NOT NULL,

	publisher varchar(45) NOT NULL,

	ed int NOT NULL,

	price decimal(13,2) NOT NULL,

	reorder int NOT NULL,
	
	img text(500) NOT NULL,

	PRIMARY KEY  (isbn)

);


CREATE TABLE orderList (

	orderID int NOT NULL,

	bookID int NOT NULL,

	PRIMARY KEY  (orderID, bookID)

);


CREATE TABLE phoneNums (

	userNum int NOT NULL,

	phone int(10) NOT NULL,

	PRIMARY KEY  (userNum, phone)

);



Alter table residence add FOREIGN KEY(userID) REFERENCES users(usID);
	
Alter table residence add FOREIGN KEY(addID) REFERENCES addresses(aID);

Alter table payments add FOREIGN KEY(custID) REFERENCES users(usID);
	
Alter table payments add FOREIGN KEY(addressID) REFERENCES addresses(aID);

Alter table orders add FOREIGN KEY(address) REFERENCES addresses(aID);
	
Alter table orders add FOREIGN KEY(payment) REFERENCES payments(ccNum);

Alter table buyers add FOREIGN KEY(orderNum) REFERENCES orders(oID);
	
Alter table buyers add FOREIGN KEY(buyer) REFERENCES users(usID);

Alter table orderList add FOREIGN KEY(orderID) REFERENCES orders(oID);
	
Alter table orderList add FOREIGN KEY(bookID) REFERENCES books(isbn);

Alter table phoneNums add FOREIGN KEY(userNum) REFERENCES users(usID);





