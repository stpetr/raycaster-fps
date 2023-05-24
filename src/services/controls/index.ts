import { Player } from '../../models/player'

const ARROW_UP_KEY = 38,
  ARROW_DOWN_KEY = 40,
  ARROW_LEFT_KEY = 37,
  ARROW_RIGHT_KEY = 39,
  W_KEY = 87,
  A_KEY = 65,
  S_KEY = 83,
  D_KEY = 68

export class Controls {
  constructor(private player: Player) {}

  handleKeyDown(e: KeyboardEvent) {
    switch(e.keyCode) {
      case ARROW_UP_KEY:
      case W_KEY:
        this.player.speed = 1
        break
      case ARROW_DOWN_KEY:
      case S_KEY:
        this.player.speed = -1
        break
      case ARROW_LEFT_KEY:
      case A_KEY:
        this.player.direction = -1
        break
      case ARROW_RIGHT_KEY:
      case D_KEY:
        this.player.direction = 1
        break
      default:
        console.log('A not supported key pressed', e.keyCode)
    }
  }

  handleKeyUp(e: KeyboardEvent) {
    switch (e.keyCode) {
      case ARROW_UP_KEY:
      case W_KEY:
      case ARROW_DOWN_KEY:
      case S_KEY:
        this.player.speed = 0
        break
      case ARROW_LEFT_KEY:
      case A_KEY:
      case ARROW_RIGHT_KEY:
      case D_KEY:
        this.player.direction = 0
        break
    }
  }

  bind() {
    console.log('Binding controls')
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
    window.addEventListener('keyup', this.handleKeyUp.bind(this))
  }

  unbind() {
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
  }
}
