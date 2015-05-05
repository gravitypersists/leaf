const Layer = require('./Layer');

function Leaf(configuration, options) {

  new Layer(configuration.children, configuration.layout, 0, options.el);

}

module.exports = Leaf;