// Select Elements
let countSpan = document.querySelector(".quiz-info .count span");
let bulletsSpanContainer = document.querySelector('.bullets .spans');

function getQuestions() {

    let myRequest = new XMLHttpRequest();


    myRequest.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            let questionsObject = JSON.parse(this.responseText)
            let questionCount = questionsObject.length;

            // creatBullets + set Questions Count 
            createBullets(questionCount);
        }
    };


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
        
        // Append Bullets to Container 
        bulletsSpanContainer.appendChild(theBullet)


    }
}