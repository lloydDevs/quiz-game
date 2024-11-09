// Mock data for questions with choices
const questions = [
  {
    id: 1,
    text: "What is the capital of France?",
    choices: ["London", "Berlin", "Paris"],
    correctAnswer: "Paris",
    difficulty: "easy",
    points: 5,
  },
  {
    id: 2,
    text: "Which planet is known as the Red Planet?",
    choices: ["Venus", "Mars", "Jupiter"],
    correctAnswer: "Mars",
    difficulty: "easy",
    points: 5,
  },
  {
    id: 3,
    text: "What is the largest mammal in the world?",
    choices: ["Elephant", "Blue Whale", "Giraffe"],
    correctAnswer: "Blue Whale",
    difficulty: "medium",
    points: 10,
  },
  {
    id: 4,
    text: "Who painted the Mona Lisa?",
    choices: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso"],
    correctAnswer: "Leonardo da Vinci",
    difficulty: "medium",
    points: 10,
  },
  {
    id: 5,
    text: "What is the chemical symbol for gold?",
    choices: ["Au", "Ag", "Fe"],
    correctAnswer: "Au",
    difficulty: "hard",
    points: 15,
  },
  {
    id: 6,
    text: "In which year did World War II end?",
    choices: ["1943", "1945", "1947"],
    correctAnswer: "1945",
    difficulty: "hard",
    points: 15,
  },
  {
    id: 7,
    text: "What is the largest ocean on Earth?",
    choices: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean",
    difficulty: "easy",
    points: 5,
  },
  {
    id: 8,
    text: "Who wrote the play 'Romeo and Juliet'?",
    choices: ["Charles Dickens", "William Shakespeare", "Jane Austen"],
    correctAnswer: "William Shakespeare",
    difficulty: "easy",
    points: 5,
  },
  {
    id: 9,
    text: "What is the capital of Japan?",
    choices: ["Seoul", "Beijing", "Tokyo"],
    correctAnswer: "Tokyo",
    difficulty: "easy",
    points: 5,
  },
  {
    id: 10,
    text: "Which element has the chemical symbol 'O'?",
    choices: ["Oxygen", "Gold", "Silver"],
    correctAnswer: "Oxygen",
    difficulty: "medium",
    points: 10,
  },
  {
    id: 11,
    text: "What is the largest planet in our solar system?",
    choices: ["Mars", "Jupiter", "Saturn"],
    correctAnswer: "Jupiter",
    difficulty: "medium",
    points: 10,
  },
  {
    id: 12,
    text: "Who developed the theory of relativity?",
    choices: ["Isaac Newton", "Albert Einstein", "Stephen Hawking"],
    correctAnswer: "Albert Einstein",
    difficulty: "medium",
    points: 10,
  },
  {
    id: 13,
    text: "What is the smallest prime number?",
    choices: ["0", "1", "2"],
    correctAnswer: "2",
    difficulty: "hard",
    points: 15,
  },
  {
    id: 14,
    text: "Which country has the most pyramids?",
    choices: ["Egypt", "Mexico", "Sudan"],
    correctAnswer: "Sudan",
    difficulty: "hard",
    points: 15,
  },
  {
    id: 15,
    text: "What is the rarest blood type?",
    choices: ["O negative", "AB negative", "B positive"],
    correctAnswer: "AB negative",
    difficulty: "hard",
    points: 15,
  },
];
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
    question.choices.forEach((choice, index) => {
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

// Function to check the answer
const checkAnswer = (selectedChoice) => {
  const filteredQuestions =
    selectedDifficulty === "all"
      ? questions
      : questions.filter((q) => q.difficulty === selectedDifficulty);
  const currentQuestion = filteredQuestions[currentQuestionIndex];
  if (selectedChoice === currentQuestion.correctAnswer) {
    score += currentQuestion.points;
  }
  currentQuestionIndex++;
  updateScore();
  updateQuestion();

  if (!timerInterval) {
    startTimer();
  }
};

// Function to update the score
const updateScore = () => {
  scoreElement.textContent = `${score} points`;
};

// Function to update the timer
const updateTimer = () => {
  timeElement.textContent = `Time Left: ${timeLeft} seconds`;
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
       <span><p>points<p></span>
      </div>
        <p class="card-text text-white time-remaining">Time remaining: ${timeLeft} seconds</p>
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

  // Add a "Play Again" button
  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Play Again";
  playAgainButton.classList.add("btn", "btn-dark", "mt-3");
  playAgainButton.addEventListener("click", resetGame);
  choicesElement.appendChild(playAgainButton);
};

// Function to reset the game
const resetGame = () => {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 20;
  clearInterval(timerInterval);
  timerInterval = null;
  updateQuestion();
  updateScore();
  updateTimer();
};

// Event listener for the difficulty selector
difficultyItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    selectedDifficulty = e.target.textContent.toLowerCase();
    difficultyButton.textContent = e.target.textContent; // Update button text
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 20;
    clearInterval(timerInterval);
    timerInterval = null;
    updateQuestion();
    updateScore();
    updateTimer();
  });
});

// Initialize the game
updateQuestion();
updateScore();
updateTimer();

export default function Component() {
  return null; // This component doesn't render anything, it's just for initialization
}
