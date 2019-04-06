$( document).ready(function() {

// Initialize Firebase
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

// --------------------------------------------------------------

// Creates click event when user clicks submit button 
$("#submit-button").on("click", function (event) {
    event.preventDefault();
    // Gets input values
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var frequency = $("#frequency").val().trim();

// Creates local "temporary" object for holding train data
var trainData = {

        FBtrainName: trainName,
        FBdestination: destination,
        FBfirstTrain: firstTrain,
        FBfrequency: frequency,
        dateAdded:
        firebase.database.ServerValue.TIMESTAMP
};

// Pushes train data to database
database.ref().push(trainData);


alert("Train data successfully added");

// Clears text boxes
$("#train-name").val("");
$("#destination").val("");
$("#first-train").val("");
$("#frequency").val("");

// Creates new row for train data
var newRow = $("<tr>").append(
  $("<td>").text(trainName),
  $("<td>").text(destination),
  $("<td>").text(firstTrain),
  $("<td>").text(frequency),

);

// Appends the new row to the table
$("#train-table > tbody").append(newRow);



})

});

// Psuedocode
// Find API for train information and find out how to connect it to app

// Work out train math
// Parameters: 
// First train comes in at 3AM
// Train runs every 17 minutes
// Current time is 7:12 PM
// There have been and nor will there be any delays

// Questions
// How many minutes away is the next train?

// Use military time for math






