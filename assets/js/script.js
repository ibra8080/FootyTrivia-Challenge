// Select Elements
let countSpan = document.querySelector(".quiz-info .count span");
let bulletsSpanContainer = document.querySelector('.bullets .spans');
let quizArea = document.querySelector('.quiz-area');
let answersArea = document.querySelector('.answers-area');
let submitButton = document.querySelector('.submit-button');
let bullets = document.querySelector('.bullets');
let resultsContainer = document.querySelector('.results')


// Set Options 
let currentIndex = 0;
let rightAnswers = 0;



function getQuestions() {

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
            submitButton.onclick = function() {

                let theRightAnswer = questionsObject[currentIndex].right_answer;
                

                // Increase Index
                currentIndex++;

                // Check answer 
                checkAnswer(theRightAnswer, questionCount);

                // Change Question
                quizArea.innerHTML = '';
                answersArea.innerHTML = '';
                    // Add new question
                    addData(questionsObject[currentIndex], questionCount);
                
                // Handel Bullets
                handleBullets();

                // Show Results
                showResults(questionCount);

            };
        }
    }


    myRequest.open('GET', 'assets/questions.json', true);
    myRequest.send();
}
getQuestions();

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
        bulletsSpanContainer.appendChild(theBullet)


    }
}

function addData(obj, count) {
    if (currentIndex < count) {

    // Creat Question tilte 
    let questionTitle = document.createElement('h2');
    
    let questionText = document.createTextNode(obj['title']);
    questionTitle.appendChild(questionText);
    quizArea.appendChild(questionTitle); 

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
        answersArea.appendChild(mainDiv);
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
       quizArea.remove();
       answersArea.remove();
       submitButton.remove();
       bullets.remove();
        
    }

  }