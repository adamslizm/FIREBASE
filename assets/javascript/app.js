
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
var dataref = firebase.database();

var name = "";
var destination = "";
var firstTrain = "";
var frequency = "";


// get new input
$('#submit').on('click', function(event) {
    // prevent default to avoid refreshing
    event.preventDefault();
    // get train name
    name = $('#trainName').val().trim();
    console.log(name);
    
    // console.log($('#trainName'));
    // get destination name
    destination = $('#destName').val().trim();
    console.log(destination);
    // get first train time
    firstTrain = $('#firstTrain').val().trim();
    console.log(firstTrain)
    // get train frequency
    frequency = $('#frequency').val().trim();
    console.log(frequency);
    // First Time (pushed back 1 year to make sure it comes before current time)
    firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTrainConverted);
    // calculate next arrival
    var nextArrival = moment().add(tminAway, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + nextArrival);
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
    dataref.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        nextArrival: nextArrival,
        tminAway: tminAway
        // dateAdded: firebase.database.ServerValue.TIMESTAMP

    })

    dataref.ref().on('child_added', function(childSnapshot) {

        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().firstTrain);
        console.log(childSnapshot.val().frequency);
        console.log(childSnapshot.val().nextArrival);
        console.log(childSnapshot.val().tminAway);
        // updateTable();
    

    

    $("tbody").append("<tr><td class='trainName'> " + childSnapshot.val().name +
        " </td><td class='destination'> " + childSnapshot.val().destination +
        " </td><td class='frequency'> " + childSnapshot.val().frequency +
        " </td><td class='nextArrival'> " + childSnapshot.val().nextArrival + 
        " </td><td class='tminAway'> " + childSnapshot.val().tminAway + "</td></tr>");
    
})
    dataref.ref().orderByChild("nextArrival").limitToLast(1).on("child_added", function(snapshot) {
        // Change the HTML to reflect
        $("#trainName").text(snapshot.val().name);
        $("#destName").text(snapshot.val().destination);
        $("#frequency").text(snapshot.val().frequency);
        $("#nextArrival").text(snapshot.val().nextArrival);
        $("#tminAway").text(snapshot.val().tminAway);
    });



})
