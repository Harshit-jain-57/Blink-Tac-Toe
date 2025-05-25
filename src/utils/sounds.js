const placementSound = new Audio('/sounds/placement.mp3');
const winSound = new Audio('/sounds/win.mp3');
const vanishSound = new Audio('/sounds/vanish.mp3');

export const playPlacementSound = () => {
  placementSound.currentTime = 0;
  placementSound.play().catch(() => {});
};

export const playWinSound = () => {
  winSound.currentTime = 0;
  winSound.play().catch(() => {});
};

export const playVanishSound = () => {
  vanishSound.currentTime = 0;
  vanishSound.play().catch(() => {});
}; 