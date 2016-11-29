var problem = {}


//State modification functions
var addQuestion = function(questNum, quest, ans, ansIndex) {
    problem.questNumber = questNum;
    problem.question = quest;
    problem.answers = ans;
    problem.correctAnswerIndex = ansIndex;
    console.log(problem);
}





//Render functions
var displayQuestion = function(problem, form) {

    form.children('.js-question-number').text('Question ' + problem.questNumber + ' of 10');
    form.children('.js-question').text(problem.question);

    //now add the answers as a generated HTML string from getAnswers(problem)
    $(getAnswers(problem)).insertAfter(form.children('js-question'));

    $('.right-wrong').hide();

    /**<p class="question-number">Question 1 of 10</p>
                <p class="question" value="0"></p>
                <input type="radio"> 6,289'
                <p class="right-wrong"></p>
                <br>
                <input type="radio" value="1"> 5,829'
                <p class="right-wrong"></p>
                <br>
                <input type="radio" value="2"> 7,011'
                <p class="right-wrong"></p>
                <br>
                <input type="radio" value="3"> 4,981'
                <p class="right-wrong"></p>
                <p class="progress">correct/incorrect</p>
                <button type="submit">Submit</button>
                <br> **/

}


var getAnswers = function(problem) {

    var answerString = "";

    for (var i = 0; i < 4; i++) {

        answerString += '<input type="radio" value="' + i +
            '">' + problem.answers[i] + '<p class="right-wrong"></p><br>';
    }

    return answerString;
}






//Event Listeners

$(document).ready(function() {
    var questionNum = 1;

    addQuestion(questionNum, 'How tall is Mt. Washington?', ["4,981'", "5,829'", "6,289'", "7,011'"], 3);
    displayQuestion(problem, $('.js-q-area'));

    $('button').on('click', function(event) {   //be more specific w button later
        event.preventDefault();

        questionNum++;
        //trigger addQuestion() and displayQuestion()
    });
});
