/* eslint-disable no-console */
import * as Storage from './storage';
import * as Helpers from './helpers';

export function score(total, correct, time) {
  // eslint-disable-next-line no-bitwise
  const calculatedScore = Math.round(((correct / total) ^ 2 + correct) * total / time) * 100;
  console.log('calculatedScore====', calculatedScore);
  return calculatedScore;
}

export default class Highscore {
  constructor() {
    this.scores = document.querySelector('.highscore__scores');
    this.button = document.querySelector('.highscore__button');
    this.button.addEventListener('click', this.clear.bind(this));
  }

  load() {
    const savedScores = this.highscore(Storage.load());
    if (typeof savedScores !== 'undefined' && savedScores) {
      const ul = Helpers.el('ol');
      Helpers.empty(this.scores);
      this.button.classList.remove('highscore__button--hidden');
      for (let i = 0; i < savedScores.length; i += 1) {
        const li = Helpers.el('li');
        const text = `<span class='highscore__number'>${savedScores[i].score} stig</span><span class='highscore__name'>${savedScores[i].name}</span>`;
        ul.appendChild(li);
        li.innerHTML = text;
        this.scores.appendChild(ul);
      }
    } else {
      Helpers.empty(this.scores);
      this.scores.innerHTML = '<p>Engin stig skráð</p>';
    }
  }

  clear() {
    Storage.clear();
    Helpers.empty(this.scores);
    this.scores.innerHTML = '<p>Engin stig skráð</p>';
    this.button.classList.add('highscore__button--hidden');
  }

  // eslint-disable-next-line class-methods-use-this
  highscore(data) {
    console.log('highscore---', data);
    return data.sort((a, b) => b.score - a.score);
  }
}
