const Layer = require('./Layer');

class Leaf {

  constructor (configuration, options) {
    // an object for storing leaf-level data
    this.scope = {
      elements: {}
    };
    new Layer(configuration.content.children, configuration.layout, "0", options.el, this.scope);
  }

  getElementById(id) {
    return this.scope.elements[id];
  }

}

module.exports = Leaf;