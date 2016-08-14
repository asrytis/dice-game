import { DiceScore } from './game-room';

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

/**
 * Roll the specified amount of regular 6-sided dice
 */
export function rollDice(numberOfDice: number): DiceScore {
    const dice = Array(numberOfDice).fill(1).map(() => randomInRange(1, 6));
    const value = dice.reduce((sum, value) => sum + value, 0);

    return { dice, value };
}
