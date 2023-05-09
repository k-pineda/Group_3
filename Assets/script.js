// questions variable array goes here

var scienceTriviaAPI= `https://opentdb.com/api.php?amount=10&category=17&difficulty=easy`

var randomJeapordyAPI=`http://jservice.io/api/random`

// setItem local storage will go here 

// By Frank on 9th May 2023:
// set local storage logic for input user enters in input element
// need to use  localStorage.setItem() and localStorage.getItem()

// write if & for loop statement for category 1 here 

// write if & for loop statement for category 2 here 

function getTriviaAPI (requestURL){
    fetch(requestURL)
        .then(function (response)
        {
            return response.json();
        }) 
        .then(function(data){
            console.log(data)
        })
}

$("#category_1").on("click", function (event){
    getTriviaAPI(scienceTriviaAPI);
})

$("#category_2").on("click", function (event){
    getTriviaAPI(randomJeapordyAPI);
})



