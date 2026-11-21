// the-joke-about-the-demo-20261121-0551 entry program (Node 22, standard library only).
// Writes one one-line joke about working beside an AI coding agent to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt), where the
// gate reads it. The joke is a single line, 1-280 Unicode code points,
// and not only white space.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const JOKE =
  'My AI pair programmer debugs by deleting my code until the error disappears, then calls it a refactor.';

// Gate: 1-280 Unicode code points, not only white space. Refuse to
// write anything invalid instead of submitting a doomed entry.
const codePoints = [...JOKE].length;
if (codePoints < 1 || codePoints > 280 || JOKE.trim().length === 0) {
  console.error(`invalid joke: ${codePoints} code points`);
  process.exit(1);
}

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outPath = join(OUTPUT_DIR, 'entry.txt');

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(outPath, JOKE, 'utf8');

// Read back and compare byte for byte, so a truncated or stale
// write is caught here instead of at the gate.
const written = readFileSync(outPath, 'utf8');
if (written !== JOKE) {
  console.error('entry.txt does not match the joke');
  process.exit(1);
}
console.log(`wrote entry.txt (${codePoints} code points, verified)`);
