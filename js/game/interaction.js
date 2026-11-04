import { isModalOpen, openModal } from "../ui/modal.js";

const INTERACT_DISTANCE = 34;
const LABEL_DISTANCE = 48;

const promptBubble = document.getElementById("prompt-bubble");

function distanceToPlayer(scene, sprite) {
  return Phaser.Math.Distance.Between(scene.player.x, scene.player.y, sprite.x, sprite.y);
}

function getNearestElement(scene) {
  let nearest = null;
  let nearestDist = INTERACT_DISTANCE;
  scene.elementSprites.forEach((s) => {
    const d = distanceToPlayer(scene, s);
    if (d < nearestDist) {
      nearestDist = d;
      nearest = s;
    }
  });
  return nearest;
}

function updateLabels(scene) {
  scene.elementSprites.forEach((s) => {
    if (s.label) {
      s.label.setVisible(distanceToPlayer(scene, s) < LABEL_DISTANCE);
    }
  });
}

function updatePromptBubble(scene, near) {
  if (near && !isModalOpen()) {
    const cam = scene.cameras.main;
    // compute canvas position on the page and offset the bubble accordingly
    const rect = scene.canvas.getBoundingClientRect();
    const sx = rect.left + (near.x - cam.scrollX) * cam.zoom;
    const sy = rect.top + (near.y - near.displayHeight * 0.9 - cam.scrollY) * cam.zoom;
    promptBubble.style.left = `${sx / 2}px`;
    promptBubble.style.top = `${sy / 2}px`;
    promptBubble.style.display = "block";
  } else {
    promptBubble.style.display = "none";
  }
}

export function updateInteraction(scene) {
  updateLabels(scene);

  const near = getNearestElement(scene);
  updatePromptBubble(scene, near);

  if (near && Phaser.Input.Keyboard.JustDown(scene.interactKey) && !isModalOpen()) {
    openModal(near.elData);
  }
}
