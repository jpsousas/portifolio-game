const TILE = 32;
const MAP_COLS = 22;
const MAP_ROWS = 16;
const PLAYABLE_W = MAP_COLS * TILE;
const PLAYABLE_H = MAP_ROWS * TILE;
const WORLD_W = PLAYABLE_W + TILE;
const WORLD_H = PLAYABLE_H + TILE;

const DIRS = ["down", "down_left", "left", "up_left", "up", "up_right", "right", "down_right"];

const CAT_COLORS = ["azul", "sphinx", "amarelo", "indigo", "laranja", "marrom", "branco", "preto"];

const PERSONAL_SLIDES = [
  {
    src: "assets/personal/me.jpeg",
    alt: "Retrato de João Pedro em um corredor claro",
    title: "Quem sou eu",
    caption: "Um retrato para abrir a minha história fora do jogo.",
    frame: "rose",
  },
  {
    src: "assets/personal/crochet1.jpeg",
    alt: "Peça circular de crochê com cores quentes e claras",
    title: "Fios e paciência",
    caption: "Os trabalhos manuais também fazem parte da minha rotina e da forma como eu aprendo.",
    frame: "amber",
  },
  {
    src: "assets/personal/crochet2.jpeg",
    alt: "Cachecol de crochê com faixas em laranja, marrom e branco",
    title: "Acabamento e detalhe",
    caption: "Gosto de construir coisas com cuidado, criatividade e atenção ao resultado final.",
    frame: "sage",
  },
];

const PERSONAL_TRAJECTORY = `
  <p>Oiee! meu nome é João Pedro estou inserido no meio de Tecnologia da Informação desde 2019 quando ingressei em Técnico em Informática no IFMA</p>
  <p>Atualmente sou estudante de Sistemas de Informação na UFSM e gosto de trabalhar com tecnologia de um jeito prático, visual e útil. Ao longo da minha trajetória, passei por redes, testes e desenvolvimento web, o que me ensinou a enxergar sistemas com atenção aos detalhes sem perder a visão do conjunto.</p>
  <p>Adoro café sem açúcar, ouvir muita música e jogar, sou apaixonado por artesanato e desde 2023 venho cultivado o crochê como hobby! Dá uma olhada nas minhas peças 😉</p>
`;

function buildPersonalModalBody() {
  return `
    <div class="personal-intro">
      <p class="personal-intro__eyebrow">Sobre mim</p>
      ${PERSONAL_TRAJECTORY}
    </div>

    <div class="personal-slider" aria-label="Galeria pessoal">
      <button type="button" class="personal-slider__nav personal-slider__nav--prev" data-personal-prev aria-label="Foto anterior">◀</button>

      <div class="personal-slider__viewport" data-personal-viewport>
        ${PERSONAL_SLIDES.map((slide) => `
          <article class="personal-card" data-personal-slide>
            <div class="personal-card__frame personal-card__frame--${slide.frame}">
              <img src="${slide.src}" alt="${slide.alt}" loading="lazy">
            </div>
            <div class="personal-card__copy">
              <h3>${slide.title}</h3>
              <p>${slide.caption}</p>
            </div>
          </article>
        `).join("")}
      </div>

      <button type="button" class="personal-slider__nav personal-slider__nav--next" data-personal-next aria-label="Próxima foto">▶</button>
    </div>

    <div class="personal-slider__footer">
      <span class="personal-slider__counter" data-personal-counter>01 / 03</span>
      <span class="personal-slider__hint">Use as setas para navegar entre as fotos</span>
    </div>
  `;
}

