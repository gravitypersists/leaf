const Layer = require('./layer');

class Leaf {

  constructor (configuration, options) {
    // this is a temporary check, element packaging needs rethinking
    if (!configuration.manifests) {
      console.log('manifests are required');
      return;
    }

    // an object for storing leaf-level data
    this.scope = {
      elements: {},
      allLayers: configuration.content
    };
    let layerNode = configuration.content["0"];
    new Layer(layerNode.children, layerNode.layout, "0", options.el, this.scope);
  }

  getElementById(id) {
    return this.scope.elements[id];
  }

}

module.exports = Leaf;