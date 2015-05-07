const $create = require('./dom/create');
const $append = require('./dom/append');
const $insert = require('./dom/insert');

const NestInterface = require('./apis/nesting');
const CommunicationInterface = require('./apis/communication');

// In the future elements will probably be downloaded on demand with 
// webpack, but some will be packaged within the framework themselves,
// for now we include them all here until we have leaf-sdk publishing
// consumable packages, then it becomes a question of how to configure
// leaf-sdk's output to work with leaf's input.
const includes = {
  text: require('./elements/text'),
  katex: require('./elements/katex'),
  picker: require('./elements/picker'),
  image: require('./elements/image'),
  switch: require('./elements/switch')
}


class Layer {

  constructor(elements, layout, depth, el, leafScope) {
    this.elements = elements;
    this.depth = depth;
    this.leafScope = leafScope; // this object is shared across all layers

    let layerEl = $create('<div class="leaf-layer"></div>');
    $append(el, layerEl);  

    elements.forEach(element => {
      let facade = this.buildFacade(element);

      // equivalent to "var type = element.id.split(':')[0]" and id too.
      let [type, id] = element.id.split(':').map(x => x.toLowerCase());

      // Element instantiation is still something I am thinking heavily
      // about. It might use webcomponents.js or it might not, I need to
      // research more. This is just a simple exposed constructor for 
      // the time being.
      if (includes[type]) {
        let container = $create('<div class="shadow-container"></div>');
        $append(layerEl, container);
        var shadow = container.createShadowRoot();
        let childEl = $insert(shadow, '<div class="leaf-element"></div>'); 
        new includes[type](element.config, childEl, facade);
      }

    });
  }

  buildFacade(element) {
    // it might make sense to construct these APIs as class mixins
    let nest = new NestInterface(this, element);
    let comm = new CommunicationInterface(this, element);
    return {
      nest: nest.nest.bind(nest), // seriously?
      publish: comm.publish.bind(comm),
      subscribe: comm.subscribe.bind(comm),
      expose: comm.expose.bind(comm),
      observe: comm.observe.bind(comm),
    }
  }

  buildChildLayer(elements, layout, el) {
    return new Layer(elements, layout, 0, el, this.leafScope);
  }

}

module.exports = Layer;