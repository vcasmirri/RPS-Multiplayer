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
var currentStep = database.ref();
var connectionsRef = database.ref("/connections");
var playerOne = database.ref("/connections/playerOne");
var playerTwo = database.ref("/connections/playerTwo");

// Global variables
var player;
var player1;
var player2;
// var playerOne = null;
// var playerTwo = null;
var playerOneSnap;
var playerTwoSnap;
var playerOneChoice;
var playerTwochoice;
var playerOneWins = 0;
var playerTwoWins = 0;
var playerOneLosses = 0;
var playerTwoLosses = 0;
var playerOrder = 0;


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
        playerOneSnap = snapshot;
    }, function (errorObject) {
        console.log("Failed to read. Code: " + errorObject.code);
    });
    playerTwo.once("value", function (snapshot) {
        playerTwoSnap = snapshot;
    }, function (errorObject) {
        console.log("Failed to read. Code: " + errorObject.code);
    });

    if (!playerOneSnap.exists()) {
        playerOrder = 1;
        playerOne.onDisconnect().remove();
        playerOne.set({
            player: player,
            winCount: 0,
            lossCount: 0
        });
        $(".messages").empty();
        var messages = $("<div>");
        messages.addClass("col-12 p-4 text-center");
        messages.html("<h3>Welcome, " + player + "! You're the first to arrive. Waiting on Player 2.</h3>");
        $(".messages").append(messages);
    } else if (playerOneSnap) {
        playerOrder = 2;
        playerTwo.onDisconnect().remove();
        playerTwo.set({
            player: player,
            winCount: 0,
            lossCount: 0
        })
        $(".messages").empty();
        var messages = $("<div>");
        messages.addClass("col-12 p-4 text-center");
        messages.html("<h3>Welcome, " + player + "! Let's begin. Waiting for " + player1 + " to choose.</h3>");
        $(".messages").append(messages);
        currentStep.update({
            step: 1
        })
    } else [

    ]
    console.log("Player order is " + playerOrder);
})


// Update info for player one when database updates
playerOne.on("value", function (snapshot) {
    if (snapshot.val() !== null) {
        player1 = snapshot.val().player;
        $(".firstPlayerBox").empty();
        var playerOneTitle = $("<h4>");
        playerOneTitle.addClass("card-header");
        playerOneTitle.text(player1);
        $(".firstPlayerBox").append(playerOneTitle);
    } else {
        $(".firstPlayerBox").html("Player 1 has not yet entered");
    }},
    function (errorObject) {
        console.log("Failed to read. Code: " + errorObject.code);
    });

// Update info for player one when database updates
playerTwo.on("value", function (snapshot) {
    if (snapshot.val() !== null) {
        player2 = snapshot.val().player;
        $(".secondPlayerBox").empty();
        var playerTwoTitle = $("<h4>");
        playerTwoTitle.addClass("card-header");
        playerTwoTitle.text(player2);
        $(".secondPlayerBox").append(playerTwoTitle);
    } else {
        $(".secondPlayerBox").html("Player 2 has not yet entered");
    }},
    function (errorObject) {
        console.log("Failed to read. Code: " + errorObject.code);
    });

currentStep.on("value", function (snapshot) {
    console.log("The current step is: " + snapshot.val().step);
})