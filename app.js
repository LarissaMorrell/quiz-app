var questions = []; //array of question# objects
var pointsEarned = 0;

//State modification functions
function Question(prompt, answers, correctAnswerIndex) {
  this.prompt = prompt;
  this.answers = answers;
  this.correctAnswerIndex = correctAnswerIndex;
  currentlyDisplayed = false;
}

//objects
var question1 = new Question(
  "How tall is Mt. Washington?",
  ["4,981'", "5,829'", "6,289'", "7,011'"],
  2
);
var question2 = new Question(
  "Up until 1996, Mt. Washington has had the highest recorded wind speeds on Earth. What was the speed?",
  ["189 mph", "231 mph", "295 mph", "305 mph"],
  1
);
var question3 = new Question(
  "In 1524, Giovanni da Verrazzano was the first European to mention the mountain. He was viewing it from which location?",
  ["Plymouth Rock", "Mt. Adams", "Mt. Katahdin", "The Atlantic Ocean"],
  3
);
var question4 = new Question(
  "The most popular trail up the mountain is also the most deadly. What is the name of this trail?",
  [
    "Tuckerman Ravine Trail",
    "Appalachian Trail",
    "Lion Head Trail",
    "Boott Spur Trail"
  ],
  0
);
var question5 = new Question(
  "What reason makes Tuckerman Ravine Trail the most deadly?",
  [
    "It is a family trail, which has many unprepared hikers.",
    "The rapidly changing weather conditions.",
    "The area is prone to avalanches.",
    "All of the above."
  ],
  3
);

questions.push(question1);
questions.push(question2);
questions.push(question3);
questions.push(question4);
questions.push(question5);

function checkAnswer(questionNum) {
  //take in the numeric numbered radio button, and set equal to choice
  var userResponse = $("input[name=choice]:checked").val();
  var correctResponse = questions[questionNum].correctAnswerIndex;

  if (userResponse == correctResponse) {
    pointsEarned += 100 / questions.length;
    return true;
  } else {
    return false;
  }
}

//Render functions

function displayQuestion(questionNum) {
  $(".js-question-number").text(
    "Question " + (questionNum + 1) + " of " + questions.length
  );
  $(".js-question").text(questions[questionNum].prompt);

  //after first question delete existing radio buttons
  if (questionNum > 0) {
    $("ul")
      .children()
      .remove();
  }
  $(".js-answers").append(getChoices(questionNum));
}

function getChoices(questionNum) {
  var answerString = "";

  for (var i = 0; i < 4; i++) {
    answerString +=
      "<li>" +
      '<span class="feedback"></span>' +
      '<input type="radio" name="choice" value="' +
      i +
      '"> ' +
      questions[questionNum].answers[i] +
      "</li>";
  }

  return answerString;
}

function userSubmitFeedback(questionNum) {
  if (checkAnswer(questionNum)) {
    //remove previous feedback and show correct answer
    $(".wrong").remove();
    $("<p class='right'>Correct!</p>").insertAfter(".next");
    return true;
  } else {
    var correctIndex = questions[questionNum].correctAnswerIndex;

    if (!$("p").hasClass("wrong")) {
      $(
        '<p class="wrong">Wrong. The answer is ' +
          questions[questionNum].answers[correctIndex] +
          "</p>"
      ).insertAfter(".next");
    }
    return false;
  }
}

function displayScore() {
  $(".js-q-area")
    .children()
    .remove();
  $(".js-q-area").append("<p>Your score is " + pointsEarned + "%</p>");
}

//Event Listeners

$(document).ready(function() {
  var questionNum = 0;

  $(".next").hide();
  displayQuestion(questionNum);

  $(".submit").on("click", function(event) {
    event.preventDefault();

    //toggle buttons
    $(".submit").hide();
    $(".next").show();
    userSubmitFeedback(questionNum);
  });

  $(".next").on("click", function(event) {
    //be more specific w button later
    event.preventDefault();

    $(".wrong").remove();
    $(".right").remove();

    //toggle buttons
    $(".submit").show();
    $(".next").hide();

    //check for end of quiz
    if (questionNum == questions.length - 1) {
      $(".js-q-area")
        .children()
        .remove();
      $(".question-number").remove();
      displayScore();

      return;
    }

    displayQuestion(++questionNum);
  });
});
