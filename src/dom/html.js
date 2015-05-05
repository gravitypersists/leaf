// Takes an element and sets its inner html with a string
module.exports = function html(element, string) {
  element.innerHTML = string.trim();
  return element;
}