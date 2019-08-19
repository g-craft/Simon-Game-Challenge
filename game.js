var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 3);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + buttonColors[randomNumber]).fadeOut(150).fadeIn(150);
  playSound(buttonColors[randomNumber]);
  animatePress(buttonColors[randomNumber]);

}

$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
setTimeout(function() {
  $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keypress(function(){
if (started == false){
started = true;
setTimeout(function () {
nextSequence(); }, 400);}
else{}
});

function checkAnswer(currentLevel){
if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
console.log("succes");
if (userClickedPattern.length === gamePattern.length){
setTimeout(function () {nextSequence(); }, 1000);
userClickedPattern=[];}}
else{
console.log("wrong");
playSound("wrong");
$("body").addClass("game-over");
setTimeout(function() {
$("body").removeClass("game-over");
}, 200);
$("#level-title").text("Game Over, Press Any Key to Restart");
startOver();
}
}

function startOver(){
level=0;
gamePattern=[];
started = false;
}
