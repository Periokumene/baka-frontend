const progress = document.getElementById("progress")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const circles = document.querySelectorAll('.circle')

let currentActive = 0;
next.addEventListener('click', ()=>{
    ++currentActive;
    if (currentActive > circles.length - 1)
        currentActive = circles.length - 1;
    updateProgress();
})
prev.addEventListener('click', ()=>{
   --currentActive;
   if (currentActive < 0)
       currentActive = 0;
   updateProgress();
});

updateProgress();



function updateProgress(){
    circles.forEach((circle, i)=>{
        if (i <= currentActive)
            circle.classList.add('active');
        else
            circle.classList.remove('active');

        progress.style.width = currentActive / (circles.length-1) * 100 + '%';

        prev.disabled = currentActive == 0;
        next.disabled = currentActive == circles.length - 1;
    })
}