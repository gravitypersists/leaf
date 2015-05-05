// Takes an string, creates a dom element representing it's top level 
module.exports = function create(string) {
  var tempContainer = document.createElement('div');
  tempContainer.innerHTML = string.trim();
  var realElement = tempContainer.firstChild;
  return realElement;
}