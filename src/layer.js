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
  Text: require('./elements/text/text.js'),
  Katex: require('./elements/katex/katex.js'),
  Picker: require('./elements/picker/picker.js'),
  Image: require('./elements/image/image.js'),
  Switch: require('./elements/switch/switch.js'),
  EventButton: require('./elements/event-button/event-button.js')
}


class Layer {

  constructor(elements, layout, depth, el, leafScope) {
    this.elements = elements;
    this.depth = depth;
    this.leafScope = leafScope; // this object is shared across all layers

    let layerEl = el;
    if (depth === "0") {
      layerEl = $create('<div class="leaf-layer" data-leaf-node="0"></div>');
      $append(el, layerEl);
    }
    for (let id in elements) {
      let element = elements[id];
      let facade = this.buildFacade(element);

      // Element instantiation is still something I am thinking heavily
      // about. It might use webcomponents.js or it might not, I need to
      // research more. This is just a simple exposed constructor for 
      // the time being.
      let elToRenderInto = null;
      if (element.type === "Text") {
        elToRenderInto = layerEl;
      } else {
        let container = $create('<div class="shadow-container"></div>');
        // this is display block, but nested is display inline-block
        // why the inconsistency? Because I haven't integrated layout
        // support yet.
        let elementEl = element.container || $insert(layerEl, `<div 
                                                class="leaf-element"
                                                data-leaf-el="${ id }"
                                                style="display: block;">
                                              </div>`);
        $append(elementEl, container);
        elToRenderInto = container.createShadowRoot();
      }

      new includes[element.type](element.config, elToRenderInto, facade);
      // we keep track of these elements by id, so they can be accessed
      // externally, with tools like leafbuilder
      this.leafScope.elements[depth+':'+id] = {
        elementData: element,
        rebuild: (config) => {
          elToRenderInto.innerHTML = "";
          new includes[element.type](config, elToRenderInto, facade);
        }
      }

    }
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

  buildChildLayer(elements, layout, depth, el) {
    return new Layer(elements, layout, depth, el, this.leafScope);
  }

}

module.exports = Layer;