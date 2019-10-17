var timeLimit = 135; // 15 secs per question, 9 questions
var penaltyTime = 15; // lose 15 seconds for each wrong question.
var timer = timeLimit; // start timer at timeLimit (time allotted).
var $startQuiz = $("#beginQuiz");
var message = "You have 15 seconds for each question, and will be penalized 15 seconds for each wrong answer.  Your score is the time left when you complete the quiz.  Click on the correct answer.";
var currentQuestion = 0;
var idIndex;   // id for each choice in the 
var question; // object with questions, choices, & correct answer for question currently being worked on

// $startQuiz = JSON.parse($startQuiz);


function renderPage(question, questionNum) {

  if (questionNum >= questions.length) {  // if 
    window.location = "./highScores.html";
  }; // end of if

 
  $("#question").text(question.title);   // display the question
  //  $("#answer-list").html("id");

  question.choices.forEach(function (choice, index) {   // display the choices
    idIndex = "#" + index;
    //  var thisChoiceIndex = "#choice" + index;
    $(idIndex).text(choice);
  });   // end of forEach loop (for each question choice
}        // end of renderPage function



$(document).ready(function () {
  // when take quiz button pressed..
  $("#beginQuiz").click(
    function () {
      $("#beginQuiz").remove();  // remove "take quiz button"
      $("#message").text(message);  // change the message on the page


      // build the ol
      for (var i = 0; i < questions[0].choices.length; i++) {
        $("#answer-list").append("<li id='" + i + "'></li>");
      }   // end of for i loop 

      renderPage(questions[currentQuestion], currentQuestion);

      $( "#0" ).hover(
        function() {
          $( this ).addClass( "hover" );
        }, function() {
          $( this ).removeClass( "hover" );
        }
      );

      $( "#1" ).hover(
        function() {
          $( this ).addClass( "hover" );
        }, function() {
          $( this ).removeClass( "hover" );
        }
      );

      $( "#2" ).hover(
        function() {
          $( this ).addClass( "hover" );
        }, function() {
          $( this ).removeClass( "hover" );
        }
      );

      $( "#3" ).hover(
        function() {
          $( this ).addClass( "hover" );
        }, function() {
          $( this ).removeClass( "hover" );
        }
      );

      $("#0").click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (questions[currentQuestion].answer == 0) {
          $("#message").text("Yay!  That was the correct answer!");
        } // end of if
        else {
          $("#message").text("Sorry, wrong answer.  " + penaltyTime + " seconds will be deducted from your time.");
          timer = timer - penaltyTime;
        };  //end of else
        currentQuestion++;
        renderPage(questions[currentQuestion], currentQuestion);
      });  // end of anonymous function when clicking on first answer

      //// listen for answer
      $("#1").click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (questions[currentQuestion].answer == 1) {
          $("#message").text("Yay!  That was the correct answer!");
        } // end of if
        else {
          $("#message").text("Sorry, wrong answer.  " + penaltyTime + " seconds will be deducted from your time.");
          timer = timer - penaltyTime;
        };  // end of else
        currentQuestion++;
        renderPage(questions[currentQuestion], currentQuestion);
      });  // end of anonymous function when clicking on second answer

      //// listen for answer
      $("#2").click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (questions[currentQuestion].answer == 2) {
          $("#message").text("Yay!  That was the correct answer!");
        } // end of if
        else {
          $("#message").text("Sorry, wrong answer.  " + penaltyTime + " seconds will be deducted from your time.");
          timer = timer - penaltyTime;
        };  // end of else
        currentQuestion++;
        renderPage(questions[currentQuestion], currentQuestion);
      });  // end of anonymous function when clicking on third answer

      //// listen for answer
      $("#3").click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (questions[currentQuestion].answer == 3) {
          $("#message").text("Yay!  That was the correct answer!");
        } // end of if
        else {
          $("#message").text("Sorry, wrong answer.  " + penaltyTime + " seconds will be deducted from your time.");
          timer = timer - penaltyTime;
        };  //end of else
        currentQuestion++;
        renderPage(questions[currentQuestion], currentQuestion);
        
      });  // end of anonymous function when clicking on fourth answer



    }); // of BeginQuiz function
  
 

}); // end of document ready
  // stop timer
  // display score
  // ask for inits
  // store score for hi-score list

  // finish taking quiz
  //  display score

  //// then - add timer and high score functions
