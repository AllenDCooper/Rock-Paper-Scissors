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
$("#player1-chosen").hide();
$("#player2-chosen").hide();

// global variables to store booleans about whether player has been selected
var player1Chosen;
var player2Chosen;

// run database listeners on page load
$(document).ready(function(){
    showPlayerButtons();
    scoreRoundListener();
    reloadPlayer();
});

// load player buttons and scoreboard from local storage upon page refresh
function reloadPlayer() {
    if (localStorage.getItem("user") === "player1") {
        setupPlayer1();
    } else if (localStorage.getItem("user") === "player2") {
        setupPlayer2();
    }
}

// show/hide available player buttons
function showPlayerButtons(){
    // set watcher to show/hide buttons if values in database change
    database.ref().on("value", function(snapshot) {
        player1Chosen = snapshot.val().player1Chosen;
        player2Chosen = snapshot.val().player2Chosen;
        console.log(player1Chosen);
        console.log(player2Chosen);
        if (player1Chosen === false && player2Chosen === true) {
            $("#player1-chosen").show();
            $("#player2-chosen").hide();
            $("#directions-waiting-text").show();
        } else if (player1Chosen === false && player2Chosen === false) {
            $("#player1-chosen").show();
            $("#player2-chosen").show();
            $("#directions-waiting-text").text("");
            $("#directions-waiting-text").hide();
            // reseting document structure and texts
            $("#player1-buttons").hide();
            $("#player2-buttons").hide();
            $("#player1-scoreboard").hide();
            $("#player2-scoreboard").hide();
            $("#directions-text").hide();
            $("#select-player-head").text("Select available player");
            $("#player1-chosen").show();
            $("#player2-chosen").show();
            $("#directions-waiting-text").show();
        } else if( player1Chosen === true && player2Chosen === false) {
            $("#player1-chosen").hide();
            $("#player2-chosen").show();
            $("#directions-waiting-text").show();
        } else {
            $("#player1-chosen").hide();
            $("#player2-chosen").hide();
            $("#directions-text").text("Select rock, paper, or scissors.");
            $("#directions-waiting-text").show();
            $("#directions-waiting-text").text(">Both players selected<");
        }
    });
};

// function for reseting players
function resetPlayers() {
    // reset start values in the database to false
    database.ref().update({
        // whether player has been selected
        "player1Chosen": false,
        "player2Chosen": false,
    });
    // clear local storage
    localStorage.setItem("user", "");
};

// click handler for calling reset players function
$("#reset-players").on("click", function(){
    resetPlayers();
});

// function to set up Player1 gameboard
function setupPlayer1() {
    $("#player1-chosen").hide();
    $("#player2-chosen").hide();
    $("#select-player-head").text("You are Player 1");
    $("#player1-buttons").show();
    $("#player1-scoreboard").show();
    updatePlayerChoice();
    // displays instructions to wait for other player or game directions
    if (player2Chosen === false) {
        $("#directions-waiting-text").text("Waiting for Player 2 to join");
    } else {
        $("#directions-text").text("Select rock, paper, or scissors.")
    };
}

// click handler for when user selects Player 1 role
$("#player1-chosen").on("click", function(event){
    event.preventDefault();
    // save user to local storage
    localStorage.setItem("user", "player1");
    // update value in database to true
    database.ref().update({
        "player1Chosen": true,
    });
    // display game buttons and scoreboard
    console.log(player2Chosen);
    setupPlayer1();
});

function setupPlayer2() {
    $("#player1-chosen").hide();
    $("#player2-chosen").hide();
    $("#select-player-head").text("You are Player 2");
    $("#player2-buttons").show();
    $("#player2-scoreboard").show();
    updatePlayerChoice();
    // displays instructions to wait for other player or game directions
    if (player1Chosen === false) {
        $("#directions-waiting-text").text("Waiting for Player 1 to join");
    } else {
        $("#directions-text").text("Select rock, paper, or scissors.")
    };
};

