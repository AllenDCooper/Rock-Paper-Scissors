// hide player buttons until players have joined game
$("#player1-buttons").hide();
$("#player2-buttons").hide();
$("#player1-scoreboard").hide();
$("#player2-scoreboard").hide();
$("#player1-start").hide();
$("#player2-start").hide();

// show player buttons if user is not already selected
$(document).ready(function(){
    database.ref().on("value", function(snapshot) {
        curPlayer1Start = snapshot.val().player1StartFB;
        curPlayer2Start = snapshot.val().player2StartFB;
        console.log(curPlayer1Start);
        console.log(curPlayer2Start);
        if (curPlayer1Start === false) {
            $("#player1-start").show();
        } else {
            $("#player1-start").hide();
        }
        if (curPlayer2Start === false) {
            $("#player2-start").show();
        } else {
            $("#player2-start").hide();
        }
        if (curPlayer1Start === true && curPlayer2Start === true) {
            $("#select-player-head").text("Wait for available player, or reset");
        }
    });
});

// assigning player roles
var player1Start = $("#player1-start");
var player2Start = $("#player2-start");

// function for reseting players
function resetPlayers() {
    // player1Start = false;
    // player2Start = false;
    database.ref().set({
        // whether player has been selected
        "player1StartFB": false,
        "player2StartFB": false,
    });
    // reseting document structure and texts
    $("#player1-buttons").hide();
    $("#player2-buttons").hide();
    $("#player1-scoreboard").hide();
    $("#player2-scoreboard").hide();
    $("#directions-text").hide();
    $("#select-player-head").text("Select available player");
    $("#player1-start").show();
    $("#player2-start").show();
};

// click handler for calling reset players function
$("#reset-players").on("click", function(){
    resetPlayers();
});

// when user selects Player 1 role
$("#player1-start").on("click", function(event){
    // event.preventDefault();
    var curPlayer2Start; 
    player1Start = true;
    database.ref().update({
        "player1StartFB": player1Start,
    });
    database.ref().on("value", function(snapshot) {
        curPlayer2Start = snapshot.val().player2StartFB;
        console.log(curPlayer2Start);
        $("#player1-start").hide();
        $("#select-player-head").text("You are Player 1");
        if (curPlayer2Start === false) {
            $("#directions-text").text("Waiting for Player 2 to join");
        } else {
            $("#player1-start").hide();
            $("#player2-start").hide();
            $("#directions-text").text("Select rock, paper, or scissors.")
            $("#player1-buttons").show();
            $("#player1-scoreboard").show();
        };
    });
});

$("#player2-start").on("click", function(event){
    // event.preventDefault();
    var curPlayer1Start;
    player2Start = true;
    database.ref().update({
        "player2StartFB": player2Start,
    });
    database.ref().on("value", function(snapshot) {
        curPlayer1Start = snapshot.val().player1StartFB;
        console.log(curPlayer1Start);
        $("#player2-start").hide();
        $("#select-player-head").text("You are Player 2");
        if (curPlayer1Start === false) {
            $("#directions-text").text("Waiting for Player 1 to join");
        } else {
            $("#player1-start").hide();
            $("#player2-start").hide();
            $("#directions-text").text("Select rock, paper, or scissors.")
            $("#player2-buttons").show();
            $("#player2-scoreboard").show();
        };
    });
});

// RPS game logic
// creating global game variables
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

var curPlayer1btn;
var curPlayer2btn;
var curPlayer1Choice;
var curPlayer2Choice;


$(".player1-btn").on("click", function(event){
    event.preventDefault();
    player1Choice = $(this).attr("data-value")
    console.log(player1Choice);
    player1btn = true;
    database.ref().update({
        "player1btnFB": player1btn,
        "player1ChoiceFB": player1Choice,
    });
    database.ref().once("value", function(snapshot) {
        curPlayer1btn = snapshot.val().player1btnFB;
        curPlayer1Choice = snapshot.val().player1ChoiceFB;
        // curPlayer2btn = snapshot.val().player2btnFB;
        curPlayer2Choice = snapshot.val().player2ChoiceFB;
        $("#directions-text").text("");
        // if (curPlayer1btn === true && curPlayer2btn === true) {
        //     scoreRound();
        // } else {
        //     $("#directions-text").text("Waiting for Player 2");
        // }
    });
});

