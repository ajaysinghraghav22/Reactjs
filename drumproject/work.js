var numberOfDrums = document.querySelectorAll(".btn").length;
for(var i=0;i<numberOfDrums;i++){
    document.querySelectorAll(".btn")[i].addEventListener("click",function(){
        var button = this.innerHTML;
        sound(button);
        animation(button);
    });
}
document.addEventListener("keydown",function(event){
    sound(event.key);
    animation(event.key);
});
function sound(key){
    switch(key){
        case "w":
            var tom1 = new Audio("C:\Users\ajay raghav\Desktop\React\drumproject\sounds\crash.mp3");
            tom1.play();
            break;
        case "a":
            var crash = new Audio("./sounds/crash.mp3");
            crash.play();
            break;
        case "s":
            var tom2 = new Audio("./sounds/tom-2.mp3");
            tom2.play();
            break;
        case "d":
            var snare = new Audio("./sounds/snare.mp3");
            snare.play();
            break;
        case "j":
            var tom3 = new Audio("./sounds/tom-3.mp3");
            tom3.play();
            break;
        case "k":
            var tom4 = new Audio("./sounds/tom-4.mp3");
            tom4.play();
            break;
        case "l":
            var kick = new Audio("./sounds/kick-bass.mp3");
            kick.play();
            break;
        default:
            console.log("Invalid Button "+button);
    }   
}
function animation(key){
    var activeButton = document.querySelector("."+key);
    activeButton.classList.add("pressed");
    setTimeout(function(){
        activeButton.classList.remove("pressed");
    }, 100);
}