import { DIRS } from "../config.js";

export function createAnimations(scene, catKey) {
  // ---- Animações do gato (usando a cor sorteada) ----
  DIRS.forEach((dir) => {
    scene.anims.create({
      key: `walk_${dir}`,
      frames: [0, 1, 2, 3].map((i) => ({ key: catKey, frame: `walk_${dir}_${i}` })),
      frameRate: 8,
      repeat: -1,
    });
    scene.anims.create({
      key: `idle_${dir}`,
      frames: [0, 1].map((i) => ({ key: catKey, frame: `idle_${dir}_${i}` })),
      frameRate: 4,
      repeat: 0,
    });
  });

  // ---- Animações de balanço das árvores (6 frames cada) ----
  [1, 2, 3].forEach((v) => {
    scene.anims.create({
      key: `tree${v}_sway`,
      frames: scene.anims.generateFrameNumbers(`tree${v}`, { start: 0, end: 5 }),
      frameRate: 6,
      repeat: -1,
    });
  });

  // ---- Animações dos computadores (4 frames cada) ----
  [1, 2, 3].forEach((v) => {
    scene.anims.create({
      key: `computador${v}_anim`,
      frames: scene.anims.generateFrameNumbers(`computador${v}`, { start: 0, end: 3 }),
      frameRate: 4,
      repeat: -1,
    });
  });
}
