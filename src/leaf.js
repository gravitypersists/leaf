const Layer = require('./Layer');

class Leaf {

  constructor (configuration, options) {
    this.scope = {}; // an object for storing leaf-level data
    new Layer(configuration.content.children, configuration.layout, 0, options.el, this.scope);
  }

}

module.exports = Leaf;