// Takes the first element and appends the second one to it
module.exports = function removeClass(klass, elements) {
  elements = (elements.constructor === NodeList) ? elements : [elements];
  if (elements.length === 0) return;
  Array.prototype.forEach.call(elements, function(element) {
    element.classList.remove(klass);
  });
}