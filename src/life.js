import { ctx, canvas } from './canvas'
import { ship } from './ship'
import { collision } from './collision'
import { game } from './game'
import { random } from './utils'

export const lifeDefault = {
  width: 16,
  height: 16,
  collided: false,
  y: 50,
  x: 200,
  speed: 0.5
}

export let life = { ...lifeDefault }

const moveLife = () => {
  if (collision(life, ship)) {
    game.lifes += 1
    life.y = -100
    life.collided = true
  }
  life.y += life.speed
}

export const drawLife = () => {
  if (!life.collided) {
    moveLife()
    ctx.fillStyle = 'black'
    ctx.fillRect(life.x, life.y, life.width, life.height)
    ctx.font = '8px sans-serif';
    ctx.fillStyle = 'white';
    ctx.fillText("♥", life.x + 4, life.y + 11)
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
