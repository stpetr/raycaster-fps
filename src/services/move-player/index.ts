import { Map } from '../../models/map'
import { Player } from '../../models/player'

export class MovePlayer {
  constructor(private player: Player, private map: Map) {}
  
  move() {
    // Player will move this far along the current direction vector
    const moveLength = this.player.stepLength * this.player.speed

    // Add rotation if player is rotating (player.dir != 0)
    this.player.rotation += this.player.direction * this.player.rotationStepAngle

    // Calculate new player position with simple trigonometry
    const newX = this.player.x + Math.cos(this.player.rotation) * moveLength
    const newY = this.player.y + Math.sin(this.player.rotation) * moveLength

    const collision = this.detectCollision(newX, newY)

    // Set new position
    if (!collision.x) {
      this.player.x = newX
    }

    if (!collision.y) {
      this.player.y = newY
    }
  }
  
  detectCollision(x: number, y: number) {
    const wallCollision = this.detectWallCollision(x, y),
      borderCollision = this.detectBorderCollision(x, y)

    return {
      x: wallCollision.x || borderCollision.x,
      y: wallCollision.y || borderCollision.y
    }
  }
  
  private detectWallCollision(x: number, y: number) {
    const cellX = Math.floor(x),
      cellY = Math.floor(y),
      intersects = !!this.map.grid.getCellValue(cellX, cellY)

    return {
      x: intersects && Boolean(cellX - Math.floor(this.player.x)),
      y: intersects && Boolean(cellY - Math.floor(this.player.y))
    }
  }
  
  private detectBorderCollision(x: number, y: number) {
    const minX = this.player.size / 2 / this.map.scale,
      minY = this.player.size / 2 / this.map.scale,
      maxX = this.map.width - this.player.size / 2 / this.map.scale,
      maxY = this.map.height - this.player.size / 2 / this.map.scale

    return {
      x: x < minX || x > maxX,
      y: y < minY || y > maxY
    }
  }
}
