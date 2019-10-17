var timeLimit = 5; // 15 secs per question, 9 questions
var penaltyTime = 15; // lose 15 seconds for each wrong question.
var timer = timeLimit; // start timer at timeLimit (time allotted).
var $startQuiz = $("#beginQuiz");
var message = "You have 15 seconds for each question, and will be penalized 15 seconds for each wrong answer.  Your score is the time left when you complete the quiz.  Click on the correct answer.";
var currentQuestion = 0;
var idIndex;   // id for each choice in the 
var question; // object with questions, choices, & correct answer for question currently being worked on
var myTimer;  

// $startQuiz = JSON.parse($startQuiz);


function renderPage(question, questionNum) {

  if ((questionNum >= questions.length) || (timer <= 0)) {  // if 
    endGame();
  }; // end of if


  $("#question").text(question.title);   // display the question
  //  $("#answer-list").html("id");

  question.choices.forEach(function (choice, index) {   // display the choices
    idIndex = "#" + index;
    //  var thisChoiceIndex = "#choice" + index;
    $(idIndex).text(choice);
  });   // end of forEach loop (for each question choice
};        // end of renderPage function


function endGame() {
  clearInterval(myTimer);
  timer = Math.max(0, timer);  // make sure timer is at least 0
  var myText = "Your score is:  " + timer + ".";
  alert(myText);
  window.location = "./highScores.html";
 $("#score").text(myText);     //  **** This isn't working!!

};

$(document).ready(function () {
  // when take quiz button pressed..
  $("#beginQuiz").click(
    function () {
      $("#beginQuiz").remove();  // remove "take quiz button"
      $("#message").text(message);  // change the message on the page

      // start timer to countdown every second
      myTimer = setInterval(function () {
        timer--;
      }, 1000);

      // end game when time is up  (use clearinterval to stop timer if game ends before time is up)
      setTimeout(function () {
        endGame();
      }, (timeLimit * 1000));


      // build the ol
      for (var i = 0; i < questions[0].choices.length; i++) {
        $("#answer-list").append("<li id='" + i + "'></li>");
      }   // end of for i loop 

      renderPage(questions[currentQuestion], currentQuestion);

      $("#0").hover(
        function () {
          $(this).addClass("hover");
        }, function () {
          $(this).removeClass("hover");
        }
      );

      $("#1").hover(
        function () {
          $(this).addClass("hover");
        }, function () {
          $(this).removeClass("hover");
        }
      );

      $("#2").hover(
        function () {
          $(this).addClass("hover");
        }, function () {
          $(this).removeClass("hover");
        }
      );

      $("#3").hover(
        function () {
          $(this).addClass("hover");
        }, function () {
          $(this).removeClass("hover");
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
          timer = Math.max(timer - penaltyTime,0); // timer can't be less than 0
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
