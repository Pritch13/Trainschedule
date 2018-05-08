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





database.ref().on("value", function(snapshot) {

    var trainName = snapshot.val().name;
    var destination = snapshot.val().destination;
    var time = snapshot.val().time;


  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });






$(".btn").on("click", function(event) {
    // Prevent the page from refreshing
    event.preventDefault();

    // Get inputs
    name = $("#name").val().trim();
    destintation = $("#destination").val().trim();
    time = $("#time").val().trim();


    // Change what is saved in firebase
    database.ref().set({
      name: name,
      destintation: destintation,
      time: time
    });

    $('#name').val("");
    $('#destination').val("");
    $('#time').val("");
});