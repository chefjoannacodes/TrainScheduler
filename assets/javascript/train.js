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
    var empFirstTrainTime = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
    var empFrequencyMinutes = $("#frequency-input").val().trim();

    //Creates local "temporary" object for holding new train data
    var newTrain = {
        name: empName,
        destination: empDestination,
        firstTrainTime: empFirstTrainTime,
        frequencyMinutes: empFrequencyMinutes
    };

    //uploads new train data to database
    database.ref().push(newTrain);



    //alert
    alert("Train successfully added");

    //Clears all text boxes
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

    //prevents moving to new page
    return false;

}); //end function for adding train "submit" button


//Create firebase event for adding train to the database and a row to HTML
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    //store everything in a varaible
    var empName = childSnapshot.val().name;
    var empDestination = childSnapshot.val().destination;
    var empFirstTrainTime = childSnapshot.val().firstTrainTime;
    var empFrequencyMinutes = childSnapshot.val().frequencyMinutes;


    //Prettify the first train time
    var empFirstTrainTimePretty = moment.unix(empFirstTrainTime).format("HH:mm a");



    //calculate the minutes away 
    //store input in variables to make calulations
    var tFrequency = empFrequencyMinutes;


    var firstTime = empFirstTrainTime;


    var firstTimeConverted = moment(firstTime, "X").subtract(1, "years");


    //Current Time
    var currentTime = moment();


    //Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");


    //time apart (remainder)
    var tRemainder = diffTime % tFrequency;


    //Minutes until train
    var tMinutesTillTrain = tFrequency - tRemainder;


    //next train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainPretty = moment(nextTrain).format("hh:mm");


    //display minutes away on board



    //calculate next arrival 


    //display next arrival on board using empFirstTrainTime. update automatically








    //add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + empName + "</td><td>" + empDestination + "</td><td>" + empFrequencyMinutes + "</td><td>" + nextTrainPretty + "</td><td>" + tMinutesTillTrain + "</td></tr>");

}); //end firebase event to add to database
