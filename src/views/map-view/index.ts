import { View } from '../../services/view'
import { Map } from '../../models/map'
import { Player } from '../../models/player'

export class MapView extends View {
  constructor(protected map: Map, protected player: Player, protected canvas: HTMLCanvasElement) {
    super(map, player, canvas)
  }

  render() {
    this.setCanvasSize(this.map.width * this.map.scale, this.map.height * this.map.scale)

    this.renderMap()
    this.renderPlayer()
    this.castRays()
  }

  private renderMap() {
    const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D

    // Loop through all blocks on the map
    for (let y = 0; y < this.map.height; y++) {
      for (let x = 0; x < this.map.width; x++) {
        const cellValue = this.map.grid.getCellValue(x, y)

        if (cellValue > 0) {
          ctx.fillStyle = 'rgb(200, 200, 200)'

          ctx.fillRect(
            x * this.map.scale,
            y * this.map.scale,
            this.map.scale, this.map.scale
          )
        }
      }
    }
  }

  private renderPlayer() {
    const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D

    ctx.fillStyle = 'rgba(200, 0, 0, 0.5)'
    ctx.fillRect(
      this.player.x * this.map.scale - this.player.size / 2,
      this.player.y * this.map.scale - this.player.size / 2,
      this.player.size,
      this.player.size
    )

    ctx.beginPath()
    ctx.moveTo(this.player.x * this.map.scale, this.player.y * this.map.scale)
    ctx.lineTo(
      (this.player.x + Math.cos(this.player.rotation) * this.player.size / 8) * this.map.scale,
      (this.player.y + Math.sin(this.player.rotation) * this.player.size / 8) * this.map.scale
    )
    ctx.closePath()
    ctx.stroke()
  }
}
