// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  return input.question("Let's play some scrabble! Enter a word:");
}

function simpleScorer(word) {
  word = word.toUpperCase();
  let score = word.length;
  return score;
}

function vowelBonusScorer(word) {
  word = word.toUpperCase();
  let score = 0;

  for (let i = 0; i < word.length; i++) {
    if ("AEIOU".includes(word[i])) {
      score += 3;
    } else {
      score += 1;
    }
  }

  return score;
}

function transform(oldPointStructure) {
  let newPointStructure = {};
  for (let pointValue in oldPointStructure) {
    let letters = oldPointStructure[pointValue];
    for (let i = 0; i < letters.length; i++) {
      let letter = letters[i].toLowerCase();
      newPointStructure[letter] = Number(pointValue);
    }
  }
  return newPointStructure;
}
// let newPointStructure = {
//   'Q': 10, 'Z': 10, 'J': 8, 'X': 8, 'K': 5, 'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,
//   'B': 3, 'C': 3, 'M': 3, 'P': 3,
//   'D': 2, 'G': 2,
//   'A': 1, 'E': 1, 'I': 1, 'L': 1, 'N': 1, 'O': 1, 'R': 1, 'S': 1, 'T': 1, 'U': 1
// };
let newPointStructure = transform(oldPointStructure);

function scrabbleScorer(word) {
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    let letter = word[i].toLowerCase();
    if (newPointStructure.hasOwnProperty(letter)) {
      score += newPointStructure[letter];
    }
  }
  return score;
}

let scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer,
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScorer,
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scorerFunction: scrabbleScorer,
  },
];

scoringAlgorithms[2].scorerFunction = scrabbleScorer;

function scorerPrompt() {
  console.log("\nWhich scoring algorithm would you like to use?\n");

  for (let i = 0; i < scoringAlgorithms.length; i++) {
    console.log(
      `${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`
    );
  }

  let selectedOption = input.question("Enter the number of your choice: ");

  if (selectedOption >= 0 && selectedOption < scoringAlgorithms.length) {
    console.log(`\nUsing ${scoringAlgorithms[selectedOption].name}\n`);
    return scoringAlgorithms[selectedOption];
  } else {
    console.log("Invalid input. Using the default scoring algorithm.\n");
    return scoringAlgorithms[0];
  }
}

console.log("Scrabble scoring values for");
console.log("letter Q: ", newPointStructure["Q"]);
console.log("letter Z: ", newPointStructure["Z"]);
console.log("letter A: ", newPointStructure["A"]);

function runProgram() {
  let wordToScore = initialPrompt();
  let selectedScorer = scorerPrompt();
  let score = selectedScorer.scorerFunction(wordToScore);

  console.log(`Score for '${wordToScore}': ${score}\n`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
