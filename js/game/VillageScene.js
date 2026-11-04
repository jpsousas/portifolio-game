import { WORLD_H, WORLD_W } from "../config.js";
import { onModalClose } from "../ui/modal.js";
import { initSoundToggle, isMuted } from "../ui/soundToggle.js";
import { createAnimations } from "./animations.js";
import { preloadAssets } from "./assets.js";
import { updateInteraction } from "./interaction.js";
import { createCatKey, createPlayer, updatePlayer } from "./player.js";
import { getScreenProfile } from "./screen.js";
import { createElements, createGround, createTrees } from "./world.js";

export class VillageScene extends Phaser.Scene {
  constructor() {
    super("village");
  }

  preload() {
    preloadAssets(this);
  }

  create() {
    const { zoom, speed } = getScreenProfile();

    this.physics.world.setBounds(0, 0, WORLD_W, WORLD_H);

    // A ordem de criação define a sobreposição entre objetos de mesma profundidade.
    createGround(this);

    this.catKey = createCatKey();
    createAnimations(this, this.catKey);

    this.elementSprites = createElements(this);
    this.treeSprites = createTrees(this);

    createPlayer(this, this.catKey);
    this.elementSprites.forEach((s) => this.physics.add.collider(this.player, s));
    this.treeSprites.forEach((s) => this.physics.add.collider(this.player, s));

    // ---- Som ----
    initSoundToggle(this.sound);
    onModalClose(() => {
      if (!isMuted()) this.sound.play("click");
    });

    // ---- Câmera ----
    this.cameras.main.setBounds(0, 0, WORLD_W, WORLD_H);
    this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
    this.cameras.main.setZoom(zoom);

    // Mia quando a cena está pronta e o jogador já está visível.
    this.time.delayedCall(220, () => {
      if (!isMuted()) this.sound.play("meow", { volume: 0.9 });
    });

    // ---- Entrada ----
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({ up: "W", down: "S", left: "A", right: "D" });
    this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    this.canvas = this.sys.game.canvas;
    this.speed = speed;
  }

  update() {
    updatePlayer(this);
    updateInteraction(this);
  }
}
