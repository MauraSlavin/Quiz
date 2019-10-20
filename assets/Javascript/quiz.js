var timeLimit = 15 * questions.length; // (should be 15* questions.length) 15 secs per question
var penaltyTime = 15; // lose 15 seconds for each wrong question.
var instructions = "You have 15 seconds for each question, and will be penalized 15 seconds for each wrong answer.  Your score is the time left when you complete the quiz.  Click on the correct answer.";
var wrongAnsMsg = "Sorry, wrong answer.  Your timer has been penalized by " + penaltyTime + ".  Better luck on this next question.";
var rightAnsMsg = "Yay!!  Right answer!  Here's the next question.";
var currentQuestion = 0;  // the question that is currently being asked/evaluated.
var myTimer;   // used with countdown timer
var isScoresPage = window.location.pathname.includes("highScores");  // is the highScores page displayed?
var timer = timeLimit;  // set timer to the timelimite
var inits = [];  // will have inits for each player
var highScores = [];  // high score for each player
var quizPage = localStorage.getItem("QUIZpage");  // 0: home page; 1: high scores; 2: score w/prompt for initials
if (quizPage == null) { quizPage = 0; };  // the home page is the default if nothing is stored.
localStorage.removeItem("QUIZpage");    // no longer need



// end the quiz
function endGame() {       // prep to display page with player's score and score history
  clearInterval(myTimer);  // stop the timer
  timer = Math.max(0, timer);  // make sure timer is at least 0
  localStorage.setItem("QUIZtimer", timer);  // save the timer before opening a new window
  localStorage.setItem("QUIZpage", 2);  // "remember" to prompt for inits when new window is opened


  window.open("./highScores.html", "_self");  // go to highScores page (starts javascript from beginning)

};  // end of endGame function




