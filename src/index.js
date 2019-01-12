import { populateKeysMap, keysMap } from './keys'
import { canvas, ctx } from './canvas'
import { drawEnemies } from './enemies'
import { drawLife } from './life'
import { drawHero } from './hero'
import { drawStatusBar, game, gameOver, reset } from './game'

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawEnemies()
  drawLife()
  drawHero()
  drawStatusBar()
}

const update = () => {
  setTimeout(() => {
    if (game.over && keysMap['Space']) reset()
    draw()
    if (game.lifes === 0) gameOver()
    if (!game.paused) requestAnimationFrame(update)
  }, 1000 / 60)
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
  start()
})

canvas.addEventListener('blur', () => {
  pause()
})

window.addEventListener('keydown', () => {
  if (event.code === 'Space') togglePause()
  populateKeysMap()
})

window.addEventListener('keyup', () => {
  populateKeysMap()
})
