const $html = require('../dom/html');
const $create = require('../dom/create');
const $append = require('../dom/append');

class NestInterface {

  constructor(layer, element) {
    this.layer = layer;
    this.element = element;
  }

  nest(nestObj, el) {
    // if (!this.element.children) return;

    let children = [];
    let parsed = nestObj.content.replace(/<<[0-9]+>>/g, x => {
      let id =  x.replace('<<', '').replace('>>', '');
      children.push(id);
      return `<div 
                class="leaf-element"
                data-leaf-el="${ id }"
                style="display: inline-block;">
              </div>`
    });
    let newDepth = this.layer.depth + '.' + nestObj.layerId;
    let wrapper = $create(`
      <div data-leaf-node="${ newDepth }"></div>
    `);;
    if (this.element.type === 'Text') {
      wrapper.classList.add('leaf-text-layer');
      wrapper.setAttribute('data-leaf-text-id', this.element.elementId);
    } else {
      wrapper.classList.add('leaf-layer');
    }
    $html(wrapper, parsed);
    $append(el, wrapper);
    let domList = wrapper.querySelectorAll(':scope > .leaf-element');
    Array.prototype.forEach.call(domList, leafEl => {
      let id = leafEl.getAttribute('data-leaf-el');
      nestObj.children[id].container = leafEl;
    });
    this.layer.buildChildLayer(nestObj.children,
                                    this.element.layout, newDepth);

  }

}

module.exports = NestInterface;