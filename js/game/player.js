import { CAT_COLORS, OFFSET, PLAYABLE_H, PLAYABLE_W } from "../config.js";
import { mobileInput } from "../ui/joystick.js";
import { isModalOpen } from "../ui/modal.js";

// A cor do gato é sorteada a cada carregamento.
export function createCatKey() {
  return `cat_${Phaser.Utils.Array.GetRandom(CAT_COLORS)}`;
}

export function createPlayer(scene, catKey) {
  const player = scene.physics.add.sprite(
    PLAYABLE_W / 2 + OFFSET,
    PLAYABLE_H / 2 + 40 + OFFSET,
    catKey,
    "idle_down_0"
  );
  player.setOrigin(0.5, 0.8);
  player.body.setSize(12, 10);
  player.body.setOffset(10, 20);

  // Confina o jogador à área jogável, permitindo que os objetos "sangrem" para fora
  player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(OFFSET, OFFSET, PLAYABLE_W, PLAYABLE_H));
  player.setCollideWorldBounds(true);

  player.currentDir = "down";
  player.wasMoving = false;
  player.anims.play("idle_down");

  const shadow = scene.add.graphics();
  shadow.setDepth(0);
  shadow.fillStyle(0x000000, 0.28);
  shadow.fillEllipse(0, 0, 14, 8);
  shadow.setPosition(player.x, player.y + 9);

  scene.player = player;
  scene.playerShadow = shadow;
}

function readMovementInput(scene) {
  let vx = 0;
  let vy = 0;

  if (isModalOpen()) return { vx, vy };

  if (scene.cursors.left.isDown || scene.wasd.left.isDown) vx = -1;
  else if (scene.cursors.right.isDown || scene.wasd.right.isDown) vx = 1;

  if (scene.cursors.up.isDown || scene.wasd.up.isDown) vy = -1;
  else if (scene.cursors.down.isDown || scene.wasd.down.isDown) vy = 1;

  // Fallback: joystick virtual (mobile), só usado quando o teclado está parado
  if (vx === 0 && vy === 0) {
    vx = mobileInput.x;
    vy = mobileInput.y;
  }

  return { vx, vy };
}

function getDirection(vx, vy) {
  if (vx === 0 && vy < 0) return "up";
  if (vx === 0 && vy > 0) return "down";
  if (vy === 0 && vx < 0) return "left";
  if (vy === 0 && vx > 0) return "right";
  if (vx < 0 && vy < 0) return "up_left";
  if (vx > 0 && vy < 0) return "up_right";
  if (vx < 0 && vy > 0) return "down_left";
  return "down_right";
}

export function updatePlayer(scene) {
  const p = scene.player;
  const { vx, vy } = readMovementInput(scene);
  const moving = vx !== 0 || vy !== 0;

  if (moving) {
    const len = Math.hypot(vx, vy);
    p.body.setVelocity((vx / len) * scene.speed, (vy / len) * scene.speed);

    const dir = getDirection(vx, vy);
    p.currentDir = dir;
    p.anims.play(`walk_${dir}`, true);
    p.wasMoving = true;
  } else {
    p.body.setVelocity(0, 0);
    // só dispara a animação de sentar UMA VEZ, na transição andando -> parado.
    // depois disso ela fica parada no último frame (sentado) até o jogador se mover de novo.
    if (p.wasMoving) {
      p.anims.play(`idle_${p.currentDir}`, true);
      p.wasMoving = false;
    }
  }

  p.setDepth(p.y);

  const shadow = scene.playerShadow;
  shadow.clear();
  shadow.fillStyle(0x000000, 0.28);
  shadow.fillEllipse(0, 0, moving ? 16 : 14, moving ? 9 : 7);
  shadow.setPosition(p.x, p.y + 4);
  shadow.setDepth(p.y - 1);
}
