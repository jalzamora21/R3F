export const moveTowards = (current, target, maxDelta) => {
  if (current < target) return Math.min(current + maxDelta, target);
  else if (current > target) return Math.max(current - maxDelta, target);
  else return current;
}