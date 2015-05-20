const $insert = require('../dom/insert');

// Document Layout engine
// 
// Takes an array and lines them up into a list of block
// level elements. Simple.

// extends BaseLayoutEngine? No, I don't need to adhere.
// Polymorphism is implied. Just don't fuck it up.
class DocumentLayoutEngine {

  constructor(config) {
    this.config = config;
  }

  // must return an array of {id, el}
  render(parent) {
    return this.config['array'].map((id) => {
      let el = $insert(parent, `
        <div style='display: block;'
             data-leaf-el='${ id }'
             class='leaf-element'>
        </div>
      `);
      return { id, el };
    });
  }

}

module.exports = DocumentLayoutEngine;