// Árvores espalhadas pela vila (posição + variante). "h" define a altura do
// frame (tree1/tree2 = 48px, tree3 = 32px) usada pra calcular o corpo físico.
const TREES = [
  { x: 40, y: 60, variant: 1 },
  { x: 80, y: 40, variant: 2 },
  { x: 120, y: 70, variant: 1 },
  { x: 160, y: 95, variant: 3 },
  { x: 40, y: 240, variant: 2 },
  { x: 80, y: 265, variant: 1 },
  { x: 120, y: 295, variant: 3 },
  { x: 520, y: 70, variant: 2 },
  { x: 560, y: 95, variant: 1 },
  { x: 600, y: 120, variant: 3 },
  { x: 640, y: 90, variant: 2 },
  { x: 610, y: 250, variant: 1 },
  { x: 650, y: 280, variant: 2 },
  { x: 690, y: 310, variant: 3 },
  { x: 90, y: 420, variant: 2 },
  { x: 130, y: 440, variant: 1 },
  { x: 170, y: 410, variant: 3 },
  { x: 620, y: 420, variant: 1 },
  { x: 660, y: 445, variant: 2 },
  { x: 700, y: 410, variant: 3 },
  { x: 280, y: 50, variant: 1 },
  { x: 320, y: 75, variant: 2 },
  { x: 360, y: 60, variant: 3 },
  { x: 400, y: 85, variant: 1 },
  { x: 280, y: 450, variant: 2 },
  { x: 400, y: 485, variant: 2 },
  { x: 200, y: 350, variant: 1 },
  { x: 240, y: 370, variant: 2 },
  { x: 220, y: 390, variant: 3 },
  { x: 480, y: 350, variant: 2 },
  { x: 520, y: 370, variant: 1 },
  { x: 500, y: 390, variant: 3 },
  { x: 480, y: 170, variant: 1 },
  { x: 540, y: 160, variant: 3 },
];

const COMPUTERS = [
  { x: 200, y: 200, variant: 1 },
  { x: 240, y: 220, variant: 2 },
  { x: 280, y: 240, variant: 3 },
];

// -----------------------------------------------------------------------
// Conteúdo do currículo mapeado para os elementos do mundo
// -----------------------------------------------------------------------
const ELEMENTS = [
  {
    key: "house",
    x: 168,
    y: 150,
    icon: "house",
    eyebrow: "Vivências pessoais",
    title: "Quem sou eu?",
    period: "",
    body: buildPersonalModalBody(),
  },
  {
    key: "novelos",
    x: 412,
    y: 190,
    icon: "novelos",
    eyebrow: "Experiências",
    title: "Experiências profissionais",
    body: `
      <div class="exp">
        <div class="exp-header">
          <span class="role pill">Bolsista de Redes de Computadores</span>
          <span class="company">CPD - UFSM</span>
          <span class="period pill">ago/2023 – dez/2024</span>
        </div>
        <ul>
          <li>Criação de scripts em Python para configuração de dispositivos de rede, utilizando as libraries <b>Paramiko</b> e <b>Netmiko</b>.</li>
          <li>Desenvolvimento web com <b>Django</b>,  e uso de <b>Pandas</b>/<b>NumPy</b> para manipular e visualizar dados de status de dispositivos.</li>
          <li>Busca e identificação de switches não gerenciáveis na rede da UFSM.</li>
        </ul>
      </div>
      <div class="exp">
        <div class="exp-header">
          <span class="role pill">Testador</span>
          <span class="company">SIS-ASTROS</span>
          <span class="period pill">dez/2024 – mai/2025</span>
        </div>
        <ul>
          <li>Teste, identificação e reporte de bugs no simulador SIS-ASTROS.</li>
          <li>Criação e refatoração de casos de teste, com SCRUM e Kanban.</li>
          <li>Atuação baseada em métodos ágeis de desenvolvimento de software SCRUM e Kanban em colaboração com desenvolvedores.</li>
        </ul>
      </div>
      <div class="exp">
        <div class="exp-header">
          <span class="role pill">Desenvolvedor FullStack</span>
          <span class="company">Forte Security</span>
          <span class="period pill">out/2025 – jun/2026</span>
        </div>
        <ul>
          <li>Desenvolveu e refatorou funcionalidades-chave do CRM interno, atuando fullstack com <b>React</b> no frontend, <b>TypeScript</b> no backend e persistência em <b>MySQL</b>.</li>
          <li>Atuou em todas as fases do ciclo de desenvolvimento, usando <b>SCRUM</b> e <b>Kanban</b> para entregas contínuas alinhadas aos objetivos do negócio.</li>
        </ul>
      </div>
    `,
  },
  {
    key: "computador1",
    x: 300,
    y: 380,
    icon: "computador1",
    eyebrow: "PROJETOS PESSOAIS",
    title: "RoboBlocks",
    period: "Projeto acadêmico",
    body: `
      <p><b>RoboBlocks</b> (Web Game)</p>
      <ul>
        <li>Projeto final da disciplina de Desenvolvimento de software educacional.</li>
        <li>Tecnologias: React, Next.js e CSS Modules</li>
        <li>Objetivo: Colaborar com a comunidade educacional para promover o aprendizado de lógica e pensamento computacional, aplicando conceitos de matrizes, registros, condicionais  e laços de repetição.</li>
        <li><a href="https://fabrica-de-algor-timo.vercel.app/" target="_blank">fabrica-de-algor-timo.vercel.app</a></li>
      </ul>
    `,
  },
  {
    key: "computador2",
    x: 373,
    y: 420,
    icon: "computador2",
    eyebrow: "PROJETOS PESSOAIS",
    title: "Gerenciador de escala", 
    period: "Projeto acadêmico",
    body: `
      <p>Gerenciador de escalas de trabalho, desenvolvido como projeto final da disciplina de Gerência de Banco de Dados.</p>
      <ul>
        <li>CRUD completo com React no frontend e Django no backend.</li>
        <li>Persistência em banco relacional MySQL.</li>
      </ul>
    `,
  },
  {
    key: "computador3",
    x: 460,
    y: 380,
    icon: "computador3",
    eyebrow: "PROJETOS PESSOAIS",
    title: "divideAi",
    period: "Projeto pessoal",
    body: `
      <p><b>divideAi</b> (Web App)</p>
      <ul>
        <li>Divide contas de supermercado a partir da leitura do QR Code da nota fiscal eletrônica.</li>
        <li>Tecnologias: Spring Boot, Python, React, H2, Selenium, Docker, REST API.</li>
        <li><a href="https://github.com/jpsousas/divide-ai" target="_blank">github.com/jpsousas/divide-ai</a></li>
      </ul>
    `,
  },
];

