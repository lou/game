import { ctx, canvas } from '../canvas'
import { hero } from '../hero'
import { collision } from '../collision'
import { game, updateLevel } from '../game'
import { random } from '../utils'

const enemiesCount = 50
let enemies = []

export const generateEnemies = () => {
  enemies = [
    ...enemies,
    ...[...Array(enemiesCount + game.stage).keys()].map(_ => ({
      speed: random(0.1, Math.min(1 + game.stage, hero.speed - 1)),
      width: 30,
      height: 30,
      x: random(-20, canvas.width - 20),
      y: random(-1000, -30)
    }))
  ]
}

const hitHero = (enemy) => {
  if (!hero.hit && collision(enemy, hero)) {
    hero.hit = true
    game.lifes -= 1
    setTimeout(() => {
      hero.hit = false
    }, 2000)
  }
}

const moveEnemies = () => {
  enemies.forEach((enemy, index) => {
    removeEnemyNotShown(enemy, index)
    hitHero(enemy)
    enemy.y += enemy.speed
  })
}

export const drawEnemies = () => {
  if (enemies.length <= 50) updateLevel()
  moveEnemies()
  enemies.forEach(enemy => {
    ctx.fillStyle = `rgb(165, 77, 105)`
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)
  })
}

const removeEnemyNotShown = (enemy, index) => {
  if (enemy.y > canvas.height) {
    enemies.splice(index, 1)
  }
}

export const resetEnemies = () => {
  enemies = []
}
