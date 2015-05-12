var Leaf = require('../src/leaf');

var options = {
  el: document.querySelector('#top-node')
}

var configuration = require('./basic.json');

new Leaf(configuration, options);
