var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour = "";
var started = false;
var level = 0;

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour);


    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    level++;
    $("#level-title").html("Level "+level);
    playSounds(randomChosenColour);
    
}

function playSounds(sound){
    var audio = new Audio("./sounds/"+sound+".mp3");
    audio.play();
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSounds(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function (){
        $("#"+ currentColor).removeClass("pressed")
    },100)
};
$("body").keypress(function(){
    if(!started){
        $("#level-title").html("Level "+level);
        nextSequence();
        started = true;
    }
    
});
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else {
        playSounds("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        console.log("wrong");
        startOver();
    }
};
function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}