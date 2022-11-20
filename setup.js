function setup() {
  const height = parseFloat(document.getElementById("content").style.height);
  window.onresize = event => fillContent(height, event);
  window.onload = event => fillContent(height, event);
}

function fillContent(initial_height) {

  /*
  document.addEventListener("scroll", (event) => {
    if (!isInViewport(document.getElementById("final"))) {
      const top = document.getElementById("content").getBoundingClientRect().top;
      const top2 = document.getElementById("final").getBoundingClientRect().bottom;
      //content.style.height = (top2 - top) + "px";
    }
  });
  */

  MathJax.typeset();

  const content = document.getElementById("content");

  if(!!document.getElementById("final")) {
    const top = content.getBoundingClientRect().top;
    const top2 = document.getElementById("final").getBoundingClientRect().bottom;
    content.style.height = "calc(100% - " + (top + 10) + "px)";
    content.style.height = Math.max(top2 - top /*- 10*/, parseFloat(window.getComputedStyle(content).height)) + "px";
  } else {
    const top = content.getBoundingClientRect().top;
    if(top <= 0) {
      content.style.height = "calc(100% + " + (-top - 10) + "px)";
    } else {
      content.style.height = "calc(100% - " + (top + 10) + "px)";
    }
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