// -----------------------------------------------------------------------
// Modal (HTML overlay)
// -----------------------------------------------------------------------
const modalOverlay = document.getElementById("modal-overlay");
const modalCard = document.getElementById("modal-card");
const modalIcon = document.getElementById("modal-icon");
const modalEyebrow = document.getElementById("modal-eyebrow");
const modalTitle = document.getElementById("modal-title");
const modalPeriod = document.getElementById("modal-period");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");
const promptBubble = document.getElementById("prompt-bubble");

let modalOpen = false;

function initializePersonalSlider(root) {
  const viewport = root.querySelector("[data-personal-viewport]");
  const prevButton = root.querySelector("[data-personal-prev]");
  const nextButton = root.querySelector("[data-personal-next]");
  const counter = root.querySelector("[data-personal-counter]");

  if (!viewport || !prevButton || !nextButton) {
    return;
  }

  const total = PERSONAL_SLIDES.length;
  let currentIndex = 0;

  const updateCounter = () => {
    if (counter) {
      counter.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
    }
  };

  const goToSlide = (index) => {
    currentIndex = (index + total) % total;
    viewport.scrollTo({ left: currentIndex * viewport.clientWidth, behavior: "smooth" });
    updateCounter();
  };

  const syncIndexFromScroll = () => {
    currentIndex = Math.max(0, Math.min(total - 1, Math.round(viewport.scrollLeft / viewport.clientWidth)));
    updateCounter();
  };

  prevButton.addEventListener("click", () => goToSlide(currentIndex - 1));
  nextButton.addEventListener("click", () => goToSlide(currentIndex + 1));
  viewport.addEventListener("scroll", () => window.requestAnimationFrame(syncIndexFromScroll));

  updateCounter();
}

