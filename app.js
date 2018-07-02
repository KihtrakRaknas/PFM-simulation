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
    $('#setUpModal').modal('show');
  }
  else {
      console.log(firebase.auth().currentUser.uid);
    ref = firebase.database().ref(firebase.auth().currentUser.uid);
    ref.on("value", snap => {
        console.log(snap.val());
        data = snap.val();
        balance = parseInt(data.balance);
        salary = parseInt(data.salary);
        name = data.name;
        init();
    });
  }
});

let data;

let name;
let ref;
let balance = 0;
let balanceOutput = document.getElementById("balanceOutput");
let salary = 0;
let salaryOutput = document.getElementById("salaryOutput");

let interestType = "";

let nameInput = document.getElementById("nameId");
let t = "";



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
    salary = Math.floor(Math.random()*90000)+10000;
    salaryOutput.innerHTML = salary;
    name =  nameInput.value;
    if(document.getElementById("interest").checked)
        t="Time deposit";
    else
        t="Money Market Deposit";
    interestType = t;
    firebase.auth().signInAnonymously();
}

function init()
{
  
    setInterval(payday, 10000);
    ref.child("salary").set(salary);
    ref.child("name").set(name);
    ref.child("interestType").set(t);
}


