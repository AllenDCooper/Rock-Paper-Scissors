// hide player buttons until players have joined game
$("#player1-buttons").hide();
$("#player2-buttons").hide();
$("#player1-scoreboard").hide();
$("#player2-scoreboard").hide();

// assigning player roles
var player1Start = $("#player1-start");
var player2Start = $("#player2-start");
player1Start = false;
player2Start = false;

$("#player1-start").on("click", function(){
    player1Start = true;
    $(this).hide();
    $("#player1-buttons").show();
    $("#player1-scoreboard").show();
    if (player2Start === false) {
        $("#directions-text").text("Waiting for Player 2 to join");
    } else {
        $("#select-player").hide();
        $("#directions-text").text("Select rock, paper, or scissors.")
    };
});


$("#player2-start").on("click", function(){
    player2Start = true;
    $(this).hide();
    $("#player2-buttons").show();
    $("#player2-scoreboard").show();
    if (player1Start === false) {
        $("#directions-text").text("Waiting for Player 2 to join");
    } else {
        $("#select-player").hide();
        $("#directions-text").text("Select rock, paper, or scissors.")
    };
});


// RPS game logic

var player1Wins = 0;
var player1Losses = 0;
var player1Ties = 0;

var player2Wins = 0;
var player2Losses = 0;
var player2Ties = 0;

var player1Choice;
var player2Choice;

var player1btn = $(".player1-btn");
var player2btn = $(".player2-btn");
player1btn = false;
player2btn = false;

$(".player1-btn").on("click", function(){
    player1Choice = $(this).attr("data-value")
    console.log(player1Choice);
    player1btn = true;
    $("#directions-text").text("");
    if (player1btn === true && player2btn === true) {
        scoreRound();
    } else {
        $("#directions-text").text("Waiting for Player 2");
    }
})

$(".player2-btn").on("click", function(){
    player2Choice = $(this).attr("data-value")
    console.log(player2Choice);
    player2btn = true;
    $("#directions-text").text("");
    if (player1btn === true && player2btn === true) {
        scoreRound();
    } else {
        $("#directions-text").text("Waiting for Player 1");
    };
});

// scoring function
function scoreRound() {
    if ((player1Choice === "rock") || (player1Choice === "paper") || (player1Choice === "scissors")) {
        if ((player1Choice === "rock") && (player2Choice === "scissors")) {
            player1Wins++;
            player2Losses++
        }
        else if ((player1Choice == "rock") && (player2Choice === "paper")) {
            player1Losses++;
            player2Wins++;
        }
        else if ((player1Choice === "paper") && (player2Choice === "rock")) {
            player1Wins++;
            player2Losses++;
        }
        else if ((player1Choice === "paper") && (player2Choice === "scissors")) {
            player1Losses++;
            player2Wins++;
        }
        else if ((player1Choice === "scissors") && (player2Choice === "paper")) {
            player1Wins++;
            player2Losses++;
        }
        else if ((player1Choice === "scissors") && (player2Choice === "rock")) {
            player1Losses++;
            player2Wins++;
        }
        else if (player1Choice === player2Choice) {
            player1Ties++;
            player2Ties++;
        }
    };
    // update player 1 scoreboard
    $("#1-player1-choice").text("You play: " + player1Choice);
    $("#1-player2-choice").text("Player 2 plays: " + player2Choice);
    $("#1-player1-wins").text("Wins: " + player1Wins);
    $("#1-player1-losses").text("Losses: " + player1Losses);
    $("#1-player1-ties").text("Ties: " + player1Ties);
    // update player 2 scoreboard
    $("#2-player2-choice").text("You play: " + player2Choice);
    $("#2-player1-choice").text("Player 2 plays: " + player1Choice);
    $("#2-player2-wins").text("Wins: " + player2Wins);
    $("#2-player2-losses").text("Losses: " + player2Losses);
    $("#2-player2-ties").text("Ties: " + player2Ties);
}

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCAfo7rirhhq_ZjAS6P3FGT4zxf1vzSQSQ",
    authDomain: "rock-paper-scissors-mp-3db66.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-mp-3db66.firebaseio.com",
    projectId: "rock-paper-scissors-mp-3db66",
    storageBucket: "",
    messagingSenderId: "353378985548",
    appId: "1:353378985548:web:7ebb5a7665080ae9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);