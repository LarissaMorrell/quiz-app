
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
var displayQuestion = function(problem, element) {


    element.html('<p class="question-number">Question ' + problem.questNum + ' of 10</p>');

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









//Event Listeners

$(document).ready(function() {
	var questionNum = 1;

    addQuestion(questionNum, 'How tall is Mt. Washington?', ["4,981'", "5,829'", "6,289'", "7,011'"], 3);
    displayQuestion(problem, $('.js-q-area'));

    $('button').on('click', function(event) {
        event.preventDefault();

        

        questionNum++;
    });
});
