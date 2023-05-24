export class Bitmap {
  image: HTMLImageElement
  constructor(src: string, public width: number, public height: number) {
    this.image = new Image()
    this.image.src = src
  }
}
