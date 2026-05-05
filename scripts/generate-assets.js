// Run from frontend/: node scripts/generate-assets.js
const Jimp = require('jimp-compact');
const path = require('path');
const fs   = require('fs');

const OUT = path.join(__dirname, '..', 'assets');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// ─── Brand colors ─────────────────────────────────────────────────────────────
const PURPLE       = 0x7C3AEDff;
const DARK_PURPLE  = 0x4C1D95ff;
const MID_PURPLE   = 0x6D28D9ff;
const LIGHT_PURPLE = 0xA78BFAff;
const WHITE        = 0xFFFFFFff;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function rgba(hex) {
  return {
    r: (hex >>> 24) & 0xff,
    g: (hex >>> 16) & 0xff,
    b: (hex >>> 8)  & 0xff,
  };
}

function blend(img, idx, cr, cg, cb, alpha) {
  if (alpha <= 0) return;
  const ea = img.bitmap.data[idx + 3] / 255;
  const oa = alpha + ea * (1 - alpha);
  img.bitmap.data[idx]     = Math.round((cr * alpha + img.bitmap.data[idx]     * ea * (1 - alpha)) / oa);
  img.bitmap.data[idx + 1] = Math.round((cg * alpha + img.bitmap.data[idx + 1] * ea * (1 - alpha)) / oa);
  img.bitmap.data[idx + 2] = Math.round((cb * alpha + img.bitmap.data[idx + 2] * ea * (1 - alpha)) / oa);
  img.bitmap.data[idx + 3] = Math.round(oa * 255);
}

function circle(img, cx, cy, r, hexCol) {
  const { r: cr, g: cg, b: cb } = rgba(hexCol);
  const x0 = Math.max(0, Math.floor(cx - r - 1));
  const y0 = Math.max(0, Math.floor(cy - r - 1));
  const x1 = Math.min(img.bitmap.width  - 1, Math.ceil(cx + r + 1));
  const y1 = Math.min(img.bitmap.height - 1, Math.ceil(cy + r + 1));
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const a = Math.max(0, Math.min(1, r + 0.5 - Math.hypot(x - cx, y - cy)));
      if (a > 0) blend(img, (y * img.bitmap.width + x) * 4, cr, cg, cb, a);
    }
  }
}

function roundRect(img, rx, ry, rw, rh, corner, hexCol) {
  const { r: cr, g: cg, b: cb } = rgba(hexCol);
  const x0 = Math.max(0, rx - 1), x1 = Math.min(img.bitmap.width  - 1, rx + rw + 1);
  const y0 = Math.max(0, ry - 1), y1 = Math.min(img.bitmap.height - 1, ry + rh + 1);
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      let dx = 0, dy = 0;
      if (x < rx + corner)       dx = rx + corner - x;
      else if (x > rx + rw - corner) dx = x - (rx + rw - corner);
      if (y < ry + corner)       dy = ry + corner - y;
      else if (y > ry + rh - corner) dy = y - (ry + rh - corner);
      let a;
      if (dx > 0 && dy > 0) {
        a = Math.max(0, Math.min(1, corner + 0.5 - Math.hypot(dx, dy)));
      } else if (x >= rx && x <= rx + rw && y >= ry && y <= ry + rh) {
        a = 1;
      } else {
        a = 0;
      }
      if (a > 0) blend(img, (y * img.bitmap.width + x) * 4, cr, cg, cb, a);
    }
  }
}

// Vertical gradient fill (modifies existing pixels)
function gradient(img, topHex, botHex) {
  const t = rgba(topHex), b = rgba(botHex);
  const H = img.bitmap.height, W = img.bitmap.width;
  for (let y = 0; y < H; y++) {
    const f = y / H;
    const gr = Math.round(t.r * (1-f) + b.r * f);
    const gg = Math.round(t.g * (1-f) + b.g * f);
    const gb = Math.round(t.b * (1-f) + b.b * f);
    for (let x = 0; x < W; x++) {
      const idx = (y * W + x) * 4;
      img.bitmap.data[idx]     = gr;
      img.bitmap.data[idx + 1] = gg;
      img.bitmap.data[idx + 2] = gb;
      img.bitmap.data[idx + 3] = 255;
    }
  }
}

