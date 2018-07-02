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
    $('#setUpModal').modal('show');
  }
  else {
    setInterval(payday, 10000);
  }
});

let data;

let name;

let balance = 0;
let balanceOutput = document.getElementById("balanceOutput");
let salary = 0;
let salaryOutput = document.getElementById("salaryOutput");

let interestType = "";

let nameInput = document.getElementById("nameId");

let ref = firebase.database().ref(firebase.auth().uid);
ref.on("value", snap => {
  data = snap.val();
  balance = parseInt(data.balance);
  salary = parseInt(data.salary);
  name = data.name;
});


function payday()
{
  let interest = 5;
  if(interestType === "Money Market Deposit")
    interest = balance/100000;
   balance += salary;
  balance *= 1 + interest/100.0;
}

function start()
{
  
  $('#setUpModal').modal('hide');
  setInterval(payday, 10000);
    salary = Math.floor(Math.random()*90000)+10000;
    ref.child("salary").set(salary);
    salaryOutput.innerHTML = salary;
    name =  nameInput.value;
    ref.child("name").set(name);
  let t = "";
    if(document.getElementById("interest").checked)
      t="Time deposit";
  else
    t="Money Market Deposit";
  interestType = t;
      ref.child("interestType").set(t);
  document.getElementById().innerHTML = t;
}


