/* eslint-disable no-console */
import * as Helpers from './helpers';
import * as Storage from './storage';
import Question from './question';
import Highscore from './highscore';

let startButton;
let problem;
let result;

let playTime;
let total = 0;
let correct = 0;
let currentProblem;
let finalScore = 0;

function finish() {
  const points = Helpers.score(total, correct, playTime);
  const text = `Þú svaraðir ${correct} rétt af ${total} spurningum og fékkst ${points} stig fyrir. Skráðu þig á stigatöfluna!`;
  finalScore = points;
  result.querySelector('.result__text').innerHTML = text;
  Helpers.empty(problem.querySelector('.problem__timer'));
  Helpers.empty(problem.querySelector('.problem__question'));
  result.classList.remove('result--hidden');
  problem.classList.add('problem--hidden');
  result.querySelector('.result__input').focus();
}

function tick(current) {
  problem.querySelector('.problem__timer').innerHTML = current;

  if (current <= 0) {
    return finish();
  }
  return setTimeout(() => {
    tick(current - 1);
  }, 1000);
}

function showQuestion() {
  console.log('Ný spurning');
  const question = Question();
  currentProblem = question;
  total += 1;
  problem.querySelector('.problem__question').innerHTML = question.problem;
  problem.querySelector('.problem__input').value = '';
  problem.querySelector('.problem__input').focus();
}

function start() {
  console.log('Byrja leik');
  startButton.classList.add('button--hidden');
  problem.classList.remove('problem--hidden');

  tick(playTime);
  showQuestion();
}

function onSubmit(e) {
  e.preventDefault();

  const answer = parseInt(currentProblem.answer, 10);
  const userAnswer = parseInt(problem.querySelector('.problem__input').value, 10);
  const isCorrect = (answer === userAnswer);
  const isProblem = (typeof currentProblem === 'object');
  if (isProblem && isCorrect) {
    console.log('Svar:', isCorrect, answer, userAnswer);
    correct += 1;
  } else if (isProblem && !isCorrect) {
    console.log('Skila svari:', isCorrect, answer, userAnswer);
  }

  showQuestion();
  problem.querySelector('.problem__input').focus();
}

function onSubmitScore(e) {
  e.preventDefault();
  const playerName = document.querySelector('.result__input').value;
  const highscore = new Highscore();
  Storage.save(playerName, finalScore);
  highscore.load();
  console.log(`Skila svari: Player=${playerName.value}, Correct=${finalScore}`);
  total = 0;
  correct = 0;
  currentProblem = undefined;
  Helpers.empty(result.querySelector('.result__text'));

  result.classList.add('result--hidden');
  problem.classList.add('problem--hidden');
  startButton.classList.remove('button--hidden');
}

export default function init(_playTime) {
  playTime = _playTime;
  startButton = document.querySelector('.start.button');
  problem = document.querySelector('.problem');
  result = document.querySelector('.result');

  startButton.addEventListener('click', start);
  problem.querySelector('.problem__answer').addEventListener('submit', onSubmit);
  result.querySelector('.result__form').addEventListener('submit', onSubmitScore);
}
