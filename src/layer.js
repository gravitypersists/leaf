const $create = require('./dom/create')
const $html = require('./dom/html')
const $append = require('./dom/append')

// In the future elements will probably be downloaded on demand with 
// webpack, but some will be packaged with the framework themselves,
// for now we include them all here until we have leaf-sdk publishing
// consumable packages, then it becomes a question of how to configure
// leaf-sdk's output to work with leaf's input.
const includes = {
  text: require('./elements/text')
}

function Layer(elements, layout, depth, el) {
  let layerEl = $create('<div class="leaf-layer"></div>');
  $append(el, layerEl);  

  elements.forEach(element => {

    // equivalent to "var type = element.id.split(':')[0]" and id too.
    // but alas, it doesn't work, so...
    // let [type, id] = element.id.split(':');
    let t = element.id;
    let type = element.id.split(':')[0].toLowerCase();
    let id = element.id.split(':')[1];

    // Element instantiation is still something I am thinking heavily
    // about. It might use webcomponents.js or it might not, I need to
    // research more. This is just a simple exposed constructor for 
    // the time being.
    if (includes[type]) {
      let childEl = $create('<div class="leaf-element"></div>');
      $append(layerEl, childEl); 
      var shadow = childEl.createShadowRoot();
      new includes[type](element.config, shadow)
    }
  });


}

module.exports = Layer;