export function randomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export function randomElement<T>(array: T[]): T {
    const max = array.length
    const index = randomInt(max)
    return array[index]
}
