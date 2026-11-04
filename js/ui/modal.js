import { initializePersonalSlider } from "./personalGallery.js";

const modalOverlay = document.getElementById("modal-overlay");
const modalIcon = document.getElementById("modal-icon");
const modalEyebrow = document.getElementById("modal-eyebrow");
const modalTitle = document.getElementById("modal-title");
const modalPeriod = document.getElementById("modal-period");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");

let modalOpen = false;
let closeListener = null;

export function isModalOpen() {
  return modalOpen;
}

// Permite que o jogo reaja ao fechamento (som de clique) sem o modal conhecer o Phaser.
export function onModalClose(listener) {
  closeListener = listener;
}

export function openModal(el) {
  const iconFrames = el.iconFrames ?? 1;
  modalIcon.style.backgroundImage = `url('assets/${el.icon}.png')`;
  modalIcon.style.setProperty("--icon-frames", iconFrames);
  modalIcon.classList.toggle("is-animated", iconFrames > 1);
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

export function closeModal() {
  // Uma falha ao tocar o som não pode impedir o modal de fechar.
  try {
    if (closeListener) closeListener();
  } catch (e) {}
  modalOverlay.classList.remove("open");
  modalOverlay.classList.remove("house-open");
  modalOpen = false;
}

export function initModal() {
  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOpen) closeModal();
  });
}
