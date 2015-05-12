var Leaf = require('../src/leaf');
var $ = require('jquery');

var options = {
  el: $('#top-node')[0]
}

var configuration = require('./basic.json');

new Leaf(configuration, options);
