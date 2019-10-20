var timeLimit = 15 * questions.length; // (should be 15* questions.length) 15 secs per question
var penaltyTime = 15; // lose 15 seconds for each wrong question.
var instructions = "You have 15 seconds for each question, and will be penalized 15 seconds for each wrong answer.  Your score is the time left when you complete the quiz.  Click on the correct answer.";
var wrongAnsMsg = "Sorry, wrong answer.  Your timer has been penalized by " + penaltyTime + ".  Better luck on this next question.";
var rightAnsMsg = "Yay!!  Right answer!  Here's the next question.";
var currentQuestion = 0;  // the question that is currently being asked/evaluated.
var question; // object with question, choices, & correct answer for question currently being worked on
var myTimer;   // used with countdown timer
var isScoresPage = window.location.pathname.includes("highScores");  // is the highScores page displayed?
var timer = timeLimit;  // set timer to the timelimite
var gameNo = [];  // will have highest game number for each player (so new game will be stored with a higher gamenum)
var inits = [];  // will have inits for each player (indicies correspond to gameNo array)
var highScores = [];  // high score for each player
var quizPage = localStorage.getItem("QUIZpage");  // 0: home page; 1: high scores; 2: high scores with prompt for initials
if (quizPage == null) { quizPage = 0; };  // the home page is the default if nothing is stored.
localStorage.removeItem("QUIZpage");    // no longer need

// if on High Scores page, but quizPage is still 0, then got here by player clicking "High Scores" on navbar,
//    and quizPage should be 1 (High Scores page, but no score to display or prompt for inits needed)
if (isScoresPage && (quizPage == 0)) {
  quizPage = 1;     // High Scores page, but no score to show or prompt for inits
};   // of if 

if ((quizPage == 0) || (quizPage == 1)) {    // don't display score or prompt for inits unless needed.
  //  alert("Line 25:  Hide score & prompt; quizPage: " + quizPage);
  console.log("Line 25:  Hide score & prompt; quizPage: " + quizPage);
  $("#score").hide();
  $("#pleaseEnter").hide();
};


// show timer as not running, since Quiz is not in progress
$("#timer").text("Timer not running; quiz not in progress.");

console.log("Top of quiz.js.  Vars init.");
// for testing...
// localStorage.setItem("QUIZ000001mms", "10");
// localStorage.setItem("QUIZ000002mms", "95");
// localStorage.setItem("QUIZ000002dns", "135");


function renderPage(question, questionNum) {   // change question and answer choices on Quiz page
  console.log("Started renderPage.");
  if ((questionNum >= questions.length) || (timer <= 0)) {  // if all questions have been asked, end the game
    endGame();
  }; // end of if

  $("#question").text(question.title);   // change the question text

  question.choices.forEach(function (choice, index) {   // display the answer choices
    $("#" + index).text(choice);
  });   // end of forEach loop (for each question choice

};        // end of renderPage function


function endGame() {       // prep to display page with player's score and score history
  console.log("Started endGame.");
  clearInterval(myTimer);  // stop the timer
  timer = Math.max(0, timer);  // make sure timer is at least 0
  localStorage.setItem("QUIZtimer", timer);  // save the timer before opening a new window
  localStorage.setItem("QUIZpage", 2);  // "remember" to prompt for inits when new window is opened


  window.open("./highScores.html", "_self");  // go to highScores page (starts javascript from beginning)

};  // end of endGame function

