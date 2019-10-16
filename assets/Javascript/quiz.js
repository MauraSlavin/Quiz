var timeLimit = 135; // 15 secs per question, 9 questions
var penaltyTime = 15; // lose 15 seconds for each wrong question.
var timer = timeLimit; // start timer at timeLimit (time allotted).
var startQuiz = document.querySelector("#beginQuiz");

// startQuiz = JSON.parse(startQuiz)
console.log("startQuiz: " + startQuiz);

startQuiz.addEventListener("click", runQuiz(event));

function runQuiz(event) {
  //  event.preventDefault();
for (var q = 0; q < questions.length; q++) {
 //    console.log("Question" + q + " is " + questions[q].title);
 // renderQuizPage(q);
 console.log("question: " + q);
 
}
}



// function displayWelcomePage() {
//  }



