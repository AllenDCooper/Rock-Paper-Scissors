var computerChoices = ["r", "p", "s"];

    var wins = 0;
    var losses = 0;
    var ties = 0;

    var directionsText = document.getElementById("directions-text");
    var user1ChoiceText = document.getElementById("user1choice-text");
    var user2ChoiceText = document.getElementById("user2choice-text");
    var winsText = document.getElementById("wins-text");
    var lossesText = document.getElementById("losses-text");
    var tiesText = document.getElementById("ties-text");

    document.onkeyup = function(event) {
        var user1Guess = event.key;
        var user2Guess = computerChoices[Math.floor(Math.random()*computerChoices.length)]

    
        if ((user1Guess === "r") || (user1Guess === "p") || (user1Guess === "s")) {
            if ((user1Guess === "r") && (user2Guess === "s")) {
                wins++
            }
            else if ((user1Guess == "r") && (user2Guess === "p")) {
                losses++
            }
            else if ((user1Guess === "p") && (user2Guess === "r")) {
                wins++
            }
            else if ((user1Guess === "p") && (user2Guess === "s")) {
                losses++
            }
            else if ((user1Guess === "s") && (user2Guess === "p")) {
                wins++
            }
            else if ((user1Guess === "s") && (user2Guess === "r")) {
                losses++
            }
            else if (user1Guess === user2Guess) {
                ties++
            }
        };
    
        directionsText.textContent = " ";
        user1ChoiceText.textContent = "You chose " + user1Guess + ".";
        user2ChoiceText.textContent = "Player 2 chose " + user2Guess + ".";
        winsText.textContent = "Wins: " + wins;
        lossesText.textContent = "Losses: " + losses;
        tiesText.textContent = "Ties: " + ties;
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