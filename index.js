// //! Imports
const questionNumber = document.getElementById("questionNumber"); // Question Number
const question = document.getElementById("question"); // Question

// // Radio buttons for answers
const option1 = document.getElementById("opt1");
const option2 = document.getElementById("opt2");
const option3 = document.getElementById("opt3");
const option4 = document.getElementById("opt4");

// // Buttons
  const btnNext = document.getElementById("btnNext");
  const btnPrevious = document.getElementById("btnPrevious");
// const btnSave = document.getElementById("btnSave");

const form = document.getElementsByClassName('form-group')

// //! Questions
// // dummy data
const questionsData = [
  {
    questionNumber: 'Question 1',
    question: "For which of the following disciplines is Nobel Prize awarded?",
    answers: ["Physics and Chemistry", "Physiology or Medicine", "Literature, Peace and Economics", "All of the above"],
    correctAnswerIndex: 3,
  },
  {
    questionNumber: 'Questions 2',
    question: "Hitler party which came into power in 1933 is known as",
    answers: ["Labour Party", "Nazi Party", "Ku-Klux-Klan", "Democratic Party"],
    correctAnswerIndex: 1,
  },
  {
    questionNumber: 'Questions 3',
    question: "First China War was fought between",
    answers: ["China and Britain", "China and France", "China and Egypt", "China and Greek"],
    correctAnswerIndex: 1,
  },
];

let currentIndex = 0;

//request to open database
let request = indexedDB.open('questions', 1);
let db;

request.onupgradeneeded = function(event){
  db = event.target.result;

  let ques;
  ques = db.createObjectStore('questions', {keyPath: 'questionNumber'});
  ques = request.transaction.objectStore('questions');

  ques.createIndex('questionNumber','questionNumber',{unique:true});
  ques.createIndex('question','question',{unique:true});
  ques.createIndex('answers','answers', {unique:false});
  ques.createIndex('correctAnswerIndex','correctAnswerIndex',{unique:false});
//make sure object creation is finished before adding data into it
  ques.transaction.oncomplete = function(event){
    // store values in the newly created objectStore
    let questionStore = db.transaction('questions','readwrite').objectStore('questions');
    questionsData.forEach(function(question){
      questionStore.add(question);
    });
  };
};



request.onsuccess = function(event){
  db = event.target.result
}
request.onerror = function(event){
  alert(event.target.errorCode);
}

//start the quiz
window.onload = function(){
  this.load();
}

function load(){
  var transaction = db.transaction('questions');
  var objectStore = transaction.objectStore("questions");
  objectStore.openCursor().onsuccess = function(event){
    let cursor = event.target.result;
    if (cursor){
      questionNumber.innerHTML = (cursor.value.questionNumber);
      question.innerHTML = (cursor.value.question);
      option1.innerHTML = (cursor.value.answers[0]);
      option2.innerHTML = (cursor.value.answers[1]);
      option3.innerHTML = (cursor.value.answers[2]);
      option4.innerHTML = (cursor.value.answers[3]);
      
    }
  }
}

function next(){
  this.load();
 
}






//array to hold questions

//let question;
