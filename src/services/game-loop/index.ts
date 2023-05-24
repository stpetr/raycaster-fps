import { MovePlayer } from '../move-player'
import { View } from '../view'

export class GameLoop {
  fps: number = 1000 / 30
  private views: View[] = []
  private intervalId = 0
  constructor(private movePlayer: MovePlayer) {}

  addView(view: View) {
    this.views.push(view)
  }
  
  start() {
    this.stop()
    setInterval(() => this.tick(), this.fps);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private tick() {
    this.movePlayer.move()
    this.renderViews()
  }

  private renderViews() {
    this.views.forEach((view) => view.render())
  }
}
