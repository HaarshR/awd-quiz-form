// DATABASE START
// Data to be stored in the IndexedDB database
let data = [
  {
    questionNumber: "Question 1",
    question: "For which of the following disciplines is Nobel Prize awarded?",
    answers: [
      "Physics and Chemistry",
      "Physiology or Medicine",
      "Literature, Peace and Economics",
      "All of the above",
    ],
    correctAnswerIndex: 3,
  },
  {
    questionNumber: "Question 2",
    question: "Hitler party which came into power in 1933 is known as",
    answers: ["Labour Party", "Nazi Party", "Ku-Klux-Klan", "Democratic Party"],
    correctAnswerIndex: 1,
  },
  {
    questionNumber: "Question 3",
    question: "First China War was fought between",
    answers: [
      "China and Britain",
      "China and France",
      "China and Egypt",
      "China and Greek",
    ],
    correctAnswerIndex: 1,
  },
];

//request to open database
let request = indexedDB.open("questions", 1);
let db;

request.onupgradeneeded = function (event) {
  db = event.target.result;

  let ques;
  ques = db.createObjectStore("questions", { keyPath: "questionNumber" });
  ques = request.transaction.objectStore("questions");

  ques.createIndex("questionNumber", "questionNumber", { unique: true });
  ques.createIndex("question", "question", { unique: true });
  ques.createIndex("answers", "answers", { unique: false });
  ques.createIndex("correctAnswerIndex", "correctAnswerIndex", {
    unique: false,
  });
  //make sure object creation is finished before adding data into it
  ques.transaction.oncomplete = function (event) {
    // store values in the newly created objectStore
    let questionStore = db
      .transaction("questions", "readwrite")
      .objectStore("questions");
    data.forEach(function (question) {
      questionStore.add(question);
    });
  };
};

request.onsuccess = function (event) {
  db = event.target.result;
};
request.onerror = function (event) {
  alert(event.target.errorCode);
};
// DATABASE END

let storage = window.localStorage; // Local Storage

//! QUESTIONS
let currentIndex = 0; // Current question that is being displayed (zero indexed)
let questions; // Different questios

let results = []; // Answers the player chooses

//! Imports
const progressBar = document.getElementById("progressBar"); // Progressbar
const questionNumber = document.getElementById("questionNumber"); // Question Number
const question = document.getElementById("question"); // Question

// Radio button
let inputOptions = [
  document.getElementById("option1"),
  document.getElementById("option2"),
  document.getElementById("option3"),
  document.getElementById("option4"),
];

// Labels for answers
const option1Label = document.getElementById("option1Label");
const option2Label = document.getElementById("option2Label");
const option3Label = document.getElementById("option3Label");
const option4Label = document.getElementById("option4Label");

// Buttons
const btnNext = document.getElementById("btnNext");
const btnPrevious = document.getElementById("btnPrevious");
const btnSave = document.getElementById("btnSave");

btnSave.disabled = true; // The submit quiz button is disabled at the start

// Start the Quiz
window.onload = function () {
  getData();

  // Timeout is set to emulate asynchronous behaviour
  setTimeout(() => {
    setQuestion(currentIndex);
  }, 1000);
};

/*
  Function to fetch data from the IndexedDB.
  It queries all the questions in the database and stores it in the questions[] array
*/
const getData = () => {
  var transaction = db.transaction("questions");
  var objectStore = transaction.objectStore("questions");
  objectStore.getAll().onsuccess = function (e) {
    questions = e.target.result;
  };
};

/*
  Function to set the different question details (question number, question, answers)
*/
const setQuestion = (index) => {
  let questionData = questions[index]; // Select the current question

  questionNumber.innerText = questionData.questionNumber; // Set the question number
  question.innerText = questionData.question; // Set the question itself

  // Set the answers in the radio button labels
  option1Label.innerText = questionData.answers[0];
  option2Label.innerText = questionData.answers[1];
  option3Label.innerText = questionData.answers[2];
  option4Label.innerText = questionData.answers[3];
};

// Function that moves to the next question
const nextQuestion = () => {
  // Checks if there are any questions next
  if (currentIndex != questions.length - 1) {
    currentIndex += 1; // Updates current question number
    setQuestion(currentIndex); // Updates current question on screen
    inputChecked(); // Checks if any previous input was checked
    updateProgressBar(); // Updates the progressbar (added for redundancy)
  }
};

// Function that moves to the previous question
const previousQuestion = () => {
  // Checks if there are any questions previously
  if (currentIndex !== 0) {
    currentIndex -= 1; // Updates current question number
    setQuestion(currentIndex); // Updates current question on screen
    inputChecked(); // Checks if any previous input was checked
    updateProgressBar(); // Updates the progressbar (added for redundancy)
  }
};

/** 
 * Function to set the answer of the user for the current question.
  It is executed when the user checks a radio button.
*/
const setAnswerOption = (answerOption) => {
  // Store answer details
  let currentOption = {
    question: currentIndex, // What question was answered
    option: answerOption, // What was the chosen answer
  };
  results[currentIndex] = currentOption; // Adds the answer details in the results array
  console.log(results); // loggin the array for testing purposes
  checkCompletion(); // Checks if the user has answered all questions to then enable the Submit Quiz button
  updateProgressBar(); // Updates the progressbar
};

/**
 * Function to check if all questions have been answered.
 * If true then the Submit Quiz button is enabled
 */
const checkCompletion = () => {
  if (results.length === questions.length) {
    btnSave.disabled = false; // Enables the button
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

/**
 * Function that calculates the percentage completion of the quiz and updates the progressbar accordingly
 */
const updateProgressBar = () => {
  let completion = (results.length / questions.length) * 100; // Gets the percentage completion
  progressBar.style.width = completion + "%"; // Updates the width style of the progressbar

  // When all questions have been answered, the color of the progressbar is changed to green
  // This is done by removing the bootstrap css bg-warning class and replacing it with the bg-success css class.
  if (completion === 100) {
    progressBar.classList.remove("bg-warning");
    progressBar.classList.add("bg-success");
  }
};

/**
 * Function that sets the questions and user answers in Local Storage.
 * The data is first converted to JSON format as Local Storage only stores string data type
 */
const validateAnswers = () => {
  storage.setItem("answers", JSON.stringify(results)); // Converts answers to JSON and set in Local Storage
  storage.setItem("questions", JSON.stringify(questions)); // Converts questions to JSON and set in Local Storage
  window.location.replace("results.html"); // Navigates to the results page
};
