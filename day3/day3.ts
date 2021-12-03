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
