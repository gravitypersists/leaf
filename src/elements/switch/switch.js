
function Switch(config, el, api) {

  api.observe(config.observe[0].id, config.observe[0].property, function(result) {
    api.nest((result) ? "That is correct!" : "That is not correct", el);
  });

}

module.exports = Switch;