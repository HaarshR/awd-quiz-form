// DATABASE START
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

//! QUESTIONS
let currentIndex = 0;
let questions;

let results = [];

//! Imports
const questionNumber = document.getElementById("questionNumber"); // Question Number
const question = document.getElementById("question"); // Question

// Labels for answers
const option1Label = document.getElementById("option1Label");
const option2Label = document.getElementById("option2Label");
const option3Label = document.getElementById("option3Label");
const option4Label = document.getElementById("option4Label");

// Buttons
const btnNext = document.getElementById("btnNext");
const btnPrevious = document.getElementById("btnPrevious");
// const btnSave = document.getElementById("btnSave");

const form = document.getElementsByClassName("form-group");

//start the quiz
window.onload = function () {
  getData();

  setTimeout(() => {
    setQuestion(currentIndex);
  }, 1000);
};

const getData = () => {
  var transaction = db.transaction("questions");
  var objectStore = transaction.objectStore("questions");
  objectStore.getAll().onsuccess = function (e) {
    questions = e.target.result;
  };
};

const setQuestion = (index) => {
  let questionData = questions[index];

  questionNumber.innerText = questionData.questionNumber;
  question.innerText = questionData.question;

  option1Label.innerText = questionData.answers[0];
  option2Label.innerText = questionData.answers[1];
  option3Label.innerText = questionData.answers[2];
  option4Label.innerText = questionData.answers[3];
};

const nextQuestion = () => {
  if (currentIndex != questions.length - 1) {
    currentIndex += 1;
    setQuestion(currentIndex);
  }
};

const previousQuestion = () => {
  if (currentIndex !== 0) {
    currentIndex -= 1;
    setQuestion(currentIndex);
  }
};
