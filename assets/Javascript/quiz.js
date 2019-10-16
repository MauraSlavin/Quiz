var timeLimit = 135; // 15 secs per question, 9 questions
var penaltyTime = 15; // lose 15 seconds for each wrong question.
var timer = timeLimit; // start timer at timeLimit (time allotted).
var $startQuiz = $("#beginQuiz");
var message = "You have 15 seconds for each question, and will be penalized 15 seconds for each wrong answer.  Your score is the time left when you complete the quiz.";
var instructions = "Click on the correct answer:";
var currentQuestion = 0;

// $startQuiz = JSON.parse($startQuiz);
console.log("begin quiz.js");
console.log("")

$(document).ready(function () {
  // when take quiz button pressed..
  $("#beginQuiz").click(

    function () {
      $("#beginQuiz").remove();  // remove "take quiz button"
      $("#message").text(message);  // change the message on the page
      //  console.log("begin runQuiz");

      //// for each question...
      //  questions.forEach(function (question) {  

      //   ************  just do for first one, for now
      var question = questions[currentQuestion];  // for testing  ********************
        console.log("Questions (in forEach loop): " + question);
        // var thisQuestion = questions.title;
        
        var thisQuestion = question.title;
        console.log("Question (question.title) is:  " + thisQuestion);
        $("#question").text(thisQuestion);   // display the question
        question.choices.forEach(function (choice, index) {   // display the choices
          console.log("choice:  " + choice);
          console.log("index: " + index);
          //  var thisChoiceIndex = "#choice" + index;
          $("#" + index).text(choice);
        });
        //// listen for answer
        //// evaluate answer
        //// respond to answer
        //// display next question

        // finish taking quiz
        //  display score

        //// then - add timer and high score functions


      });    // end click on beginQuiz

    });  // end listening for document ready



  //  $("#beginQuiz").on("click", runQuiz(event));

  //   event.preventDefault();


  console.log("Timer: " + timer);
  console.log("end of iteration\n\n");








