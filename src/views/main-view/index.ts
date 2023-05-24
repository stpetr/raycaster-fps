import { View } from '../../services/view'
import { Map } from '../../models/map'
import { Player } from '../../models/player'

export class MainView extends View {
  constructor(protected map: Map, protected player: Player, protected canvas: HTMLCanvasElement) {
    super(map, player, canvas)
  }

  render() {

  }

  // private renderWeapon() {
  //   var bobX = Math.cos(paces * 2) * this.scale * 6;
  //   var bobY = Math.sin(paces * 4) * this.scale * 6;
  //   var left = this.width * 0.66 + bobX;
  //   var top = this.height * 0.6 + bobY;
  //   this.ctx.drawImage(weapon.image, left, top, weapon.width * this.scale, weapon.height * this.scale);
  // }
}
