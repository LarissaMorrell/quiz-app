var questions = []; //array of question# objects


//State modification functions
var Question = function(quest, ans, ansIndex) {
    this.question = quest;
    this.answers = ans;
    this.correctAnswerIndex = ansIndex;
    this.currentlyDisplayed = false;
}

//objects
var question1 = new Question('How tall is Mt. Washington?', ["4,981'", "5,829'", "6,289'", "7,011'"], 2);
var question2 = new Question('Up until 1996, Mt. Washington has had the highest recorded wind speeds on Earth. What was the speed?', ['189 mph', '231 mph', '295 mph', '305 mph'], 1);
var question3 = new Question('In 1524, Giovanni da Verrazzano was the first European to mention the mountain. He was viewing it from which location?', ['Plymouth Rock', 'Mt. Adams', 'Mt. Katahdin', 'The Atlantic Ocean'], 3);
var question4 = new Question('The most popular trail up the mountain is also the most deadly. What is the name of this trail?', ['Tuckerman Ravine Trail', 'Appalachian Trail', 'Lion Head Trail', 'Boott Spur Trail'], 0);
var question5 = new Question('What reason makes Tuckerman Ravine Trail the most deadly?', ['It is a family trail, which has many unprepared hikers.', 'The rapidly changing weather conditions.', 'The area is prone to avalanches.', 'All of the above.'], 0);

questions.push(question1);
questions.push(question2);
questions.push(question3);
questions.push(question4);
questions.push(question5);



//main action
function nextQuestion() {

    console.log("next question");


    for (var i = 0; i < questions.length; i++) {

        displayQuestion(i);

        if (questions[i].currentlyDisplayed && i < 4) {

            questions[i].currentlyDisplayed = false;
            questions[i + 1].currentlyDisplayed = true;

            //render funtion

            break;
        } else if (i == 4) {
            //end the quiz with final score


        } else { //currently displayed is false so we are at quest 0

            questions[0].currentlyDisplayed = true;

            //render function
            displayQuestion(questions[0]);

        }
    }

}



function displayQuestion(questionNum) {

    $('.js-question-number').text('Question ' + (questionNum + 1) + ' of ' + questions.length);
    $('.js-question').text(questions[questionNum].question);

    $('.js-answers').append(getAnswers(questionNum));

    $('.right-wrong').hide();

    //loop through the questions and display currentlyDidsplayed=true

}



var getAnswers = function(questionNum) {

    var answerString = "";

    for (var i = 0; i < 4; i++) {

        answerString += '<li><input type="radio" name="choice" value="' + i +
            '">  ' + questions[questionNum].answers[i] + '<p class="right-wrong"></p></li>';
    }

    return answerString;
}






//Event Listeners

$(document).ready(function() {

    displayQuestion(0);

    $('button').on('click', function(event) { //be more specific w button later
        event.preventDefault();
        console.log("submit");
        nextQuestion();


    });
});
