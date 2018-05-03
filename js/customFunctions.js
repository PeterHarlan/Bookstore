//This is a self-invoking function, it is invokded automatically wihtout call
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

function toggleHide(y) {
  var x = document.getElementById(y);
  if (x.style.display === 'none') {
    x.style.display = 'block';
  } else {
    x.style.display = 'none';
  }
}
function signUp()
{
  location.href = 'signUp.html';
}
function commandCenter()
{
  location.href = 'commandCenter.html';
}
function orderHistory()
{
  location.href = 'orderHistory.html';
}
function home()
{
  location.href = 'index.html';
}
function shipPayment()
{
  location.href = 'shipPayment.html';
}
function shipPayment()
{
  var subTotal = '/shipPayment:';
  subTotal += document.getElementById("totalPrice").innerHTML;
  console.log(subTotal); 
  location.href = subTotal;
}
function deleteISBN()
{
  var bookDeletePath = document.getElementById("ISBN").value;
  location.href = bookDeletePath;
}
// If the user is logged in, call this function
function logIn()
{
  var x = document.getElementById("navLogIn");
  var containsClass = x.classList.contains("was-validated");
  if(containsClass)
  {
    toggleHide('navNotLogIn');
    toggleHide('navIsLogIn');
    //Remove was validated class form navLogIn
  }

}
//Checks the user for admin status, then toggle commandCenter button
function isAdmin()
{
  //If adimn == true
     //toggleHide('commandCenter');
}
//Change button layout to display sign in buttons
function signOut()
{ 
  logIn();
  // isAdmin();
}
//Place the curser on the search box
//The parent div must contain "name = 'input_box_parent'"
//The child (input box) must contain "name = 'input_box_child;'"
function getFocus(x)
{
  document.getElementById(x).focus();
}

function getISBN()
{
  var innerISBN = document.getElementById('ISBN').innerHTML;
  var formISBN = document.getElementById('formISBN')
  formISBN.value = innerISBN;
  formISBN.classList.add("hidden");
  getFocus("input");
}

function changeTotal() {
    //Grabs all the input box fields, later used to extract the quantity of books
    var qtnValue = document.getElementsByClassName("qtnValue");
    //Grabs all element with the class bookPrice that holds the bookprice
    var price = document.getElementsByClassName("bookPrice");
    //Grabs all elements that currently holds the calculated prices
    var oldCalPrice = document.getElementsByClassName("calPrice");
    // Holds the total quantity inserted into the badge
    var totalQtn = Number(0);
    // Create a new array that will hold the calculated prices for each book 
    var calPrice = new Array();
    // Holds the total price of everything
    var totalPrice = Number(0);

    for (i = 0; i < qtnValue.length; i++) {
      // Calculates the total quantity 
      totalQtn += Number(qtnValue[i].value);
      // Calculates the price per book and stores it into the calPrice array
      calPrice.push(Number(qtnValue[i].value)*Number(price[i].value));
      // Update the totalPrice with the calPrice 
      totalPrice += calPrice[i];
      //Inser the newly calculated price the price field with fixed decimal points of two
      oldCalPrice[i].innerHTML = calPrice[i].toFixed(2);
    }

    document.getElementById("totalQtn").innerHTML = totalQtn;
    document.getElementById("totalPrice").innerHTML = totalPrice.toFixed(2);;
}
function calShipping() {
  x = document.getElementById("subtotal").value;
  document.getElementById("calTotal").innerHTML = "<strong>$"+(Number(x)+5).toFixed(2)+"</strong>";
}
function stShipping() {
  x = document.getElementById("subtotal").value;
  document.getElementById("calTotal").innerHTML = "<strong>$"+(Number(x)+5).toFixed(2)+"</strong>";
}
function exShipping() {
  x = document.getElementById("subtotal").value;
  document.getElementById("calTotal").innerHTML = "<strong>$"+(Number(x)+10).toFixed(2)+"</strong>";
}


