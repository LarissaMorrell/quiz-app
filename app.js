var questions = []; //array of question# objects


//State modification functions
function Question(prompt, answers, correctAnswerIndex) {
    this.prompt = prompt;
    this.answers = answers;
    this.correctAnswerIndex = correctAnswerIndex;
    currentlyDisplayed = false;
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




function nextQuestion(questionNum) {


    displayQuestion(questionNum);

    if (questions[questionNum].currentlyDisplayed && questionNum < 4) {

        questions[questionNum].currentlyDisplayed = false;
        questions[questionNum + 1].currentlyDisplayed = true;

        //render funtion

    } else if (questionNum == 4) {
        //end the quiz with final score


    } else { //currently displayed is false so we are at quest 0

        questions[questionNum].currentlyDisplayed = true;

        //render function
        //displayQuestion(questions[questionNum]);
    }

}

function checkAnswer(choice, questionNum) {

    correctAnswer = questions[questionNum].correctAnswerIndex;

    //compare correctIndex with the choice
    if (choice == correctAnswer) {
        return true;
    } else {
        return false;
    }
}




//Render functions

function displayQuestion(questionNum) {

    //for some reason this is outputing 2 lines of code, with one being the object

    $('.js-question-number').text('Question ' + (questionNum + 1) + ' of ' + questions.length);

    //why is prompt undefined?????
    $('.js-question').text(questions[questionNum].prompt);

    if (questionNum > 0) {
        //delete existing radio buttons
        $('ul').children().remove();
    }
    //must 
    $('.js-answers').append(getChoices(questionNum));

    $('.right-wrong').hide();

    //loop through the questions and display currentlyDidsplayed=true

}



function getChoices(questionNum) {

    var answerString = "";

    for (var i = 0; i < 4; i++) {

        answerString += '<li><input type="radio" name="choice" value="' + i +
            '">  ' + questions[questionNum].answers[i] + '<p class="right-wrong"></p></li>';
    }

    return answerString;
}










//Event Listeners

$(document).ready(function() {
    var questionNum = 0;
    var submitted = false;

    $('.next').hide();
    displayQuestion(questionNum);


    $('.submit').on('click', function(event) {
        event.preventDefault();


        //take in the numeric numbered radio button, and set equal to choice
        //but this won't work because radios are not there on page load
        var choice = $("input[name=choice]:checked").val()

        //check to make sure an answer has been selected
        if (checkAnswer(choice, questionNum)) {
            submitted = true;

            //toggle buttons
            $('.submit').hide();
            $('.next').show();

           //show the correct answer and the score
        }
    });


//input[name='next-question']
    $('.next').on('click', function(event) { //be more specific w button later
        event.preventDefault();

        //toggle buttons
        $('.submit').show();
        $('.next').hide();

        if (submitted) {
            //move on to next question
            nextQuestion(++questionNum);

            submitted = false; //reset
        }
    });
});
