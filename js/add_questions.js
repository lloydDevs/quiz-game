document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".questions-container");
  const form = document.getElementById("add-question-form");
  const popup = document.getElementById("success-popup");

  // Getting the quesrtions of initializing it as an empty array
  let questions = JSON.parse(localStorage.getItem("questions")) || [];

  // for saving questions to local storage
  function saveQuestionsToLocalStorage() {
    localStorage.setItem("questions", JSON.stringify(questions));
  }

  // Function to render questions
  function renderQuestions() {
    container.innerHTML = ""; // Clear the container before rendering

    questions.forEach(({ question, options, answer }, index) => {
      const questionItem = document.createElement("div");
      questionItem.classList.add("question-box");
      questionItem.innerHTML = `
        <strong>Question ${index + 1}:</strong> ${question}<br>
        <ul>
          ${options.map((option) => `<li>${option}</li>`).join("")}
        </ul>
        <em style="color: green;">Answer: ${answer}</em>
      `;
      container.appendChild(questionItem);
    });
  }

  // Function to show the popup
  function showPopup() {
    const overlay = document.getElementById("overlay");
    const popup = document.getElementById("popup");

    // Show the overlay and popup
    overlay.style.display = "block";
    popup.style.display = "block";

    // Hide after 3 seconds
    setTimeout(() => {
      overlay.style.display = "none";
      popup.style.display = "none";
    }, 3000);
  }

  // Render questions from local storage on page load
  renderQuestions();

  // Form submission handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Capture form values
    const questionText = document.getElementById("question-text").value;
    const option1 = document.getElementById("option-1").value;
    const option2 = document.getElementById("option-2").value;
    const option3 = document.getElementById("option-3").value;
    const answer = document.getElementById("answer").value;

    // Add new question to the array
    questions.push({
      question: questionText,
      options: [option1, option2, option3],
      answer: answer,
    });

    // Save updated questions to local storage
    saveQuestionsToLocalStorage();

    // Clear the form inputs
    form.reset();

    // Render the updated list of questions
    renderQuestions();

    // Show the success popup
    showPopup();
  });
});
