
jQuery(document).ready(function() {
var playersGuess;
var winningNumber = generateRandomNumber(1, 100);
var guesses = [];
var guessesRem = 5;
var range = {min: 1, max: 100};

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateRandomNumber(min, max){
	return min+Math.round(Math.random()*(max-min));
}

// Fetch the Players Guess
function playersGuessSubmission() {
	playersGuess = +$("#guess").val();
	$("#guess").val("");
	if (isNaN(playersGuess)||"") {
		alert("Hey! That's not a number!");
	} else {
		checkGuess();
	}
}

// Determine if the next guess should be a lower or higher number
function lowerOrHigher(){
	var message = "your guess is ";
	if (playersGuess > winningNumber) {
		if (playersGuess < range.max) range.max = playersGuess-1;
		message +=" higher ";
	} else {
		if (playersGuess > range.min) range.min = playersGuess+1;
		message +=" lower ";
	}
	var distance = Math.abs(playersGuess-winningNumber);
	if (distance <= 5) {
		message +="and within 5 digits of ";
	} else if (distance <=10) {
		message +="and within 10 digits of ";
	} else if (distance <= 20) {
		message +="and within 20 digits of ";
	} else {
		message +="and more than 20 digits away from ";
	}
	return message +="the winning number.  ";
}

// Check if the Player's Guess is the winning number 

function guessMessage() {
	guesses.push(playersGuess);
	guessesRem--;
	if (guessesRem == 0) {
		$(".game").addClass("off");
		return "you lose. the number was "+winningNumber+". play again?";
	} else {
		return lowerOrHigher()+"you have "+guessesRem+(guessesRem===1 ? " guess" : " guesses")+" remaining";
	}
}

function checkGuess(){
	var message;
	if (guesses.indexOf(playersGuess) > -1) {
		message = "you already guessed that. try again";
	} else if (playersGuess===winningNumber) {
		$("blockquote").slideDown("slow");
		$(".game").addClass("off");
		message = "YOU WIN!";
	} else {
		message = guessMessage();
		$(".guessBox").show();
		$("#history").text(guesses.join(", "));
	}
	$("#message").text(message);
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	$("#hint").show();
	var candidates = [];
	while ((candidates.length < guessesRem+1) && ((range.max-range.min) >= (guessesRem))) {
		var candidate = (generateRandomNumber(range.min, range.max));
		if (candidates.indexOf(candidate) < 0) candidates.push(candidate);
	};
	if (candidates.indexOf(winningNumber) < 0) {
		candidates[generateRandomNumber(0, candidates.length)]=winningNumber;
	}
	if (candidates.length==1) $("#hint").text("come on bro");
	else $("#hint").text("one of these is the winning number: "+candidates.join(", "));
}

// Allow the "Player" to Play Again

function playAgain(){
	guesses=[]
	winningNumber=generateRandomNumber(1, 100);
	$(".off").removeClass("off");
	guessesRem=5;
	playersGuess = "";
	$("p").text("");
	$("blockquote").slideUp("slow");
	range = {min: 1, max: 100};
	$(".guessBox").hide();
}

	$(".mute").on("mouseenter", function() {
		$("#guess").removeClass("mute");
		$("#guess").val("");
	});

	$(".game").on("submit", function() {
		$("#hint").hide();
		if (!($(".game").hasClass("off"))) playersGuessSubmission();
		return false;
	});

	$("#playAgain").on("click", function() {
		playAgain();
	})

	$("#giveHint").on("click", function() {
		if (!($(this).hasClass("off"))) provideHint();
		$(this).addClass("off");
	})
})






