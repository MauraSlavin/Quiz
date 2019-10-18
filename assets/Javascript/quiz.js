var timeLimit = 15 * questions.length; // (should be 15* questions.length) 15 secs per question
var penaltyTime = 15; // lose 15 seconds for each wrong question.
var message = "You have 15 seconds for each question, and will be penalized 15 seconds for each wrong answer.  Your score is the time left when you complete the quiz.  Click on the correct answer.";
var currentQuestion = 0;  // the question that is currently being asked/evaluated.
var question; // object with question, choices, & correct answer for question currently being worked on
var myTimer;   // used with countdown timer
var isScoresPage = window.location.pathname.includes("highScores");  // is the highScores page displayed?
var timer = timeLimit;  // set timer to the timelimite
var gameNo = [];  // will have highest game number for each player (so new game will be stored with a higher gamenum)
var inits = [];  // will have inits for each player (indicies correspond to gameNo array)
var highScores = [];  // high score for each player

// for testing...

// localStorage.setItem("QUIZ000001mms", "10");
//localStorage.setItem("QUIZ000002mms", "95");
// localStorage.setItem("QUIZ000002dns", "135");


function renderPage(question, questionNum) {   // change question and answer choices on Quiz page
  if ((questionNum >= questions.length) || (timer <= 0)) {  // if all questions have been asked, end the game
    endGame();
  }; // end of if

  $("#question").text(question.title);   // change the question text

  question.choices.forEach(function (choice, index) {   // display the answer choices
    $("#" + index).text(choice);
  });   // end of forEach loop (for each question choice

};        // end of renderPage function


function endGame() {       // prep to display page with user's score and score history
  clearInterval(myTimer);  // stop the timer
  timer = Math.max(0, timer);  // make sure timer is at least 0
  localStorage.setItem("QUIZtimer", timer);  // save the timer before opening a new window
  localStorage.setItem("QUIZinits", "true");  // "remember" to prompt for inits when new window is opened

  window.open("./highScores.html", "_self");  // go to highScores page (starts javascript from beginning)

};  // end of endGame function

