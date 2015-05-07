const $removeClass = require('../dom/remove-class')

function Picker(config, el, api) {

  el.innerHTML = `
    <style>
      .option {
        display: inline-block;
        border: 1px solid gray;
        border-radius: 5px;
        padding: 5px;
        margin: 5px;
        cursor: pointer;
      }
      .option.selected {
        background-color: red;
      }
    </style>

    <div class='picker'>
      ${ config.options.map(option => "<div class='option'></div>").join('') }
    </div>
  `;

  let domList = el.querySelectorAll('.option');
  Array.prototype.forEach.call(domList, (element, i) => {
    api.nest(config.options[i].option, element);
    element.addEventListener('click', function() {
      $removeClass('selected', el.querySelectorAll('.selected'));
      this.classList.add('selected');
      api.expose('correct', config.options[i].correct);
    });
  });

}

module.exports = Picker;