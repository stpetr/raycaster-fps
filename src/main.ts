import { Map } from './models/map'
import { Player } from './models/player'
import { MovePlayer } from './services/move-player'
import { MapView } from './views/map-view'
import { GameLoop } from './services/game-loop'
import { Controls } from './services/controls'

const mapViewCanvas = document.getElementById('game-map')
const map = new Map(20, 20)
const player = new Player()
const movePlayer = new MovePlayer(player, map)
const gameLoop = new GameLoop(movePlayer)
const controls = new Controls(player)
const mapView = new MapView(map, player, mapViewCanvas as HTMLCanvasElement)

gameLoop.addView(mapView)
controls.bind()
gameLoop.start()
