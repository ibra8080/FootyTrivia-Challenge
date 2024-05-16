// Select Elements
let quizBox = document.getElementById('quiz-main');
let answersDiv = document.getElementById('answers-div');
let subButton = document.getElementById('sub-button');
let resultsBox = document.querySelector('.results');
let indicatorContainer = document.getElementById('bullets-span');
let indicator = document.getElementById('indicator-container');
let countSpan = document.getElementById("counter");
let countBox = document.getElementById('count-box');
let tryAgainB = document.getElementById('try-again');


// Set Conditions 
let currentIndex = 0;
let rightAnswers = 0;


// Function to handle the response when questions are loaded
function handleQuestionsResponse() {
    if (this.readyState === 4 && this.status === 200) {
        let quesObject = JSON.parse(this.responseText);
        let quesCount = quesObject.length;

        createQuizInterface(quesObject, quesCount);
    }
}

// Function to create the quiz interface
function createQuizInterface(quesObject, quesCount) {
    getBullets(quesCount);
    addData(quesObject[currentIndex], quesCount);
    setupSubmitButton(quesObject, quesCount);
}

// Function to setup the submit button
function setupSubmitButton(quesObject, quesCount) {
    subButton.onclick = function () {
        handleAnswerSub(quesObject, quesCount);
    };
}

// Function to handle the submission of an answer
function handleAnswerSub(quesObject, quesCount) {
    let theRightAnswer = quesObject[currentIndex].right_answer;
    currentIndex++;
    check(theRightAnswer, quesCount);
    runQues(quesObject, quesCount);
    changeBullets();
    showResults(quesCount);
}

// Function to change the current question
function runQues(quesObject, quesCount) {
    quizBox.innerHTML = '';
    answersDiv.innerHTML = '';
    addData(quesObject[currentIndex], quesCount);
}

// Function to handle bullets indicating the current question
function changeBullets() {

}

// Function to display results
function showResults(quesCount) {

}

// Create XMLHttpRequest and initiate the request to get questions
function getQues() {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = handleQuestionsResponse;
    myRequest.open('GET', 'assets/js/questions.js', true);
    myRequest.send();
}

getQues();



function getBullets(x) {
    countSpan.innerHTML = x;

    // Creat indicator spans 
    for (let i = 0; i < x; i++) {
        
        let theBullet = document.createElement('span');

        if (i === 0) {

            theBullet.className = 'on';
        }

        // Append indicator to Container 
        indicatorContainer.appendChild(theBullet)
    }
}

function addData(obj, count) {
    if (currentIndex < count) {

        // Creat Question tilte 
        let questionTitle = document.createElement('h2');

        let questionText = document.createTextNode(obj['title']);
        questionTitle.appendChild(questionText);
        quizBox.appendChild(questionTitle);

        // Creat the Answer options

        for (let i = 1; i <= 4; i++) {

            let mainDiv = document.createElement('div');
            mainDiv.className = 'answer';

            // Radio input

            let radioInput = document.createElement('input');
            radioInput.name = 'question';
            radioInput.type = 'radio';
            radioInput.id = `answer_${i}`;
            radioInput.dataset.answer = obj[`answer_${i}`];


            // Make First Option checked 

            if (i === 1) {
                radioInput.checked = true;
            }

            // Creat Label
            let theLabel = document.createElement('label');
            theLabel.htmlFor = `answer_${i}`;

            let theLabelText = document.createTextNode(obj[`answer_${i}`]);
            theLabel.appendChild(theLabelText);

            mainDiv.appendChild(radioInput);
            mainDiv.appendChild(theLabel);
            answersDiv.appendChild(mainDiv);
        }
    }
}

function check(right, count) {

    let answers = document.getElementsByName('question');
    let theChoosenAnswer;

    for (let i = 0; i < answers.length; i++) {

        if (answers[i].checked) {

            theChoosenAnswer = answers[i].dataset.answer;
        }
    }

    if (right === theChoosenAnswer) {
        rightAnswers++;
    }
}
function changeBullets() {
    let bulletsSpans = document.querySelectorAll('.bullets .spans span');
    let arrayOfSpans = Array.from(bulletsSpans);
    arrayOfSpans.forEach((span, index) => {
        if (currentIndex === index) {
            span.className = "on";
        }
    });
}

function showResults(count) {
    let theResult;
    if (currentIndex === count) {
        quizBox.remove();
        answersDiv.remove();
        subButton.remove();
        indicator.remove();
        countBox.remove();

        if (rightAnswers > count / 2) {
            theResult = `<span class="score"> ${rightAnswers} / ${count} <br>
            <p>Goal!!!</p><br>
            <i class="fa fa-trophy" aria-hidden="true"></i>
            </span>
            <span class="result-text-s">You're a champion! 🏆 Keep scoring, quiz master!</span>`;
        } else {
            theResult = `<span class="score"> ${rightAnswers} / ${count} <br>
            <i class="fa fa-minus-circle" aria-hidden="true"></i></span>
            <span class="result-text-f">Oops! You've been shown the red card! ⚽ Try again.</span>
            <span class="try-again-b">
            <button id="try-again" onClick="window.location.reload()">Try again</button>
            </span>`;
            
            
        }
        resultsBox.innerHTML = theResult;
        
    }
}
