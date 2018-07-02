let config = {
  apiKey: "AIzaSyCAlMrDCczQWmFYgZn0b6JIDSIwCUOANZc",
  authDomain: "pfm-simulation.firebaseapp.com",
  databaseURL: "https://pfm-simulation.firebaseio.com",
  projectId: "pfm-simulation",
  storageBucket: "pfm-simulation.appspot.com",
  messagingSenderId: "562600285763"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    firebase.auth().signInAnonymously();
    $(window).on('load',function(){
    $('#setUpModal').modal('show');
});
  }
});

let data;

let name;

let balance = 0;
let balanceOutput = document.getElementById("balanceOutput");
let salary = parseInt(data.salary);
let salaryOutput = document.getElementById("salaryOutput");

let nameInput = document.getElementById("nameId");
let 

let ref = firebase.database().ref(firebase.auth().uid);
ref.on("value", snap => {
  data = snap.val();
  balance = data.balance;
  salary = data.salary;
  name = data.name;
});

if(!salary)
{
    salary = Math.floor(Math.random()*90000)+10000;
    ref.child("salary").set(salary);
    salaryOutput.innerHTML = salary;
}

if(!name)
{
    name =  "Rishav";
    ref.child("name").set(name);
}

function payday()
{
   balance += salary
}

function start()
{
  
  $('#setUpModal').modal('hide');
  setInterval(payday(), 10000);
  
}


