import GameObject from "./gameObject";
import Mouse from "./mouse";

export function collisionDetection(
  first: GameObject | Mouse,
  second: GameObject | Mouse
) {
  if (
    first.x >= second.x + second.width ||
    second.x >= first.x + first.width ||
    first.y >= second.y + second.height ||
    second.y >= first.y + first.height
  ) {
    return false;
  }
  return true;
}

export function randomNumberInRange(a: number, b: number) {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return Math.random() * (max - min) + min;
}

export function calculateDistance(first: GameObject, second: GameObject) {
  const deltaX = Math.abs(first.x - second.x);
  const deltaY = Math.abs(first.y - second.y);
  return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
}
