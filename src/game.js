import { resetLife, generateLife } from './life'
import { resetShip } from './ship'
import { resetEnemies, generateEnemies } from './enemies'


export const statusBar = document.getElementById('status-bar')
const lifesCount = document.getElementById('lifes')
const stageCount = document.getElementById('stage')
const score = document.getElementById('score')

export const gameDefault = {
  lifes: 1,
  stage: 0,
  paused: true,
  over: false,
  score: 0
}

export let game = { ...gameDefault }

let previousGame = {
  lifes: null,
  stage: null,
  score: null
}

export const drawStatusBar = () => {
  if (game.lifes !== previousGame.lifes) {
    lifesCount.innerHTML = `♥ ${game.lifes}`
    previousGame.lifes = game.lifes
  }
  if (game.stage !== previousGame.stage) {
    stageCount.innerText = `Stage ${game.stage}`
    previousGame.stage = game.stage
  }
  if (game.score !== previousGame.score) {
    score.innerText = game.score.toLocaleString()
    previousGame.score = game.score
  }
}

export const reset = () => {
  resetShip()
  resetLife()
  resetEnemies()
  game = { ...gameDefault, paused: false }

}

export const gameOver = () => {
  game.paused = true
  game.over = true
}

export const updateLevel = () => {
  game.stage += 1
  generateLife()
  generateEnemies()
}
