// variables to keep track of quiz staet
var currentQuestionsIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("intials");
var feedbackEl = document.getElementById("feedback");

function startQuiz() {
        console.log("yay");
    var startScreenEl = document.getElementById("start-screen");
        startScreenEl.setAttribute("class", "hide");
        questionsEl.removeAttribute("class");
        timerId = setInterval(clockTick, 1000);
        timerEl.textContent = time;
        getQuestion();
        }

function clockTick(){
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      quizEnd();  
    }
}

function getQuestion() {
    var currentQuestion = questions[currentQuestionsIndex];
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = "";
        currentQuestion.choices.forEach(function(choice){
            var choiceNode = document.createElement("button");
            choiceNode.setAttribute("class", "choice"); // this is for syling purposes
            choiceNode.setAttribute("value", choice);
            choiceNode.textContent = choice;
            choiceNode.onclick = questionClick;
            choicesEl.appendChild(choiceNode);
        });
}

function questionClick() {
    if (this.value !== questions[currentQuestionsIndex].answer) {
        time -= 15;
        if(time < 0) {
        time = 0;    
        } 
        timerEl.textContent = time;
        feedbackEl.textContent = "wrong";
        // sound effects would go here
    }
    else {
        feedbackEl.textContent = "right";
    }  
    currentQuestionsIndex++;
    if(currentQuestionsIndex === questions.length){
        quizEnd();
    }
    else {
        getQuestion();
    }
}

function quizEnd() {
    clearInterval(timerId);
    // show end screen
    
    // show final score

    var userName = document.querySelector('#score-name').value.trim();
    var finalScore = {
        score: score,
        name: userName
    };
    var hiScores = JSON.parse(window.localStorage.getItem('High Scores')) || [];
    hiScores.push(finalScore);
    window.localStorage.setItem('High Scores', JSON.stringify(hiScores));
}
}

//user clicks button to start quiz
startBtn.onclick = startQuiz;