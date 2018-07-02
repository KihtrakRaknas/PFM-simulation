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
  }
});

let data;
let ref = firebase.database().ref(firebase.auth().uid);
ref.on("value", snap => {
  data = snap.val();
});

let balance = 0;
let balanceOutput = document.getElementById("balanceOutput");
let salary = parseInt(data.salary);
if(!salary)
{
    salary = Math.floor(Math.random()*90000)+10000;
    ref.child("salary").set(salary);
}
