var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var start = false;

function startOver(){
    level = 0;
    start = false;
    gamePattern = [];
}

$(document).on("keydown",function(){
    if(!start){
        $("h1").html("level "+level);
        nextSequence();
        start = true;
    }
})

$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})
function nextSequence() {

    userClickedPattern = [];

    $("h1").html("level "+level);
    level++;

    var randomNumber = Math.random();
    randomNumber = randomNumber * 4;
    randomNumber = Math.floor(randomNumber);

    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound (name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },200);
}

function checkAnswer (currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("Wrong");

        var audioP = new Audio("./sounds/wrong.mp3");
        audioP.play();

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);

        $("h1").html("Game Over, Press Any Key to Restart");
        startOver();
    }
}