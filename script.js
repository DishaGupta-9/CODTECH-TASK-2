const questions = [
  {
    question: "What is the capital of Canada?",
    answers: [
      { text: "Toronto", correct: false},
      { text: "Vancouver", correct: false},
      { text: "Ottawa", correct: true},
      { text: "Montreal", correct: false},
    ]
  },
  {
    question: "Which ancient civilization built the Machu Picchu?",
    answers: [
      { text: "Inca", correct: true},
      { text: "Aztec", correct: false},
      { text: "Maya", correct: false},
      { text: "Olmec", correct: false},
    ]
  },
  {
    question: "Which data structure uses LIFO (Last In, First Out) principle?",
    answers: [
      { text: "Queue", correct: false},
      { text: "Linked List", correct: false},
      { text: "Tree", correct: false},
      { text: "Stack", correct: true},
    ]
  },
  {
    question: "What is the main purpose of DNS (Domain Name System)?",
    answers: [
      { text: "To provide IP addresses to MAC addresses", correct: false},
      { text: "To establish a secure connection", correct: false},
      { text: "To manage network traffic", correct: false},
      { text: "To resolve domain names to IP addresses", correct: true},
    ]
  },
  {
    question: "What is the highest mountain in Africa?",
    answers: [
      { text: "Mount Kenya", correct: false},
      { text: "Mount Kilimanjaro", correct: true},
      { text: "Mount Elgon", correct: false},
      { text: "Mount Meru", correct: false},
    ]
  },
  {
    question: "Who wrote the play 'Hamlet'?",
    answers: [
      { text: "William Shakespeare", correct: true},
      { text: "Christopher Marlowe", correct: false},
      { text: "Ben Jonson", correct: false},
      { text: "Thomas Kyd", correct: false},
    ]
  },
  {
    question: "Which of the following is not a programming paradigm?",
    answers: [
      { text: "Object-Oriented", correct: false},
      { text: "Functional", correct: false},
      { text: "Procedural", correct: false},
      { text: "Sequential", correct: true},
    ]
  },
  {
    question: "What is the time complexity of binary search algorithm in the worst case?",
    answers: [
      { text: "O(n)", correct: false},
      { text: "O(n log n)", correct: false},
      { text: "O(log n)", correct: true},
      { text: "O(1)", correct: false},
    ]
  },
  {
    question: "Which country won the first FIFA World Cup in 1930?",
    answers: [
      { text: "Brazil", correct: false},
      { text: "Germany", correct: false},
      { text: "Argentina", correct: false},
      { text: "Uruguay", correct: true},
    ]
  },
  {
    question: "In computer networking, what does VPN stand for?",
    answers: [
      { text: "Virtual Private Network", correct: true},
      { text: "Virtual Public Network", correct: false},
      { text: "Virtual Protected Network", correct: false},
      { text: "Virtual Provisional Network", correct: false},
    ]
  }  
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});

startQuiz();
