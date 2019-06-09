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
        var userGuess = event.key;
        var computerGuess = computerChoices[Math.floor(Math.random()*computerChoices.length)]

    
        if ((userGuess === "r") || (userGuess === "p") || (userGuess === "s")) {
            if ((userGuess === "r") && (computerGuess === "s")) {
                wins++
            }
            else if ((userGuess == "r") && (computerGuess === "p")) {
                losses++
            }
            else if ((userGuess === "p") && (computerGuess === "r")) {
                wins++
            }
            else if ((userGuess === "p") && (computerGuess === "s")) {
                losses++
            }
            else if ((userGuess === "s") && (computerGuess === "p")) {
                wins++
            }
            else if ((userGuess === "s") && (computerGuess === "r")) {
                losses++
            }
            else if (userGuess === computerGuess) {
                ties++
            }
        };
    
        directionsText.textContent = " ";
        user1ChoiceText.textContent = "You chose " + userGuess + ".";
        user2ChoiceText.textContent = "The computer chose " + computerGuess + ".";
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