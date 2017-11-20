var wins = 0;
//Object of Game
var game = {
    words:["PITCHFORK", "ARRAY", "INFERNO", "INFINITY", "FUNCTION","SATAN","PURGATORY","PERDITION","UNDERWORLD","OBJECT","VARIABLE","CONSOLE"],
    guessesLeft:12,   
    lettersGuessed:[],
    progressWord: [],
    mysteryWord: [],
    currentWord: "",
    pickRandomWord: function(){
         this.currentWord = this.words[Math.floor(Math.random() * this.words.length)].toUpperCase();
    },
    positions: function(letter) {
        var positions = new Array();
        for (var i = 0 ; i < this.currentWord.length; i++) {
            if (this.currentWord[i] === letter)
                positions.push(i);
        }
        return positions;
    },
    guesses: function () {
        var toGuess = 0;
        for (var i in this.progressWord) {
            if (this.progressWord[i] === "__")
                toGuess++;
        }
        return toGuess;
    },
    reset: function(){
        this.guessesLeft = 12;
        this.lettersGuessed = [];
        this.progressWord = [];
        this.mysteryWord = [];
    }
}

//SetUp Game
setUpGame();

function setUpGame(){
    game.pickRandomWord();
    document.getElementById("word-guess").innerHTML = "";
    document.getElementById("letters-guessed").innerHTML = "";
    document.getElementById("guesses-left").innerHTML = game.guessesLeft;    
    document.getElementById("wins").innerHTML = wins;

    console.log("Current word is: " + game.currentWord);

    for (var i = 0; i < game.currentWord.length; i++) {
        game.progressWord.push("__");
    }
    document.getElementById("word-guess").innerHTML = game.progressWord.join(" ");
}

document.onkeyup = function (event) {
document.getElementById("winLoseDiv").innerHTML = "";
var letter = event.key;
var letterGuessed = letter.toLocaleUpperCase();

var positions = game.positions(letterGuessed);

if (positions.length) {

    for (var i = 0 ; i < positions.length; i++) {
        game.progressWord[positions[i]] = letterGuessed;
    }

    // replace progress Word underscore with letter pressed
    document.getElementById("word-guess").innerHTML = game.progressWord.join(" ");
} else {
    if(game.lettersGuessed.indexOf(letterGuessed)===-1){
        game.lettersGuessed.push(letterGuessed);        
        document.getElementById("letters-guessed").innerHTML += letterGuessed + " ";
        game.guessesLeft--;
        document.getElementById("guesses-left").innerHTML = game.guessesLeft;
    }
}

if (game.guessesLeft === 0) {
    document.getElementById("winLoseDiv").innerHTML = "<iframe id='devilLaugh' width='100%' height='315' src='https://www.youtube.com/embed/pVY1-v97Mic?&autoplay=1' frameborder='0' allowfullscreen></iframe>";
    alert("Game Over! You finished with a streak of " + wins + " wins! The word was " + game.currentWord);
    wins = 0;

    //reset Game
    game.reset();
    setUpGame();
}

if (game.guesses() === 0) {
    document.getElementById("winLoseDiv").innerHTML = "<iframe id='heaven' width='100%' height='315' src='https://www.youtube.com/embed/0dfZ4jxamW8?&autoplay=1' frameborder='0' gesture='media' allowfullscreen></iframe>";
    alert("You Win!!!");
    // Add to the win total
    wins++;

    //reset Game
    game.reset();
    setUpGame();            
 }
}