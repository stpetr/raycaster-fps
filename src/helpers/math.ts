const PI = Math.PI
const PIx2 = PI * 2

export const math = {
  PI,
  PIx2,
  degToRad: (deg: number) => deg * PI / 180,
  radToDeg: (rad: number) => rad * 180 / PI,
  getQuadrantRad: function(rad: number) {
    let quadrant = 4

    if (Math.abs(rad) >= PIx2) {
      rad %= PIx2
    }

    if (rad < 0) {
      rad = PIx2 + rad
    }

    if (rad <= PI / 2) {
      quadrant = 1
    } else if (rad <= PI) {
      quadrant = 2
    } else if (rad <= (PI + PI / 2)) {
      quadrant = 3
    }

    return quadrant
  }
}
