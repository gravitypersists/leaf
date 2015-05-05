const $create = require('./dom/create')
const $html = require('./dom/html')

function Layer(elements, layout, depth, el) {

  elements.forEach(element =>

    // equivalent to "var type = element.id.split(':')[0]" and id too.
    // but alas, it doesn't work, so...
    // let [type, id] = element.id.split(':');
    let type = element.id.split(':')[0];
    let id = element.id.split(':')[1];
    let div = $create('<div class="layer"></div>');
    new Layer(child, 0, element)
  );


}

module.exports = Layer;