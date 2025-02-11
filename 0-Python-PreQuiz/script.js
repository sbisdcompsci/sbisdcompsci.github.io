const quizData = [
  {
    question: "In which of the following cases will Sarah walk to work?",
    code: "Sara will drive to work...\n\nif...\n   it is raining \nor if... \n   she has to carry more than two bags. \n\nOtherwise, \n   Sarah will walk to work. ",
    choices: ["It is sunny AND Sarah has 3 bags", "It is raining AND Sarah has 0 bags", "It is sunny AND Sarah has 2 bags", "It is raining and Sarah has 3 bags", "I don't know"],
    correctAnswer: 2
  },
  {
    question: "What is the output of the following code snippet?",
    code: "print(1 + '1')",
    choices: ["11", "2", "undefined", "NaN", "I don't know"],
    correctAnswer: 0
  },
  {
    question: "If Tracy the Turtle is given the following code snippet, what will she draw?",
    code: "repeat 4 times:\n    forward 100 units\n    turn left 90 degrees",
    choices: ["A line", "a zig zag", "a trapezoid", "a square", "I don't know"],
    correctAnswer: 3
  },
  {
    question: "Which of the following describes a task effectively broken into smaller parts?",
    code: "I. Baking a cake by mixing the batter and preheating the oven\nII. Comparing your favorite movies\nIII. Making a movie by writing a script, casting the actors, and \nfilming",
    choices: ["I & II", "I & III", "II Only", "I, II, & III", "I don't know"],
    correctAnswer: 2
  },
  {
    question: "Consider the following program code, where x is an input from the user. \n\nIf orange is printed, which of the following is a possible input for x?",
    code: 'if x <= 1: \n    print("apple")\nelif x < 4:\n    print("orange")\nelse: \n    print("banana")',
    choices: ['"orange"', "1", "3", "4", "I don't know"],
    correctAnswer: 2
  },
  {
    question: "What is the difference between...",
    code: " a for loop and a while loop?",
    choices: ["A for loop repeats commands a specific number of times and a while loop repeats until a condition becomes false.", "A for loop is used when we only need to meet one condition and a while loop is used when there are two or more conditions.", "A for loop will test through an array of conditions, where as a while loop will continually test the same condition.", "A for loop is used to make decisions between two options and a while loop is used to make decisions between 3 options or more.", "I don't know"],
    correctAnswer: 0
  },
  {
    question: "What is the output of the following code snippet?",
    code: "print(2 + 3 * 4);",
    choices: ["10", "14", "20", "23", "I don't know"],
    correctAnswer: 1
  },
  {
    question: "What is the output of the following code snippet?",
    code: 'x = "hello"\nprint(x*3)',
    choices: ["hello3", "hello hello hello", "hellohellohello", "3x", "x3", "I don't know"],
    correctAnswer: 2
  },
  {
    question: "Which of the following...",
    code: 'is not a method of control flow?',
    choices: ["Sequence", "Iteration", "Selection", "Functions", "Arrays", "I don't know"],
    correctAnswer: 4
  },
  {
    question: "What is the total forward distance moved when the code below is run?",
    code: "def moveForward():\n    for i in range (5):\n        forward(10)\n\nmoveForward()\nmoveForward()",
    choices: ["5", "10", "50", "100", "150", "500", "I don't know"],
    correctAnswer: 1
  },
  {
    question: "What data type is contained in variable x?",
    code: "x = 5.0",
    choices: ["float", "int", "char", "str", "bool", "I don't know"],
    correctAnswer: 0
  },
  {
    question: "What would be printed to the screen when the following program is run?",
    code: "def returnNumber(x):\n    return x *5\n\nprint(returnNumber(2))",
    choices: ["2", "5", "10", "25", "I don't know"],
    correctAnswer: 2
  },
  {
    question: "What would be printed to the screen when the following program is run?",
    code: 'text = "banana"\n\nif "an" in text:\n    print("Yes")\nelif "ananab" in text:\n    print("Maybe")\nelse:\n    print("No")',
    choices: ["Yes", "Yes Maybe", "Maybe", "Maybe No","No","No output", "I don't know"],
    correctAnswer: 0
  },
  {
    question: "What would be the output of the following code?",
    code: 'colors = ["red", "green", "blue", "yellow"]\ncolors.sort()\ncolors.append("orange")\ncolors.reverse()\nprint(colors)',
    choices: ['["blue", "green", "red", "yellow", "orange"]', '["orange", "red", "green", "blue", "yellow"]', '["yellow", "red", "green", "blue", "orange"]', '["orange", "yellow", "red", "green", "blue"]', "I don't know"],
    correctAnswer: 3
  },
  {
    question: "What would be the output of the following code?",
    code: 'for i in range(3):\n    print("hi")\nprint("hello")',
    choices: ['hi\nhi\nhi\nhello', 'hi\nhello\nhi\nhello\nhi\nhello', 'hihihi\nhellohellohello', 'hi\nhello', "I don't know"],
    correctAnswer: 0
  }
];

