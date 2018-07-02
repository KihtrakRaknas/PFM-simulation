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
      
      
    ref = firebase.database().ref(firebase.auth().currentUser.uid);

      if(signed) {
          ref.child('balance').set(balance);
  ref.child("salary").set(salary);
    ref.child("name").set(name);
    ref.child("interestType").set(t);
      }
      
    
      ref.once("value", snap => {
          ref.on("value", snap => {
        data = snap.val();
        balance = parseInt(data.balance);
        salary = parseInt(data.salary);
        name = data.name;
    });
          init();
      })
      
  }
});

let data;

let name;
let ref;
let signed = false;
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
    console.log(interest);
    let s = 0;
    if(salary < 37950)
        s = salary*.85;
    else if(salary < 91900)
        s = salary*.75;
    else
        s = salary*.72;
    let earned = balance*interest/100.0;
    
   balance += s;
  balance *= 1 + interest/100.0;
    balance = Math.floor(balance*100)/100;
    earned = Math.floor(earned*100)/100;
    balanceOutput.innerHTML = balance;
    salaryOutput.innerHTML = salary;
    ref.child('balance').set(balance);
    document.getElementById('tbody').innerHTML = '<tr><td>You earned '+s+' dollars from your salary</td></tr>' + document.getElementById('tbody').innerHTML;
    document.getElementById('tbody').innerHTML = '<tr><td>Your balance increased by '+earned+' due to interest</td></tr>' + document.getElementById('tbody').innerHTML;

}

function start()
{
    $('#setUpModal').modal('hide');
    salary = Math.floor(Math.random()*90000)+10000;
    salaryOutput.innerHTML = salary;
    name =  nameInput.value;
    if(document.getElementById("interest").checked)
        t="Money Market Deposit";
    else
        t="Time deposit";
    interestType = t;
    firebase.auth().signInAnonymously();
    signed = true;
}

function init()
{
    setInterval(payday, 5000);
    
}


