var trainName = "";
var destination = "";
var firstTime = "";
var frequency = "";
var nextTrain = "";
var currentTime = "";

$(document).ready(function () {
  var config = {
    apiKey: "AIzaSyDvXeAkY0BVmn1kCrUrPoBvFm-nI0dqRyU",
    authDomain: "traingame-4b2bd.firebaseapp.com",
    databaseURL: "https://traingame-4b2bd.firebaseio.com",
    projectId: "traingame-4b2bd",
    storageBucket: "",
    messagingSenderId: "192875907037"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#addTrain").on("click", function (event) {
    event.preventDefault();

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTime = $("#train-time").val().trim();
    frequency = $("#frequency").val().trim();
    currentTime = moment();
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    var timeDiff = moment().diff(firstTimeConverted, "minutes");
    var timeRemaining = timeDiff % frequency;
    var minsTilTrain = frequency - timeRemaining;
    nextTrain = moment().add(minsTilTrain, "minutes");
    var formatNextTrain = moment(nextTrain).format("hh:mm");

    var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTime,
      frequency: frequency,
      formatNextTrain: formatNextTrain,
      minsTilTrain: minsTilTrain
    };

    database.ref().push(newTrain);

    $("#trainName").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");


  });

  database.ref().on("child_added", function (childSnapshot) {

    trainName = childSnapshot.val().name;
    destination = childSnapshot.val().destination;
    firstTime = childSnapshot.val().firstTrain;
    frequency = childSnapshot.val().frequency;
    formatNextTrain = childSnapshot.val().formatNextTrain;
    minsTilTrain = childSnapshot.val().minsTilTrain;
    $("#trainInfo").append("<tr class ='table-row'>" + "<td>" +
      trainName + "</td> <td>" + destination + "</td> <td>" + frequency +
      "</td> <td>" + formatNextTrain + "</td> <td>" + minsTilTrain + "</td> </tr>")
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

});
