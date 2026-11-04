const RADIUS = 38;
const DEADZONE = 10;

// Direção atual do joystick virtual (-1, 0 ou 1 em cada eixo), lida pelo jogador.
export const mobileInput = { x: 0, y: 0 };

export function initJoystick() {
  const base = document.getElementById("mobile-joystick");
  const knob = document.getElementById("mobile-joystick__knob");
  let activeId = null;

  function setKnob(dx, dy) {
    knob.style.transform = `translate(${dx}px, ${dy}px)`;
  }

  function reset() {
    mobileInput.x = 0;
    mobileInput.y = 0;
    setKnob(0, 0);
  }

  function handleMove(clientX, clientY) {
    const rect = base.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let dx = clientX - cx;
    let dy = clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > RADIUS) {
      dx = (dx / dist) * RADIUS;
      dy = (dy / dist) * RADIUS;
    }
    setKnob(dx, dy);
    mobileInput.x = Math.abs(dx) > DEADZONE ? Math.sign(dx) : 0;
    mobileInput.y = Math.abs(dy) > DEADZONE ? Math.sign(dy) : 0;
  }

  function endTouch(e) {
    if (activeId !== e.pointerId) return;
    activeId = null;
    reset();
  }

  base.addEventListener("pointerdown", (e) => {
    activeId = e.pointerId;
    base.setPointerCapture(activeId);
    handleMove(e.clientX, e.clientY);
  });
  base.addEventListener("pointermove", (e) => {
    if (activeId !== e.pointerId) return;
    handleMove(e.clientX, e.clientY);
  });
  base.addEventListener("pointerup", endTouch);
  base.addEventListener("pointercancel", endTouch);
  base.addEventListener("pointerleave", endTouch);
}
