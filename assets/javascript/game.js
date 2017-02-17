var wins = 0;
var guesses = 12;
var tries = [];			// array for letters tried that didn't work
var blankSpace = []; 	// array for blank spaces for random selected word
var wordBank = ["jobs", "keythe", "barney", "world", "adam", "gentrification", "jesus"];

// get random word for computer
var word = wordBank[Math.floor(Math.random() * wordBank.length)];

// function to pop out all letters in tries and blanks array
function out(array){
	var i = array.length - 1;

	while (array[i]){
		array.pop();
		i--;
	}
}

// function to push blank spaces into blanks array
function createBlanks(original, blanks){
	var i = 0;

	while (i < (original.length)){
		blanks.push('_');
		i++;
	}
}

// function to check if user input is part of hidden word
function checkLetter(word, letter){
	var i = 0;

	while (word[i]){
		// if the letter was found in the word
		if (word[i] === letter){
			return true;		// if letter was found in word
		}
		i++;					// move to next index of word array
	}	
	return false;				// only runs if letter wasn't found in word
}

// function that changes the letters in blankSpace
function changeLetter(letter){
	// check the word for the same letter
	for (var i = 0; i < word.length; i++){
		// assign letter to blankspace matching where it is in hidden word
		if (word[i] === letter){
			blankSpace[i] = letter;
		}
	}
}

// function that resets everything upon win or running out of guesses
function reset(){
	out(tries);							// clear tried letters
	out(blankSpace);					// empty blankSpace array
	word = wordBank[Math.floor(Math.random() * wordBank.length)];	// swith to new word

	createBlanks(word, blankSpace);		// create new blankSpace array for new word
	guesses = 12						// reset number of guesses
}

// create original blankspace array
createBlanks(word, blankSpace);

// when user presses keys
document.onkeyup = function(event){

	// get user input
	var userGuess = event.key;

	if (userGuess === 'a' || userGuess === 'b' || userGuess === 'c' || userGuess === 'd' || userGuess === 'e' || userGuess === 'f' || userGuess === 'g' || userGuess === 'h' || userGuess === 'i' || userGuess === 'j' || userGuess === 'k' || userGuess === 'l' || userGuess === 'm' || userGuess === 'n' || userGuess === 'o' || userGuess === 'p' || userGuess === 'q' || userGuess === 'r' || userGuess === 's' || userGuess === 't' || userGuess === 'u' || userGuess === 'v' || userGuess === 'w' || userGuess === 'x' || userGuess === 'y' || userGuess === 'z'){
		if (checkLetter(word, userGuess)){
			//TESTING 
	console.log(blankSpace);
	console.log(word);
	console.log("User Input: " + userGuess);

			changeLetter(userGuess);		// changes letters in blankSpace array

			// join elements of blankSpace array into one string
			var isWinner = blankSpace.join("");

			if (isWinner === word){
				wins++;

				reset();
			}
		}
		else if (guesses > 0 && checkLetter(tries, userGuess) === false){
			
				tries.push(userGuess);
				guesses--;
			
		}
		else if (guesses === 0){
			reset();
		}
		
	}

	// create html to be displayed on screen for game 
	var html = "<p>Press any key to get started!</p>" +
	"<p>Wins<br>" + wins + "</p>" + 
	"<p>Current Word<br>" + blankSpace + "</p>" +
	"<p>Number of Guesses Remaining<br>" + guesses + "</p>" + 
	"<p>Letters Already Guessed<br>" + tries + "</p>";

	// inject above HTML into webpage
	document.getElementById("game").innerHTML = html;
};