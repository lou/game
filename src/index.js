import { populateKeysMap, keysMap } from './keys'
import { canvas, ctx } from './canvas'
import { drawEnemies } from './enemies'
import { drawLife } from './life'
import { drawShip } from './ship'
import { drawStatusBar, game, gameOver, reset } from './game'

const gameStatus = document.getElementById('game-status')

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawEnemies()
  drawLife()
  drawShip()
  drawStatusBar()
  handleGameStatus()

}

const update = () => {
  setTimeout(() => {
    if (game.over && keysMap['Enter']) reset()
    if (game.lifes === 0) gameOver()
    draw()
    if (!game.paused) requestAnimationFrame(update)
  }, 1000 / 60)
}

const handleGameStatus = () => {
  if (game.paused) {
    gameStatus.style.display = 'block'
    if (game.over) {
      gameStatus.innerHTML = `
        GAME OVER
        <br />
        Press Enter to Restart
      `
    } else {
      gameStatus.innerHTML = `
        &#10074;&#10074; Paused
        <br />
        Press Enter to resume
      `
    }
  } else {
    gameStatus.style.display = 'none'
  }
}

const start = () => {
  game.paused = false
  update()
}

const pause = () => {
  game.paused = true
  update()
}

const togglePause = () => {
  game.paused ? start() : pause()
}

canvas.addEventListener('click', () => {
  canvas.focus()
})

canvas.addEventListener('focus', () => {
  if (game.paused) start()
})

canvas.addEventListener('blur', () => {
  if (!game.paused) pause()
})

window.addEventListener('keydown', () => {
  if (event.code === 'Enter') togglePause()
  populateKeysMap()
})

window.addEventListener('keyup', () => {
  populateKeysMap()
})
