/**
 * Checks if value is within the given range inclusively
 */
export function inRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
}

/**
 * Generates a random integer within the given range inclusively
 */
export function randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}