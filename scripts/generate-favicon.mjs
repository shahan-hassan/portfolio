import fs from "fs";
import sharp from "sharp";

// Sleek lettermark "S" with video play/cut motif in Caldera palette: Obsidian #070607, Ember #fc5000, Sulfur #f5f28e
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#070607"/>
  <rect x="2" y="2" width="60" height="60" rx="12" fill="none" stroke="#27272a" stroke-width="1.5"/>
  <!-- Kinetic 'S' curve representing Shahan / cutting blade -->
  <path d="M44 21 C44 15 38 13 32 13 C22 13 18 18 18 24 C18 32 28 33 34 35 C42 38 46 41 46 47 C46 53 40 57 31 57 C21 57 17 51 17 45" fill="none" stroke="#fc5000" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Ember video play blade accent -->
  <circle cx="47" cy="15" r="3.5" fill="#f5f28e"/>
</svg>`;

async function buildIco() {
  const sizes = [16, 32, 48];
  const pngBuffers = [];
  for (const s of sizes) {
    const buf = await sharp(Buffer.from(svg)).resize(s, s).png().toBuffer();
    pngBuffers.push({ size: s, buf });
  }

  // Build ICO header (6 bytes)
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(count, 4);

  // Directory entries (16 bytes each)
  let offset = 6 + (16 * count);
  const dirEntries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.size === 256 ? 0 : item.size, 0); // width
    entry.writeUInt8(item.size === 256 ? 0 : item.size, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(item.buf.length, 8); // image data size
    entry.writeUInt32LE(offset, 12); // offset
    dirEntries.push(entry);
    offset += item.buf.length;
  }

  const icoBuffer = Buffer.concat([header, ...dirEntries, ...pngBuffers.map(p => p.buf)]);
  fs.writeFileSync("app/favicon.ico", icoBuffer);
  console.log("Successfully generated app/favicon.ico of size:", icoBuffer.length);
}

buildIco().catch(console.error);
