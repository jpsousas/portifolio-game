const CLOUD_IMAGES = ["assets/cloud1.png", "assets/cloud2.png"];
const ASPECT = { "assets/cloud1.png": 56 / 24, "assets/cloud2.png": 80 / 24 };
const NUM_CLOUDS = 16;

export function initSky() {
  const skyLayer = document.getElementById("sky-layer");
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  for (let i = 0; i < NUM_CLOUDS; i++) {
    const img = CLOUD_IMAGES[Math.floor(Math.random() * CLOUD_IMAGES.length)];
    const width = Math.round(90 + Math.random() * 160);
    const height = Math.round(width / ASPECT[img]);
    const topPct = Math.random() * 96;
    const duration = 26 + Math.random() * 50;
    const opacity = (0.55 + Math.random() * 0.45).toFixed(2);

    const el = document.createElement("div");
    el.className = "sky-cloud";
    el.style.top = `${topPct}%`;
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.backgroundImage = `url('${img}')`;
    el.style.opacity = `calc(var(--cloud-opacity) * ${opacity})`;
    skyLayer.appendChild(el);

    if (reduceMotion) {
      el.style.left = `${Math.random() * 100}%`;
      continue;
    }

    const anim = el.animate(
      [
        { transform: `translateX(calc(100vw + ${width}px))` },
        { transform: "translateX(-100%)" },
      ],
      { duration: duration * 1000, iterations: Infinity }
    );
    anim.currentTime = Math.random() * duration * 1000;
  }
}
