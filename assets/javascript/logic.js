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

// hide player buttons until players have joined game
$("#player1-buttons").hide();
$("#player2-buttons").hide();
$("#player1-scoreboard").hide();
$("#player2-scoreboard").hide();
$("#player1-start").hide();
$("#player2-start").hide();

// global variables
var player1Start;
var player2Start;

// run database listeners on page load
$(document).ready(function(){
    showPlayerButtons();
    scoreRoundListener();
});

// show/hide available player buttons
function showPlayerButtons(){
    // set watcher to show/hide buttons if values in database change
    database.ref().on("value", function(snapshot) {
        player1Start = snapshot.val().player1StartFB;
        player2Start = snapshot.val().player2StartFB;
        console.log(player1Start);
        console.log(player2Start);
        if (player1Start === false) {
            $("#player1-start").show();
        } else {
            $("#player1-start").hide();
        }
        if (player2Start === false) {
            $("#player2-start").show();
        } else {
            $("#player2-start").hide();
        }
    });
};

// function for reseting players
function resetPlayers() {
    // reset start values in the database to false
    database.ref().update({
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
    event.preventDefault();
    // update value in database to true
    database.ref().update({
        "player1StartFB": true,
    });
    // display game buttons and scoreboard
    console.log(player2Start);
    $("#player1-start").hide();
    $("#player2-start").hide();
    $("#select-player-head").text("You are Player 1");
    $("#player1-buttons").show();
    $("#player1-scoreboard").show();
    // displays instructions to wait for other player or game directions
    if (player2Start === false) {
        $("#directions-text").text("Waiting for Player 2 to join");
    } else {
        $("#directions-text").text("Select rock, paper, or scissors.")
    };
});

$("#player2-start").on("click", function(event){
    event.preventDefault();
    // update value in database to true
    database.ref().update({
        "player2StartFB": true,
    });
    // display game buttons and scoreboard
    console.log(player1Start);
    $("#player1-start").hide();
    $("#player2-start").hide();
    $("#select-player-head").text("You are Player 2");
    $("#player2-buttons").show();
    $("#player2-scoreboard").show();
    // displays instructions to wait for other player or game directions
    if (player1Start === false) {
        $("#directions-text").text("Waiting for Player 1 to join");
    } else {
        $("#directions-text").text("Select rock, paper, or scissors.")
    };
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

var player1BtnClick;
var player2BtnClick;
var curPlayer1Choice;
var curPlayer2Choice;

// click handler for player 1 rock/paper/scissor buttons
$(".player1-btn").on("click", function(event){
    event.preventDefault();
    player1Choice = $(this).attr("data-value")
    console.log(player1Choice);
    // update database, setting click as true and storing button value
    database.ref().update({
        "player1BtnClickFB": true,
        "player1ChoiceFB": player1Choice,
    });
    if (player2BtnClick === false) {
        $("#directions-text").text("Waiting for Player 2");
    }
});

// click handler for player 2 rock/paper/scissor buttons
$(".player2-btn").on("click", function(event){
    event.preventDefault();
    player2Choice = $(this).attr("data-value")
    console.log(player2Choice);
    // update database, setting click as true and storing button value
    database.ref().update({
        "player2BtnClickFB": true,
        "player2ChoiceFB": player2Choice,
    });
    if (player1BtnClick === false) {
        $("#directions-text").text("Waiting for Player 1");
    }
});

// set firebase listener to score round once both players have clicked rock/paper/scissors buttons
function scoreRoundListener(){
    database.ref().on("value", function(snapshot) {
        player1BtnClick = snapshot.val().player1BtnClickFB;
        curPlayer1Choice = snapshot.val().player1ChoiceFB;
        player2BtnClick = snapshot.val().player2BtnClickFB;
        curPlayer2Choice = snapshot.val().player2ChoiceFB;
        console.log(player1BtnClick);
        console.log(player2BtnClick);
        if (player1BtnClick === true && player2BtnClick === true) {
            scoreRound();
        }
    });
}

// scoring function
function scoreRound() {
    console.log(curPlayer1Choice, curPlayer2Choice);
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
        // update database with current values
        database.ref().update({
            "player1WinsFB": player1Wins,
            "player1LossesFB": player1Losses,
            "player1TiesFB": player1Ties,
            "player2WinsFB": player2Wins,
            "player2LossesFB": player2Losses,
            "player2TiesFB": player2Ties,
            "player1BtnClickFB": false,
            "player2BtnClickFB": false,
        });
    };
    // set listener to update value of variables everytime value in database changes 
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
};