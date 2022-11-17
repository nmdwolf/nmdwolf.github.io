function setup() {
  let total = window.innerHeight;
  total = total - document.getElementById("content").getBoundingClientRect().top;
  total = total - parseFloat(window.getComputedStyle(document.getElementById("content")).getPropertyValue('padding-top'));
  document.getElementById("content").style.height = total + "px";
}
