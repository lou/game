import { resetLife, generateLife } from './life'
import { resetHero } from './hero'
import { resetEnemies, generateEnemies } from './enemies'


export const statusBar = document.getElementById('status-bar')
const lifesCount = document.getElementById('lifes')
const gameStatus = document.getElementById('game-status')
const stageCount = document.getElementById('stage')

export const gameDefault = {
  lifes: 1,
  stage: 0,
  paused: true,
  over: false
}

export let game = { ...gameDefault }

let previousGame = {
  lifes: null,
  stage: null,
  paused: null
}

export const drawStatusBar = () => {
  if (game.lifes !== previousGame.lifes) {
    lifesCount.innerHTML = `♥ ${game.lifes}`
    previousGame.lifes = game.lifes
  }
  if (game.paused !== previousGame.paused) {
    gameStatus.innerHTML = `${game.paused ? '&#10074;&#10074;' : '▶'}`
    previousGame.paused = game.paused
  }
  if (game.stage !== previousGame.stage) {
    stageCount.innerText = `Stage ${game.stage}`
    previousGame.stage = game.stage
  }
}

export const reset = () => {
  resetHero()
  resetLife()
  resetEnemies()
  game = { ...gameDefault }

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