$(".player2-btn").on("click", function(event){
    event.preventDefault();
    player2Choice = $(this).attr("data-value")
    player2btn = true;
    database.ref().update({
        "player2btnFB": player2btn,
        "player2ChoiceFB": player2Choice,
    });
    database.ref().once("value", function(snapshot) {
        curPlayer2btn = snapshot.val().player2btnFB;
        curPlayer2Choice = snapshot.val().player2ChoiceFB;
        console.log(player1btn);
        console.log(player1Choice);
        console.log(curPlayer1Choice);
        // curPlayer1btn = snapshot.val().player1btnFB;
        curPlayer1Choice = snapshot.val().player1ChoiceFB;
        $("#directions-text").text("");
        // if (curPlayer1btn === true && curPlayer2btn === true) {
        //     scoreRound();
        // } else {
        //     $("#directions-text").text("Waiting for Player 1");
        // };
    });
});

// scoring function
function scoreRound() {
    if ((curPlayer1Choice === "rock") || (curPlayer1Choice === "paper") || (curPlayer1Choice === "scissors")) {
        if ((curPlayer1Choice === "rock") && (curPlayer2Choice === "scissors")) {
            player1Wins++;
            player2Losses++
        }
        else if ((curPlayer1Choice == "rock") && (curPlayer2Choice === "paper")) {
            player1Losses++;
            player2Wins++;
        }
        else if ((curPlayer1Choice === "paper") && (curPlayer2Choice === "rock")) {
            player1Wins++;
            player2Losses++;
        }
        else if ((curPlayer1Choice === "paper") && (curPlayer2Choice === "scissors")) {
            player1Losses++;
            player2Wins++;
        }
        else if ((curPlayer1Choice === "scissors") && (curPlayer2Choice === "paper")) {
            player1Wins++;
            player2Losses++;
        }
        else if ((curPlayer1Choice === "scissors") && (curPlayer2Choice === "rock")) {
            player1Losses++;
            player2Wins++;
        }
        else if (curPlayer1Choice === curPlayer2Choice) {
            player1Ties++;
            player2Ties++;
        }
        database.ref().update({
            "player1WinsFB": player1Wins,
            "player1LossesFB": player1Losses,
            "player1TiesFB": player1Ties,
            "player2WinsFB": player2Wins,
            "player2LossesFB": player2Losses,
            "player2Ties": player2Ties,
        });
    };
    database.ref().on("value", function(snapshot) {
        curPlayer1Choice = snapshot.val().player1ChoiceFB;
        curPlayer1Wins = snapshot.val().player1WinsFB;
        curPlayer1Losses = snapshot.val().player1LossesFB;
        curPlayer1Ties = snapshot.val().player1TiesFB;
        curPlayer2Choice = snapshot.val().player2ChoiceFB;
        curPlayer2Wins = snapshot.val().player2WinsFB;
        curPlayer2Losses = snapshot.val().player2LossesFB;
        curPlayer2Ties = snapshot.val().player2TiesFB;
    });
    // update player 1 scoreboard
    $("#1-player1-choice").text("You play: " + curPlayer1Choice);
    $("#1-player2-choice").text("Player 2 plays: " + curPlayer2Choice);
    $("#1-player1-wins").text("Wins: " + curPlayer1Wins);
    $("#1-player1-losses").text("Losses: " + curPlayer1Losses);
    $("#1-player1-ties").text("Ties: " + curPlayer1Ties);
    // update player 2 scoreboard
    $("#2-player2-choice").text("You play: " + curPlayer2Choice);
    $("#2-player1-choice").text("Player 1 plays: " + curPlayer1Choice);
    $("#2-player2-wins").text("Wins: " + curPlayer2Wins);
    $("#2-player2-losses").text("Losses: " + curPlayer2Losses);
    $("#2-player2-ties").text("Ties: " + curPlayer2Ties);
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
  var database = firebase.database();

// saving game variables into firebase


