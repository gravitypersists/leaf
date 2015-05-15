
function Text(configuration, el, api) {

  el.innerHTML = "<button>Click Me!</button>";
  var button = el.querySelector('button');
  button.addEventListener('click', function(){
    button.style.backgroundColor = ["red", "blue", "green"][~~(Math.random()*3)]
  });

}

module.exports = Text;