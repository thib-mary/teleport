/**
 * Returns a px value equal to the argument * our base unit of 4
 *
 * @param coefficient - The amount to multiply the base value by
 * @returns a string px value.
 *
 * @example
 * Returns "12" for `3`; "96" for `8`:
 * ```ts
 * console.log(makePx('3'));
 * console.log(makePx('8'));
 * ```
 *
 **/
export const makePx = (coefficient = 1): string => `${coefficient * 4}px`;
