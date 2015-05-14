
function Image(configuration, el, api) {
  el.innerHTML = `
    <style>
      img {
        display: block;
      }
    </style>
    <img class='img' src=${ configuration.source }>
  `;
}

module.exports = Image;