import * as path from "https://deno.land/std/path/mod.ts";
const inputRaw = await Deno.readTextFile(path.fromFileUrl(import.meta.url).replace('.ts', '.txt'))
const input = inputRaw.split('\n').filter(Boolean)

const a = input.reduce((previous, current) => {
    const [direction, distance] = current.split(' ')
    const movement = direction === 'up' ? -1 : 1
    return [
        ['up', 'down'].includes(direction) ? movement * parseInt(distance, 10) + previous[0] : previous[0],
        direction === 'forward' ? parseInt(distance, 10) + previous[1] : previous[1],
    ]
}, [0, 0])
// [depth, horizontal]
console.log('part1', a[0] * a[1])

const b = input.reduce((previous, current) => {
    const [direction, distance] = current.split(' ')
    const movement = direction === 'up' ? -1 : 1
    return [
        // DEPTH If going forward, the depth increases by the AIM * distance
        direction === 'forward' ? (parseInt(distance, 10) * previous[2]) + previous[0] : previous[0],
        // HORIZONTAL: If going forward, the horizontal position increases by the distance
        direction === 'forward' ? parseInt(distance, 10) + previous[1] : previous[1],
        // AIM: If going up or down, the aim increases by the distance
        ['up', 'down'].includes(direction) ? movement * parseInt(distance, 10) + previous[2] : previous[2],
    ]
}, [0, 0, 0])
// [depth, horizontal, aim]
console.log('part2', b[0] * b[1])