// ─── Icon / adaptive-icon (1024×1024) ────────────────────────────────────────
async function buildIconLayers(img, S) {
  // S = image size (1024 for icon, same for adaptive)
  const cx = S / 2, cy = S / 2;

  // White soft card
  roundRect(img, 148, 148, 728, 728, 140, WHITE);

  // ── Camera body (purple rounded rect)
  roundRect(img, 268, 400, 488, 320, 40, PURPLE);

  // ── Camera bump (top of body)
  roundRect(img, 400, 358, 224, 68, 22, PURPLE);

  // ── Small flash / indicator dot (top-right of body)
  circle(img, 698, 424, 22, LIGHT_PURPLE);
  circle(img, 698, 424, 14, WHITE);

  // ── Lens: outer white ring (cut-out from body)
  const lx = cx, ly = cy + 60;
  circle(img, lx, ly, 108, WHITE);
  // middle purple ring
  circle(img, lx, ly, 88, MID_PURPLE);
  // inner glass
  circle(img, lx, ly, 64, WHITE);
  // deep iris
  circle(img, lx, ly, 44, DARK_PURPLE);
  // highlight
  circle(img, lx - 18, ly - 18, 14, 0xEDE9FEff);

  // ── Subtle "₫" hint: two horizontal strokes at top-left of card
  const sx = 230, sy = 228;
  roundRect(img, sx, sy,      120, 14, 7, 0xDDD6FEff);
  roundRect(img, sx, sy + 22, 120, 14, 7, 0xDDD6FEff);
}

async function createIcon() {
  const S = 1024;
  const img = await Jimp.create(S, S, PURPLE);
  gradient(img, PURPLE, DARK_PURPLE);
  await buildIconLayers(img, S);
  await img.writeAsync(path.join(OUT, 'icon.png'));
  console.log('✓ icon.png');
}

// Adaptive-icon: same design but full-bleed (Android clips to shape)
async function createAdaptiveIcon() {
  const S = 1024;
  const img = await Jimp.create(S, S, PURPLE);
  gradient(img, PURPLE, DARK_PURPLE);
  await buildIconLayers(img, S);
  await img.writeAsync(path.join(OUT, 'adaptive-icon.png'));
  console.log('✓ adaptive-icon.png');
}

// ─── Splash screen (1284×2778 — iPhone 14 Pro Max native) ───────────────────
async function createSplash() {
  const W = 1284, H = 2778;
  const img = await Jimp.create(W, H, PURPLE);
  gradient(img, PURPLE, DARK_PURPLE);

  const cx = W / 2, cy = H / 2;

  // ── Decorative background circles (corner accents, very subtle)
  circle(img, W + 80,   -80, 380, 0xA78BFA22);
  circle(img, W + 80,   -80, 260, 0xA78BFA18);
  circle(img, -80, H + 80,  340, 0xA78BFA1A);
  circle(img, -80, H + 80,  220, 0xA78BFA14);

  // ── Large white card logo (centered, scaled-up version of icon)
  const badge = 420;
  const bLeft = cx - badge/2;
  const bTop  = cy - badge/2 - 100;  // shifted slightly up

  roundRect(img, bLeft, bTop, badge, badge, 80, WHITE);

  // Camera body inside badge
  roundRect(img, bLeft + 80,        bTop + 150, badge - 160, 190, 28, PURPLE);
  roundRect(img, bLeft + badge/2 - 60, bTop + 118, 120, 46,  16, PURPLE);

  // Flash dot
  circle(img, bLeft + badge - 90, bTop + 172, 18, LIGHT_PURPLE);
  circle(img, bLeft + badge - 90, bTop + 172, 12, WHITE);

  // Lens concentric circles
  const lx = cx, ly = bTop + badge/2 + 50;
  circle(img, lx, ly, 76, WHITE);
  circle(img, lx, ly, 60, MID_PURPLE);
  circle(img, lx, ly, 42, WHITE);
  circle(img, lx, ly, 28, DARK_PURPLE);
  circle(img, lx - 14, ly - 14, 10, 0xEDE9FEff);

  // ₫ hint strokes on card (top-left)
  roundRect(img, bLeft + 26, bTop + 30, 80, 10, 5, 0xDDD6FEff);
  roundRect(img, bLeft + 26, bTop + 46, 80, 10, 5, 0xDDD6FEff);

  // ── Three dots below card (loading indicator style)
  const dotY = bTop + badge + 80;
  const dotR = 10;
  const dotGap = 52;
  circle(img, cx - dotGap, dotY, dotR, 0xFFFFFF90);
  circle(img, cx,           dotY, dotR, WHITE);
  circle(img, cx + dotGap, dotY, dotR, 0xFFFFFF90);

  await img.writeAsync(path.join(OUT, 'splash.png'));
  console.log('✓ splash.png');
}

// ─── Run ──────────────────────────────────────────────────────────────────────
(async () => {
  try {
    console.log('Generating assets...');
    await Promise.all([createIcon(), createAdaptiveIcon(), createSplash()]);
    console.log('\nAll assets written to frontend/assets/');
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
})();
