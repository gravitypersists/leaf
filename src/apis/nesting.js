const $html = require('../dom/html');
const $create = require('../dom/create');
const $append = require('../dom/append');

class NestInterface {

  constructor(layer, element) {
    this.layer = layer;
    this.element = element;
  }

  nest(nestKey, el) {
    let nestObj = this.layer.leafScope.allLayers[nestKey.nestedLayerId];
    this.layer.buildChildLayer(nestObj.children, nestObj.layout, nestObj.layerId, el);
  }

  textNest(nestObj, el) {
    let children = [];
    let parsed = nestObj.content.replace(/<<[0-9]+>>/g, x => {
      let id =  x.replace('<<', '').replace('>>', '');
      children.push(id);
      // we construct our element right here in place
      return `<div 
                class="leaf-element"
                data-leaf-el="${ id }"
                style="display: inline-block;">
              </div>`
    });
    let wrapper = $create(`
      <div class="leaf-text-layer"></div>
    `);;
    wrapper.setAttribute('data-leaf-text-id', this.element.elementId);
    $html(wrapper, parsed);
    $append(el, wrapper);
    let domList = wrapper.querySelectorAll(':scope > .leaf-element');
    Array.prototype.forEach.call(domList, childEl => {
      let id = childEl.getAttribute('data-leaf-el');
      this.layer.buildElementIntoLayer(nestObj.children[id], childEl);
    });
  }

}

module.exports = NestInterface;