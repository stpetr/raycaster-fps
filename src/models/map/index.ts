import { Grid } from '../grid'

const DEFAULT_SCALE = 20

export class Map {
  grid: Grid
  scale: number

  constructor(public width: number, public height: number) {
    this.grid = new Grid(width, height)

    this.scale = DEFAULT_SCALE
    this.generateRandomWalls()
  }

  generateRandomWalls(rate?: number) {
    rate = rate || 0.3

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const value = Math.random() < rate ? 1 : 0
        this.grid.setCellValue(x, y, value)
      }
    }
  }
}