const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const questionElement = document.getElementById("question");
const codeElement = document.getElementById("code");
const choicesElement = document.getElementById("choices");
const submitButton = document.getElementById("submit");
const restartButton = document.getElementById("restart");
const resultElement = document.getElementById("result");
const explanationLink = document.getElementById("explanation-link");
const explanationTable = document.getElementById("explanation-table");

let currentQuestion = 0;
let score = 0;
let explanations = [];

function showQuestion() {
  const quiz = quizData[currentQuestion];
  questionElement.innerText = quiz.question;
  codeElement.innerHTML = `<code class="language-javascript">${quiz.code}</code>`;

  Prism.highlightAll();

  choicesElement.innerHTML = "";
  for (let i = 0; i < quiz.choices.length; i++) {
    const choice = quiz.choices[i];
    const li = document.createElement("li");
    li.innerText = choice;
    li.dataset.index = i;
    li.addEventListener("click", selectAnswer);
    choicesElement.appendChild(li);
  }
}

function selectAnswer(event) {
  const selectedChoice = event.target;
  const selectedAnswer = selectedChoice.dataset.index;

  const quiz = quizData[currentQuestion];
  const correctAnswer = quiz.correctAnswer;

  if (selectedAnswer == correctAnswer) {
    score++;
    explanations.push(true);
  } else {
    explanations.push(false);
  }

  // Highlight the selected option
  const choices = choicesElement.getElementsByTagName("li");
  for (let i = 0; i < choices.length; i++) {
    choices[i].classList.remove("selected");
  }
  selectedChoice.classList.add("selected");

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    isAllQuestionsAttempted = true;
    submitButton.style.display = "block"; // Display the submit button after all questions are attempted
    choicesElement.classList.add("disable-click"); // Disable further selection of options
  }
}

// function showResult() {
//   quizContainer.style.display = "none";
//   resultContainer.style.display = "block";
//   resultElement.innerText = `Your score: ${score} out of ${quizData.length}`;

//   // Generate explanation table
//   explanationTable.innerHTML = "";
//   for (let i = 0; i < quizData.length; i++) {
//     const quiz = quizData[i];
//     const explanationRow = document.createElement("tr");
//     explanationRow.innerHTML = `
//       <td>${i + 1}</td>
//       <td>${quiz.question}</td>
//       <td>${quiz.choices[quiz.correctAnswer]}</td>
//       <td>${explanations[i] ? "Correct" : "Incorrect"}</td>
//     `;
//     explanationTable.appendChild(explanationRow);
//   }

//   // Show the explanation link
//   explanationLink.style.display = "block";
// }


// function showResult() {
//   quizContainer.style.display = "none";
//   resultContainer.style.display = "block";
//   resultElement.innerText = `Your score: ${score} out of ${quizData.length}`;

//   // Generate explanation table
//   const explanationTableBody = document.getElementById("explanation-table");
//   explanationTableBody.innerHTML = "";
//   for (let i = 0; i < quizData.length; i++) {
//     const quiz = quizData[i];
//     const explanationRow = document.createElement("tr");
//     explanationRow.innerHTML = `
//       <td>${i + 1}</td>
//       <td>${quiz.question}</td>
//       <td>${quiz.choices[quiz.correctAnswer]}</td>
//       <td>${explanations[i] ? "Correct" : "Incorrect"}</td>
//     `;
//     explanationTableBody.appendChild(explanationRow);
//   }

//   // Show the explanation link
//   explanationLink.style.display = "block";
// }

function showResult() {
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";
  resultElement.innerText = `Your score: ${score} out of ${quizData.length}`;

  // Generate explanation table
  const explanationTableBody = document.getElementById("explanation-table");
  explanationTableBody.innerHTML = "";
  for (let i = 0; i < quizData.length; i++) {
    const quiz = quizData[i];
    const explanationRow = document.createElement("tr");
    explanationRow.innerHTML = `
      <td bgcolor="#dddddd">${i + 1}</td>
      <td>${quiz.question.substring(0,50) + "..."}</td>
      <td${explanations[i] ? " bgcolor='#ccffcc'>Correct" : " bgcolor='#ffcccc'> "}</td>
    `;
    explanationTableBody.appendChild(explanationRow);
  }

  // Construct the URL with the explanations array as a query parameter
  const explanationsParam = encodeURIComponent(JSON.stringify(explanations));
  const explanationLink = document.getElementById("explanation-link");

}


// function restartQuiz() {
//   currentQuestion = 0;
//   score = 0;
//   explanations = [];
//   quizContainer.style.display = "block";
//   resultContainer.style.display = "none";
//   explanationLink.style.display = "none"; // Hide the explanation link when restarting the quiz
//   showQuestion();
// }

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  explanations = [];
  quizContainer.style.display = "block";
  resultContainer.style.display = "none";
  explanationLink.style.display = "none"; // Hide the explanation link when restarting the quiz

  submitButton.style.display = "none"; // Hide the submit button when restarting the quiz
  choicesElement.classList.remove("disable-click"); // Enable selection of options when restarting the quiz

  showQuestion();
}


submitButton.style.display = "none"; // Hide the submit button initially
submitButton.addEventListener("click", showResult);
restartButton.addEventListener("click", restartQuiz);

showQuestion();
