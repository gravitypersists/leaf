let append = require('./append');
let create = require('./create');

// Takes an element, and sets its innerHTML, 
// returning the newly created child
module.exports = function insert(el, html) {
  let child = create(html);
  append(el, child)
  return child;
}