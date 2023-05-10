// questions variable array goes here
$(document).ready(function () {

    var scienceTriviaAPI = `https://opentdb.com/api.php?amount=10&category=17&difficulty=easy`


var randomJeapordyAPI=`http://jservice.io/api/random?count=5`

    // setItem local storage will go here 
    // By Frank on 9th May 2023:
    // set local storage logic for input user enters in input element
    // need to use  localStorage.setItem() and localStorage.getItem()

    // get input from email text box and do localstorage.setitem with that variable with input value
    var email_text_input = $('#exampleInputEmail1').val();
    console.log(email_text_input);
    localStorage.setItem("exampleInputEmail1", email_text_input);

    // write if & for loop statement for category 1 here 

    // write if & for loop statement for category 2 here 

    function getTriviaAPI(requestURL) {
        fetch(requestURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
            })
    }

    $("#category_1").on("click", function (event) {
        getTriviaAPI(scienceTriviaAPI);
    })

    $("#category_2").on("click", function (event) {
        getTriviaAPI(randomJeapordyAPI);
    })
});
