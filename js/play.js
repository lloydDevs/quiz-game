//Function to fetch questions from an API
async function fetchQuestions() {
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=100&type=multiple"
    );
    const data = await response.json();
    return data.results.map((q, index) => ({
      id: index + 1,
      text: q.question,
      choices: [...q.incorrect_answers, q.correct_answer].sort(
        () => Math.random() - 0.5
      ),
      correctAnswer: q.correct_answer,
      difficulty: q.difficulty,
      points: q.difficulty === "easy" ? 5 : q.difficulty === "medium" ? 10 : 15,
    }));
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}


let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 20;
let timerInterval;
let selectedDifficulty = "all";

const questionElement = document.querySelector(".questions h3");
const choicesElement = document.querySelector(".questions .choices");
const scoreElement = document.querySelector(".score h2");
const timeElement = document.getElementById("time");
const difficultyItems = document.querySelectorAll(".dropdown-menu li");
const difficultyButton = document.querySelector(".btn-group .btn");

// Function to update the displayed question and choices
const updateQuestion = () => {
  const filteredQuestions =
    selectedDifficulty === "all"
      ? questions
      : questions.filter((q) => q.difficulty === selectedDifficulty);

  if (currentQuestionIndex < filteredQuestions.length) {
    const question = filteredQuestions[currentQuestionIndex];
    questionElement.textContent = question.text;

    // Clear previous choices
    choicesElement.innerHTML = "";

    // Add new choices
    question.choices.forEach((choice) => {
      const button = document.createElement("button");
      button.textContent = choice;
      button.classList.add("btn", "btn-outline-light", "m-2");
      button.addEventListener("click", () => checkAnswer(choice));
      choicesElement.appendChild(button);
    });
  } else {
    // No more questions, show result
    clearInterval(timerInterval);
    showResult();
  }
};

// Function to update the score
const updateScore = () => {
  scoreElement.textContent = `${score} ${score === 1 ? "point" : "points"}`;
};

// Function to update the timer
const updateTimer = () => {
  timeElement.textContent = `Time Left: ${timeLeft} ${
    timeLeft === 1 ? "second" : "seconds"
  }`;
  if (timeLeft === 0) {
    clearInterval(timerInterval);
    showResult();
  }
};

// Function to start the timer
const startTimer = () => {
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
};

// Function to determine if the user passed or failed
const isPassed = () => {
  return score >= 75;
};

// Function to check the answer
const checkAnswer = (selectedChoice) => {
  const filteredQuestions =
    selectedDifficulty === "all"
      ? questions
      : questions.filter((q) => q.difficulty === selectedDifficulty);
  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const correctChoice = [...choicesElement.children].find(
    (btn) => btn.textContent === currentQuestion.correctAnswer
  );

  if (selectedChoice === currentQuestion.correctAnswer) {
    score += currentQuestion.points;
  }

  // Move to next question
  currentQuestionIndex++;
  updateScore();
  updateQuestion();

  // Start the timer if it's not already running
  if (!timerInterval) {
    startTimer();
  }
};

// Function to show the result component
const showResult = () => {
  const passed = isPassed();
  const resultElement = document.createElement("div");
  resultElement.classList.add("card", "text-center", "mt-4");

  let cardClass, headerClass, bodyClass;
  if (passed) {
    cardClass = "border-success";
    headerClass = "bg-dark text-dark";
    bodyClass = "text-white bg-dark";
  } else {
    cardClass = "border-danger";
    headerClass = "bg-dark text-dark";
    bodyClass = "text-white bg-dark";
  }

  resultElement.classList.add(cardClass);

  resultElement.innerHTML = `
      <div class="card-header ${headerClass}">
        <h2 class="card-title h4 mb-0 text-white">${
          passed ? "Congratulations, you passed!" : "Sorry, you failed."
        }</h2>
      </div>
      <div class="card-body ${bodyClass}">
      <div class="score-board">
       <h1 class="card-text text-white">${score}</h1> 
       <span><p>${score === 1 ? "point" : "points"}</p></span>
      </div>
        <p class="card-text text-white time-remaining">Time remaining: ${timeLeft} ${
    timeLeft === 1 ? "second" : "seconds"
  }</p>
        ${
          passed
            ? `
            <lord-icon
                src="https://cdn.lordicon.com/kvuyljqb.json"
                trigger="loop"
                stroke="bold"
                colors="primary:#ffffff,secondary:#16c72e"
                style="width:150px;height:150px">
            </lord-icon>
          `
            : ""
        }
      </div>
    `;

  // Clear existing content and append the result card
  questionElement.textContent = "";
  choicesElement.innerHTML = "";
  choicesElement.appendChild(resultElement);

  // Add a "Play Again" button inside a wrapper
  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Play Again";
  playAgainButton.classList.add("btn", "center");

  // Create the wrapper div and add the button to it
  const btnWrapper = document.createElement("div");
  btnWrapper.classList.add("btn-wrapper");

  // Append the button to the wrapper div
  btnWrapper.appendChild(playAgainButton);

  // Add event listener to the button
  playAgainButton.addEventListener("click", resetGame);

  // Append the wrapper to the choicesElement
  choicesElement.appendChild(btnWrapper);
};

// Function to reset the game
const resetGame = () => {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 20;
  clearInterval(timerInterval);
  timerInterval = null;
  initGame();
};

// Event listeners for difficulty selection
document.querySelectorAll(".difficulty-option").forEach((item) => {
  item.addEventListener("click", function (e) {
    // Get selected difficulty
    const difficulty = e.target.getAttribute("data-difficulty");
    // Update the displayed difficulty button text
    document.getElementById("selectedDifficulty").textContent =
      difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

    // Update selectedDifficulty variable and refresh questions
    selectedDifficulty = difficulty;
    resetGame();
  });
});

// Initialize the game
async function initGame() {
  questions = await fetchQuestions();
  updateQuestion();
  updateScore();
  updateTimer();
}

// Call initGame when the page loads
window.addEventListener("load", initGame);

// For demonstration purposes in the Node.js environment
initGame().then(() => {
  console.log("Game initialized with fetched questions:", questions);
});

// This line is not necessary in a browser environment, but kept for compatibility with the previous structure
export default function Component() {
  return null;
}