$(document).ready(function () {     // when page is finished loading

  // when take quiz button pressed..
  $("#beginQuiz").click(function () {
    $("#beginQuiz").remove();  // remove "take quiz button"
    $("#message").text(message);  // change the message on the page from welcome to quiz instructions

    // start timer to countdown every second
    myTimer = setInterval(function () {
      timer--;
    }, 1000);

    // end game when time is up  (use clearinterval to stop timer if game ends before time is up)
    setTimeout(function () {
      endGame();
    }, (timeLimit * 100000));  // should be 1000; changed for testing


    // build the ol (list of question choices)
    for (var i = 0; i < questions[0].choices.length; i++) {
      $("#answer-list").append("<li id='" + i + "'></li>");
    };   // end of for i loop 

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
        timer = Math.max(timer - penaltyTime, 0); // timer can't be less than 0
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
        timer = Math.max(timer - penaltyTime, 0); // timer can't be less than 0
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
        timer = Math.max(timer - penaltyTime, 0); // timer can't be less than 0
      };  //end of else
      currentQuestion++;
      renderPage(questions[currentQuestion], currentQuestion);

    });  // end of anonymous function 



  }); // of BeginQuiz function

  if (isScoresPage) {
    //  get all relavent data from localStorage //

    // next few lines based on code from 
    //    https://stackoverflow.com/questions/17745292/how-to-retrieve-all-localstorage-items-without-knowing-the-keys-in-advance

    var
      keys = Object.keys(localStorage),  // array with all the keys in it
      values = Object.values(localStorage),  // array with all the corresponding properties in it
      init,         // initials in current local Storage entry most recently read
      scores = {},  // object; key is inits, property is score
      currGameNo = 0;  // currently read in game number.  Increment whne storing new score.

    for (var key = 0; key < keys.length; key++) {  // for each row of data in localStorage
      // If row is a combination of initials and score
      //   would be stored with a key of QUIZ######abc, and the property is the score. ###### in the key is the game number, and abc is the inits
      // The key "QUIZtimer" stores the current timer (score) for the current game;
      // the key "QUIZinits" stores the inits for the current user.
      if (keys[key].startsWith("QUIZtimer")) {  // timer (score) for current player
        timer = values[key];
        localStorage.removeItem("QUIZtimer");  // timer is no longer needed in localStorage
      }  // of if QUIZtimer key
      else if (keys[key].startsWith("QUIZinits")) {  // if true, we need to prompt for inits of current player
        var promptForInits = values[key];    // need to prompt for initials of current player
        localStorage.removeItem("QUIZinits");  //  no longer neede in localStorage
      }  // of else if QUIZinits
      else if (keys[key].startsWith("QUIZ")) {
        init = keys[key].substr(10);   // initials start in character 10 of the key (first is 0th position)
        currGameNo = parseInt(keys[key].substr(4, 6));  // game number is in position 4-9 (starts at 0;QUIZ is 0-3)
        var newInitPos = inits.indexOf(init);   // -1 if new; index into inits, gameNo & scores if found

        if (newInitPos == -1) {  // first time we come across these initials
          inits.push(init);
          gameNo.push(parseInt(keys[key].substr(4, 6)));   // game number is in positions 4 - 9
          highScores.push(parseInt(values[key]));
          scores[init] = [values[key], []];  // add the new key with the first score
        } // of init NOT in inits (new initials)
        else if ((scores[init][newInitPos].length != 0)) {  // skip null enteries
          // if these inits are already in Score, then push the new score onto that element
          scores[init].push(values[key]);
          gameNo[newInitPos] = Math.max(gameNo[newInitPos], currGameNo);
          highScores[newInitPos] = Math.max(highScores[newInitPos], parseInt(values[key]));
        };  // of already saw these initials & not null
      }; // else QUIZ gameNum score record
    };  // for each row read from local Storage

    //  number of objects:   Object.keys(scores).length;

   // for (key = 0; key < Object.keys(scores).length; key++) {
     // console.log("Key:  " + key);
      //console.log(scores.key);

   // };   // of for each object in scores



    //  timer = localStorage.getItem("QUIZtimer");    // retrieve timer (score) from local storage
    $("#score").text("Your score is: " + timer);     //  Display the user's score
    // retrieve promptForInits (key is QUIZinits) from local storage; convert to Boolean (using == "true")
    if (promptForInits) {
      // build html to prompt for initials and return value


      document.addEventListener("keydown", function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == 13) {
          console.log(event.which);  // 13 is enter
          init = $("#initInput").val();  // get inits from input 
          $("#initInput[type=text], textarea").val("");  //  clear input field
      
          if (inits.indexOf(init) == -1) {  // first game for these inits
            localStorage.setItem("QUIZ000001" + inits, timer.toString());
          }
          else {             // get correct game number - not first time player!
            // add one to gameNo, format as 6 chars with leading 0s; append timer
            // key is "QUIZ" + six digit game number (left padded w 0s) + initials
            var keyText = ("000000"+(gameNo[inits.indexOf(init)]+1)).substr(-6,6);
            var keyText = "QUIZ" + keyText + init;
            localStorage.setItem(keyText, timer.toString());
          };   // of else - not first game
          //  *****  need gameNum, and concatenate "QUIZ" & game No





        };  // of if keycode is 13 (enter)
      });   // of event listener for keydown (13)
    };  // of if promptForInits

    // display high scores
    var h2HighScore = $("<h2>");
    h2HighScore.addClass("high-score-header");
    h2HighScore.text("High Scores");
    $("body").append(h2HighScore);
    for (var key = 0; key < inits.length; key++) {
      var scoreDiv = $("<div>");
      scoreDiv.addClass("high-score");
      scoreDiv.text(inits[key] + ":  " + highScores[key]);
      $("body").append(scoreDiv);
    };  // of loop to append previous scores

  };   // if high Scores page (isScoresPage)

}); // end of document ready

//timer on page
//clear highscores
// HIGH score
