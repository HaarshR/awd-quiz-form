//! Imports
const questionNumber = document.getElementById("questionNumber"); // Question Number
const question = document.getElementById("question"); // Question

// Radio buttons for answers
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option1 = document.getElementById("option4");

// Buttons
const btnNext = document.getElementById("btnNext");
const btnPrevious = document.getElementById("btnPrevious");
const btnSave = document.getElementById("btnSave");

//! Questions
// dummy data
const questions = [
  {
    questionNumber: 1,
    question: "Something",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correctAnswerIndex: 1,
  },
];
