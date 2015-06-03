
class Question {

  constructor(config, containerEl, api) {
    containerEl.innerHTML = `
      <style>
        .query-container {
          text-align: center;
        }
        .query {
          display: inline-block;
          font-style: italic;
          color: gray;
          padding: 15px 0px;
        }
        .answers {
          padding-bottom: 15px;
        }
        .answer {
          display: inline-block;
          padding: 6px;
          border-radius: 10px;
          border: 1px solid rgb(203, 201, 201);
          border-bottom: 2px solid rgb(176, 176, 176);
          margin-right: 10px;
          cursor: pointer;
        }
        .answer:last-child {
          margin-right: 0px;
        }
      </style>
      <div class='question query-mode'>
        <div class='query-container'>
          <div class='query'></div>
          <div class='answers'></div>
        </div>
        <div class='response'></div>
      </div>
    `
    let el = containerEl.querySelector('.question');
    api.nest(config.query, el.querySelector('.query'));

    config.options.forEach((option) => {
      let answer = document.createElement('div');
      answer.classList.add('answer');
      el.querySelector('.answers').appendChild(answer);
      api.nest(option.answer, answer);
      answer.addEventListener('click', () => {
        if (config.removeQuestionText) {
          el.removeChild(el.querySelector('.query-container'));
        }
        let responseEl = el.querySelector('.response');
        responseEl.innerHTML = '';
        api.nest(option.response, responseEl);
      });
    });
  }

}

module.exports = Question;