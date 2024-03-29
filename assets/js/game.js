// Declare global variables for the current operation, current question, and score
let currentOperation = "";
let currentQuestion = {};
let score = 0;

// Starts a new game with the specified operation
function startGame(operation) {
    currentOperation = operation;
    generateQuestion();
}

// Generates a math question with two random numbers and multiple choice answers based on the current operation
function generateQuestion() {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let correctAnswer = 0;

    switch (currentOperation) {
        case "add":
            correctAnswer = num1 + num2;
            break;
        case "subtract":
            correctAnswer = num1 - num2;
            break;
        case "multiply":
            correctAnswer = num1 * num2;
            break;
        case "divide":
            while (num1 % num2 !== 0) {
                num1 = Math.floor(Math.random() * 10) + 1;
                num2 = Math.floor(Math.random() * 10) + 1;
            }
            correctAnswer = num1 / num2;
            break;
    }

    let incorrectAnswers = generateIncorrectAnswers(correctAnswer);

    currentQuestion = {
        num1: num1,
        num2: num2,
        correctAnswer: correctAnswer,
        incorrectAnswers: incorrectAnswers,
    };

    displayQuestion();
}

// Generates three incorrect answers based on a correct answer
function generateIncorrectAnswers(correctAnswer) {
    let incorrectAnswers = [];

    while (incorrectAnswers.length < 3) {
        let randomAnswer = correctAnswer + Math.floor(Math.random() * 5) - 2;

        if (randomAnswer !== correctAnswer && !incorrectAnswers.includes(randomAnswer)) {
            incorrectAnswers.push(randomAnswer);
        }
    }

    return incorrectAnswers;
}

// Displays the current math question and multiple choice options in the DOM
function displayQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    optionsElement.innerHTML = "";

    questionElement.innerText = `Cuanto es ${currentQuestion.num1} ${currentOperation === 'add' ? '+' : currentOperation === 'subtract' ? '-' : currentOperation === 'multiply' ? '×' : '÷'} ${currentQuestion.num2}?`;

    let allAnswers = [currentQuestion.correctAnswer, ...currentQuestion.incorrectAnswers];
    allAnswers.sort(() => Math.random() - 0.5);

    for (let answer of allAnswers) {
        let button = document.createElement("button");
        button.innerText = answer;
        button.onclick = () => checkAnswer(answer);
        optionsElement.appendChild(button);
    }
}

// Checks if the provided answer is correct and displays a random message accordingly
function checkAnswer(answer) {
    const messageElement = document.getElementById("message");
  
    if (answer === currentQuestion.correctAnswer) {
      const correctMessages = [
        "Buen Trabajo!",
        "Increible!",
        "Sigue asi!",
        "Estas haciendo un buen trabajo!",
        "Bien hecho!",
      ];
      const randomMessage =
        correctMessages[Math.floor(Math.random() * correctMessages.length)];
      messageElement.innerText = randomMessage;
      messageElement.style.color = "#008000";
      score++;
      updateScore();
      checkForWin();
      updateProgressBar();
      animateMessage("Correcto");
      messageElement.classList.remove("Incorrecto");
    } else {
      const incorrectMessages = [
        "Oops! Tienes otro intento.",
        "No te preocupes! Sigue Practicando!",
        "Esta bien! Aprendamos de esto.",
        "No te preocupes! La proxima vez si lo haras bien!.",
        "Sigue intentandolo!",
      ];
      const randomMessage =
        incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)];
      messageElement.innerText = `${randomMessage} La respuesta correcta era: ${currentQuestion.correctAnswer}.`;
      messageElement.style.color = "#FF0000";
      animateMessage("Incorrecto");
    }
  
    generateQuestion(currentOperation);
  }

// Updates the progress bar based on the player's score
function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progressPercentage = (score / 15) * 100;
    progressBar.style.width = progressPercentage + "%";
  }

// Animates the message element based on the result of the player's answer
function animateMessage(result) {
    const messageElement = document.getElementById("message");
    messageElement.classList.add(result);
    setTimeout(() => {
      messageElement.classList.remove(result);
    }, 1000);
  }

// Updates the score display based on the player's current score
function updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.innerText = score;
}

// Checks if the player has won the game and displays a congratulatory message if so
function checkForWin() {
    if (score >= 15) {
        const messageElement = document.getElementById("message");
        messageElement.innerText = "Felicitaciones! Eres nuestro ganador!";
        setTimeout(() => {
            restartGame();
        }, 3000);
    }
}

// Updates the score display based on the player's current score
function updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.innerText = score;
}

// Restarts the game by resetting all game variables and clearing the DOM
function restartGame() {
    currentOperation = "";
    currentQuestion = {};
    score = 0;
    resetProgressBar();
    updateScore();
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const messageElement = document.getElementById("message");
    questionElement.innerText = "";
    optionsElement.innerHTML = "";
    messageElement.innerText = "";
}

// Resets the progress bar by setting its width to 0%
function resetProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = "0%";
}