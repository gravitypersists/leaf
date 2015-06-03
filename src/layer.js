const $create = require('./dom/create');
const $append = require('./dom/append');
const $insert = require('./dom/insert');

const NestInterface = require('./apis/nesting');
const CommunicationInterface = require('./apis/communication');
const LogicInterface = require('./apis/logic');

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
  EventButton: require('./elements/event-button/event-button.js'),
  LogicalStatement: require('./elements/logical-statement/logical-statement.js'),
}

// Layout engines take a config, and then a render function
// takes a DOM element and returns an array of elements, where
// each item is { id: id of element, el: DOM el to render into }
const layouts = {
  Document: require('./layout-engines/document.js')
}

// "element" refers to a leaf element. "el" refers to DOM element. Sorry.
class Layer {

  constructor(elements, layout, depth, el, leafScope, layers) {
    this.elements = elements;
    this.depth = depth;
    this.leafScope = leafScope; // this object is shared across all layers

    let layerEl = $create(`
      <div class="leaf-layer" data-leaf-node="${ depth }"></div>
    `);
    $append(el, layerEl);

    let leConstructor = layouts[layout.type]; // le not a joke
    let layoutEngine = new leConstructor(layout.config);
    let engineOutput = layoutEngine.render(layerEl);

    engineOutput.forEach((output) => {
      let element = this.elements[output.id]
      this.buildElementIntoLayer(element, output.el);
    });
  }

  // Element instantiation is still something I am thinking heavily
  // about. It might use webcomponents.js or it might not, I need to
  // research more. This is just a simple exposed constructor for 
  // the time being.
  buildElementIntoLayer(element, el) {
    element.uniqueId = this.depth+':'+element.elementId;

    let elToRenderInto = null;
    if (element.type === "Text") {
      elToRenderInto = el;
    } else {
      let container = $create('<div class="shadow-container"></div>');
      $append(el, container);
      elToRenderInto = container.createShadowRoot();
    }

    let facade = this.buildFacade(element);
    new includes[element.type](element.config, elToRenderInto, facade);

    // we keep track of these elements by id, so they can be accessed
    // externally, with tools like leafbuilder
    this.leafScope.elements[element.uniqueId] = {
      elementData: element,
      rebuild: (config) => {
        elToRenderInto.innerHTML = "";
        new includes[element.type](config, elToRenderInto, facade);
      }
    }

  }

  buildFacade(element) {
    // it might make sense to construct these APIs as class mixins
    let nest = new NestInterface(this, element);
    let comm = new CommunicationInterface(this, element);
    let logic = new LogicInterface();
    return {
      nest: nest.nest.bind(nest), // seriously?
      textNest: nest.textNest.bind(nest),
      publish: comm.publish.bind(comm),
      subscribe: comm.subscribe.bind(comm),
      expose: comm.expose.bind(comm),
      observe: comm.observe.bind(comm),
      solve: logic.solve.bind(logic)
    }
  }

  buildChildLayer(elements, layout, depth, el) {
    return new Layer(elements, layout, depth, el, this.leafScope);
  }

}

module.exports = Layer;