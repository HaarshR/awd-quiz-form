let storage = window.localStorage;
//! DATA
let results = JSON.parse(storage.getItem("answers"));
let questions = JSON.parse(storage.getItem("questions"));
console.log(results);
console.log(questions);

//! Imports
const potentialScore = document.getElementById("potentialScore");
const score = document.getElementById("score");

const questionNumber = document.getElementById("questionNumber"); // Question Number
const question = document.getElementById("question"); // Question

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
const btnNext = document.getElementById("btnNext");
const btnPrevious = document.getElementById("btnPrevious");
const btnAgain = document.getElementById("btnAgain");

let currentIndex = 0;

window.onload = function () {
  setTimeout(() => {
    calculateScore();
    setQuestion(currentIndex);
  }, 1000);
};

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

  if (resultData.option === questionData.correctAnswerIndex) {
    inputLabels[questionData.correctAnswerIndex].classList.add("text-success");
  } else {
    inputLabels[questionData.correctAnswerIndex].classList.add("text-success");
    inputLabels[resultData.option].classList.add("text-danger");
  }

  inputChecked();
};

const playAgain = () => {
  storage.clear();
  window.location.replace("/");
};

const calculateScore = () => {
  potentialScore.innerText = questions.length;
  let finalScore = 0;

  questions.forEach((question, index) => {
    if (results[index].option === question.correctAnswerIndex) {
      finalScore += 1;
    }
  });

  score.innerText = finalScore;
};

const resetLabels = () => {
  inputLabels.forEach((label, index) => {
    if (label.classList.contains("text-success")) {
      label.classList.remove("text-success");
    }
    if (label.classList.contains("text-danger")) {
      label.classList.remove("text-danger");
    }
  });
};

const nextQuestion = () => {
  if (currentIndex != questions.length - 1) {
    currentIndex += 1;
    resetLabels();
    setQuestion(currentIndex);
    inputChecked();
  }
};

const previousQuestion = () => {
  if (currentIndex !== 0) {
    currentIndex -= 1;
    resetLabels();
    setQuestion(currentIndex);
    inputChecked();
  }
};
const inputChecked = () => {
  if (results[currentIndex]) {
    inputOptions[results[currentIndex].option].checked = true;
  }
};

const checkScore = () => {};
