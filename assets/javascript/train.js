console.log("our files are linked properly");




 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAfBUW3hcq6eQXSApjp4xY1ufBKu7btJ_w",
    authDomain: "train-scheduler-d46bf.firebaseapp.com",
    databaseURL: "https://train-scheduler-d46bf.firebaseio.com",
    storageBucket: "train-scheduler-d46bf.appspot.com",
    messagingSenderId: "656961252018"
  };
  firebase.initializeApp(config);

//Variables

//get reference to database
  var database = firebase.database();



var nextArrival = 0;
var minutesAway = 0;

//submit button to add trains function
$("#submit-input").on("click", function(e) {
	console.log("when hit submit", this);
	e.preventDefault();

//Initial values for user input
	var empName = $("#name-input").val().trim();
	var empDestination = $("#destination-input").val().trim();
	//var empFirstTrainTime = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
	//var empFrequencyMinutes = moment($("#frequency-input").val().trim()).format("X");

//Creates local "temporary" object for holding new train data
var newTrain = {
	name: empName,
	destination: empDestination,
	// firstTrainTime: empFirstTrainTime,
	// frequencyMinutes: empFrequencyMinutes
};

//uploads new train data to database
database.ref().push(newTrain);

//logs everything to console
console.log(empName.name);
console.log(empDestination.destination);
console.log(empFirstTrainTime.firstTrainTime);
console.log(empFrequencyMinutes.frequencyMinutes);

//alert
alert("Train successfully added");

//Clears all text boxes
$("#name-input").val("");
$("#destination-input").val("");
$("#first-train-input").val("");
$("#frequency-input").val("");

//prevents moving to new page
return false;

});//end function for adding train "submit" button


//Create firebase event for adding train to the database and a row to HTML
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	console.log(childSnapshot.val());
//store everything in a varaible
var empName = childSnapshot.val().name;
var empDestination = childSnapshot.val().destination;
var empFirstTrainTime = childSnapshot.val().firstTrainTime;
var empFrequencyMinutes = childSnapshot.val().frequencyMinutes;

//train info
console.log(empName);
console.log(empDestination);
console.log(empFirstTrainTime);
console.log(empFrequencyMinutes);

//prettify the train time and frequency in minutes
//var empFirstTrainTimePretty = moment.unix(empFirstTrainTime).format("HH:mm");

//calculate First train time
//add each train's data into the table
$("#train-table > tbody").append("<tr><td>" + empName + "</td><td>" + empDestination + "</td><td>" + empFirstTrainTime + "</td><td>" + empFrequencyMinutes + "</td></tr>");

}); //end firebase event to add to database
















