import * as path from "https://deno.land/std/path/mod.ts";
const inputRaw = await Deno.readTextFile(path.fromFileUrl(import.meta.url).replace('.ts', '.txt'))
const input = inputRaw.split('\n').filter(Boolean).map((s) => parseInt(s, 10))

const part1 = input.reduce<number>((tally, current, index) => {
    if ((input[index + 1] - current) > 0) {
        tally++
    }
    return tally
}, 0)
console.log('part1', part1)

const sum3 = (slice: number[]) => slice && slice.reduce((prev, current) => {return prev + current}, 0)
const part2 = input.reduce<number>((tally, _next, index) => {
    const current = sum3(input.slice(index, index + 3))
    const next = sum3(input.slice(index + 1, index + 4))
    if (next - current > 0) {
        tally++
    }
    return tally
}, 0)
console.log('part2', part2)
