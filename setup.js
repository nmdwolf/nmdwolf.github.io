function setup() {

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

  if(!!document.getElementById("final")) {
    const top = document.getElementById("content").getBoundingClientRect().top;
    const top2 = document.getElementById("final").getBoundingClientRect().bottom;
    content.style.height = Math.abs(top2 - top) + "px";
  }
  else {
    const height = content.style.height;
    content.style.height = "calc(100% - " + (document.getElementById("content").getBoundingClientRect().top + 10) + "px";
    content.style.height = Math.max(parseFloat(height), parseFloat(content.style.height)) + "px";
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
