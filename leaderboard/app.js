let ref = firebase.database().ref();
ref.on("value", snap => {
   let temp = "";
   for(prop in snap.val()){
       temp += '<tr><td>'+snap.val()[prop][name]+' dollars from your salary</td></tr>';
   }
    document.getElementById('tbody').innerHTML = temp;
});