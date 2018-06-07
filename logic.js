  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDSLhd5seBqDQZS93HWlIOZg58a-7G_nfs",
    authDomain: "train-database-d8eca.firebaseapp.com",
    databaseURL: "https://train-database-d8eca.firebaseio.com",
    projectId: "train-database-d8eca",
    storageBucket: "train-database-d8eca.appspot.com",
    messagingSenderId: "1003902279863"
  };

  firebase.initializeApp(config);


 // Reference to the firebase database service
    var database = firebase.database();

// Create global variables to hold data
  var trainName, destination, firstTrainTime, 
  frequency = 0;

// On site visit
    $("#addTrainBtn").on("click", add);


// Adding initial load

    function add (){
        event.preventDefault();
// firstTrainTime =  $("#firstTrainTime").val();



        var newTrain = {
             trainName: $("#trainName").val(),
             destination: $("#destination").val(),
             firstTrainTime: $("#firstTrainTime").val(),
          // firstTrainTime: firstTrainTime,
             frequency: $("#frequency").val()

        };
      

        database.ref().push(newTrain);
      };
         

// Creating Firebase "watcher" "child_added" values from firebase
    database.ref().on("child_added", function(snapshot){
    
        console.log(snapshot.val().trainName);
    var myTrainObject = snapshot.val();
// The Calculating of minutesAway
        console.log(firstTrainTime);
    var firstTrainTimeConverted = moment (parseInt(myTrainObject.firstTrainTime), "hh:mm")//.subtract(1, "years");
        console.log(firstTrainTimeConverted);
// The Current Time
    var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
// The Difference between the times
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
// The Time apart (remainder)
    var remainder = diffTime % parseInt(myTrainObject.frequency);
        console.log(remainder);
// The Minute Until Train
    var minutesAway = parseInt(myTrainObject.frequency) - remainder;
        console.log("minutesAway: " + minutesAway);
// The Next Arrival
    var nextArrival = moment().add(minutesAway, "minutes");
        nextArrival = moment(nextArrival).format("hh:mm")
        console.log("nextArrival: " + moment(nextArrival).format("hh:mm"));


        var trainRow = "<tr>" + 
            "<td>" + snapshot.val().trainName + "</td>" +
            "<td>" + snapshot.val().destination + "</td>" +
        // "<td>" + snapshot.val().firstTrainTime + "</td>" +
            "<td>" + snapshot.val().frequency + "</td>" +
            "<td>" + nextArrival + "</td>" +
            "<td>" + minutesAway + "</td>" +


          "</tr>";    

            $("#trainContainer").append(trainRow);       
            
        });
    