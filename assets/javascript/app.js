var config = {
    apiKey: "AIzaSyBLwofrJRGfMVMLRA8N6hTb0HzGgYLo9NI",
    authDomain: "train-app-3d466.firebaseapp.com",
    databaseURL: "https://train-app-3d466.firebaseio.com",
    projectId: "train-app-3d466",
    storageBucket: "train-app-3d466.appspot.com",
    messagingSenderId: "859374666106"
};

firebase.initializeApp(config);

var database = firebase.database();


database.ref().on("child_added", function (childSnapshot) {

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var freq = childSnapshot.val().freq;

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var time = childSnapshot.val().time;
    console.log(time);

    var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    var tMinutesTillTrain = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var nextArrival = moment(nextTrain).format("hh:mm");


    $('tbody').append('<tr><td>' + trainName + '</td><td>' + destination + '</td><td>' + freq + '</td><td>' + nextArrival + '</td><td>' + tMinutesTillTrain + '</td></tr>');

    $('.date').text(moment(currentTime).format("MMMM Do YYYY"));
    $('.time').text(moment(currentTime).format("hh:mm"));



}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});






$(".btn").on("click", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();


    // Get inputs
    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    time = $("#time").val().trim();
    freq = $("#freq").val().trim();


    if (name === '' || destination === '' || time === '' || freq === '') {
        alert('Please complete all fields!')
    } else {


        // Change what is saved in firebase
        database.ref().push({
            name: name,
            destination: destination,
            time: time,
            freq: freq
        });

        $('#name').val("");
        $('#destination').val("");
        $('#time').val("");
        $('#freq').val("");

    }
});





