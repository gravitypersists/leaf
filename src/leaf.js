const Layer = require('./Layer');

class Leaf {

  constructor (configuration, options) {
    // this is a temporary check, element packaging needs rethinking
    if (!configuration.manifests) {
      console.log('manifests are required');
      return;
    }

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