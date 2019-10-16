var timeLimit = 135; // 15 secs per question, 9 questions
var penaltyTime = 15; // lose 15 seconds for each wrong question.
var timer = timeLimit; // start timer at timeLimit (time allotted).
var $startQuiz = $("#beginQuiz");
var message = "You have 15 seconds for each question, and will be penalized 15 seconds for each wrong answer.  Your score is the time left when you complete the quiz.";
var instructions = "Click on the correct answer:";
var currentQuestion = 0;
var idIndex;   // id for each choice in the 
var isItCorrect;  // true if answer is right

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
      //  $("#answer-list").html("id");
      $("#answer-list").add("ol").css("list-style", "circle");
      question.choices.forEach(function (choice, index) {   // display the choices
        console.log("choice:  " + choice);
        console.log("index: " + index);
        idIndex = "#" + index;
        console.log("idIndex: " + idIndex);
        //  var thisChoiceIndex = "#choice" + index;
        $(idIndex).text(choice);
      });   // end of forEach loop for each choice

      console.log("answer for 0th question: " + question.answer);
      
      //// listen for answer
      $("#0").click(function () {
        console.log("First (0) answer clicked.");
        if (question.answer == 0) {
          isItCorrect = true;
          console.log("you're right!!/n/n");
        } // end of if
        else {
          console.log("you're wrong...\n\n");
        };
      });  // end of anonymous function when clicking on idIndex

      //// listen for answer
      $("#1").click(function () {
        console.log("Second (1) answer clicked.");
        if (question.answer == 1) {
          isItCorrect = true;
          console.log("you're right!!/n/n");
        } // end of if
        else {
          console.log("you're wrong...\n\n");
        };
      });  // end of anonymous function when clicking on idIndex
      
      //// listen for answer
      $("#2").click(function () {
        console.log("Third (2) answer clicked.");
        if (question.answer == 2) {
          isItCorrect = true;
          console.log("you're right!!/n/n");
        } // end of if
        else {
          console.log("you're wrong...\n\n");
        };
      });  // end of anonymous function when clicking on idIndex
      
      //// listen for answer
      $("#3").click(function () {
        console.log("Fourth (3) answer clicked.");
        if (question.answer == 3) {
          isItCorrect = true;
          console.log("you're right!!/n/n");
        } // end of if
        else {
          console.log("you're wrong...\n\n");
        };
      });  // end of anonymous function when clicking on idIndex
      
      
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








