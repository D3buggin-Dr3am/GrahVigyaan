const exoplanetData = [
  { name: 'Kepler-22b', fact: 'First Earth-like exoplanet in a habitable zone.' },
  { name: 'Proxima Centauri b', fact: 'Closest known exoplanet to the Sun.' },
  { name: 'HD 209458 b', fact: 'First exoplanet found to transit its star.' },
  { name: 'Gliese 581g', fact: 'Potentially habitable, rocky exoplanet.' }
  // Add more data if needed
];

let currentQuestionIndex = 0;
let points = 0;
let level = 1;

function loadQuestion() {
  const questionBox = document.getElementById('question');
  const optionsBox = document.getElementById('options');
  const feedbackBox = document.getElementById('feedback');
  const nextButton = document.getElementById('next-button');

  feedbackBox.textContent = ''; // Clear feedback
  nextButton.style.display = 'none'; // Hide next button

  const exoplanet = exoplanetData[currentQuestionIndex];
  questionBox.textContent = `Which planet is known as: ${exoplanet.fact}?`;
  optionsBox.innerHTML = '';

  exoplanetData.forEach((planet) => {
    const button = document.createElement('button');
    button.textContent = planet.name;
    button.onclick = () => checkAnswer(planet, button);
    optionsBox.appendChild(button);
  });
}

function checkAnswer(selectedPlanet, button) {
  const exoplanet = exoplanetData[currentQuestionIndex];

  if (selectedPlanet.name === exoplanet.name) {
    points += 10;
    document.getElementById('points').textContent = points;
    button.classList.add('correct');
    showPopup(); // Show Mercury popup for correct answer
    levelUp();
  } else {
    button.classList.add('incorrect');
  }

  document.getElementById('feedback').textContent = selectedPlanet.name === exoplanet.name ? 'Correct!' : 'Incorrect!';
  document.getElementById('next-button').style.display = 'block'; // Show next button only after selection
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex >= exoplanetData.length) {
    alert('Congratulations! You completed the quiz.');
    currentQuestionIndex = 0; // Reset for another round
    points = 0; // Reset points
    document.getElementById('points').textContent = points; // Reset displayed points

    // Wait for 3 seconds before redirecting to another page
    setTimeout(() => {
      window.location.href = 'another_page.html'; // Change 'another_page.html' to your target page
    }, 3000);
  } else {
    loadQuestion();
  }
}

function levelUp() {
  level = Math.floor(points / 30) + 1; // Level up every 30 points
  document.getElementById('level').textContent = level;
}

function showPopup() {
  const popup = document.getElementById('popup');
  popup.classList.add('show'); // Add show class to initiate fade-in effect
  
  // Automatically hide the popup after 2 seconds
  setTimeout(() => {
    popup.classList.remove('show'); // Remove show class to initiate fade-out effect
  }, 2000);
}

window.onload = loadQuestion;
