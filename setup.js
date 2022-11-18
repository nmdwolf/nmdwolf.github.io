function setup() {
  const content = document.getElementById("content");
  var total = window.innerHeight;

  total = total - content.getBoundingClientRect().top;
  total = total - parseFloat(window.getComputedStyle(content).getPropertyValue('padding-top'));
  content.style.height = total + "px";

  document.addEventListener("scroll", (event) => {
    content.style.height = (parseFloat(content.style.height) + window.scrollY) + "px";
  });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
