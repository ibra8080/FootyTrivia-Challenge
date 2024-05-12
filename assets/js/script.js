// Select Elements
let countSpan = document.querySelector(".quiz-info .count span");
let bulletsSpanContainer = document.querySelector('.bullets .spans');
let quizArea = document.querySelector('.quiz-area');
let answersArea = document.querySelector('.answers-area')



// Set Options 
let currentIndex = 0;

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


        // make 

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
