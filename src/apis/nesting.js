const $html = require('../dom/html');

class NestInterface {

  constructor() {

  }

  nest(content, el) {
    let parsed = content.replace(/<<.+>>/, x => {
      return `<div class="leaf-layer" data="leaf-node-${ x.split(':')[1] }"></div>`
    });
    $html(el, parsed);
    let domList = el.querySelectorAll(':scope > .leaf-layer')
    Array.prototype.forEach.call(domList, child => {
      $html(child, 'child!');
    });
  }

}

NestInterface

module.exports = NestInterface;