// click handler for when user selects Player 2 role
$("#player2-chosen").on("click", function(event){
    event.preventDefault();
    // save user to local storage
    localStorage.setItem("user", "player2");
    // update value in database to true
    database.ref().update({
        "player2Chosen": true,
    });
    // display game buttons and scoreboard
    console.log(player1Chosen);
    setupPlayer2();
});

// create global variables for storing boolean whether or not player has selected rock, paper, or scissors
var player1BtnClick;
var player2BtnClick;
// create global variables for storing player choice (rock, paper, or scissors)
var curPlayer1Choice;
var curPlayer2Choice;

// click handler for player 1 rock/paper/scissor buttons
$(".player1-btn").on("click", function(event){
    // event.preventDefault();
    player1Choice = $(this).attr("data-value")
    console.log(player1Choice);
    $("#1-player1-choice").text("You played: " + player1Choice);
    $("#1-player2-choice").text("Player 2 played: ");
    $("#2-player1-choice").text("");
    $("#2-player2-choice").text("");
    // update database, setting click as true and storing button value
    database.ref().update({
        "player1BtnClickFB": true,
        "player1ChoiceFB": player1Choice,
    });
});

// click handler for player 2 rock/paper/scissor buttons
$(".player2-btn").on("click", function(event){
    event.preventDefault();
    player2Choice = $(this).attr("data-value")
    console.log(player2Choice);
    $("#1-player1-choice").text("");
    $("#1-player2-choice").text("");
    $("#2-player1-choice").text("Player 2 played: ");
    $("#2-player2-choice").text("You played: "+ player2Choice);
    // update database, setting click as true and storing button value
    database.ref().update({
        "player2BtnClickFB": true,
        "player2ChoiceFB": player2Choice,
    });
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
            updatePlayerChoice();
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
};
function updatePlayerChoice() {
    database.ref().once("value", function(snapshot) {
        curPlayer1Choice = snapshot.val().player1ChoiceFB;
        curPlayer2Choice = snapshot.val().player2ChoiceFB;
        $("#1-player1-choice").text("You played: " + curPlayer1Choice);
        $("#1-player2-choice").text("Player 2 played: " + curPlayer2Choice);
        $("#2-player2-choice").text("You played: " + curPlayer2Choice);
        $("#2-player1-choice").text("Player 1 played: " + curPlayer1Choice);
    });
};

function updateScoreBoard() {
    database.ref().on("value", function(snapshot) {
        curPlayer1Choice = snapshot.val().player1ChoiceFB;
        player1Wins = snapshot.val().player1WinsFB;
        player1Losses = snapshot.val().player1LossesFB;
        player1Ties = snapshot.val().player1TiesFB;
        curPlayer2Choice = snapshot.val().player2ChoiceFB;
        player2Wins = snapshot.val().player2WinsFB;
        player2Losses = snapshot.val().player2LossesFB;
        player2Ties = snapshot.val().player2TiesFB;
        // update player 1 scoreboard
        // $("#1-player1-choice").text("You played: " + curPlayer1Choice);
        // $("#1-player2-choice").text("Player 2 played: " + curPlayer2Choice);
        $("#1-player1-wins").text("Wins: " + player1Wins);
        $("#1-player1-losses").text("Losses: " + player1Losses);
        $("#1-player1-ties").text("Ties: " + player1Ties);
        // update player 2 scoreboard
        // $("#2-player2-choice").text("You played: " + curPlayer2Choice);
        // $("#2-player1-choice").text("Player 1 played: " + curPlayer1Choice);
        $("#2-player2-wins").text("Wins: " + player2Wins);
        $("#2-player2-losses").text("Losses: " + player2Losses);
        $("#2-player2-ties").text("Ties: " + player2Ties);
    });
};
function resetScore() {
    database.ref().update({
        "player1ChoiceFB": "",
        "player1WinsFB": 0,
        "player1LossesFB": 0,
        "player1TiesFB": 0,
        "player2ChoiceFB": "",
        "player2WinsFB": 0,
        "player2LossesFB": 0,
        "player2TiesFB": 0,
        "player1BtnClickFB": false,
        "player2BtnClickFB": false,
    });
}
$("#reset-score").on("click", function(event){
    event.preventDefault();
    resetScore();
})
updateScoreBoard();