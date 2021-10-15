export function getAngleDifference(angle1: float, angle2: float): float {
  const subtractedAngle = angle1 - angle2;
  return ((subtractedAngle + 180) % 360) - 180;
}

export function getCircleDiscretizedPoints(
  centerPos: Vector,
  distance: int,
  numPoints: int,
): Vector[] {
  const positions: Vector[] = [];
  const leftOfCenter = Vector(-distance, 0);
  for (let i = 0; i < numPoints; i++) {
    const rotatedPosition = leftOfCenter.Rotated((i * 360) / numPoints);
    const positionFromCenter = centerPos.add(rotatedPosition);
    positions.push(positionFromCenter);
  }

  return positions;
}

export function isEven(num: int): boolean {
  return (num & 1) === 0;
}

export function isOdd(num: int): boolean {
  return (num & 1) === 1;
}

/**
 * If rounding fails, this function returns 0.
 * From: http://lua-users.org/wiki/SimpleRound
 *
 * @param num The number to round.
 * @param numDecimalPlaces Default is 0.
 */
export function round(num: float, numDecimalPlaces = 0): float {
  const roundedNum = tonumber(string.format(`%.${numDecimalPlaces}f`, num));
  return roundedNum === undefined ? 0 : roundedNum;
}

export function tanh(x: number): number {
  return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
}

/**
 * @returns 1 if n is positive, -1 if n is negative, or 0 if n is 0.
 */
export function sign(n: number): int {
  if (n > 0) {
    return 1;
  }

  if (n < 0) {
    return -1;
  }

  return 0;
}
