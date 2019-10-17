var timeLimit = 135; // 15 secs per question, 9 questions
var penaltyTime = 15; // lose 15 seconds for each wrong question.
var timer = timeLimit; // start timer at timeLimit (time allotted).
var $startQuiz = $("#beginQuiz");
var message1 = "You have 15 seconds for each question,";
var message2 = "and will be penalized 15 seconds for each wrong answer.";
var message3 = "Your score is the time left when you complete the quiz.";
var message4 = "Click on the correct answer.";
var currentQuestion = 0;
var idIndex;   // id for each choice in the 
var isItCorrect;  // true if answer is right
var question; // object with questions, choices, & correct answer for question currently being worked on
var thisQuestion;  // question only for current question

// $startQuiz = JSON.parse($startQuiz);
console.log("begin quiz.js");
console.log("")

function correctAnswer(q) {
  console.log("in 'correctAnswer' function; question.answer: " + q.answer);
  
  $("#0").click(function(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("First (0) answer clicked.");
    if (q.answer == 0) {
      console.log("you're right!!/n/n");
      return true;
    } // end of if
    else {
      console.log("you're wrong...\n\n");
    };
  });  // end of anonymous function when clicking on first answer
  
  //// listen for answer
  $("#1").click(function(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("Second (1) answer clicked.");
    if (q.answer == 1) {
      console.log("you're right!!/n/n");
      return true;
    } // end of if
    else {
      console.log("you're wrong...\n\n");
    };
  });  // end of anonymous function when clicking on second answer
  
  //// listen for answer
  $("#2").click(function(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("Third (2) answer clicked.");
    console.log("question.answer: " + q.answer);
    if (q.answer == 2) {
      console.log("you're right!!/n/n");
      return true;
    } // end of if
    else {
      console.log("you're wrong...\n\n");
    };
  });  // end of anonymous function when clicking on third answer
  
  //// listen for answer
  $("#3").click(function(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("Fourth (3) answer clicked.");
    if (q.answer == 3) {
      console.log("you're right!!/n/n");
      return true;
    } // end of if
    else {
      console.log("you're wrong...\n\n");
    };
    
  });  // end of anonymous function when clicking on fourth answer
  
  return false;  // if nothing was found true
  
};  // end of isItCorrect function



$(document).ready(function () {
  console.log("Take quiz clicked");
  // when take quiz button pressed..
  $("#beginQuiz").click(
    function () {
      console.log("Take quiz clicked");
      $("#beginQuiz").remove();  // remove "take quiz button"
      $("#message1").text(message1);  // change the message on the page
      $("#message2").text(message2);  // change the message on the page
      $("#message3").text(message3);  // change the message on the page
      $("#message4").text(message4);  // change the message on the page
      console.log("begin runQuiz");
      
      // build the ol
      for (var i = 0; i < questions[0].choices.length; i++) {
        $("#answer-list").append("<li id='" + i + "'></li>");
      }
      
      //// for each question...
      //  questions.forEach(function (question) {  
        
        //      $("#answer-list").add("ol").css("list-style", "circle");
        
        // var thisQuestion = questions.title;
        questions.forEach(function (question, index) { // for each question 
          var thisQuestion = question.title;
          console.log("question.answer: " + question.answer);
          console.log("Question (in forEach loop): " + question);
          console.log("Question (question.title) is:  " + thisQuestion);
          $("#question").text(thisQuestion);   // display the question
          //  $("#answer-list").html("id");
          console.log("*** question.choices:  " + question.choices);
          console.log("*** length:  " + question.choices.length);
          question.choices.forEach(function(choice, index) {   // display the choices
            console.log("choice:  " + choice);
            console.log("index: " + index);
            idIndex = "#" + index;
            console.log("idIndex: " + idIndex);
            //  var thisChoiceIndex = "#choice" + index;
            $(idIndex).text(choice);
          });   // end of forEach loop for each choice
          
          console.log("answer for 0th question: " + question.answer);
          
          //// listen for answer
          
          console.log("Just before calling 'correctAnswer', question.answer: " + question.answer);
          console.log("question: " + question + "; index:  " + index);
          isItCorrect = correctAnswer(question);
          if (isItCorrect) {
            $("#message").text("Yay!  That was the correct answer!");
            console.log("Message on page should be changed to 'correct'");
          }
          else {
            $("#message").text("Sorry, wrong answer.  " + penaltyTime + " seconds will be deducted from your time.");
            timer = timer - penaltyTime;
          console.log("Message on page should be changed to 'wrong'");
        }
        console.log("isItCorrect (after calling 'correctAnswer': " + isItCorrect);
        console.log("Time remaininag: " + timer);

      }); // of forEach questions (for each question in the questions array)
      // stop timer
      // display score
      // ask for inits
      // store score for hi-score list

      // finish taking quiz
      //  display score

      //// then - add timer and high score functions


    });    // end click on beginQuiz

});  // end listening for document ready



//  $("#beginQuiz").on("click", runQuiz(event));

//   event.preventDefault();


console.log("Timer: " + timer);
console.log("end of iteration\n\n");








