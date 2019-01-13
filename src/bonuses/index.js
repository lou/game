import { ctx, canvas } from '../canvas'
import { ship } from '../ship'
import { collision } from '../collision'
import { game } from '../game'
import { lifeDefault } from './life'

const bonusDefault = {
  width: 16,
  height: 16
}

let bonuses = [{
  ...bonusDefault,
  ...lifeDefault,
  y: 100,
  x: 100,
  speed: 1
}]

const use = (bonus, index) => {
  if (bonus.type === 'life') game.lifes += 1
  bonuses.splice(index, 1)
}

const moveBonuses = () => {
  bonuses.forEach((bonus, index) => {
    removeBonusNotShown(bonus, index)
    if (collision(bonus, ship)) {
      use(bonus, index)
    }
    bonus.y += bonus.speed
  })
}

const removeBonusNotShown = (bonus, index) => {
  if (bonus.y > canvas.height) {
    bonuses.splice(index, 1)
  }
}

export const drawBonuses = () => {
  moveBonuses()
  bonuses.forEach(bonus => {
    ctx.fillStyle = 'black'
    ctx.fillRect(bonus.x, bonus.y, bonus.width, bonus.height)
    ctx.font = '8px sans-serif';
    ctx.fillStyle = 'white';
    ctx.fillText(bonus.icon, bonus.x + 4, bonus.y + 11)
  })
}

export const resetBonuses = () => {
  bonuses = []
}
