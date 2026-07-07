const keys = document.querySelectorAll(".key");

function playSound(letter){

    const audio = document.querySelector(`audio[data-key="${letter}"]`);
    const key = document.querySelector(`.key[data-key="${letter}"]`);

    if(!audio) return;

    audio.currentTime = 0;
    audio.play();

    key.classList.add("playing");

    setTimeout(()=>{
        key.classList.remove("playing");
    },150);

}

// clavier

document.addEventListener("keydown",(event)=>{

    playSound(event.key.toLowerCase());

});

// souris

keys.forEach(key=>{

    key.addEventListener("click",()=>{

        playSound(key.dataset.key);

    });

});