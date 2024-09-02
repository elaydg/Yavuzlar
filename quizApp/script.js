const questions = [    
    {
        question: "Which of the following is the best approach to ensure that passwords are stored securely in a database?",
        answers: [
            {text: "A) Storing passwords in plain text.", correct: false},
            {text: "B) Encrypting passwords with a symmetric key.", correct: false},
            {text: "C) Hashing passwords with a strong, salted cryptographic algorithm.", correct: true},
            {text: "D) Storing passwords in a hidden text file on the server.", correct: false},
    
        ],
        difficulty: "Easy"
    },
    {
        question: "If an application exposes detailed error messages to end-users, such as stack traces, which type of security risk is the application likely facing?",
        answers: [
            {text:"A) Sensitive Data Exposure", correct:false},
            {text:"B) Security Misconfiguration", correct:true},
            {text:"C) Cross-Site Scripting (XSS)", correct:false},
            {text:"D) Insecure Design", correct:false},
        ],
        difficulty: "Easy"
    },
    {
        question: "A developer allows users to upload profile pictures without validating the file type or size. Which vulnerability could this lead to?",
        answers: [
            {text:"A) SQL Injection", correct: false},
            {text:"B) Server-Side Request Forgery (SSRF)", correct: false},
            {text:"C) Broken Access Control", correct: false},
            {text:"D) Unrestricted File Upload", correct: true},
        ],
        difficulty: "Medium"
    },
    {
        question: "Which of the following measures should be implemented to protect against injection attacks?",
        answers: [
            {text:"A) Validating inputs using a deny list of known bad inputs.", correct: false},
            {text:"B) Escaping user inputs and using parameterized queries.", correct: true},
            {text:"C) Encrypting all user inputs before processing them.", correct: false},
            {text:"D) Using client-side validation to filter inputs.", correct: false},
        ],
        difficulty: "Medium"
    },
    {
        question: "An attacker exploits a vulnerability that allows them to create requests from the server to internal systems. Which of the following is the most likely vulnerability being exploited?",
        answers: [
            {text:"A) Insecure Deserialization", correct: false}, 
            {text:"B) Cross-Site Request Forgery (CSRF)", correct: false},
            {text:"C) Cross-Origin Resource Sharing (CORS)", correct: false},
            {text:"D) Server-Side Request Forgery (SSRF)", correct: true},
        ],
        difficulty: "Medium"
    },
    {
        question: "Which scenario best illustrates a 'Broken Access Control' vulnerability?",
        answers: [
            {text:"A) An attacker injects malicious SQL queries to bypass authentication.", correct: false},
            {text:"B) A user discovers they can modify a URL parameter to access another user's data without proper authorization checks.", correct: true},
            {text:"C) A user clicks on a link that automatically submits a form on their behalf.", correct: false},
            {text:"D) Sensitive data is transmitted in cleartext over an unencrypted connection.", correct: false},
        ],
        difficulty: "Hard"
    },
    {
        question: "A company uses a third-party library that is no longer maintained and has known vulnerabilities. Which of the following is the best course of action?",
        answers: [
            {text:"A) Continue using the library since it's working fine.", correct: false},
            {text:"B) Search for a newer version of the library with the same vulnerabilities.", correct: false},
            {text:"C) Replace the library with an actively maintained alternative.", correct: true},
            {text:"D) Implement a virtual patch to block known vulnerabilities in the library.", correct: false},
        ],
        difficulty: "Hard"
    },
    {
        question: "Why is relying solely on deny lists for input validation considered a weak security practice?",
        answers: [
            {text:"A) Attackers can easily modify their inputs to bypass deny lists.", correct: true},
            {text:"B) They are difficult to implement.", correct: false},
            {text:"C) They only protect against known threats, leaving unknown ones exposed.", correct: false},
            {text:"D) Deny lists often cause legitimate inputs to be blocked, leading to usability issues.", correct: false},
        ],
        difficulty: "Hard"
    },
    {
        question: "A penetration tester notices that a web application does not invalidate session tokens after a user logs out. What potential security risk does this pose?",
        answers: [
            {text:"A) Cross-Site Scripting (XSS)", correct: false},
            {text:"B) SQL Injection", correct: false},
            {text:"C) Session Hijacking", correct: true},
            {text:"D) Insufficient Logging and Monitoring", correct: false},
        ],
        difficulty: "Very Hard"
    },
    {
        question: "What is the primary reason that a secure design alone cannot fully prevent security vulnerabilities?",
        answers: [
            {text:"A) Secure designs are too complex to implement effectively.", correct: false},
            {text:"B) Secure designs focus solely on functionality rather than security.", correct: false},
            {text:"C) Implementation flaws are inevitable regardless of the design.", correct: false},
            {text:"D) Secure designs do not account for the flaws that may arise during implementation.", correct: true},
        ],
        difficulty: "Very Hard"
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function startQuiz(){
    shuffle(questions);
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"; /*içeriği değiştirmek için innerHTML*/
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    const difficulty = questions[currentQuestionIndex].difficulty;
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    const difficultyBox = document.createElement("div");
    difficultyBox.classList.add("difficulty-box");
    difficultyBox.innerHTML = `Difficulty: ${difficulty}`;
    answerButton.appendChild(difficultyBox);

    nextButton.style.display = "block"; /*kapalı olan next butonu görünür hale gelir.*/
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}.`;
    nextButton.innerHTML = "Play Again."
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

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();