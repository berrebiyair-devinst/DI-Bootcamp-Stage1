const palette = document.getElementById("palette");
const grid=document.getElementById("grid");
const clear=document.getElementById("clear");

const colors = [

    "red",
    "orange",
    "yellow",
    "green",
    "cyan",
    "blue",
    "purple",
    "pink",
    "black",
    "white"
];

colors.forEach(function (color){
    const square = document.createElement("div");
    square.classList.add("color");
    square.style.backgroundColor =color;
    palette.appendChild(square);
});

for (let i=0; i<1600;i++){
const pixel = document.createElement("div");
pixel.classList.add("pixel");
grid.appendChild(pixel);

}

let currentColor="black"

document.querySelectorAll(".color").forEach(square =>{

square.addEventListener("click",()=>{

    currentColor= square.style.backgroundColor;
});

});

let drawing=false;

document.addEventListener("mousedown",()=>{
    drawing=true;
});
    document.addEventListener("mouseup",()=>{
    drawing=false
});

const pixels= document.querySelectorAll(".pixel");

pixels.forEach(pixel =>{
    pixel.addEventListener("mousedown", ()=>{
        pixel.style.backgroundColor= currentColor;
    });

    pixel.addEventListener("mouseover",()=>{
        if (drawing) {
            pixel.style.backgroundColor= currentColor;
        }
    });
});
  clear.addEventListener("click",() =>{
    document.querySelectorAll(".pixel").forEach(pixel =>{
        pixel.style.backgroundColor="white";
    });
  });