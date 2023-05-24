import { math } from '../../helpers/math'

export class Player {
  x = 1
  y = 1
  direction = 0
  public speed = 0
  stepLength = 0.1
  rotation = 0
  rotationStepAngle = math.degToRad(6)
  size = 8

  constructor() {

  }

  isLookingToTheLeft(angle: number) {
    const quadrant = math.getQuadrantRad(angle)
    return quadrant === 2 || quadrant === 3
  }

  isLookingToTheRight(angle: number) {
    return !this.isLookingToTheLeft(angle)
  }

  isLookingUpward(angle: number) {
    const quadrant = math.getQuadrantRad(angle)
    return quadrant === 1 || quadrant === 2
  }

  isLookingDownward(angle: number) {
    return !this.isLookingUpward(angle)
  }
}
