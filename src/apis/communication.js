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

  expose(property, value) {
    let id = this.element.layerId + ':' + this.element.elementId;
    this.exposed[id] = this.exposed[id] || {};
    this.exposed[id][property] = value;

    // Now check for observations on this property
    let obs = this.observations[id];
    if (obs && obs[property]) {
      obs[property].forEach(callbackObj => {
        callbackObj.callbackFn.call(callbackObj.context, value);
      });
    }
  }

  // for now we just do elementId, soon it will be [elementIds], I'm 
  // putting off those decisions until the authoring tool(s) are around
  observe(elementId, property, callback, context) {
    let ob = this.observations[elementId] = this.observations[elementId] || {};
    let callbacks = ob[property] = ob[property] || [];
    callbacks.push({
      callbackFn: callback,
      context: context
    })
  }

}

module.exports = CommunicationInterface;