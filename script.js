const startBtn = document.getElementById('start-btn');
const gameArea = document.getElementById('game-area');
const wordDisplay = document.getElementById('word-display');
const userInput = document.getElementById('user-input');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

const words = ['hello', 'world', 'javascript', 'developer', 'game', 'speed', 'keyboard', 'audio', 'challenge', 'typing', 'echo', 'krushna', 'function', 'variable', 'future', 'Lomesh'];
let currentWord = '';
let score = 0;
let timeLeft = 30;
let gameInterval;

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
function speakWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.rate = Math.random() * (1.3 - 0.9) + 0.9;
  utterance.pitch = 1;
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
}

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = `Score: ${score}`;
  timerDisplay.textContent = `Time Left: ${timeLeft}`;
  startBtn.classList.add('hidden');
  gameArea.classList.remove('hidden');
  userInput.focus();

  gameInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      endGame();
    }
  }, 1000);

  nextWord();
}

function nextWord() {
  currentWord = getRandomWord();
  wordDisplay.textContent = '🔊 Listen...';
  setTimeout(() => speakWord(currentWord), 500);
}

userInput.addEventListener('input', () => {
  if (userInput.value.trim().toLowerCase() === currentWord.toLowerCase()) {
    feedback.textContent = '✅ Correct!';
    feedback.style.color = '#00ff88';
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    userInput.value = '';
    nextWord();
  } else {
    feedback.textContent = '';
  }
});

function endGame() {
  feedback.textContent = `🎯 Time's up! Final Score: ${score}`;
  feedback.style.color = '#fff';
  startBtn.textContent = 'Play Again 🔁';
  startBtn.classList.remove('hidden');
  gameArea.classList.add('hidden');
  wordDisplay.textContent = '';
  userInput.value = '';
}
startBtn.addEventListener('click', startGame);
