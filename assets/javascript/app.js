// initialize Firebase
// <script src="https://www.gstatic.com/firebasejs/4.7.0/firebase.js"></script>
// <script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCzY2zGFEFav86LTSyBisaoLNMzbxZy6cc",
    authDomain: "fir-homework-9a700.firebaseapp.com",
    databaseURL: "https://fir-homework-9a700.firebaseio.com",
    projectId: "fir-homework-9a700",
    storageBucket: "fir-homework-9a700.appspot.com",
    messagingSenderId: "433052331364"
  };
  firebase.initializeApp(config);
// </script>

// Create a variable to reference the database
var database = firebase.database();

// $(document).ready(function() {
    // $('#database').scope( {
    //     "processing": true,
    //     "serverSide": true,
    //     "ajax": {
    //         "url": "scripts/post.php",
    //         "type": "POST"
    //     },
    //     "columns": [
    //         { "data": "trainName" },
    //         { "data": "destName" },
    //         { "data": "frequency" },
    //         { "data": "nextArrival" },
    //         { "data": "tminAway" }
    //     ]
    // } );


// get new input
$('#submit').on('click', function(event) {
	alert();
	// prevent default to avoid refreshing
	event.preventDefault();
	// get train name
	var name = $('#trainName').val();
	console.log(name);
	// get destination name
	var destination = $('#destName').val();
	console.log(destination);
	// get first train time
	var firstTrain = $('#firstTrain').val();
	console.log(firstTrain)
	// get train frequency
	var frequency = $('#frequency').val();
	console.log(frequency);
	// First Time (pushed back 1 year to make sure it comes before current time)
    var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTrainConverted);
	// calculate next arrival
	var nextArrival = moment().add(tminAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
	// calculate minutes away
	var tminAway = frequency - tRemainder;
    console.log("Minutes Away: " + tminAway);
	// push to Firebase
	database.ref().push({
		name: trainName,
		destination: destName,
		firstTrain: firstTrain,
		frequency: frequency,
		nextArrival: nextArrival,
		tminAway: tminAway

	// 
	// var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
 //    console.log(firstTimeConverted);

	})

})
function updateTable() {
    var a = document.getElementById("trainName").value;
    var b = document.getElementById("destName").value;
    var c = document.getElementById("frequency").value;
    var d = document.getElementById("nextArrival").value;
    var e = document.getElementById("tminAway").value;
   
    document.getElementById("trainName").innerHTML = a;
    document.getElementById("destName").innerHTML = b;
    document.getElementById("frequency").innerHTML = c;
    document.getElementById("nextArrival").innerHTML = d;
    document.getElementById("tminAway").innerHTML = e;

}


// when data is updated in Firebase, update the table
database.ref().on('child_added', function(childSnapshot) {
	console.log('Name: ' + childSnapshot.val().trainName);
	console.log('destination: ' + childSnapshot.val().destName);
	console.log('firstTrain: ' + childSnapshot.val().firstTrain);
	console.log('frequency: ' + childSnapshot.val().frequency);
	var nextArrival = moment(moment()).diff(childSnapshot.val().start, "minutes");
	console.log('nextArrival: ' + nextArrival);
	console.log('minAway: ' + nextArrival * childSnapshot.val().minAway);
	updateTable();
})





