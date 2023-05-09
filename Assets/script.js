
var triviaAPI= `https://opentdb.com/api.php?amount=10&category=17&difficulty=easy`

function triviaGame (triviaAPI){
    fetch(triviaAPI)
        .then(function (response)
        {
            return response.json();
        }) 
        .then(function(data){
            console.log(data)
        })
}

triviaGame(triviaAPI);