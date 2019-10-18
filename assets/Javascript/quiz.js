var timeLimit = 5; // 15 * questions.length; // (should be 15* questions.length) 15 secs per question
var penaltyTime = 15; // lose 15 seconds for each wrong question.
var message = "You have 15 seconds for each question, and will be penalized 15 seconds for each wrong answer.  Your score is the time left when you complete the quiz.  Click on the correct answer.";
var currentQuestion = 0;
var idIndex;   // id for each choice in the list of possible answers
var question; // object with questions, choices, & correct answer for question currently being worked on
var myTimer;
var promptForInits = false;  // so we know whether to prompt for initials when going to highScores page

// for testing...

localStorage.setItem("QUIZ000001mms", "10");
localStorage.setItem("QUIZ000002mms", "95");
localStorage.setItem("QUIZ000002dns", "135");



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
  clearInterval(myTimer);  // stop the timer
  timer = Math.max(0, timer);  // make sure timer is at least 0
  localStorage.setItem("QUIZtimer", timer);  // save the timer before opening a new window
  promptForInits = true;   // we will need to prompt for initials in highScores window
  localStorage.setItem("QUIZinits", promptForInits);  // save promptForInits before opening a new window


  window.open("./highScores.html", "_self")  // go to highScores page

};

$(document).ready(function () {

  // when take quiz button pressed..
  $("#beginQuiz").click(
    function () {
      $("#beginQuiz").remove();  // remove "take quiz button"
      $("#message").text(message);  // change the message on the page
      var timer = timeLimit;
      
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
          timer = Math.max(timer - penaltyTime, 0); // timer can't be less than 0
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

  var isScoresPage = window.location.pathname.includes("highScores");
  //  get all relavent data from localStorage //

  // next few lines based on code from 
  //    https://stackoverflow.com/questions/17745292/how-to-retrieve-all-localstorage-items-without-knowing-the-keys-in-advance

  var
    localData = {},
    keys = Object.keys(localStorage),  // variable with all the keys in it
    values = Object.values(localStorage),  // variable with all the values in it
    init,         // initials in current local Storage entry
    gameNo,     // game number in current local storage entry; need max gameNo for each person
    scores = {};

  for (var key = 0; key < keys.length; key++) {
 // keys.forEach(function (key) {
  //  if (key.startsWith("QUIZ") && !key.startsWith("QUIZtimer") && !key.startsWith("QUIZinits")) {
    if (keys[key].startsWith("QUIZ") && !keys[key].startsWith("QUIZtimer") && !keys[key].startsWith("QUIZinits")) {
      init = keys[key].substr(10);   // initials start in character 10 of the key (first is 0th position)
      gameNo = keys[key].substr(4, 6);  // game number is in positions 4 - 9

      // are these inits already in the object "score"
      if (init in scores) {
        // if these inits are already in Score, then push the new score onto that element
        scores[init].push(values[key]);  //// this gets key "KEY" with value "MMS", want key "MMS" w/score
// ************  this above line doesn't seem to be working
      }  // of if init in score
      else {
        // add the new key to the scores object
        scores[init] = [values[key],[]];  // add the new key with the first score
     //   scores[init] = values.pop; 
      };  // of else (init is new to score)
    };  // if key starts with QUIZ
  }; // of for each key
console.log(scores);

  //  number of objects:   Object.keys(archive).length;

  for (key = 0; key < Object.keys(localData).length; key++) {
    console.log("Key:  " + key);
    console.log(localData.key);

  };   // of for localData


  console.log(localData);



  if (isScoresPage) {
    timer = localStorage.getItem("QUIZtimer");    // retrieve timer (score) from local storage
    $("#score").text("Your score is: " + timer);     //  Display the user's score
    // retrieve promptForInits (key is QUIZinits) from local storage; convert to Boolean (using == "true")
    promptForInits = localStorage.getItem("QUIZinits") == "true";
    if (promptForInits) {
      // build html to prompt for initials and return value


      document.addEventListener("keydown", function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == 13) {
          console.log(event.which);  // 13 is enter
          var inits = $("#inits").val();


          localStorage.setItem(inits, timer.toString());





        };  // of if keycode is 13 (enter)
      });   // of event listener for keydown (13)
    };  // of if promptForInits
  }; // of if scoresPage

}); // end of document ready
  // stop timer
  // display score
  // ask for inits
  // store score for hi-score list

  // finish taking quiz
  //  display score

  //// then - add timer and high score functions
