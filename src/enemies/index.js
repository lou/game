import { ctx, canvas } from '../canvas'
import { ship, munitions } from '../ship'
import { collision } from '../collision'
import { game, updateLevel } from '../game'
import { random } from '../utils'

const enemiesCount = 30
let enemies = []

export const generateEnemies = () => {
  enemies = [
    ...enemies,
    ...[...Array(enemiesCount + game.stage).keys()].map(_ => ({
      speed: random(0.1, Math.min(1 + game.stage, ship.speed - 1)),
      width: 20,
      height: 20,
      armor: 10,
      points: {
        hit: 1,
        shotDown: 10,
      },
      x: random(0, canvas.width - 20),
      y: random(-1000, -30)
    }))
  ]
}

const hitShip = (enemy) => {
  if (!ship.hit && collision(enemy, ship)) {
    ship.hit = true
    game.lifes -= 1
    setTimeout(() => {
      ship.hit = false
    }, 2000)
  }
}

const hitByMunition = (enemy, indexEnemies) => {
  munitions.forEach((munition, indexMunitions) => {
    if (collision(enemy, munition)) {
      enemy.armor -= munition.power
      game.score += enemy.points.hit
      if (enemy.armor <= 0) {
        game.score += enemy.points.shotDown
        enemies.splice(indexEnemies, 1)
      }
      munitions.splice(indexMunitions, 1)
    }
  })
}

const moveEnemies = () => {
  enemies.forEach((enemy, index) => {
    removeEnemyNotShown(enemy, index)
    hitShip(enemy)
    hitByMunition(enemy, index)
    enemy.y += enemy.speed
  })
}

export const drawEnemies = () => {
  if (enemies.length <= enemiesCount) updateLevel()
  moveEnemies()
  enemies.forEach(enemy => {
    ctx.fillStyle = `rgb(50, 50, 50)`
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
