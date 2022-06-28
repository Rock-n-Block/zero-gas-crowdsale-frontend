export const trigonometricMath = {
  toRadians(angle: number) {
    return angle * (Math.PI / 180);
  },
  toDegrees(radians: number) {
    return radians * (180 / Math.PI);
  },
};
