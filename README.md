# Quiz

https://mauraslavin.github.io/Quiz/

Take a timed multiple-choice quiz.  Try to beat your high score!

From the home page, 
    - you may click on "High Scores" to see the history of high scores by person (identified by initials entered).
      NOTE:  the initials entered are case-sensitive, so MMS is different than mms.

    - or you may click on "Click to Take Quiz" button to begin the quiz.

Taking the quiz:
    The clock is set at 15 seconds times the number of questions in the questions.js file.  Changing the number of questions in that file will automatically change the time the player has to complete the quiz.

    The timer appears (in minute:second format) and begins to count down.
    The player clicks on an answer.  
        - For a right answer, a message stating so is displayed with the next question.
        - For an incorrect answer, an appropriate message is displayed, 15 seconds is deducted (and reflected on the timer), and the next question is displayed.

    The game ends when either the time runs out or all the questions are answered.
    The players score is the amount of time left on the timer.

When the game ends, the player is shown their score, and is prompted for their initials.  The High Scores list is then displayed (including the current score, if it is a personal best!).  The High Scores list displays each player's highest score.

From the High Scores page, the player may click on "Clear High Scores" to erase all the High Score history;
or click on "Quiz" to return to the home page and try again.


