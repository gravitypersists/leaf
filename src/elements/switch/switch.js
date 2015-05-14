
function Switch(config, el, api) {

  api.observe(config.observe[0].id, config.observe[0].property, function(result) {
    el.innerHTML = (result) ? "That is correct!" : "That is not correct";
  });

}

module.exports = Switch;