// display new question
function renderPage(question, questionNum) {   // change question and answer choices on Quiz page
  if ((questionNum >= questions.length) || (timer <= 0)) {  // if all questions have been asked or time is out, end the quiz
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




// if on High Scores page, but quizPage is still 0, then got here by player clicking "High Scores" on navbar,
//    and quizPage should be 1 (High Scores list)
if (isScoresPage && (quizPage == 0)) {
  quizPage = 1;     // High Scores list
};   // of if 

if ((quizPage == 0) || (quizPage == 1)) {    // don't display score or prompt for inits unless needed.
  //  alert("Line 25:  Hide score & prompt; quizPage: " + quizPage);
  $("#score").hide();
  $("#pleaseEnter").hide();
}
else {                                  // if quizPage == 2 ( show score & prompt for inits)
  $("#score").show();
  $("#pleaseEnter").show();
};


// show timer at 00:00 when no quiz is being taken on the home page.
$("#timer").text("Timer:  00:00");

$(document).ready(function () {     // when page is finished loading

  // when take quiz button pressed..
  $("#beginQuiz").click(function () {
    $("#beginQuiz").remove();  // remove "take quiz button"
    $("#message").text(instructions);  // replace the welcome message on the page with quiz instructions

    // start timer to countdown every second
    myTimer = setInterval(function () {
      timer--;
      // change time to 00:00 format.
      var minutes = (Math.floor(timer / 60)).toString();
      var seconds = (timer - minutes * 60).toString();
      seconds = seconds.padStart(2, "0");
      $("#timer").text("Timer: " + minutes + ":" + seconds);  // update the timer on the screen every second
    }, 1000);

    // end game when time is up  (use clearinterval to stop timer if game ends before time is up)
    setTimeout(function () {
      endGame();
    }, (timeLimit * 1000)
    );   // timeLimit is the number of seconds the game lasts.

    // build the ol (list of question choices)
    for (var i = 0; i < questions[0].choices.length; i++) {
      $("#answer-list").append("<li id='" + i + "' class='choice' value=" + i + "></li>");
    };   // end of for i loop 

    renderPage(questions[currentQuestion], currentQuestion);

    // change the formatting when a possible answer is being hovered over
    $(".choice").hover(
      function () {
        $(this).addClass("hover");   // add Hover class when mouse hovered over element
      }, function () {
        $(this).removeClass("hover");  // remove Hover class when no longer hovering over this element.
      }
    );


    // evaluate answer when a choice is clicked on
    $(".choice").click(function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (questions[currentQuestion].answer == $(this).val()) {  // is the choice = the right one?
        $("#message").text(rightAnsMsg);      // if right, tell player
      } // end of if
      else {
        $("#message").text(wrongAnsMsg);      // if wrong, tell player
        timer = Math.max(timer - penaltyTime, 0); // ...and deduct time, making sure timer isn't less than 0
      };  //end of else
      currentQuestion++;                       // increment to next question  
      renderPage(questions[currentQuestion], currentQuestion);   // display new questions (and msg from last question)
    });  // end of anonymous function when clicking on first answer

  }); // of BeginQuiz function




  // retrieve & display high scores
  if (quizPage == 1) {   // on High Scores page; 1: high scores list; 2: score & prompt for inits; 0: home page/take quiz

    //  get all relevant data from localStorage //
    var
      keys = Object.keys(localStorage),  // array with all the keys in it
      values = Object.values(localStorage),  // array with all the corresponding properties in it
      init;        // initials in current local Storage entry most recently read

    // for every key / value combination read in from localStorage - build array of keys & corresponding array of values
    for (var key = 0; key < keys.length; key++) {  // for each row of data in localStorage


      // if localStorage key starts with QUIZ (but not QUIZtimer or QUIZpage), the property is a score (unique inits + game # key for each game)
      // QUIZxxx is the key for person with inits "xxx"; the value array has corresponding current high score for that player.
      if (keys[key].startsWith("QUIZ") && (!keys[key].startsWith("QUIZtimer")) && (!keys[key].startsWith("QUIZpage"))) {
        init = keys[key].substr(4);   // initials start in character 4 of the key (first is 0th position)
        inits.push(init);             //  add init to inits array of players' initials
        highScores.push(parseInt(values[key]));  // add score to highScores array of player's high scores

      }; // if QUIZinit score record
    };  // for each row read from local Storage



    //  Put scores in order of High score first (before displaying):  

    var newArrays = orderScores(highScores, inits);
    highScores = newArrays[0];    // array of highScores in descending order
    inits = newArrays[1];         // array of initials corresponding to scores in highScores array

    // build and append header with High Scores title
    var h2HighScore = $("<h2>");
    h2HighScore.addClass("high-score-header");
    h2HighScore.text("High Scores");
    $("#highScoresHdrDiv").append(h2HighScore);

    // build and append each player's initial and high score, in descending order
    for (var key = 0; key < highScores.length; key++) {
      var scoreDiv = $("<div>");
      scoreDiv.addClass("high-score");
      scoreDiv.text(inits[key] + ":  " + highScores[key]);
      $("#highScoresHdrDiv").append(scoreDiv);
    };  // of loop to append high scores for each player

  };   // if high Scores page (quizPage is 1 - display HighScores page)




  if (quizPage == 2) {   // on High Scores page; 1: high scores list; 2: score & prompt for inits (0: home page/take quiz)

    //  get all relevant data from localStorage //
    //  get all relevant data from localStorage //
    var
      keys = Object.keys(localStorage),  // array with all the keys in it
      values = Object.values(localStorage),  // array with all the corresponding properties in it
      init;         // initials in current local Storage entry most recently read

    // for every key / value combination read in from localStorage - build array of keys & corresponding array of values
    for (var key = 0; key < keys.length; key++) {  // for each row of data in localStorage


      // if localStorage key starts with QUIZ (but not QUIZtimer or QUIZpage), the property is a score (unique inits + game # key for each game)
      // QUIZxxx is the key for person with inits "xxx"; the value array has corresponding current high score for that player.
      if (keys[key].startsWith("QUIZ") && (!keys[key].startsWith("QUIZtimer")) && (!keys[key].startsWith("QUIZpage"))) {
        init = keys[key].substr(4);   // initials start in character 4 of the key (first is 0th position)
        inits.push(init);             //  add init to inits array of players' initials
        highScores.push(parseInt(values[key]));  // add score to highScores array of player's high scores

      }; // if QUIZinit score record
    };  // for each row read from local Storage

    // timer is retrieved from localStorage, then deleted from localStorage to avoid confusion
    timer = localStorage.getItem("QUIZtimer")
    localStorage.removeItem("QUIZtimer");  // timer is no longer needed in localStorage

    // show score & prompt for initials if needed, now that the timer is retrieved from localStorage
    $("#score").text("Your score is: " + timer);   // displpay score

    // when enter pressed, read in initials and process; save to local Storage; set up to display High Scores
    document.addEventListener("keydown", function (event) {
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if (keycode == 13) {             // enter key pressed

        // get the inits (init) the player entered, and clear the input field
        init = $("#initInput").val();  // get inits from input 
        $("#initInput[type=text], textarea").val("");  //  clear input field

        // save the score in localStorage.  (Otherwise it'll go away when page is re-loaded)
        if (inits.indexOf(init) == -1) {  // first game for these inits
          localStorage.setItem("QUIZ" + init, timer.toString());   // just store if first instance for this player
        }
        else {            //  not first score saved for this user

          // only store if it is a new high score for this player
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


  
  // when "Clear Scores" button is pressed, clear out the localStorage and remove elements from page that have high scores
  $("#clearScores").click(function (event) {

    localStorage.clear();         // delete local Storage
    $(".high-score").remove();    // delete all "high-score" class elements

  });   // of listening for click on "Clear High Scores" button


}); // end of document ready