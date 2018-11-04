//prevent numbers and duplicates?
//display with spaces, but ignore in guessing
//^^same with caps, strip of capitalization

var wins = 0;
var losses = 0;
var guesses = 7;

var personas = ["Major Tom", "Ziggy Stardust", "Thin White Duke", "Pierrot", "Aladdin Sane", "Halloween Jack", "Jareth"];

var currentPersona = "";

var lettersPersona = [];

var blankSpaces = 0;

var blanksLetters = [];

var incorrectLetters = [];

var isAlpha = function(ch){
    if (ch >= "A" && ch <= "z") {
        return true
    }

}

function hangmanJS() {

  document.getElementById("alert").innerHTML = "";

guesses = 7;
blanksLetters = [];
incorrectLetters = [];

// currentPersona = personas[Math.random(personas.length)];
currentPersona = personas[Math.floor(Math.random() * personas.length)];
console.log(currentPersona);
lowerPersona = currentPersona.toLowerCase();

lettersPersona = lowerPersona.split("");

blankSpaces = lettersPersona.length;

console.log(lowerPersona);
console.log(lettersPersona);
console.log(blankSpaces);

for (var i = 0; i < blankSpaces; i++) {
  blanksLetters.push("_");
}

console.log(blanksLetters);

document.getElementById("guesses").innerHTML = guesses;
document.getElementById("blanks-letters").innerHTML = blanksLetters.join(" "); //?
document.getElementById("incorrect-letters").innerHTML = incorrectLetters.join(" ");

}

function checkLetters(letter) {

var letterInWord = false;

for (var i = 0; i < blankSpaces; i++) {

  if (lowerPersona[i] === letter) {
    letterInWord = true;
  }
}

if (letterInWord == true) {

  for (var j = 0; j < blankSpaces; j++) { //try again without this j for loop

  if (lowerPersona[j] === letter) { //didn't work

    blanksLetters[j] = letter;
  }
}
console.log(blanksLetters);
}

else {

  guesses--;
  incorrectLetters.push(letter);

}

}

function alreadyGuessed(key) {

var tried = false;
console.log(key);

for (var k=0; k < incorrectLetters; k++) {
  if (key === incorrectLetters[k]) {
    tried = true;
    console.log(tried);
    //i tried
  }
}

}

function next() {

  console.log(wins)
  console.log(losses)
  console.log(guesses)

  document.getElementById("guesses").innerHTML = guesses;
  document.getElementById("blanks-letters").innerHTML = blanksLetters.join(" "); //?
  document.getElementById("incorrect-letters").innerHTML = incorrectLetters.join(" ");

  var trimPersona = lettersPersona.toString().replace(/\s/g,'_');
  console.log("lowerPersona: " + lowerPersona.toString());
  console.log("Trim: " + trimPersona.toString());
  console.log("blanksLetters: " + blanksLetters.toString());

  if (trimPersona.toString() === blanksLetters.toString()) { //does 2 work?

  document.getElementById("alert").innerHTML = "You Win!";
  wins++;
  document.getElementById("wins").innerHTML = wins;

  //win alert, also display word
  alert("Yes! You guessed " + currentPersona)

  hangmanJS();

  }

  else if (guesses === 0) {

    document.getElementById("alert").innerHTML = "You Lose!";
    wins++;
    document.getElementById("losses").innerHTML = losses;

    //loss alert, display word
    alert("The persona was " + currentPersona)

    hangmanJS();

  }
}

document.onmouseup = hangmanJS();
// hangmanJS();

document.onkeypress = function(event) {



var letterEntered = String.fromCharCode(event.which).toLowerCase(); //look up .which

if (isAlpha(letterEntered)) {
  alreadyGuessed(letterEntered);
checkLetters(letterEntered);
next();

}

else {

console.log("not letter")

next();

}

};
