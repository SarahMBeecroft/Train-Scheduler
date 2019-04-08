$(document).ready(function() {

// Initializes Firebase
var config = {
    apiKey: "AIzaSyCrq2lOoijHPymVf1iMxy0BhOKgP-dGJgE",
    authDomain: "train-scheduler-12d61.firebaseapp.com",
    databaseURL: "https://train-scheduler-12d61.firebaseio.com",
    projectId: "train-scheduler-12d61",
    storageBucket: "train-scheduler-12d61.appspot.com",
    messagingSenderId: "806925344137"
  };
  firebase.initializeApp(config);

// Creates a variable to reference the database
var database = firebase.database();

// Creates click event when user clicks submit button 
$("#submit-button").on("click", function (event) {
    // Prevents page from being reloaded
    event.preventDefault();
    // Gets input values
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var frequency = $("#frequency").val().trim();

// Creates local "temporary" object for holding train data
var trainData = {

      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
      dateAdded:
      firebase.database.ServerValue.TIMESTAMP
};

// Pushes train data to database
database.ref().push(trainData);

// Alerts user train data has been added
alert("Train data successfully added!");

// Clears text boxes
$("#train-name").val("");
$("#destination").val("");
$("#first-train").val("");
$("#frequency").val("");

// Adds child snapshot to database
database.ref().on("child_added", function(childSnapshot) {
// Variables for child snapshot
var trainName = childSnapshot.val().trainName;
var destination = childSnapshot.val().destination;
var frequency = childSnapshot.val().frequency;
var firstTime = childSnapshot.val().firstTime;

// Moment JS Code
// Creates variable for train frequency
var trainFrequency = 17;

// Creates variable for first train time
var firstTime = "03:00";

// Creates variable for first time converted 
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Creates variable for current time
var currentTime = moment();
console.log("Current time: " + moment(currentTime).format("hh:mm"));

// Creates variable for difference between first time and current time
var timeDifference = moment().diff(moment(firstTimeConverted), "minutes");
console.log("Difference in time: " + timeDifference);

// Creates variable for time remainder
var timeRemainder = timeDifference % trainFrequency;
console.log(timeRemainder);

// Creates variable for minutes until next train
var minutesNextTrain = trainFrequency - timeRemainder;
console.log("MINUTES TILL TRAIN: " + minutesNextTrain);

// Creates variable for next train
var nextTrain = moment().add(minutesNextTrain, "minutes");
console.log("Arrival time: " + moment(nextTrain).format("hh:mm"));

// Creates new row for train data
var newRow = $("<tr>").append(
$("<td>").text(trainName),
$("<td>").text(destination),
$("<td>").text(frequency),
$("<td>").text(nextTrain),
$("<td>").text(minutesNextTrain)
);

// Appends the new row to the train table
$("#train-table > tbody").append(newRow);

})
})
})
