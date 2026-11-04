import { MAP_COLS, MAP_ROWS, OFFSET, TILE } from "../config.js";
import { ELEMENTS } from "../data/elements.js";
import { TREES } from "../data/world.js";
import { openModal } from "../ui/modal.js";

// Ground: random tiling a partir das 4 variantes de grama, com uma borda extra para efeito visual.
// O conteúdo do jogo (a partir de OFFSET) sobrepõe a borda interna do tilemap.
export function createGround(scene) {
  const mapW = MAP_COLS + 2;
  const mapH = MAP_ROWS + 2;
  const map = scene.make.tilemap({ tileWidth: TILE, tileHeight: TILE, width: mapW, height: mapH });
  const tileset = map.addTilesetImage("grass", "grass", TILE, TILE, 0, 0);
  const ground = map.createBlankLayer("ground", tileset, -OFFSET, -OFFSET);
  for (let y = 0; y < mapH; y++) {
    for (let x = 0; x < mapW; x++) {
      ground.putTileAt(Phaser.Math.Between(0, 3), x, y);
    }
  }
}

// Elementos interativos do mundo (casa, novelos, computadores).
export function createElements(scene) {
  return ELEMENTS.map((el) => {
    const pos = { x: el.x + OFFSET, y: el.y + OFFSET };
    const isComputer = el.key.startsWith("computador");
    const sprite = isComputer
      ? scene.add.sprite(pos.x, pos.y, el.icon, 0)
      : scene.add.image(pos.x, pos.y, el.icon);

    sprite.setOrigin(0.5, 0.85);
    sprite.setDepth(pos.y);

    if (isComputer) {
      sprite.play(`computador${el.icon.replace("computador", "")}_anim`);
    }

    scene.physics.add.existing(sprite, true);
    const body = sprite.body;
    const footH = sprite.displayHeight * 0.3;
    body.setSize(sprite.displayWidth * 0.7, footH);
    body.setOffset(
      (sprite.width - sprite.displayWidth * 0.7) / 2,
      sprite.height - footH - sprite.displayHeight * 0.15
    );

    const label = scene.add
      .text(pos.x, pos.y - sprite.displayHeight * 0.85 - 6, el.title.split("—")[0].trim(), {
        fontFamily: '"Press Start 2P"',
        fontSize: "8px",
        color: "#2b2f38",
        backgroundColor: "#f4ecd8",
        padding: { x: 4, y: 3 },
      })
      .setOrigin(0.5, 1)
      .setDepth(9999)
      .setVisible(false);

    sprite.setInteractive({ useHandCursor: true });
    sprite.on("pointerdown", () => openModal(el));

    sprite.elData = el;
    sprite.label = label;
    return sprite;
  });
}

// Árvores (obstáculos, decorativas e animadas).
export function createTrees(scene) {
  return TREES.map((t) => {
    const pos = { x: t.x + OFFSET, y: t.y + OFFSET };
    const texKey = `tree${t.variant}`;
    const sprite = scene.add.sprite(pos.x, pos.y, texKey, 0).setOrigin(0.5, 0.92);
    sprite.setDepth(pos.y);
    sprite.play({ key: `tree${t.variant}_sway`, startFrame: Phaser.Math.Between(0, 5) });

    scene.physics.add.existing(sprite, true);
    const body = sprite.body;
    // corpo de colisão só no tronco/base, pra folhagem poder "cobrir" o gato visualmente
    const trunkW = sprite.displayWidth * 0.35;
    const trunkH = sprite.displayHeight * 0.22;
    body.setSize(trunkW, trunkH);
    body.setOffset((sprite.width - trunkW) / 2, sprite.height - trunkH - sprite.displayHeight * 0.06);

    return sprite;
  });
}
