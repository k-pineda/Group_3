// api variables
var scienceTriviaAPI = `https://opentdb.com/api.php?amount=10&category=17&difficulty=easy`
var randomJeapordyAPI=`http://jservice.io/api/random?count=5`

// element variables
var questionCategory1=$(".question-title")
var answerChoices=$(".answer-choices")

// current question index
var questionIndex = 0;

// timer
var timerEl = $(".time");
var timeLeft = 60;


// timer starts counting down from 75 seconds
function countdown() {
var timeInterval = setInterval(function () 
{
  timeLeft--;
  timerEl.text("Time: " + timeLeft);
  if (timeLeft <= 0 || questionIndex === 4) 
     {
       timerEl.text("");
       clearInterval(timeInterval);
       $(".third-page").removeAttr("class", "hide"); //timer hits 0 remove hide from alldone container
       $(".second-page").attr("class", "hide")
     }
},1000)};

// write if & for loop statement for category 1 here (answers will be in multiple choice)

function getTriviaAPI(requestURL) {
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) 
        {
                //grabbing options neeed to add these to li elements before appending li element to UL
                var answer =  data.results[questionIndex].incorrect_answers[0]
                var answer2 =  data.results[questionIndex].incorrect_answers[1]
                var answer3 =  data.results[questionIndex].incorrect_answers[2]
                var correctAnswer = data.results[questionIndex].correct_answer

                // inserting question into element
                questionCategory1.text(data.results[questionIndex].question)

                // create list item
                var firstOptionEl=$("<li>", {id:"option_1"},{class:"collection-item black-text"});
                var secondOptionEl=$("<li>", {id:"option_2"},{class:"collection-item black-text"});
                var thirdOptionEl=$("<li>", {id:"option_3"},{class:"collection-item black-text"});
                var fourthOptionEl=$("<li>", {id:"option_4"},{class:"collection-item black-text"});

                // insert text to li 
                firstOptionEl.text(answer);
                secondOptionEl.text(answer2);
                thirdOptionEl.text(answer3);
                fourthOptionEl.text(correctAnswer);

                // then append to ul
                answerChoices.append(firstOptionEl);
                answerChoices.append(secondOptionEl);
                answerChoices.append(thirdOptionEl);
                answerChoices.append(fourthOptionEl); 

                // displayCurrentQuestion.choices.forEach(userChoice => {
                //     var choiceBtn = document.createElement("button")
                //     choiceBtn.textContent = userChoice.answer
                //     choiceBtn.setAttribute("value", userChoice.correct)
                //     choiceBtn.onclick = checkAnswer
                //     answerChoice.append(choiceBtn)
                //   });
        })
        checkAnswer();
}

function checkAnswer() {
    if (this.value === "true") {
      $(".correct").removeAttr("class", "hide")
      setTimeout(function () {
        $(".correct").attr("class", "hide")
      }, 1000)
    }
    else {
      //subtract 10 seconds from timer
      timeLeft -= 10;
      $(".wrong").removeAttr("class", "hide")
      setTimeout(function () {
        (".wrong").attr("class", "hide")
      }, 1000)
    }
    $(".answer-choices").text("");
    questionIndex++
    allDoneDisplayed()
    // questionsDisplayed()
  }

  //remove hide from alldone container when user answers final question 
function allDoneDisplayed() {
    if (questionIndex === 4) {
      $(".third-page").removeAttr("class", "hide")
      $(".second-page").attr("class", "hide")
      // grab timeleft and add that number to final score
      $(".final-score").text(timeLeft); 
    }
  }

// write if & for loop statement for category 2 here (answers will be in text box)

$("#category_1").on("click", function (event) {
    event.preventDefault()
    $(".first-page").attr("class", "hide")
    $(".questions-container").removeAttr("class", "hide")
    countdown()
    getTriviaAPI(scienceTriviaAPI);
})

// $("#category_2").on("click", function (event) {
//     getTriviaAPI(randomJeapordyAPI);
// })


