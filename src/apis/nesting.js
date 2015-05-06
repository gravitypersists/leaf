const $html = require('../dom/html');

class NestInterface {

  constructor(layer, element) {
    this.layer = layer;
    this.element = element;
  }

  nest(content, el) {
    let parsed = content.replace(/<<.+>>/, x => {
      let id =  x.replace('<<', '').replace('>>', '');
      // let generatedId = id.split(':')[1];
      return `<div 
                class="leaf-layer"
                data-leaf-node="${ id }"
                style="display: inline;">
              </div>`
    });
    $html(el, parsed);
    let domList = el.querySelectorAll(':scope > .leaf-layer')
    Array.prototype.forEach.call(domList, child => {
      let id = child.getAttribute('data-leaf-node');
      // Is there an easier way to access static methods?
      // This might be a mixin in the future anyways. 
      new this.layer.constructor(this.element.children, this.element.layout, 0, child);
    });
  }

}

NestInterface

module.exports = NestInterface;