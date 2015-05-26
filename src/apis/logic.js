const solve = require('logician');

class LogicInterface {

  constructor() {}

  // TODO: figure out a way to allow authors to express logical
  // statements with representations of properties on elements
  // themselves
  solve(expression) {
    try {
      return solve(expression);
    } catch (e) {
      if (console && console.error) console.error(e);
      return "Error"
    }
  }

}

module.exports = LogicInterface;