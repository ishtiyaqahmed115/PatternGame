var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {

    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
  
}

$(".btn").on("click",function(e){
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer((userClickedPattern.length - 1));
    
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
  
    var timeout = 100;
    setTimeout(() => {
        $("."+currentColor).removeClass("pressed");
    }, timeout);
}
function animateWrong(){
    $(document.body).addClass("game-over");
    setTimeout(() => {
        $(document.body).removeClass("game-over");
    }, 200);
}

$("body").keypress(function (){
    nextSequence();
})
function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}

function checkAnswer(currentLevel){
    console.log(currentLevel);
    console.log(level);

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("correct");
        if(currentLevel === level-1){
            setTimeout(() => {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    }else{
        console.log("wrong");
        animateWrong();
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("#level-title").text("Game Over, Press any key to Restart.");
        
    }
}