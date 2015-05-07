// currently all communications happen globally within a leaf.
// It's probably worth thinking about how to scope communications
// within layers, but this complexity might not translate well
// into an authoring tool, so until I have that problem to think
// about, we go with the simple global (per-leaf) scope.

class CommunicationInterface {

  constructor(layer, element) {
    this.element = element;
    this.exposed = layer.leafScope.exposed = layer.leafScope.exposed || {};
    this.observations = layer.leafScope.observations = layer.leafScope.observations || {};
  }

  publish() {

  }

  subscribe() {

  }

  expose() {
    console.log('expose');
  }

  observe() {
    console.log('observe');
  }

}

module.exports = CommunicationInterface;