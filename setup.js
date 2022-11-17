function setup() {
  let total = window.innerHeight;
  total = total - document.getElementById("content").getBoundingClientRect().top;
  total = total - parseFloat(window.getComputedStyle(document.getElementById("content")).getPropertyValue('padding-top'));
  document.getElementById("content").style.height = total + "px";
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
