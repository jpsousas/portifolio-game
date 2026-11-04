import { CAT_COLORS } from "../config.js";

export function preloadAssets(scene) {
  // Todas as variantes de cor do gato usam o mesmo layout de frames
  CAT_COLORS.forEach((color) => {
    scene.load.atlas(`cat_${color}`, `assets/cat_${color}.png`, "assets/cat_atlas.json");
  });
  scene.load.image("grass", "assets/grass_tileset.png");
  scene.load.image("house", "assets/house.png");
  scene.load.image("novelos", "assets/novelos.png");

  // Árvores: cada arquivo é uma tira de 6 frames (animação de balanço)
  scene.load.spritesheet("tree1", "assets/arvore1.png", { frameWidth: 32, frameHeight: 48 });
  scene.load.spritesheet("tree2", "assets/arvore2.png", { frameWidth: 32, frameHeight: 48 });
  scene.load.spritesheet("tree3", "assets/arvore3.png", { frameWidth: 32, frameHeight: 32 });

  // Computadores: cada arquivo é uma tira de 4 frames (animações gerais)
  scene.load.spritesheet("computador1", "assets/computador1.png", { frameWidth: 32, frameHeight: 32 });
  scene.load.spritesheet("computador2", "assets/computador2.png", { frameWidth: 32, frameHeight: 32 });
  scene.load.spritesheet("computador3", "assets/computador3.png", { frameWidth: 32, frameHeight: 32 });

  // Áudios
  scene.load.audio("meow", "assets/audios/meow.mp3");
  scene.load.audio("click", "assets/audios/button_click.mp3");
}
