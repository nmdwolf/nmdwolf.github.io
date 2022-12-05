function setup() {
  window.onresize = fillContent;
  window.onload = fillContent;
  window.onscroll = fillContent;
}

function fillContent() {

  const bg = document.getElementById("background");
  if(document.getElementById("content").getBoundingClientRect().top < 0) {
    bg.style.position = "fixed";
    bg.style.height = "100vh";
  } else {
    bg.style.position = "absolute";
    console.log();
    bg.style.height = "calc(100vh - "
      + window.getComputedStyle(document.getElementById("banner")).height
      + " - " + window.getComputedStyle(document.getElementById("banner")).marginBottom
      + " - " + window.getComputedStyle(document.getElementById("banner")).paddingTop
      + " - " + document.getElementById("banner").getBoundingClientRect().top + "px"
      + ")";
  }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        //rect.top >= 0 &&
        //rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) //&&
        //rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
