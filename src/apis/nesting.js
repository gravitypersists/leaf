const $html = require('../dom/html');

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
    $html(el, parsed);
    el.classList.add('leaf-text-el'); // leafbuilder infers based on this
    let domList = el.querySelectorAll('.leaf-element');
    Array.prototype.forEach.call(domList, childEl => {
      let id = childEl.getAttribute('data-leaf-el');
      this.layer.buildElementIntoLayer(this.layer.elements[id], childEl);
    });
  }

}

module.exports = NestInterface;