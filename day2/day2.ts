import * as path from "https://deno.land/std/path/mod.ts";
const inputRaw = await Deno.readTextFile(path.fromFileUrl(import.meta.url).replace('.ts', '.txt'))
const input = inputRaw.split('\n')

console.log(input)
