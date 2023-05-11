// api variables
var scienceTriviaAPI = `https://opentdb.com/api.php?amount=10&category=17&difficulty=easy`
var randomJeapordyAPI=`http://jservice.io/api/random?count=5`

// element variables
var questionCategory1=$(".question-title")
var answerChoices=$(".answer-choices")

// current question index
var currentIndex = 0;

// write if & for loop statement for category 1 here (answers will be in multiple choice)

function getTriviaAPI(requestURL) {
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) 
        {
                //grabbing options neeed to add these to li elements before appending li element to UL
                var answer =  data.results[currentIndex].incorrect_answers[0]
                var answer2 =  data.results[currentIndex].incorrect_answers[1]
                var answer3 =  data.results[currentIndex].incorrect_answers[2]
                var correctAnswer = data.results[currentIndex].correct_answer

                // inserting question into element
                questionCategory1.text(data.results[currentIndex].question)

                // create list item
                var firstOptionEl=$("<li>", {id:"option_1"});
                var secondOptionEl=$("<li>", {id:"option_2"});
                var thirdOptionEl=$("<li>", {id:"option_3"});
                var fourthOptionEl=$("<li>", {id:"option_4"});

                // insert text to li here?????
                firstOptionEl.text(answer);
                secondOptionEl.text(answer2);
                thirdOptionEl.text(answer3);
                fourthOptionEl.text(correctAnswer);

                // then append to ul
                answerChoices.append(firstOptionEl);
                answerChoices.append(secondOptionEl);
                answerChoices.append(thirdOptionEl);
                answerChoices.append(fourthOptionEl); 
        })
}

// write if & for loop statement for category 2 here (answers will be in text box)

$("#category_1").on("click", function (event) {
    event.preventDefault()
    $(".first-page").attr("class", "hide")
    $(".questions-container").removeAttr("class", "hide")
    getTriviaAPI(scienceTriviaAPI);
})

// $("#category_2").on("click", function (event) {
//     getTriviaAPI(randomJeapordyAPI);
// })


