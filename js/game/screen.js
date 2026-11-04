const BASE_ZOOM = 2.0;

// Zoom e velocidade do jogador conforme o tamanho da tela, medidos ao criar a cena.
export function getScreenProfile() {
  const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
  const isVerySmallScreen = window.matchMedia("(max-width: 480px)").matches;

  return {
    // Zoom extra somente em telas menores para facilitar a visualização.
    zoom: isVerySmallScreen ? BASE_ZOOM + 0.45 : isSmallScreen ? BASE_ZOOM + 0.2 : BASE_ZOOM,
    speed: isVerySmallScreen ? 70 : isSmallScreen ? 78 : 85,
  };
}
