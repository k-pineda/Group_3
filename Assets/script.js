// api variables
var scienceTriviaAPI = `https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple`
var randomJeapordyAPI=`http://jservice.io/api/random?count=5`

var answer;
var answer2;
var answer3;
var correctAnswer;

// element variables
var questionCategory1=$(".question-title")
var answerChoices=$(".answer-choices")

// current question index
var questionIndex = 0;
var trivias = [];
var category2Trivias = []
// timer
var timerEl = $(".time");
var timeLeft = 90;

var timeInterval;

// timer starts counting down from 75 seconds
function countdown() {
timeInterval = setInterval(function () 
{
  timeLeft--;
  timerEl.text("Time: " + timeLeft);
  if (timeLeft <= 0 || questionIndex === 5) 
     {
       timerEl.text("");
       clearInterval(timeInterval);
       $(".third-page").removeAttr("class", "hide"); //timer hits 0 remove hide from display score container
       $(".questions").attr("class", "hide")
     }
},1000)};

// category 1 here (answers will be in multiple choice)
function displayTrivia (){ 
    var trivia=trivias[questionIndex]
   answerChoices.empty()
    answer =  trivia.incorrect_answers[0]
    answer2 =  trivia.incorrect_answers[1]
    answer3 =  trivia.incorrect_answers[2]
    correctAnswer = trivia.correct_answer

    // inserting question into element
    questionCategory1.text(trivia.question)

    // create list item
    var firstOptionEl=$("<button>", {class:"science_answers"});
    var secondOptionEl=$("<button>", {class:"science_answers"});
    var thirdOptionEl=$("<button>", {class:"science_answers"});
    var fourthOptionEl=$("<button>", {class:"science_answers"});

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
    
    firstOptionEl.on("click",checkAnswer)
    secondOptionEl.on("click",checkAnswer)
    thirdOptionEl.on("click",checkAnswer)
    fourthOptionEl.on("click",checkAnswer)
}

// category 2 here (answers will be in text box)

function displayJeapordyTrivia (){ 
  var trivia=category2Trivias[questionIndex]
  answerChoices.empty()
  correctAnswer = trivia.answer

  console.log(correctAnswer)
  
  // inserting question into element
  questionCategory1.text(trivia.question)
  
  // create input item
  var firstOptionEl=$("<input>", {id:"answer"});

  
  // then append to ul
  answerChoices.append(firstOptionEl);
  
  firstOptionEl.keyup(function(event) {
    if (event.keyCode === 13){
      event.preventDefault()
      localStorage.setItem("user_answer",firstOptionEl.val())
      checkAnswer2()
    }
  })
}

function getJeapordyAPI(requestURL) {
  fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) 
  { 
    console.log(data)
    questionIndex=0;
    category2Trivias=data;
    displayJeapordyTrivia();
  })
}


function getTriviaAPI(requestURL) {
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) 
        { 
            questionIndex=0;
            trivias=data.results;
            displayTrivia();
        })
}

var questionsContainer = $("#second-page")

//remove hide from alldone container when user answers final question 
function allDoneDisplayed() {
  $(".third-page").removeClass("hide")
  questionsContainer.addClass("hide")
    // grab timeleft and add that number to final score
    $(".final-score").text("Your Final Score:" + " "+ timeLeft); 
}
// check function for jeapordy questions
function checkAnswer2() {
  var userAnswer=localStorage.getItem('user_answer').toUpperCase()
  var computerAnswer=(correctAnswer).toUpperCase()
if (computerAnswer.includes(userAnswer)) {
  $("#correct").removeClass("hide")
  setTimeout(function () {
    $("#correct").addClass("hide")
  }, 2000)
}
else {
  //subtract 10 seconds from timer
  timeLeft -= 3;
  $("#wrong").removeClass("hide")
  setTimeout(function () {
    $("#wrong").addClass("hide")
  }, 2000)
}
questionIndex++
 if (questionIndex<category2Trivias.length)
 {
  displayJeapordyTrivia()
 } else {
  allDoneDisplayed()
 }
}
// check function for science and education questions 
  function checkAnswer() {
  if ($(this).text() === correctAnswer) {
    $("#correct").removeClass("hide")
    setTimeout(function () {
      $("#correct").addClass("hide")
    }, 2000)
  }
  else {
    //subtract 3 seconds from timer
    timeLeft -= 3;
    $("#wrong").removeClass("hide")
    setTimeout(function () {
      $("#wrong").addClass("hide")
    }, 2000)
  }
  questionIndex++
  if (questionIndex<trivias.length){
    displayTrivia()
   } else {
    allDoneDisplayed()
   }  
  }


$("#category_1").on("click", function (event) 
{
    event.preventDefault()
    $(".first-page").attr("class", "hide")
    $(".questions").removeClass("hide")
    countdown()
    getTriviaAPI(scienceTriviaAPI);
})

$("#category_2").on("click", function (event) 
{
  event.preventDefault()
  $(".first-page").attr("class", "hide")
  $(".questions").removeClass("hide")
  countdown()
  getJeapordyAPI(randomJeapordyAPI);
})


