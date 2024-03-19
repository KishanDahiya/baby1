// survey.js

const questions = [
    {
        question: "Question 1: Years of business experience",
        options: [
            { text: "1-5", weightage: 1 },
            { text: "5-10", weightage: 2 },
            { text: "10-20", weightage: 3 },
            { text: "20+", weightage: 4 }
        ]
      },
      {
        question: "Question 2: Experience in this business sector",
        options: [
            { text: "1-5", weightage: 1 },
            { text: "5-10", weightage: 2 },
            { text: "10-20", weightage: 3 },
            { text: "20+", weightage: 4 }
        ]
      }
    // Add more questions here
  ];
  let currentQuestionIndex = 0; // Track current question index
  let questionScores = new Array(questions.length).fill(0); // Store scores for each question

  // Function to generate HTML for current question
  function displayCurrentQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = ''; // Clear previous question
    
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `<p>${currentQuestion.question}</p>`;
    const optionsDiv = document.createElement('div');
    optionsDiv.classList.add('options');
    currentQuestion.options.forEach(option => {
      optionsDiv.innerHTML += `<label><input type="radio" name="q${currentQuestionIndex}" value="${option.weightage}"> ${option.text}</label>`;
    });
    questionDiv.appendChild(optionsDiv);
    questionsContainer.appendChild(questionDiv);
  }

  // Function to calculate total score
  function calculateTotalScore() {
    let totalScore = 0;
    for (let i = 0; i <= currentQuestionIndex; i++) {
      totalScore += questionScores[i];
    }
    return totalScore;
  }

  // Function to handle submission of current question
  function handleQuestionSubmission(event) {
    event.preventDefault();
    const form = document.getElementById('surveyForm');
    const totalQuestions = questions.length;

    // Store the score for the current question
    const formData = new FormData(form);
    formData.forEach((value, key) => {
      if (key.startsWith('q')) {
        const questionIndex = parseInt(key.substring(1));
        questionScores[questionIndex] = parseInt(value);
      }
    });

    if (currentQuestionIndex < totalQuestions - 1) {
      currentQuestionIndex++;
      displayCurrentQuestion();
    } else {
      const totalScore = calculateTotalScore();
      const totalScoreSpan = document.getElementById('totalScore');
      totalScoreSpan.textContent = totalScore;
      const resultDiv = document.getElementById('result');
      resultDiv.style.display = 'block';
      form.removeEventListener('submit', handleQuestionSubmission); // Remove event listener
    }
  }

  // Function to handle going back to previous question
  function goBack() {
    if (currentQuestionIndex > 0) {
      // Subtract the score of the current question from the total
      const currentScore = questionScores[currentQuestionIndex];
      const totalScoreSpan = document.getElementById('totalScore');
      totalScoreSpan.textContent = parseInt(totalScoreSpan.textContent) - currentScore;

      currentQuestionIndex--;
      displayCurrentQuestion();
    }
  }

  // Event listener for form submission
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('surveyForm');
    form.addEventListener('submit', handleQuestionSubmission);

    displayCurrentQuestion(); // Display first question initially
  });
  
  window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = event;
    // Optionally, notify the user they can add to home screen
    showInstallPromotion();
  });
  
  installButton.addEventListener('click', (event) => {
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
  