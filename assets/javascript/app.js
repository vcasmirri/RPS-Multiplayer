// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDrnEKax-Iq93rOCyBqP1ogWJrrBWWUmLI",
    authDomain: "rock-paper-scissors-460c4.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-460c4.firebaseio.com",
    projectId: "rock-paper-scissors-460c4",
    storageBucket: "rock-paper-scissors-460c4.appspot.com",
    messagingSenderId: "46631371741",
    appId: "1:46631371741:web:5b89da43ba9f902261ac34"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database
var database = firebase.database();

// Database variables
var currentTurn = database.ref();
var connectionsRef = database.ref("/connections");
var playerOne = database.ref("/connections/playerOne");
var playerTwo = database.ref("/connections/playerTwo");

// Global variables
var player;
var playerOneSnap;
var playerTwoSnap;
var playerOneChoice;
var playerTwochoice;
var playerOneWins = 0;
var playerTwoWins = 0;
var playerOneLosses = 0;
var playerTwoLosses = 0;


// var connectedRef = database.ref(".info/connected");

    // // Testing connections feature
    // connectionsRef.on("value", function(snapshot) {

    //     // Display the viewer count in the html.
    //     // The number of online users is the number of children in the connections list.
    //     console.log("There are " + snapshot.numChildren() + " users online.");
    // });

    // // updates connection state
    // connectedRef.on("value", function(snap) {
    //     if (snap.val()) {
    //         var con = connectionsRef.push(true);
    //         con.onDisconnect().remove();
    //     }
    // })

// Sets player name and stuff
$("#submitName").on("click", function() {
    event.preventDefault();
    player = $("#name").val().trim();
    playerOne.once("value", function (snapshot) {
        playerOneSnap
    })
})


// Update info for player one when database updates
playerOne.on("value", function (snapshot) {
    if (snapshot.val() !== null) {

    }
})
    