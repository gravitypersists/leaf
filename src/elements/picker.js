
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
    </style>

    <div class='picker'>
      ${ config.options.map(option => "<div class='option'></div>").join('') }
    </div>
  `;
  let domList = el.querySelectorAll('.option');
  Array.prototype.forEach.call(domList, (element, i) => {
    api.nest(config.options[i].option, element);
  });

}

module.exports = Picker;