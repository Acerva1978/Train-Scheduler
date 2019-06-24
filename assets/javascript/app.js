
var firebaseConfig = {
    apiKey: "AIzaSyDCsnx7oV9JKPXJre-9kkC2aJh10WWsXAs",
    authDomain: "train-scheduler-cae20.firebaseapp.com",
    databaseURL: "https://train-scheduler-cae20.firebaseio.com",
    projectId: "train-scheduler-cae20",
    storageBucket: "",
    messagingSenderId: "458380674326",
    appId: "1:458380674326:web:2636dec3d0783f2f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();



$("#train-info").on("submit", function(event){
    event.preventDefault();
    
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#first-train-time").val().trim();
    var frequency = $("#frequency").val().trim();
   


    var re = /^\d{1,2}:\d{2}([ap]m)?$/;
    //regex
if(trainName.length > 3){
    trainName = $("#train-name").val().trim();
}else{
    alert('train name should include at least three letters')
}

if(destination.length > 3){
    destination = $("#destination").val().trim();
}else{
    alert('your destination should include at least three letters');
}

if(isNaN(frequency)){
    alert('Your frequency should be a number')
} else {
    frequency = $("#frequency").val().trim();
}

if(firstTrainTime.lenght != '' && !firstTrainTime.match(re) ){
    alert('Your Train time should be on military time  (HH:mm - military time)')
  
} else {
    firstTrainTime = $("#first-train-time").val().trim();
}

database.ref().push({

    
 tName: trainName,
 place: destination,
 trainTime: firstTrainTime,
 frequency: frequency


})

$("#train-name").val("");
$("#destination").val("");
$("#first-train-time").val("");
$("#frequency").val("");
 
})

database.ref().on('child_added', function(response){
   var nameTrain = response.val().tName;
   var desPlace = response.val().place;
   var timeTrain = response.val().trainTime;
   var freq = response.val().frequency;

   var firstTimeConverted = moment(timeTrain, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    // console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = freq - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    // var nextTrain = moment(tMinutesTillTrain).format("hh:mm");
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var acomiTRain = moment(nextTrain).format("hh:mm:A");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

   var tr = $('<tr>');
   var tdName = $('<td>').text(nameTrain);
   var tdPlace = $('<td>').text(desPlace);
   var tdFrequency = $('<td>').text(freq);
   var tdTime = $('<td>').text(acomiTRain);
   var nxTrain = $('<td>').text(tMinutesTillTrain);
   

   tr.append(tdName, tdPlace, tdFrequency, tdTime, nxTrain)
   
   $("#tbody").append(tr)


})
