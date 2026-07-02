// One-off asset pipeline: derives the favicon / app icons / OG image / logo
// master from the official SAU crest (public/img/10.jpg). Run with:
//   node scripts/gen-brand-assets.mjs
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";

// Minimal ICO encoder — modern ICO files can embed PNG data directly per
// image entry (supported by all major browsers + Windows since Vista), so no
// BMP re-encoding or extra dependency is needed.
function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const dir = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;
  pngBuffers.forEach(({ size, data }, i) => {
    const entry = i * 16;
    dir.writeUInt8(size === 256 ? 0 : size, entry + 0); // width
    dir.writeUInt8(size === 256 ? 0 : size, entry + 1); // height
    dir.writeUInt8(0, entry + 2); // color palette
    dir.writeUInt8(0, entry + 3); // reserved
    dir.writeUInt16LE(1, entry + 4); // planes
    dir.writeUInt16LE(32, entry + 6); // bit depth
    dir.writeUInt32LE(data.length, entry + 8); // size of image data
    dir.writeUInt32LE(offset, entry + 12); // offset of image data
    offset += data.length;
  });

  return Buffer.concat([header, dir, ...pngBuffers.map((p) => p.data)]);
}

const SRC = "public/img/10.jpg";
const NAVY = "#1c3357"; // matches --color-brand-900 in app/globals.css

mkdirSync("public/logo", { recursive: true });

async function trimmedCrest() {
  return sharp(SRC).trim({ background: "#ffffff", threshold: 12 }).toBuffer();
}

async function run() {
  const trimmed = await trimmedCrest();
  const meta = await sharp(trimmed).metadata();
  const side = Math.max(meta.width, meta.height);

  // Square master on a white card, small padding — used by <Logo> and any
  // future crest badge. This is the single source of truth for the mark.
  const master = await sharp(trimmed)
    .resize({ width: Math.round(side * 0.94), height: Math.round(side * 0.94), fit: "inside" })
    .extend({
      top: Math.round(side * 0.03), bottom: Math.round(side * 0.03),
      left: Math.round(side * 0.03), right: Math.round(side * 0.03),
      background: "#ffffff",
    })
    .png({ compressionLevel: 9 })
    .toBuffer();

  const png = (size) => sharp(master).resize(size, size).ensureAlpha().png({ compressionLevel: 9 });

  await png(1024).toFile("public/logo/crest-1024.png");
  await png(512).toFile("public/logo/crest-512.png");
  await png(192).toFile("public/logo/crest-192.png");

  // App Router auto-detected icons — 256px is plenty crisp for a favicon
  // while keeping the served file small; 180px is Apple's recommended size.
  await png(256).toFile("app/icon.png");
  await png(180).toFile("app/apple-icon.png");

  // Classic /favicon.ico — bots and older browsers request this path
  // directly regardless of the <link rel="icon"> tag Next.js injects.
  const icoSizes = [16, 32, 48];
  const icoPngs = await Promise.all(
    icoSizes.map(async (size) => ({
      size,
      data: await png(size).toBuffer(),
    }))
  );
  writeFileSync("app/favicon.ico", buildIco(icoPngs));

  // Manifest icons (Android / PWA install prompts).
  await png(192).toFile("public/logo/android-chrome-192x192.png");
  await png(512).toFile("public/logo/android-chrome-512x512.png");

  // Open Graph / Twitter card — 1200x630, navy field, crest + wordmark.
  const ogWidth = 1200;
  const ogHeight = 630;
  const crestSize = 340;
  const svgText = `
    <svg width="${ogWidth}" height="${ogHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#14243d"/>
          <stop offset="100%" stop-color="${NAVY}"/>
        </linearGradient>
      </defs>
      <rect width="${ogWidth}" height="${ogHeight}" fill="url(#bg)"/>
      <text x="${ogWidth / 2}" y="500" font-family="Georgia, 'Times New Roman', serif" font-size="54" font-weight="600" fill="#ffffff" text-anchor="middle">St Alessandro University Institute</text>
      <text x="${ogWidth / 2}" y="548" font-family="Arial, sans-serif" font-size="24" letter-spacing="2" fill="#d9c48a" text-anchor="middle">BONABERI-DOUALA · CAMEROON</text>
    </svg>`;

  const crestForOg = await png(crestSize).toBuffer();

  await sharp({
    create: { width: ogWidth, height: ogHeight, channels: 4, background: NAVY },
  })
    .composite([
      { input: Buffer.from(svgText), top: 0, left: 0 },
      { input: crestForOg, top: 80, left: Math.round((ogWidth - crestSize) / 2) },
    ])
    .png({ compressionLevel: 9 })
    .toFile("app/opengraph-image.png");

  console.log("Brand assets generated.");
}

run();
