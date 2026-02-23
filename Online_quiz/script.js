const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Eagle", correct: false},
        ]
    },
    {
         question: "Which is the biggest country in the world?",
        answers: [
            {text: "America", correct: false},
            {text: "India", correct: false},
            {text: "China", correct: true},
            {text: "England", correct: false},
        ]
    },
    {
    question: "Which is the fastest animal in the world?",
        answers: [
            {text: "Cheetah", correct: true},
            {text: "Zebra", correct: false},
            {text: "Elephant", correct: false},
            {text: "Wild beast", correct: false},
        ]
    },
    {
    question: "Who is the GOAT in football?",
        answers: [
            {text: "Cristiano Ronaldo", correct: false},
            {text: "Neymar", correct: false},
            {text: "Ronaldo R9", correct: false},
            {text: "Lionel Messi", correct: true},
        ]
    },
    {
    question: "Who is the richest person in the world?",
        answers: [
            {text: "Trump", correct: false},
            {text: "Elon Musk", correct: true},
            {text: "Bill Gates", correct: false},
            {text: "Ambani", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    restState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
    
}

function restState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild); 
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore(){
    restState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }

});

startQuiz();