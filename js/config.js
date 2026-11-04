export const TILE = 32;
export const MAP_COLS = 22;
export const MAP_ROWS = 16;
export const PLAYABLE_W = MAP_COLS * TILE;
export const PLAYABLE_H = MAP_ROWS * TILE;
export const WORLD_W = PLAYABLE_W + TILE;
export const WORLD_H = PLAYABLE_H + TILE;

// Deslocamento do conteúdo do jogo em relação à borda extra do mapa.
export const OFFSET = TILE / 2;

export const DIRS = ["down", "down_left", "left", "up_left", "up", "up_right", "right", "down_right"];

export const CAT_COLORS = ["azul", "sphinx", "amarelo", "indigo", "laranja", "marrom", "branco", "preto"];
