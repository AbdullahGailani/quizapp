// labeles {change html text with this}
const questionLabel = document.querySelector(".question__display");
const numQuestionLabel = document.querySelector(".qustion__num__info");
const scoreLabel = document.querySelector(".score__display");
const timerLabel = document.querySelector(".timer");
const resultLabel = document.querySelector(".display--result");
// btns  for event listeners
const btns = document.querySelectorAll(".btn--option");
const nextBtn = document.querySelector(".next");
const startBtn = document.querySelector(".btn--start");
const restartBtn = document.querySelector(".restart");
// elements
const progressElement = document.querySelector(".prog");
// containers
const questionsContainer = document.querySelector(".questions");
const welcomeContainer = document.querySelector(".welcome");
const scoreContainer = document.querySelector(".score");
const containerApp = document.querySelector(".questions-container");
const resultContainer = document.querySelector(".result");

class App {
  #activeQuestionIndex = 0;
  #answersIndex = 1;
  #correctAnswerIndex = 2;
  #numQuestion = 1;
  #score = 0;
  #time = 600; // 600s === 10min;

  constructor() {}

  closeContainerApp() {
    scoreContainer.classList.add("none");
    containerApp.classList.add("none");
  }

  showContainerApp() {
    scoreContainer.classList.remove("none");
    containerApp.classList.remove("none");
  }

  disableQuestionContainer() {
    questionsContainer.classList.add("disabled");
  }

  closeWelcome() {
    welcomeContainer.classList.add("none");
  }

  showWelcome() {
    welcomeContainer.classList.remove("none");
  }

  closeResult() {
    resultContainer.classList.add("none");
  }

  showResult() {
    resultContainer.classList.remove("none");
    resultLabel.textContent = `You scored ${this.#score} out of 150!`;
  }

  closeNextBtn() {
    nextBtn.classList.add("none");
  }

  showNextBtn() {
    nextBtn.classList.remove("none");
  }

  correctAnswerColor() {
    // green backgorund
    const correctAnswer = [...btns].filter(
      (btn) =>
        btn.textContent ===
        questions[this.#activeQuestionIndex][this.#correctAnswerIndex][0]
    );

    correctAnswer[0].classList.add("btn-correct");
  }

  otherAnswerColor() {
    // red background
    btns.forEach((btn) => {
      btn.classList.add("btn-wrong");
      btn.disabled = true;
    });
  }

  addScore(clicked) {
    if (
      clicked.textContent ===
      questions[this.#activeQuestionIndex][this.#correctAnswerIndex][0]
    ) {
      this.#score += 10;
      scoreLabel.textContent = `${this.#score} / 150`;
    }
  }

  userChoice(clicked) {
    clicked.classList.add("btn-answer");
  }

  restoreOptions() {
    questionsContainer.classList.remove("disabled");
    btns.forEach((btn) => {
      btn.classList.remove("btn-answer");
      btn.classList.remove("btn-wrong");
      btn.classList.remove("btn-correct");
      btn.disabled = false;
    });
  }

  nextQuestion() {
    if (this.#numQuestion < 15) {
      this.#activeQuestionIndex++;
      this.#numQuestion++;
    } else {
      this.displayresult();
    }
  }

  updateUI() {
    numQuestionLabel.textContent = `Question ${this.#numQuestion} / 15`;
    progressElement.value = this.#numQuestion;
    questionLabel.textContent = questions[this.#activeQuestionIndex][0][0];
    btns.forEach((btn, i) => {
      btn.textContent =
        questions[this.#activeQuestionIndex][this.#answersIndex][i];
    });
  }

  reset() {
    this.#activeQuestionIndex = 0;
    this.#answersIndex = 1;
    this.#correctAnswerIndex = 2;
    this.#numQuestion = 1;
    this.#score = 0;
    this.#time = 600;
    this.timeOut();
  }

  timeOut() {
    const self = this;
    const intervalId = setInterval(function () {
      if (self.#time > 0) {
        --self.#time;
      } else {
        clearInterval(intervalId);
        self.displayresult();
      }

      const sec = String(self.#time % 60).padStart(2, "0");
      const min = String(Math.floor(self.#time / 60)).padStart(2, "0");
      timerLabel.textContent = `${min}:${sec}`;
    }, 1000);
  }

  displayresult() {
    this.closeContainerApp();
    this.showResult();
  }
}

const app = new App();

startBtn.addEventListener("click", function () {
  app.timeOut();
  app.updateUI();
  app.closeWelcome();
  app.showContainerApp();
});

nextBtn.addEventListener("click", function () {
  app.nextQuestion();
  app.restoreOptions();
  app.updateUI();
  app.closeNextBtn();
});

restartBtn.addEventListener("click", function () {
  app.closeResult();
  app.reset();
  app.showContainerApp();
  app.updateUI();
});

questionsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn--option")) {
    const clicked = e.target;

    app.disableQuestionContainer();
    app.showNextBtn();
    app.userChoice(clicked);
    app.otherAnswerColor();
    app.correctAnswerColor();
    app.addScore(clicked);
  }
});
