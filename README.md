# TrainScheduler

## GitHub link 
https://chefjoannacodes.github.io/TrainScheduler/

## This is a train scheduler using Firebase. The user can input a train with the first train time and frequency that it runs. The page will then display the next train arrival time and minutes until the next train arrives. 

## Requirements
####   * Make sure that your app suits this basic spec:
* When adding trains, administrators should be able to submit the following:
-Train Name
-Destination
-First Train Time -- in military time
-Frequency -- in minutes
* Code this app to calculate when the next train will arrive; this should be relative to the current time.
Users from many different machines must be able to view same train times.
Styling and theme are completely up to you. Get Creative!


## Technologies Used
#### 
- Firebase
- Moment JS
- Bootstrap
- Javascript
- Jquery

## Code Explaination
- First, I initialized Firebase by adding the script tag to the HTML. I then added the keys and credentials in the JS file. I also added the script tags for Moment JS so I could calculate the next train times based on the current time. 

- To display the new trains added, I created a temporary variable and then I pushed it to the firebase database. I then retrieved the data in the new object created. I used childSnapshot to do this. 
```
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	
//store everything in a varaible
var empName = childSnapshot.val().name;
var empDestination = childSnapshot.val().destination;
var empFirstTrainTime = childSnapshot.val().firstTrainTime;
var empFrequencyMinutes = childSnapshot.val().frequencyMinutes;

 ```
 I updated the train's next arrival time using moment.js. 
```
   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
```
I updated all the new times by appending it to a table in the HTML.




