export class Grid {

  data: number[][]

  constructor(protected width: number, protected height: number) {
    this.width = width
    this.height = height
    this.data = []

    for (let y = 0; y < this.height; y++) {
      const row: number[] = []
      this.data.push(row)
      for (let x = 0; x < this.width; x++) {
        row.push(0)
      }
    }
  }

  getCellValue(x: number, y: number): number {
    if (typeof this.data[y][x] === 'undefined') {
      throw new Error(`No cell with coords: ${x}:${y}`)
    }
    return this.data[y][x]
  }

  setCellValue(x: number, y: number, value: number) {
    if (typeof this.data[y][x] === 'undefined') {
      throw new Error(`No cell with coords: ${x}:${y}`)
    }

    this.data[y][x] = value
  }

  isBorder(x: number, y: number): boolean {
    return x === 0 || x === this.width - 1 || y === 0 || y === this.height -1
  }
}
