function isLoggedInModifyHomeDrop()
{
	var x = document.getElementById('SignOut');
	var y = document.getElementById('CreatePage');
	var z = document.getElementById('SignUp');
	var a = document.getElementById('LogIn');
	var b = document.getElementById('Email');
	var c = document.getElementById('Password');
	var d = document.getElementById('btnHolderName');
	
	display(x);
	display(y);
	hide(z);
	hide(a);
	hide(b);
	hide(c);
	d.innerText = glob_firstname + " ";
}

function isLoggedOutModifyHomeDrop()
{
	var x = document.getElementById('SignOut');
	var y = document.getElementById('CreatePage');
	var z = document.getElementById('SignUp');
	var a = document.getElementById('LogIn');
	var b = document.getElementById('Email');
	var c = document.getElementById('Password');
	var d = document.getElementById('btnHolderName');
	
	hide(x);
	hide(y);
	display(z);
	display(a);
	display(b);
	display(c);
	//Adds user icon on log in button
	d.innerHTML = '<i class = "fa fa-user" aria-hidden="true"></i>  ';
	// d.innerText = "Account ";
}

//logout function
function logOut()
{
	//Destroy Session Variables
	destroySession();
	isLoggedOutModifyHomeDrop();
}

//The onload functions
//@Override login.js
function loadFunctions()
{
	if(isLoggedIn()){
		isLoggedInModifyHomeDrop();
	}else{
		isLoggedOutModifyHomeDrop();
	}
	
	//Load Data for page
	populatePage();
}

function populatePage()
{
	var lblTotalUser = document.getElementById('totalUserCounter');
	var lblTopPage = document.getElementById('lblTopPage');
	var lblLastUpdate = document.getElementById('lblLastUpdate');
	var lblPageViewCount = document.getElementById('lblPageViewCount');
	
	//Ajax call to run php file that gets number of users in db
	var xhttp = new XMLHttpRequest();
	xhttp.open('POST', 'http://104.145.83.147/PHP/getUserCount.php', true);
	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			response = this.responseText;
			lblTotalUser.innerText = response;
		}
	};
	xhttp.send(null);
	
	//Fill in Last Updated field - which is now
	var date =  new Date().toLocaleString();
	lblLastUpdate.innerText = "Last Updated : " + date;
}
