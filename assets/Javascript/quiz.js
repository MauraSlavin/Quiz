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
var inits = [];  // will have inits for each player
var highScores = [];  // high score for each player
var quizPage = localStorage.getItem("QUIZpage");  // 0: home page; 1: high scores; 2: score w/prompt for initials
if (quizPage == null) { quizPage = 0; };  // the home page is the default if nothing is stored.
localStorage.removeItem("QUIZpage");    // no longer need

// if on High Scores page, but quizPage is still 0, then got here by player clicking "High Scores" on navbar,
//    and quizPage should be 1 (High Scores list)
if (isScoresPage && (quizPage == 0)) {
  quizPage = 1;     // High Scores list
};   // of if 

if ((quizPage == 0) || (quizPage == 1)) {    // don't display score or prompt for inits unless needed.
  //  alert("Line 25:  Hide score & prompt; quizPage: " + quizPage);
  console.log("Line 25:  Hide score & prompt; quizPage: " + quizPage);
  $("#score").hide();
  $("#pleaseEnter").hide();
}
else {   // if quizPage == 2 ( show score & prompt for inits)
  $("#score").show();
  $("#pleaseEnter").show();
};


// show timer as not running, since Quiz is not in progress
$("#timer").text("Timer not running; quiz not in progress.");

console.log("Top of quiz.js.  Vars init.");
// for testing...
localStorage.setItem("QUIZmms", "10");
 localStorage.setItem("QUIZmms", "95");
  localStorage.setItem("QUIZdns", "135");


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


