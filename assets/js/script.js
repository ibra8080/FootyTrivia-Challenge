// Select Elements
let quizBox = document.getElementById('quiz-main');
let answersDiv = document.getElementById('answers-div');
let subButton = document.getElementById('sub-button');
let resultsBox = document.querySelector('.results');
let bulletsContainer = document.querySelector('.bullets .spans');
let bullets = document.querySelector('.bullets');
let countSpan = document.querySelector(".quiz-info .count span");


// Set Options 
let currentIndex = 0;
let rightAnswers = 0;



function getQues() {

    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            let questionsObject = JSON.parse(this.responseText);
            let questionCount = questionsObject.length;

            // creatBullets + set Questions Count 
            createBullets(questionCount);

            // Add Data
            addData(questionsObject[currentIndex], questionCount);
            
            // Click on submit Button
            subButton.onclick = function() {

                let theRightAnswer = questionsObject[currentIndex].right_answer;
                

                // Increase Index
                currentIndex++;

                // Check answer 
                checkAnswer(theRightAnswer, questionCount);

                // Change Question
                quizBox.innerHTML = '';
                answersDiv.innerHTML = '';
                    // Add new question
                    addData(questionsObject[currentIndex], questionCount);
                
                // Handel Bullets
                handleBullets();

                // Show Results
                showResults(questionCount);

            };
        }
    }


    myRequest.open('GET', 'assets/js/questions.js', true);
    myRequest.send();
}
getQues();

function createBullets(num) {
    countSpan.innerHTML = num;

    // Creat spans 
    for (let i = 0; i < num; i++) {
        // Creat Bullets
        let theBullet = document.createElement('span');

        if (i === 0) {

            theBullet.className = 'on';

        }
        
        // Append Bullets to Container 
        bulletsContainer.appendChild(theBullet)


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

    for (let i = 1; i <= 4; i++ ) {

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

function checkAnswer(rAnswer, count) {

    let answers = document.getElementsByName('question');
    let theChoosenAnswer;

    for(let i = 0; i < answers.length; i++) {

        if (answers[i].checked) {

            theChoosenAnswer = answers[i].dataset.answer;
        }
    }

    if (rAnswer === theChoosenAnswer) {
        rightAnswers++;
    }
}
function handleBullets() {
    let bulletsSpans = document.querySelectorAll('.bullets .spans span');
    let arrayOfSpans = Array.from(bulletsSpans);
    arrayOfSpans.forEach((span, index) => {
      if (currentIndex === index) {
        span.className = "on";
      }
    });
  }

  function showResults (count) {
    let theResult;
    if (currentIndex === count) {
       quizBox.remove();
       answersDiv.remove();
       subButton.remove();
       bullets.remove();
        
       if (rightAnswers > count / 2 ) {
        theResult = `<span class="pass">You have succeeded</span>, ${rightAnswers} from ${count} Congratulations`;
       } else {
        theResult = `<span class="pass">Your information is not enough</span>, ${rightAnswers} from ${count} try again`;
       }
       resultsBox.innerHTML = theResult;
    }

  }