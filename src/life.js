import { ctx, canvas } from './canvas'
import { hero } from './hero'
import { collision } from './collision'
import { game } from './game'
import { random } from './utils'

export const lifeDefault = {
  width: 10,
  height: 10,
  collided: false,
  y: -500,
  x: 100
}

export let life = { ...lifeDefault }

const moveLife = () => {
  if (collision(life, hero)) {
    game.lifes += 1
    life.y = -100
    life.collided = true
  }
  life.y += life.speed
}

export const drawLife = () => {
  if (!life.collided) {
    moveLife()
    ctx.fillStyle = 'rgb(25, 174, 97)'
    ctx.fillRect(life.x, life.y, life.width, life.height)
  }
}

export const generateLife = () => {
  if (life.y < 0 || life.y > canvas.height) {
    life.x = random(10, canvas.width - 20)
    life.y = random(-200, -800)
    life.speed = random(1, 3)
    life.collided = false
  }
}

export const resetLife = () => {
  life = { ...lifeDefault }
}