function orderScores(origScoresArray, origInitsArray) {

  var maxIndex = origScoresArray.length;      // the length of all the arrays
  var scoresArray = origScoresArray.slice();  // Make sure original variables don't get changed.
  var initsArray = origInitsArray.slice();     // Make sure original variables don't get changed.
  var newScoresArray = new Array(maxIndex);   // set size of new high scores array
  var newInitsArray = new Array(maxIndex);    // set size of corresponding inits array
  var index;                                  // index into array where highest remainging score is

  for (var i = 0; i < maxIndex; i++) {        // for each high score...
    index = scoresArray.indexOf(Math.max.apply(null, scoresArray));   // Find the index to the next highest score
    newScoresArray[i] = Math.max(...scoresArray);           // put the next highest score in the next spot in the new array
    newInitsArray[i] = initsArray[index];                   //  save the corresponding initials
    scoresArray.splice(index, 1);                            // drop the highest score, and repeat to find the next highest score
    initsArray.splice(index, 1);                             // ...  keeping the initials
  };   //  of for i 0 to length of highScores & closes anoymous function

  return [newScoresArray, newInitsArray];    // return the new arrays (can only return one thing, so they are both in an outer array)
};  // of orderScores function


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

      var minutes = (Math.floor(timer / 60)).toString();
      var seconds = (timer - minutes * 60).toString();
      seconds = seconds.padStart(2, "0");
      $("#timer").text("Timer: " + minutes + ":" + seconds);
    }, 1000);

    // end game when time is up  (use clearinterval to stop timer if game ends before time is up)
    setTimeout(function () {
      endGame();
    }, (timeLimit * 1000)
    );   // timeLimit is the number of seconds the game lasts.

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




  // retrieve & display high scores
  if (quizPage == 1) {   // on High Scores page; 1: high scores list; 2: score & prompt for inits; 0: home page/take quiz
    console.log("If quizPage 1 (line 188). \nquizPage:  " + quizPage);

    //  get all relevant data from localStorage //

    var
      keys = Object.keys(localStorage),  // array with all the keys in it
      values = Object.values(localStorage),  // array with all the corresponding properties in it
      init;        // initials in current local Storage entry most recently read



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


      // if localStorage key starts with QUIZ (but not QUIZtimer or QUIZpage), the property is a score (unique inits + game # key for each game)
      if (keys[key].startsWith("QUIZ") && (!keys[key].startsWith("QUIZtimer")) && (!keys[key].startsWith("QUIZpage"))) {
        console.log("QUIZabc:  " + keys[key]);
        init = keys[key].substr(4);   // initials start in character 4 of the key (first is 0th position)
        inits.push(init);
        highScores.push(parseInt(values[key]));



      }; // if QUIZinit score record
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








    //  Put scores in order of High score first:  
    //  inits & highScores arrays changed; 
    //  orderOfScores created (index into both arrays in order, highest score first.)

    var newArrays = orderScores(highScores, inits);
    highScores = newArrays[0];
    inits = newArrays[1];
    // display high scores
    var h2HighScore = $("<h2>");
    h2HighScore.addClass("high-score-header");
    h2HighScore.text("High Scores");
    $("#highScoresHdrDiv").append(h2HighScore);
    for (var key = 0; key < highScores.length; key++) {
      var scoreDiv = $("<div>");
      scoreDiv.addClass("high-score");
      scoreDiv.text(inits[key] + ":  " + highScores[key]);
      $("#highScoresHdrDiv").append(scoreDiv);
    };  // of loop to append previous scores


  };   // if high Scores page (quizPage is 1 - display HighScores page)




  if (quizPage == 2) {   // on High Scores page; 1: high scores list; 2: score & prompt for inits (0: home page/take quiz)
    console.log("If quizPage is 2 (line 188). \nquizPage:  " + quizPage);

    //  get all relevant data from localStorage //


    var
      // keys = Object.keys(localStorage),  // array with all the keys in it
      // values = Object.values(localStorage),  // array with all the corresponding properties in it
      init;         // initials in current local Storage entry most recently read

    // of else no prompt for inits


    // If row is a combination of initials and score
    //   would be stored with a key of QUIZabc, and the property is the score.  abc is the inits. high score is the value
    // The key "QUIZtimer" stores the current timer (score) for the current game;
    // the key "QUIZpage" stores the 0 for home page; 1 for scores page without score/prompt for inits; 2 for scores page with score/prompt.
    // QUIZpage is stored just before loading new page, and read/removed right after loading new page.
    // if the localStorage key is QUIZtimer, then the property is the time left in the game

    timer = localStorage.getItem("QUIZtimer")
    localStorage.removeItem("QUIZtimer");  // timer is no longer needed in localStorage
    // show score & prompt for initials if needed, now that the timer is retrieved from localStorage

    console.log("Line 214:  SHOW score & prompt; quizPage: " + quizPage);
    $("#score").text("Your score is: " + timer);

    // $("#score").style.removeProperty("display");
    //      $("#pleaseEnter").style.removeProperty("display");
    //    $("#score").css("display", "block");
    //     $("#initInput1").css("display", "block");
    //   $("#initInput1").css("display", "block");
    //    $("#pleaseEnter").css("display", "block");





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

    // build html to prompt for initials and return value

    //    $("#pleaseEnter").show();    //  show prompt for initials
    //   alert("css is about to be changed");

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

        // add to highScores and inits arrays
        // inits.push(init);
        // highScores.push(parseInt(timer));  // timer is a string here

        //   var newArrays = orderScores(highScores, inits);
        // highScores = newArrays[0];
        //   inits = newArrays[1];

        // save the score in localStorage.
        if (inits.indexOf(init) == -1) {  // first game for these inits
          localStorage.setItem("QUIZ" + init, timer.toString());
        }
        else {            //  not first score saved for this user
          // get correct game number - not first time player!

          // key is "QUIZ" + six digit game number (left padded w 0s) + initials
          var oldHighScore = localStorage.getItem("QUIZ" + init);
          if (timer > oldHighScore) {
            localStorage.setItem("QUIZ" + init, timer.toString());
          };


        };   // of else - not first game



        localStorage.setItem("QUIZpage", 1);  // display high scores next


        window.open("./highScores.html", "_self");  // go to highScores page (starts javascript from beginning)



      };  // of if keycode is 13 (enter)
    });   // of event listener for keydown (13)

  };     // of if QUIZpage is 2


$("#clearScores").click (function(event) {
  
  localStorage.clear();
  $(".high-score").remove();

});





}); // end of document ready


//clear highscores

