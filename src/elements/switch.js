
function Switch(config, el, api) {

  api.observe('Picker:2', 'correct', function(result) {
    el.innerHTML = (result) ? "That is correct!" : "That is not correct";
  });

}

module.exports = Switch;