function openModal(el) {
  modalIcon.src = `assets/${el.icon}.png`;
  modalEyebrow.textContent = el.eyebrow;
  modalTitle.textContent = el.title;
  modalPeriod.textContent = el.period;
  modalBody.innerHTML = el.body;
  modalOverlay.classList.toggle("house-open", el.key === "house");
  if (el.key === "house") {
    initializePersonalSlider(modalBody);
  }
  modalOverlay.classList.add("open");
  modalOpen = true;
}
function closeModal() {
  // play click feedback if available
  try {
    if (window.villageScene && window.villageScene.sound && !window.villageScene.sound.mute) {
      window.villageScene.sound.play('click');
    }
  } catch (e) {}
  modalOverlay.classList.remove("open");
  modalOverlay.classList.remove("house-open");
  modalOpen = false;
}
modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// -----------------------------------------------------------------------
// Phaser Scene
// -----------------------------------------------------------------------
class VillageScene extends Phaser.Scene {
  constructor() {
    super("village");
  }

  preload() {
    // Todas as variantes de cor do gato usam o mesmo layout de frames
    CAT_COLORS.forEach((color) => {
      this.load.atlas(`cat_${color}`, `assets/cat_${color}.png`, "assets/cat_atlas.json");
    });
    this.load.image("grass", "assets/grass_tileset.png");
    this.load.image("house", "assets/house.png");
    this.load.image("novelos", "assets/novelos.png");
    this.load.image("sign", "assets/projects_sign.png");

    // Árvores: cada arquivo é uma tira de 6 frames (animação de balanço)
    this.load.spritesheet("tree1", "assets/arvore1.png", { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet("tree2", "assets/arvore2.png", { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet("tree3", "assets/arvore3.png", { frameWidth: 32, frameHeight: 32 });
  
    // Computadores: cada arquivo é uma tira de 4 frames (animações gerais)
    this.load.spritesheet("computador1", "assets/computador1.png", { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("computador2", "assets/computador2.png", { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("computador3", "assets/computador3.png", { frameWidth: 32, frameHeight: 32 });

    // Audios
    this.load.audio('meow', 'assets/audios/meow.mp3');
    this.load.audio('click', 'assets/audios/button_click.mp3');

  }

  create() {
    const OFFSET = TILE / 2;
    this.physics.world.setBounds(0, 0, WORLD_W, WORLD_H);

    // ---- Ground: random tiling from the 4 grass variants, com uma borda extra para efeito visual ----
    // O tilemap é posicionado em (0,0), mas tem uma borda de 1 tile.
    // O conteúdo do jogo (a partir de OFFSET) vai sobrepor a borda interna do tilemap.
    const mapW = MAP_COLS + 2;
    const mapH = MAP_ROWS + 2;
    const map = this.make.tilemap({ tileWidth: TILE, tileHeight: TILE, width: mapW, height: mapH });
    const tileset = map.addTilesetImage("grass", "grass", TILE, TILE, 0, 0);
    const ground = map.createBlankLayer("ground", tileset, -OFFSET, -OFFSET);
    for (let y = 0; y < mapH; y++) {
      for (let x = 0; x < mapW; x++) {
        ground.putTileAt(Phaser.Math.Between(0, 3), x, y);
      }
    }

    // ---- Cor do gato: sorteada a cada carregamento ----
    this.catKey = `cat_${Phaser.Utils.Array.GetRandom(CAT_COLORS)}`;

    // ---- Animações do gato (usando a cor sorteada) ----
    DIRS.forEach((dir) => {
      this.anims.create({
        key: `walk_${dir}`,
        frames: [0, 1, 2, 3].map((i) => ({ key: this.catKey, frame: `walk_${dir}_${i}` })),
        frameRate: 8,
        repeat: -1,
      });
      this.anims.create({
        key: `idle_${dir}`,
        frames: [0, 1].map((i) => ({ key: this.catKey, frame: `idle_${dir}_${i}` })),
        frameRate: 4,
        repeat: 0,
      });

    });

    // ---- Animações de balanço das árvores (6 frames cada) ----
    [1, 2, 3].forEach((v) => {
      this.anims.create({
        key: `tree${v}_sway`,
        frames: this.anims.generateFrameNumbers(`tree${v}`, { start: 0, end: 5 }),
        frameRate: 6,
        repeat: -1,
      });
    });

    // ---- Animações dos computadores (4 frames cada) ----
    [1, 2, 3].forEach((v) => {
      this.anims.create({
        key: `computador${v}_anim`,
        frames: this.anims.generateFrameNumbers(`computador${v}`, { start: 0, end: 3 }),
        frameRate: 4,
        repeat: -1,
      });
    });

    // ---- World elements (house, statue, sign, computers) ----
    this.elementSprites = [];
    ELEMENTS.forEach((el) => {
      const pos = { x: el.x + OFFSET, y: el.y + OFFSET };
      const isComputer = el.key.startsWith("computador");
      const sprite = isComputer
        ? this.add.sprite(pos.x, pos.y, el.icon, 0)
        : this.add.image(pos.x, pos.y, el.icon);

      sprite.setOrigin(0.5, 0.85);
      sprite.setDepth(pos.y);

      if (isComputer) {
        sprite.play(`computador${el.icon.replace("computador", "")}_anim`);
      }

      this.physics.add.existing(sprite, true);
      const body = sprite.body;
      const footH = sprite.displayHeight * 0.3;
      body.setSize(sprite.displayWidth * 0.7, footH);
      body.setOffset(
        (sprite.width - sprite.displayWidth * 0.7) / 2,
        sprite.height - footH - sprite.displayHeight * 0.15
      );

      const label = this.add
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
      this.elementSprites.push(sprite);
    });

    // ---- Árvores (obstáculos, decorativas e animadas) ----
    this.treeSprites = [];
    TREES.forEach((t) => {
      const pos = { x: t.x + OFFSET, y: t.y + OFFSET };
      const texKey = `tree${t.variant}`;
      const sprite = this.add.sprite(pos.x, pos.y, texKey, 0).setOrigin(0.5, 0.92);
      sprite.setDepth(pos.y);
      sprite.play({ key: `tree${t.variant}_sway`, startFrame: Phaser.Math.Between(0, 5) });

      this.physics.add.existing(sprite, true);
      const body = sprite.body;
      // corpo de colisão só no tronco/base, pra folhagem poder "cobrir" o gato visualmente
      const trunkW = sprite.displayWidth * 0.35;
      const trunkH = sprite.displayHeight * 0.22;
      body.setSize(trunkW, trunkH);
      body.setOffset((sprite.width - trunkW) / 2, sprite.height - trunkH - sprite.displayHeight * 0.06);

      this.treeSprites.push(sprite);
    });

    // ---- Player ----
    this.player = this.physics.add.sprite(
      PLAYABLE_W / 2 + OFFSET,
      PLAYABLE_H / 2 + 40 + OFFSET,
      this.catKey,
      "idle_down_0"
    );
    this.player.setOrigin(0.5, 0.8);
    this.player.body.setSize(12, 10);
    this.player.body.setOffset(10, 20);

    // Confina o jogador à área jogável, permitindo que os objetos "sangrem" para fora
    this.player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(OFFSET, OFFSET, PLAYABLE_W, PLAYABLE_H));
    this.player.setCollideWorldBounds(true);

    this.player.currentDir = "down";
    this.player.wasMoving = false;
    this.player.anims.play("idle_down");

    this.playerShadow = this.add.graphics();
    this.playerShadow.setDepth(0);
    this.playerShadow.fillStyle(0x000000, 0.28);
    this.playerShadow.fillEllipse(0, 0, 14, 8);
    this.playerShadow.setPosition(this.player.x, this.player.y + 9);

    this.elementSprites.forEach((s) => this.physics.add.collider(this.player, s));
    this.treeSprites.forEach((s) => this.physics.add.collider(this.player, s));

    // expose scene for DOM handlers and sound control
    window.villageScene = this;

    // initialize sound mute state from localStorage
    const muted = localStorage.getItem('muted') === 'true';
    this.sound.mute = !!muted;

    // wire sound-toggle button UI
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) {
      soundToggle.textContent = this.sound.mute ? '🔇' : '🔊';
      soundToggle.addEventListener('click', () => {
        const newMuted = !this.sound.mute;
        this.sound.mute = newMuted;
        localStorage.setItem('muted', newMuted ? 'true' : 'false');
        soundToggle.textContent = this.sound.mute ? '🔇' : '🔊';
        if (!this.sound.mute) this.sound.play('click');
      });
    }

    // ---- Camera ----
    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
    const isVerySmallScreen = window.matchMedia("(max-width: 480px)").matches;
    const baseZoom = 2.0;
    // Zoom extra somente em telas menores para facilitar a visualização.
    const zoom = isVerySmallScreen ? baseZoom + 0.45 : isSmallScreen ? baseZoom + 0.2 : baseZoom;

    this.cameras.main.setBounds(0, 0, WORLD_W, WORLD_H);
    this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
    this.cameras.main.setZoom(zoom);

    // play meow when scene is ready and player is visible
    this.time.delayedCall(220, () => {
      if (!this.sound.mute) this.sound.play('meow', { volume: 0.9 });
    });

    // ---- Input ----
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({ up: "W", down: "S", left: "A", right: "D" });
    this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    this.canvas = this.sys.game.canvas; // Adicionada esta linha
    this.speed = isVerySmallScreen ? 70 : isSmallScreen ? 78 : 85;
  }

  getNearestElement() {
    let nearest = null;
    let nearestDist = 34;
    this.elementSprites.forEach((s) => {
      const d = Phaser.Math.Distance.Between(this.player.x, this.player.y, s.x, s.y);
      if (d < nearestDist) {
        nearestDist = d;
        nearest = s;
      }
    });
    return nearest;
  }

  update() {
    const p = this.player;
    let vx = 0,
      vy = 0;

    if (!modalOpen) {
      if (this.cursors.left.isDown || this.wasd.left.isDown) vx = -1;
      else if (this.cursors.right.isDown || this.wasd.right.isDown) vx = 1;

      if (this.cursors.up.isDown || this.wasd.up.isDown) vy = -1;
      else if (this.cursors.down.isDown || this.wasd.down.isDown) vy = 1;

      // Fallback: joystick virtual (mobile), só usado quando o teclado está parado
      if (vx === 0 && vy === 0 && window.mobileInput) {
        vx = window.mobileInput.x;
        vy = window.mobileInput.y;
      }
    }

    const moving = vx !== 0 || vy !== 0;

    if (moving) {
      const len = Math.hypot(vx, vy);
      p.body.setVelocity((vx / len) * this.speed, (vy / len) * this.speed);

      let dir;
      if (vx === 0 && vy < 0) dir = "up";
      else if (vx === 0 && vy > 0) dir = "down";
      else if (vy === 0 && vx < 0) dir = "left";
      else if (vy === 0 && vx > 0) dir = "right";
      else if (vx < 0 && vy < 0) dir = "up_left";
      else if (vx > 0 && vy < 0) dir = "up_right";
      else if (vx < 0 && vy > 0) dir = "down_left";
      else dir = "down_right";

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

    if (this.playerShadow) {
      this.playerShadow.clear();
      this.playerShadow.fillStyle(0x000000, 0.28);
      const shadowW = moving ? 16 : 14;
      const shadowH = moving ? 9 : 7;
      this.playerShadow.fillEllipse(0, 0, shadowW, shadowH);
      this.playerShadow.setPosition(p.x, p.y + 4);
      this.playerShadow.setDepth(p.y - 1);
    }

    this.elementSprites.forEach((s) => {
      const d = Phaser.Math.Distance.Between(p.x, p.y, s.x, s.y);
      const shouldShow = d < 48;
      if (s.label) {
        s.label.setVisible(shouldShow);
      }
    });

    // ---- Interaction prompt + keys ----
    const near = this.getNearestElement();
    if (near && !modalOpen) {
      const cam = this.cameras.main;
      // compute canvas position on the page and offset the bubble accordingly
      const rect = this.canvas.getBoundingClientRect();
      const sx = rect.left + (near.x - cam.scrollX) * cam.zoom;
      const sy = rect.top + (near.y - near.displayHeight * 0.9 - cam.scrollY) * cam.zoom;
      promptBubble.style.left = `${sx / 2}px`;
      promptBubble.style.top = `${sy / 2}px`;
      promptBubble.style.display = "block";
    } else {
      promptBubble.style.display = "none";
    }

    if (near && Phaser.Input.Keyboard.JustDown(this.interactKey) && !modalOpen) {
      openModal(near.elData);
    }
  }
}



const config = {
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
};

new Phaser.Game(config);
