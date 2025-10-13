let text = document.querySelector('.text');
let bg = document.querySelector('.bg');

let load = 0;
let handle = setInterval(blurring, 30);

function blurring(){
    ++load;
    console.log(load);
    if (load > 99) clearInterval(handle);

    text.innerText = load + '%';
    text.style.opacity = `${load / 100.0}`;
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
}


// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}