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
// If the user is logged in, call this function
function logIn()
{
  toggleHide('navNotLogIn');
  toggleHide('navIsLogIn');
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
  isAdmin();
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

