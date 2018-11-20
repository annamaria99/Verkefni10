/* eslint-disable no-console */
const LOCALSTORAGE_KEY = 'calc_game_scores';
const Store = window.localStorage;

export function load() {
  const scores = Store.getItem(LOCALSTORAGE_KEY);
  // eslint-disable-next-line no-console
  console.log('Sækja stig', scores);
  return JSON.parse(scores);
}

export function save(name, points) {
  const data = { name, score: points };
  // eslint-disable-next-line no-console
  console.log('DATA==', data);
  let playerScores = load();
  if (playerScores && playerScores.length > 0) {
    playerScores.push(data);
    console.log('Vista stig - Add', playerScores);
  } else {
    playerScores = [data];
    console.log('Vista stig - New', playerScores);
  }
  Store.setItem(LOCALSTORAGE_KEY, JSON.stringify(playerScores));
}

export function clear() {
  Store.removeItem(LOCALSTORAGE_KEY);
}
