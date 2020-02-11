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
var p1choice = null;
var p2choice = null;
var messages;
var selection = ["ROCK", "PAPER", "SCISSORS"];


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

$(document).ready(function() {
    currentStep.update({
        step: 0
    })
})

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
        messages = $("<div>");
        messages.addClass("col-12 p-4 text-center");
        messages.html("<h3>Welcome, " + player + "! You're the first to arrive. Waiting on Player 2.</h3>");
        $(".messages").append(messages);
        currentStep.update({
            step: 0
        })
        $(".playerOneSelect").empty();
    } else if (playerOneSnap.exists() && !playerTwoSnap.exists()) {
        playerOrder = 2;
        playerTwo.onDisconnect().remove();
        playerTwo.set({
            player: player,
            winCount: 0,
            lossCount: 0
        })
        $(".messages").empty();
        messages = $("<div>");
        messages.addClass("col-12 p-4 text-center");
        $(".messages").append(messages);
        currentStep.update({
            step: 1
        })
    } else 
    console.log("Sorry! No more room in the castle.");
})


// Update info for player one when database updates
playerOne.on("value", function (snapshot) {
    if (snapshot.val() !== null) {
        player1 = snapshot.val().player;
        $(".playerOneHeader").remove();
        var playerOneTitle = $("<div>");
        playerOneTitle.addClass("card-header playerOneHeader");
        playerOneTitle.text(player1);
        $(".firstPlayerBox").prepend(playerOneTitle);
    } else {
        $(".playerOneHeader").remove();
        playerOneTitle = $("<div>");
        playerOneTitle.addClass("card-header playerOneHeader");
        playerOneTitle.text("Player 1 has not yet entered");
        $(".firstPlayerBox").prepend(playerOneTitle);
    }},
    function (errorObject) {
        console.log("Failed to read. Code: " + errorObject.code);
    });

// Update info for player two when database updates
playerTwo.on("value", function (snapshot) {
    if (snapshot.val() !== null) {
        player2 = snapshot.val().player;
        $(".playerTwoHeader").remove();
        var playerTwoTitle = $("<div>");
        playerTwoTitle.addClass("card-header playerTwoHeader");
        playerTwoTitle.text(player2);
        $(".secondPlayerBox").prepend(playerTwoTitle);
    } else {
        $(".playerTwoHeader").remove();
        playerTwoTitle = $("<div>");
        playerTwoTitle.addClass("card-header playerTwoHeader");
        playerTwoTitle.text("Player 2 has not yet entered.");
        $(".secondPlayerBox").prepend(playerTwoTitle);
    }},
    function (errorObject) {
        console.log("Failed to read. Code: " + errorObject.code);
    });


// Step 3/game logic
function determineWinner () {
    // Discovers players' choices
    playerOne.once("value", function (snapshot) {
        p1choice = snapshot;
    }, function (errorObject) {
            console.log("Failed to read: " + errorObject.code);
    });
    playerTwo.once("value", function (snapshot) {
        p2choice = snapshot;
    }, function (errorObject) {
            console.log("Failed to read: " + errorObject.code);
    });
    if (p1choice.val() && p2choice.val()) {
        if (p1choice.val().choice == p2choice.val().choice) {
            $(".playerOneSelect").html("<h1>" + p1choice.val().choice + "</h1>");
            $(".playerTwoSelect").html("<h1>" + p2choice.val().choice + "</h1>");
            $(".updates").html("<h3>It's a tie!</h3>");
        }
    }

    
//     if (playerOneChoice == playerTwoChoice) {
//         $(".updates").html("<h3>It's a tie!</h3>");
//     } else if ((playerOneChoice == "SCISSORS" && playerTwoChoice == "ROCK")
//             || (playerOneChoice == "PAPER" && playerTwoChoice == "SCISSORS")
//             || (playerOneChoice == "ROCK" && playerTwoChoice == "PAPER")) {
//         $(".updates").html("<h3>" + player2 + " wins!</h3>");
//    } else {
//     $(".updates").html("<h3>" + player1 + " wins!</h3>");
//    }
}

currentStep.on("value", function (snapshot) {
    console.log("The current step is: " + snapshot.val().step);
    if (snapshot.val().step === 0) {
        $(".updates").empty();
    }

    // Waiting messages when it's not current player's turn
    if (snapshot.val()) {
        if (snapshot.val().step === 2 && playerOrder === 1) {
            $(".messages").empty();
            $(".updates").html("<h3>Waiting for " + player2 + " to choose.</h3>");
        } else if (snapshot.val().step === 1 && playerOrder === 2) {
            $(".playerOneSelect").empty();
            $(".messages").empty();
            $(".updates").html("<h3>Waiting for " + player1 + " to choose.</h3>");
        }
    }
    // Sets player one's turn
    if (snapshot.val().step === 1 && playerOrder === 1) {
        $(".playerOneSelect").empty();
        $(".messages").empty();
        for (i=0; i < selection.length; i++) {
            var choice = $("<li>");
            choice.addClass("list-group-item");
            choice.text(selection[i]);
            $(".playerOneSelect").append(choice);
        }
        $(".updates").html("<h3>Choose wisely.</h3>");
        console.log("Player 1's selection should be on screen now.");
        console.log("The player order is " + playerOrder);

        // Stores player one's choice and sets it to player 2's turn
        $(".list-group-item").on("click", function() {
            playerOneChoice = $(this).text();
            playerOne.update({
                choice : playerOneChoice
            });
            console.log("Player one chose: " + playerOneChoice);
            $(".playerOneSelect").empty();
            currentStep.update({
                step: 2
            })
        })
    
        // Sets player 2's turn
    } else if (snapshot.val().step === 2 && playerOrder === 2) {
        $("#playerTwoSelect").empty();
        $(".messages").empty();
        for (i=0; i < selection.length; i++) {
            var choice = $("<li>");
            choice.addClass("list-group-item");
            choice.text(selection[i]);
            $(".playerTwoSelect").append(choice);
        }
        $(".updates").html("<h3>Choose wisely.</h3>");
        console.log("Player 1's selection should be on screen now.");
        console.log("The player order is " + playerOrder);

        // Stores player two's choice and sets it to step 3
        $(".list-group-item").on("click", function() {
            playerTwoChoice = $(this).text();
            playerTwo.update({
                choice : playerTwoChoice
            });
            console.log("Player two chose: " + playerTwoChoice);
            $(".playerTwoSelect").empty();
            currentStep.update({
                step: 3
            })
        })

        console.log("Player 2's selection should be on screen now.");
    } else if (snapshot.val().step === 3) {
        $(".updates").html("<h3>This is step 3.</h3>");

        determineWinner();
}
})