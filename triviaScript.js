var categoriesElement;
var categories = [];
var token;
var questionQueue = [];
const initialCategory = "9";
const questionsPerRequest = "3";
var sentRequests = 0;
var currentQuestion;
var answerAreaElement;
var optionMenuElement;
var questionElement;
var enabledArgs = {
    "type": {
        "boolean": false,
        "multiple": true
    },
    "difficulty": {
        "easy": false,
        "medium": true,
        "hard": false,
    },
    "categories": {}
};

window.onload = function()
{
    answerAreaElement = document.getElementById("answerArea");
    questionElement = document.getElementById("question");
}

function SendRequest(args, callback) 
{
    var req = new XMLHttpRequest();

    req.open("GET", "https://opentdb.com/api.php?amount=10" + args);
    req.send();
}

function GetQuestion() 
{
    answerAreaElement.innerHTML = "";
    questionElement.innerHTML = "Loading...";
    if (questionQueue.length == 0) {
        RetrieveQuestions();
    } else {
        ShowQuestion();
    }
}

function RetrieveQuestions() 
{
    var baseRequests = [];

    var requests = [];
    for (let i in enabledArgs.type) { //Types
        if (enabledArgs.type[i]) {
            var newRequests = [];
            for (let r of baseRequests) {
                newRequests.push(r + "&type=" + i)
            }
            requests = requests.concat(newRequests);
        }
    }

    baseRequests = requests;
    requests = [];

    sentRequests = 10;
    for (var i = 0; i < 10; i++) { //Send Requests To OpenTDB
        var r = Math.floor(Math.random() * requests.length);
        RequestQuestions(requests[r]);
    }

}

function RequestQuestions(url) 
{
    console.log(url);
    SendRequest(url, (res) => {
        if (res.response_code == 0) {
            questionQueue = questionQueue.concat(res.results);
        }
        sentRequests--;
        if (sentRequests <= 0) {
            if (questionQueue.length == 0) {
                SendRequest("api_token.php?command=reset&token=" + GetQuestion);
            } else {
                ShowQuestion();
            }
        }
    });
}

function ShowQuestion()
{
    var qn = Math.floor(Math.random() * questionQueue.length);
    var q = questionQueue[qn];
    currentQuestion = q;
    var answers = q.incorrect_answers;
    answers.splice(Math.floor(Math.random() * answers.length), 0 , q.correct_answer);

    questionElement.innerHTML = q.question;
    for (let i of answers) {
        var link = document.createElement("a");
        link.setAttribute("href", "#");

        var sect = document.createElement("section");
        sect.className = "option";
        sect.id = i; //txt//
        sect.setAttribute("onclick", "CheckAnswer(this.id)");
        link.append(sect);

        var listing = document.createElement("h4");
        listing.innerHTML = i; //txt//

        sect.append(listing);
        answerAreaElement.append(link);
    }

    questionQueue.splice(qn, 1);
}

function CheckAnswer(id)
{
    if (id == currentQuestion.correct_answer) {
        alert("Correct");
    } else {
        alert("Incorrect \nCorrect Answer: " + currentQuestion.correct_answer);
    }
    GetQuestion();
}