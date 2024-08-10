const questionLabel = document.querySelector(".question__display");
const btns = document.querySelectorAll(".btn--option");
const questionsContainer = document.querySelector(".questions");
const nextBtn = document.querySelector(".next");
const progressElement = document.querySelector(".prog");
const numQuestionInfo = document.querySelector(".qustion__num__info");
const scoreElement = document.querySelector(".score__display");
const startBtn = document.querySelector(".btn--start");
const welcomeContainer = document.querySelector(".welcome");
const scoreContainer = document.querySelector(".score");
const containerApp = document.querySelector(".questions-container");
const restartBtn = document.querySelector(".restart");

let activeQuestionIndex = 0;
let answersIndex = 1;
let correctAnswerIndex = 2;
let numQuestion = 1;
let score = 0;

startBtn.addEventListener("click", function () {
  welcomeContainer.classList.add("none");
  scoreContainer.classList.remove("none");
  containerApp.classList.remove("none");
});

nextBtn.addEventListener("click", function () {
  activeQuestionIndex++;
  numQuestion++;
  if (numQuestion <= 15) {
    questionsContainer.classList.remove("disabled");
    btns.forEach((btn) => {
      btn.classList.remove("btn-answer");
      btn.classList.remove("btn-wrong");
      btn.classList.remove("btn-correct");
      btn.disabled = false;
    });
    updateUI();
  } else if (numQuestion > 15) {
  }
});

restartBtn.addEventListener("click", function () {});

questionsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn--option")) {
    const clicked = e.target;
    // always add this class for clicked button
    nextBtn.classList.remove("none");
    clicked.classList.add("btn-answer");
    questionsContainer.classList.add("disabled");
    btns.forEach((btn) => {
      btn.classList.add("btn-wrong");
      btn.disabled = true;
    });
    const correctAnswer = [...btns].filter(
      (btn) =>
        btn.textContent ===
        questions[activeQuestionIndex][correctAnswerIndex][0]
    );
    // correctAnswer returns arry thats why we use [0]
    correctAnswer[0].classList.add("btn-correct");
    if (
      clicked.textContent ===
      questions[activeQuestionIndex][correctAnswerIndex][0]
    ) {
      score += 10;
      scoreElement.textContent = `${score} / 150`;
    }
  }
});

const updateUI = function () {
  nextBtn.classList.add("none");
  numQuestionInfo.textContent = `Question ${numQuestion} / 15`;
  progressElement.value = numQuestion;
  questionLabel.textContent = questions[activeQuestionIndex][0][0];
  btns.forEach((btn, i) => {
    btn.textContent = questions[activeQuestionIndex][answersIndex][i];
  });
};
updateUI();
