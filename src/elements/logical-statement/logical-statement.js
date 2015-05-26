// A simple test element for testing logical statements
// with api.solve()

function LogicalStatement(configuration, el, api) {

  el.innerHTML = `
    <style>
      .output {
        width: 100px;
        height: 20px;
        text-align: center;
        background-color: red;
        color: white;
      }
    </style>

    <div class='output'>
      ${ api.solve(configuration.statement) }
    </div>
  `;

}

module.exports = LogicalStatement;