$(document).ready(function () {     // when page is finished loading
  console.log("Started document loaded.\nHighScores:  " + window.location.pathname.includes("highScores") + "\nHome:  " + window.location.pathname.includes("index"));

  // when take quiz button pressed..
  $("#beginQuiz").click(function () {
    console.log("beginQuiz clicked.");
    $("#beginQuiz").remove();  // remove "take quiz button"
    $("#message").text(instructions);  // change the message on the page from welcome to quiz instructions

    // start timer to countdown every second
    myTimer = setInterval(function () {
      timer--;
      var minutes = Math.floor(timer / 60);
      var seconds = timer - minutes * 60;
      $("#timer").text("Timer: " + minutes + ":" + seconds);
    }, 1000);

    // end game when time is up  (use clearinterval to stop timer if game ends before time is up)
    setTimeout(function () {
      endGame();
    }, (timeLimit * 1000));   // timeLimit is the number of seconds the game lasts.

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
        $("#message").text(rightAnsMsg);
      } // end of if
      else {
        $("#message").text(wrongAnsMsg);
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
        $("#message").text(rightAnsMsg);
      } // end of if
      else {
        $("#message").text(wrongAnsMsg);
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
        $("#message").text(rightAnsMsg);
      } // end of if
      else {
        $("#message").text(wrongAnsMsg);
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
        $("#message").text(rightAnsMsg);
      } // end of if
      else {
        $("#message").text(wrongAnsMsg);
        timer = Math.max(timer - penaltyTime, 0); // timer can't be less than 0
      };  //end of else
      currentQuestion++;
      renderPage(questions[currentQuestion], currentQuestion);

    });  // end of anonymous function 



  }); // of BeginQuiz function


  if (quizPage == 1 || quizPage == 2) {   // on High Scores page; 1: don't show score & prompt for inits; 2: do show them
    console.log("If quizPage is 1 or 2 (line 188). \nquizPage:  " + quizPage);

    //  get all relavent data from localStorage //

    // next few lines based on code from 
    //    https://stackoverflow.com/questions/17745292/how-to-retrieve-all-localstorage-items-without-knowing-the-keys-in-advance

    var
      keys = Object.keys(localStorage),  // array with all the keys in it
      values = Object.values(localStorage),  // array with all the corresponding properties in it
      init,         // initials in current local Storage entry most recently read
      scores = {},  // object; key is inits, property is  array of scores; highest score first.
      currGameNo = 0;  // currently read in game number.  Increment whne storing new score.



    // of else no prompt for inits

    for (var key = 0; key < keys.length; key++) {  // for each row of data in localStorage
      console.log("\n\n\nbegin for loop through keys: " + key);
      // If row is a combination of initials and score
      //   would be stored with a key of QUIZ######abc, and the property is the score. ###### in the key is the game number, and abc is the inits
      // The key "QUIZtimer" stores the current timer (score) for the current game;
      // the key "QUIZpage" stores the 0 for home page; 1 for scores page without score/prompt for inits; 2 for scores page with score/prompt.
      // QUIZpage is stored just before loading new page, and read/removed right after loading new page.
      // if the localStorage key is QUIZtimer, then the property is the time left in the game
      console.log("keys[key]:  " + keys[key]);
      console.log("values:  " + values + ";   values[key]:  " + values[key]);
      if (keys[key].startsWith("QUIZtimer")) {  // timer (score) for current player
        timer = values[key];
        localStorage.removeItem("QUIZtimer");  // timer is no longer needed in localStorage
        // show score & prompt for initials if needed, now that the timer is retrieved from localStorage
        if (quizPage == 2) {   // prompt for inits needed (also show score)
          //  $("#score").show();
          //  $("#pleaseEnter").show();
          //  alert("css is about to be changed");
          //     alert("Line 214:  SHOW score & prompt; quizPage: " + quizPage);
          console.log("Line 214:  SHOW score & prompt; quizPage: " + quizPage);
          $("#score").text("Your score is: " + timer).show();
          $("#pleaseEnter").show();
          // $("#score").style.removeProperty("display");
          //      $("#pleaseEnter").style.removeProperty("display");
          //    $("#score").css("display", "block");
          //     $("#initInput1").css("display", "block");
          //   $("#initInput1").css("display", "block");
          //    $("#pleaseEnter").css("display", "block");
        }   // of quizPage = 1 or 2 (prompt for inits & show score)

        else if ((quizPage == 0) || (quizPage == 1)) {                      // show neither score nor prompt for inits
          //     alert("Line 225:  Hide score & prompt; quizPage: " + quizPage);
          console.log("Line 225:  Hide score & prompt; quizPage: " + quizPage);
          $("#score").hide();
          $("#pleaseEnter").hide();
          //  $("#score").hide();
          //  $("#pleaseEnter").hide();
          //  $("#pleaseEnter").css("display","none");
          //      $("#score").style.removeProperty("display");
          //    $("#pleaseEnter").style.removeProperty("display");
          //  alert("css is about to be changed");
          //$("#score").css("display", "none");
          //     $("#initInput1").css("display", "none");
          //   $("#initInput").css("display", "none");
          //      $("#pleaseEnter").css("display", "none");
        }          // of quizPage = 0... no prompt or inits

        else {   // should never get here
          //     alert("ERROR:  quizPage should be 0, 1, or 2.\nquizPage:  " + quizPage + "\nline 204 of quiz.js.");

        };
      }  // of if QUIZtimer key


      // if localStorage key starts with QUIZ (but not QUIZtimer), the property is a score (unique inits + game # key for each game)
      else if (keys[key].startsWith("QUIZ")) {
        console.log("QUIZ######abc:  " + keys[key]);
        init = keys[key].substr(10);   // initials start in character 10 of the key (first is 0th position)
        currGameNo = parseInt(keys[key].substr(4, 6));  // game number is in position 4-9 (starts at 0;QUIZ is 0-3)
        var newInitPos = inits.indexOf(init);   // -1 if new; index into inits, gameNo & scores if found
        console.log("init: " + init + "\ncurrGameNo:  " + currGameNo + "/nnewInitPos:" + newInitPos);
        // localStorage has a score for a new player
        if (newInitPos == -1) {  // first time we come across these initials
          console.log("New player...");
          inits.push(init);
          gameNo.push(parseInt(keys[key].substr(4, 6)));   // game number is in positions 4 - 9
          highScores.push(parseInt(values[key]));
          scores[init] = [values[key], []];  // add the new key with the first. + [] then remove to force it to be an array
          console.log("    inits:  " + inits + "\n    gameNo:  " + gameNo + "\n    highScores:  " + highScores + "\n    scores:  " + scores);
          //   scores[init] = scores[init][0];   //  remove [], keeping it as an array
        } // of init NOT in inits (new initials)

        // localStorage has a score for a returning player
        else if ((scores[init][scores[init].length - 1].length != 0)) {  // skip null enteries (shouldn't be any)
          console.log("repeat player:");
          // if these inits are already in Score, push the new score onto that element
          scores[init].push(values[key]);  // add to list of scores for current player
          gameNo[newInitPos] = Math.max(gameNo[newInitPos], currGameNo);
          highScores[newInitPos] = Math.max(highScores[newInitPos], parseInt(values[key]));
          console.log("    inits:  " + inits + "\n    gameNo:  " + gameNo + "\n    highScores:  " + highScores + "\n    scores:  " + scores);
        };  // of already saw these initials & not null
      }; // else QUIZ gameNum score record
    };  // for each row read from local Storage

    //  number of objects:   Object.keys(scores).length;

    // for (key = 0; key < Object.keys(scores).length; key++) {
    // console.log("Key:  " + key);
    //console.log(scores.key);

    // };   // of for each object in scores



    //  timer = localStorage.getItem("QUIZtimer");    // retrieve timer (score) from local storage
    //  alert("Line 308:  SHOW score & prompt; quizPage: " + quizPage);
    //console.log("Line 309:  SHOW score & prompt; quizPage: " + quizPage);
    //$("#pleaseEnter").show();

    // if needed, display score and prompt for inits; and display high scores.
    if (quizPage == 2) {
      // build html to prompt for initials and return value

      //    $("#pleaseEnter").show();    //  show prompt for initials
      //   alert("css is about to be changed");
      $("#score").show();
      $("#pleaseEnter").show();
      //     $("#initInput").css("display", "block");    //  show prompt for initials
      //   $("#initInput2").css("display", "block");    //  show prompt for initials
      // $("#pleaseEnter").css("display", "block");
      document.addEventListener("keydown", function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == 13) {
          console.log(event.which);  // 13 is enter

          // get the inits (init) the player entered, and clear the input field
          init = $("#initInput").val();  // get inits from input 
          $("#initInput[type=text], textarea").val("");  //  clear input field

          // save the score in localStorage.
          if (inits.indexOf(init) == -1) {  // first game for these inits
            localStorage.setItem("QUIZ000001" + inits, timer.toString());
          }
          else {            //  not first score saved for this user
            // get correct game number - not first time player!
            // add one to gameNo, format as 6 chars with leading 0s; append timer
            // key is "QUIZ" + six digit game number (left padded w 0s) + initials
            var keyText = ("000000" + (gameNo[inits.indexOf(init)] + 1)).substr(-6, 6);
            var keyText = "QUIZ" + keyText + init;
            localStorage.setItem(keyText, timer.toString());
          };   // of else - not first game


          // hide score message from page, since we have the input!
          $("#score").hide();
          $("#pleaseEnter").hide();

          // add new score to High Scores



        };  // of if keycode is 13 (enter)
      });   // of event listener for keydown (13)
    };  // of if promptForInits

    if ((quizPage == 1) || (quizPage == 2)) {
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
    };  // of quizPage == 1 or 2 then display high scores

  };   // if high Scores page (quizPage is 1 or 2 - display HighScores page)

}); // end of document ready

//timer on page
//clear highscores
// HIGH score
