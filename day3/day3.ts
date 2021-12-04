import * as path from "https://deno.land/std/path/mod.ts";
const inputRaw = await Deno.readTextFile(path.fromFileUrl(import.meta.url).replace('.ts', '.txt'))
const input = inputRaw.split('\n').filter(Boolean)

const gamma = input.reduce<number[]>((total, current) => {
    // Add the next 1 or 0 into the accumulated value,
    // so [0, 1] + [1, 1] = [1, 2]
    return [...current].map((s, i) => parseInt(s, 10) + total[i])
    // Build an array of 0s based on the length a single piece of data
}, Array.from({ length: input[0].length }, () => 0))
    // if the average is + 0.5 then 1 wins
    .map(n => n / input.length >= 0.5 ? 1 : 0)
    .join('')

const epsilon = [...gamma]
    // Flip the digits, so [0,0,0,1] becomes [1,1,1,0]
    .map(n => Math.abs((parseInt(n, 10) - 1)))
    .join('')

// Convert to decimal and multiply
console.log('part1', parseInt(gamma, 2) * parseInt(epsilon, 2))

// I hated this one
const partB = (position = 1, unwantedKeys: Set<string> = new Set()) => {
    return input[0].split('')
    // Rotate the array so each row is now what was previously a column
    .map((_val, index) => input.map(row => parseInt(row[index], 10)))
    .reduce((input, current, index) => {
        // If we have only one number left, bail early (or just return continuously)
        if (Object.entries(input).length === 1) {
            return input
        }
        // Remove values that we previously determined were unwanted
        const currentTotal = current.filter((_, i) => !unwantedKeys.has(i.toString()))
        // Are we looking for a 1 or a 0 ?
        const wanted = (currentTotal.reduce((t, n) => {return t + n}, 0) / currentTotal.length) >= 0.5 ? position : 1 - position

        // Loop over each value and look for the numbers with the value we do not want
        Object.keys(input).filter(number => {
            return parseInt(input[parseInt(number, 10)].split('')[index], 10) !== wanted
            // Add unwanted values to keep track for later
        }).forEach(v => unwantedKeys.add(v))

        // Delete the numbers from the input set
        unwantedKeys.forEach(k => delete input[parseInt(k, 10)])
        return input
    }, {...input})
}

const oxygenGeneratorRating = partB(1)
const CO2ScrubberRating = partB(0)
// Convert to decimal and multiply
const total = parseInt(Object.values(oxygenGeneratorRating)[0].toString(), 2) * parseInt(Object.values(CO2ScrubberRating)[0].toString(), 2)
console.log('part2', total)
