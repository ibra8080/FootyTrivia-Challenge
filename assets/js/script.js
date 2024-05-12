// Select Elements
let countSpan = document.querySelector(".quiz-info .count span");
let bulletsSpanContainer = document.querySelector('.bullets .spans');

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

    console.log(obj);
    console.log(count);
}
