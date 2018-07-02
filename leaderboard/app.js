let config = {
  apiKey: "AIzaSyCAlMrDCczQWmFYgZn0b6JIDSIwCUOANZc",
  authDomain: "pfm-simulation.firebaseapp.com",
  databaseURL: "https://pfm-simulation.firebaseio.com",
  projectId: "pfm-simulation",
  storageBucket: "pfm-simulation.appspot.com",
  messagingSenderId: "562600285763"
};
firebase.initializeApp(config);
let ref = firebase.database().ref();
ref.on("value", snap => {
   let temp = "";
    var arr = [];
    var arr2= [];
   for(prop in snap.val()){
       arr.push(snap.val()[prop]["name"]);
       arr2.push(snap.val()[prop]["leaderbalance"]);
       
   }
    console.log(arr);
    var len = arr2.length;
	for (var i = 1; i < len; i++) {
		var tmp = arr2[i];
        var tmp2 = arr[i];
		for (var j = i - 1; j >= 0 && (arr2[j] > tmp); j--) {
			//Shift the number
			arr2[j + 1] = arr2[j];
            arr[j + 1] = arr[j];
		}
		arr2[j + 1] = tmp;
        arr[j + 1] = tmp2;
	}
    console.log(arr);
    var temparr = [];
    var temparr2 = [];
    for(i in arr2){
        temparr.push(arr2[arr2.length-1-i]);
    }
    for(i in arr){
        temparr2.push(arr[arr2.length-1-i]);
    }
    console.log(arr);
    for(i in arr2){
        temp += '<tr><td>'+temparr2[i]+'</td><td>'+temparr[i]+'</td></tr>';
        
    }
    document.getElementById('tbody').innerHTML = temp;
});