var timeLimit = 135; // 15 secs per question, 9 questions
var penaltyTime = 15; // lose 15 seconds for each wrong question.
var timer = timeLimit; // start timer at timeLimit (time allotted).
var $startQuiz = $("#beginQuiz");
var message = "You have 15 seconds for each question, and will be penalized 15 seconds for each wrong answer.  Your score is the time left when you complete the quiz.  Click on the correct answer.";
var currentQuestion = 0;
var idIndex;   // id for each choice in the 
var isItCorrect = false;  // true if answer is right
var question; // object with questions, choices, & correct answer for question currently being worked on

// $startQuiz = JSON.parse($startQuiz);
console.log("begin quiz.js");
console.log("")


function renderPage(question) {

 
  console.log("question.answer: " + question.answer);
  console.log("Question (in forEach loop): " + question);
  console.log("Question (question.title) is:  " + question.title);
  $("#question").text(question.title);   // display the question
  //  $("#answer-list").html("id");
  console.log("*** question.choices:  " + question.choices);
  console.log("*** length:  " + question.choices.length);

  question.choices.forEach(function (choice, index) {   // display the choices
    console.log("choice:  " + choice);
    console.log("index: " + index);
    idIndex = "#" + index;
    console.log("idIndex: " + idIndex);
    //  var thisChoiceIndex = "#choice" + index;
    $(idIndex).text(choice);
  });   // end of forEach loop (for each question choice
}        // end of renderPage function



$(document).ready(function () {
  console.log("Take quiz clicked");
  // when take quiz button pressed..
  $("#beginQuiz").click(
    function () {
      console.log("Take quiz clicked");
      $("#beginQuiz").remove();  // remove "take quiz button"
      $("#message").text(message);  // change the message on the page

      console.log("begin runQuiz");

      // build the ol
      for (var i = 0; i < questions[0].choices.length; i++) {
        $("#answer-list").append("<li id='" + i + "'></li>");
      }   // end of for i loop 

      renderPage(questions[currentQuestion]);

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
        console.log("First (0) answer clicked.");
        if (questions[currentQuestion].answer == 0) {
          console.log("you're right!!/n/n");
          isItCorrect = true;
          $("#message").text("Yay!  That was the correct answer!");
          console.log("Message on page should be changed to 'correct'");
        } // end of if
        else {
          console.log("you're wrong...\n\n");
          isItCorrect = false;
          $("#message").text("Sorry, wrong answer.  " + penaltyTime + " seconds will be deducted from your time.");
          timer = timer - penaltyTime;
          console.log("Message on page should be changed to 'wrong'");
        };  //end of else
        currentQuestion++;
        renderPage(questions[currentQuestion]);
      });  // end of anonymous function when clicking on first answer

      //// listen for answer
      $("#1").click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        console.log("Second (1) answer clicked.");
        if (questions[currentQuestion].answer == 1) {
          console.log("you're right!!/n/n");
          isItCorrect = true;
          $("#message").text("Yay!  That was the correct answer!");
          console.log("Message on page should be changed to 'correct'");
        } // end of if
        else {
          console.log("you're wrong...\n\n");
          isItCorrect = false;
          $("#message").text("Sorry, wrong answer.  " + penaltyTime + " seconds will be deducted from your time.");
          timer = timer - penaltyTime;
          console.log("Message on page should be changed to 'wrong'");
        };  // end of else
        currentQuestion++;
        renderPage(questions[currentQuestion]);
      });  // end of anonymous function when clicking on second answer

      //// listen for answer
      $("#2").click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        console.log("Third (2) answer clicked.");
        console.log("question.answer: " + questions[currentQuestion].answer);
        if (questions[currentQuestion].answer == 2) {
          console.log("you're right!!/n/n");
          isItCorrect = true;
          $("#message").text("Yay!  That was the correct answer!");
          console.log("Message on page should be changed to 'correct'");
        } // end of if
        else {
          console.log("you're wrong...\n\n");
          isItCorrect = false;
          $("#message").text("Sorry, wrong answer.  " + penaltyTime + " seconds will be deducted from your time.");
          timer = timer - penaltyTime;
          console.log("Message on page should be changed to 'wrong'");
        };  // end of else
        currentQuestion++;
        renderPage(questions[currentQuestion]);
      });  // end of anonymous function when clicking on third answer

      //// listen for answer
      $("#3").click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        console.log("Fourth (3) answer clicked.");
        if (questions[currentQuestion].answer == 3) {
          console.log("you're right!!/n/n");
          isItCorrect = true;
          $("#message").text("Yay!  That was the correct answer!");
          console.log("Message on page should be changed to 'correct'");
        } // end of if
        else {
          console.log("you're wrong...\n\n");
          isItCorrect = false;
          $("#message").text("Sorry, wrong answer.  " + penaltyTime + " seconds will be deducted from your time.");
          timer = timer - penaltyTime;
          console.log("Message on page should be changed to 'wrong'");
        };  //end of else
        currentQuestion++;
        renderPage(questions[currentQuestion]);
        console.log("Time remaininag: " + timer);
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





console.log("Timer: " + timer);
console.log("end of iteration\n\n");








