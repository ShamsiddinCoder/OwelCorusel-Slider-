let container = document.querySelector(`.container`);
let slider = document.querySelector(`.slider`);
let slides = document.querySelectorAll(`.slide`);
let btns = document.querySelectorAll(`.btns`);

let autoplay = false;
let time = 1000;

let sliderOne = new SliderFunctions(container, slider, slides, btns, autoplay, time);