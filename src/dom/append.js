// Takes the first element and appends the second one to it
module.exports = function html(parent, child) {
  parent.appendChild(child);
  return parent;
}