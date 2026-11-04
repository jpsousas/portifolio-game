import { VillageScene } from "./game/VillageScene.js";
import { initJoystick } from "./ui/joystick.js";
import { initModal } from "./ui/modal.js";
import { initSky } from "./ui/sky.js";

initSky();
initJoystick();
initModal();

// Phaser é uma variável global, carregada pelo <script> anterior no index.html.
new Phaser.Game({
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  parent: "game-container",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: { debug: false },
  },
  scene: [VillageScene],
});
