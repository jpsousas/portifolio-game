const STORAGE_KEY = "muted";

// Fonte da verdade do estado do som. Não usamos sound.mute para isso porque, no
// Web Audio, a leitura pode devolver o valor antigo logo depois de uma escrita e
// enquanto o áudio do navegador ainda está suspenso.
let muted = false;

export function isMuted() {
  return muted;
}

// Restaura a preferência salva e liga o botão de som ao gerenciador de som do Phaser.
export function initSoundToggle(sound) {
  muted = localStorage.getItem(STORAGE_KEY) === "true";
  sound.mute = muted;

  const soundToggle = document.getElementById("sound-toggle");
  if (!soundToggle) return;

  soundToggle.textContent = muted ? "🔇" : "🔊";
  soundToggle.addEventListener("click", () => {
    muted = !muted;
    sound.mute = muted;
    localStorage.setItem(STORAGE_KEY, muted ? "true" : "false");
    soundToggle.textContent = muted ? "🔇" : "🔊";
    if (!muted) sound.play("click");
  });
}
