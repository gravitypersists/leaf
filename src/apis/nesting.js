const $html = require('../dom/html');

class NestInterface {

  constructor(layer, element) {
    this.layer = layer;
    this.element = element;
  }

  nest(content, el) {
    if (!this.element.children) return;

    let children = [];
    let parsed = content.replace(/<<.+>>/, x => {
      let id =  x.replace('<<', '').replace('>>', '');
      children.push(id);
      return `<div 
                class="leaf-layer"
                data-leaf-node="${ id }"
                style="display: inline-block;">
              </div>`
    });
    $html(el, parsed);

    let groupedById = {};
    this.element.children.forEach((child) => groupedById[child.id] = child);
    let filteredChildren = children.map(childId => groupedById[childId]);

    let domList = el.querySelectorAll(':scope > .leaf-layer');
    Array.prototype.forEach.call(domList, child => {
      let id = child.getAttribute('data-leaf-node');
      this.layer.buildChildLayer(filteredChildren, this.element.layout, child);
    });
  }

}

module.exports = NestInterface;