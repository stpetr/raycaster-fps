import { math } from '../../helpers/math'
import { Map } from '../../models/map'
import { Player } from '../../models/player'

export class View {
  stripWidth: number
  fieldOfView: number
  constructor(protected map: Map, protected player: Player, protected canvas: HTMLCanvasElement) {
    this.stripWidth = 4
    this.fieldOfView = math.degToRad(60)
  }

  render() {
    throw new Error('The render method must be overridden')
  }

  protected isPointOnMap(x: number, y: number) {
    return x > 0 && x < this.map.width * this.map.scale &&
      y > 0 && y < this.map.height * this.map.scale
  }

  protected drawRay(x: number, y: number) {
    const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D

    ctx.strokeStyle = 'rgba(50, 100, 0, 0.3)'
    ctx.lineWidth = 0.5
    ctx.beginPath()
    ctx.moveTo(this.player.x * this.map.scale, this.player.y * this.map.scale)
    ctx.lineTo(x, y)
    ctx.closePath()
    ctx.stroke()
  }

  protected castSingleRay(rayAngle: number) {
    let rayEnd = null,
      colRayLength = 0,
      rowRayLength = 0,
      farthestColIntersection,
      farthestRowIntersection

    const nearestColIntersection = this.getNearestColIntersection(rayAngle),
      nearestRowIntersection = this.getNearestRowIntersection(rayAngle)

    if (this.isPointOnMap(nearestColIntersection.x, nearestColIntersection.y)) {
      farthestColIntersection = this.getRayEnd(nearestColIntersection.x, nearestColIntersection.y)
      colRayLength = this.getRayLength(farthestColIntersection.x, farthestColIntersection.y)
    }

    if (this.isPointOnMap(nearestRowIntersection.x, nearestRowIntersection.y)) {
      farthestRowIntersection = this.getRayEnd(nearestRowIntersection.x, nearestRowIntersection.y)
      rowRayLength = this.getRayLength(farthestRowIntersection.x, farthestRowIntersection.y)
    }

    if (farthestColIntersection && farthestRowIntersection) {
      rayEnd = rowRayLength > colRayLength ? farthestColIntersection : farthestRowIntersection
    } else if (farthestColIntersection) {
      rayEnd = farthestColIntersection
    } else if (farthestRowIntersection) {
      rayEnd = farthestRowIntersection
    } else {
      console.warn(`No ray at: ${farthestColIntersection}, ${farthestRowIntersection}`)
    }

    if (rayEnd) {
      this.drawRay(rayEnd.x, rayEnd.y);
    }
  }

  protected castRays() {
    const raysNum = Math.floor(this.canvas.width / this.stripWidth),
      angleBetweenStrips = this.fieldOfView / raysNum,
      startAngle = this.player.rotation - this.fieldOfView / 2

    for (let i = 0; i < raysNum; i++) {
      this.castSingleRay(startAngle + angleBetweenStrips * i)
    }
  }

  protected getRayEnd(nearestX: number, nearestY: number) {
    const rayEnd = {
      x: nearestX,
      y: nearestY,
    }
    let x = nearestX,
      y = nearestY,
      dx = this.player.x * this.map.scale - x,
      dy = this.player.y * this.map.scale - y

    let interceptor = 0

    while (this.isPointOnMap(x, y)) {
      if (interceptor > 100) {
        console.log('getRayEnd break by interceptor limit')
        break
      }

      interceptor++

      rayEnd.x = x
      rayEnd.y = y

      // @todo refactor
      if (this.map.grid.getCellValue(Math.floor(x / this.map.scale), Math.floor(y / this.map.scale)) > 0) {
        break
      }

      x -= dx
      y -= dy
    }

    return rayEnd
  }

  protected getRayLength(x: number, y: number) {
    const playerX = this.player.x * this.map.scale,
      playerY = this.player.y * this.map.scale

    return Math.sqrt(Math.abs(Math.pow(x - playerX, 2) + Math.pow(y - playerY, 2)))
  }

  protected getNearestColIntersection(angle: number) {
    const cellSize = this.map.scale,
      curX = this.player.x * cellSize,
      curY = this.player.y * cellSize,
      distanceToNearestCol = this.getDistanceToNearestCol(angle),
      distanceToNearestRow = distanceToNearestCol * Math.abs(Math.tan(angle)),
      x = curX + distanceToNearestCol * (this.player.isLookingToTheRight(angle) ? 1 : -1),
      y = curY + distanceToNearestRow * (this.player.isLookingUpward(angle) ? 1 : -1)

    return { x, y }
  }

  protected getNearestRowIntersection(angle: number) {
    const cellSize = this.map.scale,
      curX = this.player.x * cellSize,
      curY = this.player.y * cellSize,
      distanceToNearestRow = this.getDistanceToNearestRow(angle),
      distanceToNearestCol = distanceToNearestRow / Math.abs(Math.tan(angle)),
      x = curX + distanceToNearestCol * (this.player.isLookingToTheRight(angle) ? 1 : -1),
      y = curY + distanceToNearestRow * (this.player.isLookingUpward(angle) ? 1 : -1)

    return { x, y }
  }

  protected getDistanceToNearestCol(rayAngle: number) {
    const distance = this.player.x * this.map.scale % this.map.scale
    return this.player.isLookingToTheRight(rayAngle) ? this.map.scale - distance : distance
  }

  protected getDistanceToNearestRow(rayAngle: number) {
    const distance = this.player.y * this.map.scale % this.map.scale
    return this.player.isLookingDownward(rayAngle) ? this.map.scale - distance : distance
  }

  protected setCanvasSize(width: number, height: number) {
    this.canvas.width = width
    this.canvas.height = height
    this.canvas.style.width = `${width}px`
    this.canvas.style.height = `${height}px`
  }
}
