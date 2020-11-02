let storage = window.localStorage; // Local Stogra
//! DATA
// Retrieve the data that was set in Local Storage
let results = JSON.parse(storage.getItem("answers"));
let questions = JSON.parse(storage.getItem("questions"));
console.log(results); // for testing
console.log(questions); // for testing

//! Imports
const potentialScore = document.getElementById("potentialScore"); // Score that can be obtained (high score)
const score = document.getElementById("score"); // Score that the user got

const questionNumber = document.getElementById("questionNumber"); // Question Number
const question = document.getElementById("question"); // Question

// Radio buttons
let inputOptions = [
  document.getElementById("option1"),
  document.getElementById("option2"),
  document.getElementById("option3"),
  document.getElementById("option4"),
];
// Labels for answers
let inputLabels = [
  document.getElementById("option1Label"),
  document.getElementById("option2Label"),
  document.getElementById("option3Label"),
  document.getElementById("option4Label"),
];

// Buttons
const btnNext = document.getElementById("btnNext"); // Next button
const btnPrevious = document.getElementById("btnPrevious"); // Previous button
const btnAgain = document.getElementById("btnAgain"); // Try again button

let currentIndex = 0; // Current question

// When page loads
window.onload = function () {
  setTimeout(() => {
    calculateScore(); // Score that the user obtained is calculated
    setQuestion(currentIndex); // The questions are set
  }, 1000);
};

/*
  Function to set the different question details (question number, question, answers)
*/
const setQuestion = (index) => {
  let questionData = questions[index];
  let resultData;

  results.forEach((result) => {
    if (result.question === index) {
      resultData = result;
    }
  });

  questionNumber.innerText = questionData.questionNumber;
  question.innerText = questionData.question;

  inputLabels.forEach((label, index) => {
    label.innerText = questionData.answers[index];
  });

  // The color of the correct answer and the answer the user chose is set
  // If the option the user chose is equivalent to the correct answer, only one label is updated
  if (resultData.option === questionData.correctAnswerIndex) {
    inputLabels[questionData.correctAnswerIndex].classList.add("text-success"); // Correct answer
  } else {
    // If the answer is wrong, the correct answer label is changed to green and the user's choice is set to red (text-success, text-danger)
    inputLabels[questionData.correctAnswerIndex].classList.add("text-success"); // Correct answer
    inputLabels[resultData.option].classList.add("text-danger"); // User's choice
  }

  inputChecked(); // Updated the check property corresponding to the user's choice
};

/**
 * Function to start the game again
 * Clears the Local Storage and navigates to the index page
 */
const playAgain = () => {
  storage.clear();
  window.location.replace("/");
};

/**
 * Function to calculate the user's score
 */
const calculateScore = () => {
  potentialScore.innerText = questions.length; // Potential (maximum) score is the total number of questions that can be answered
  let finalScore = 0; // User's score

  // Check each questions and compared the index of the correct answer to what answer the user had chosen
  questions.forEach((question, index) => {
    if (results[index].option === question.correctAnswerIndex) {
      finalScore += 1; // Increment score
    }
  });

  score.innerText = finalScore; // Set user's final score
};

/**
 * Function to clear relevant classes attached to the answer labels
 */
const resetLabels = () => {
  inputLabels.forEach((label) => {
    // Remove text-success css class if it was present
    if (label.classList.contains("text-success")) {
      label.classList.remove("text-success");
    }
    // Remove text-danger css class if it was present
    if (label.classList.contains("text-danger")) {
      label.classList.remove("text-danger");
    }
  });
};

// Function that moves to the next question
const nextQuestion = () => {
  // Checks if there are any questions next
  if (currentIndex != questions.length - 1) {
    currentIndex += 1; // Updates current question number
    resetLabels(); // Reset styling on all the answer labels
    setQuestion(currentIndex); // Updates current question on screen
    inputChecked(); // Checks if any previous input was checked
  }
};

// Function that moves to the previous question
const previousQuestion = () => {
  // Checks if there are any questions previously
  if (currentIndex !== 0) {
    currentIndex -= 1; // Updates current question number
    resetLabels(); // Reset styling on all the answer labels
    setQuestion(currentIndex); // Updates current question on screen
    inputChecked(); // Checks if any previous input was checked
  }
};

/**
 * Function that 'checks' the radio button when moving to the next or previous question.
 * This ensures that the radio button that is checked corresponds to what option the user had chosen.
 */
const inputChecked = () => {
  if (results[currentIndex]) {
    inputOptions[results[currentIndex].option].checked = true; // Checks the appropriate radio button
  }
};
