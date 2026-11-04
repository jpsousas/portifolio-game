import { PERSONAL_SLIDES, PERSONAL_TRAJECTORY } from "../data/personal.js";

export function buildPersonalModalBody() {
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

export function initializePersonalSlider(root) {
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
