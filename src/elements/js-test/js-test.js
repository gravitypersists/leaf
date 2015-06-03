const CodeMirror = require('codemirror');
const jailed = require('jailed');
// not pretty, but I need to rethink packaging elements
// so this ugliness will be solved later
const fs = require('fs');
const mainStyle = fs.readFileSync(__dirname + '/../../../node_modules/codemirror/lib/codemirror.css', 'utf8')
const themeStyle = fs.readFileSync(__dirname + '/../../../node_modules/codemirror/theme/mdn-like.css', 'utf8')
let codeMirrorStyles = mainStyle + themeStyle;
require('codemirror/mode/javascript/javascript');


class JSTest {

  constructor(configuration, el, api) {
    this.api = api;
    this.config = configuration;
    el.innerHTML = `
      <style>
        .js-test {
          position: relative;
        }
        .correct:after {
          position: absolute;
          top: -5px;
          right: -5px;
          content: ' \\2605';
          font-size: 40px;
          color: rgb(86, 140, 189);
        }
        .incorrect {
          border: 1px solid red;
        }
        ${ codeMirrorStyles }
      </style>
      <div class='js-test'></div>
    `;
    this.el = el.querySelector('.js-test');
    let options = {
      value: configuration.initialCode,
      mode: 'javascript',
      lineNumbers: true,
      theme: 'mdn-like',
    }
    let codeMirror = CodeMirror(this.el, options);
    codeMirror.on('change', this.onCodeChange.bind(this));
    this.api.expose('correct', false);
  }

  onCodeChange(cm) {
    this.runTests(cm.getValue(), this.config.beforeEach, this.config.tests);
  }

  runTests(code, beforeEach, tests) {
    // is this what they call metaprogramming?
    let fullCode = `
      // I wish I was kidding. Going to guess that communications
      // are happening async, which means I can't just hand 'expect'
      // over to jailed unless I redefine it over there...
      ${ fs.readFileSync(__dirname + '/../../../node_modules/chai/chai.js', 'utf8') };
      var expect = chai.expect;
      var __failed = false;
      ${ 
        tests.map(function(t) {
          return `
            try {
              (function() {
                ${ beforeEach };
                ${ code };
                ${ t.test };
              })()
            } catch (e) {
              __failed = true;
              application.remote.error('${ t.feedback }', e);
            }
          `
        }).join('')
      }
      if (!__failed) application.remote.success();
    `
    let api = {
      success: () => this.succeed(),
      error: (msg, err) => this.fail(msg, err),
      log: (l) => console.log(l),
    };
    var plugin = new jailed.DynamicPlugin(fullCode, api);
  }

  succeed() {
    this.el.classList.add('correct');
    this.el.classList.remove('incorrect');
    this.api.expose('correct', true);
  }

  fail(msg, err) {
    console.log(err);
    this.el.classList.add('incorrect');
    this.el.classList.remove('correct');
    this.api.expose('correct', false);
  }

}

module.exports = JSTest;