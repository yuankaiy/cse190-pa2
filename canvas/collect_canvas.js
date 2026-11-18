// CSE 190 -- Canvas Fingerprinting
//
// Place your implementation in the three functions below. 
// Do not rename the functions and do not change `collect()`.

import { hash, canon, FONTS } from "./helpers.js";

function textCanvasFingerprint() {
    // TODO: Implement a basic, text-based canvas fingerprint.

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx.font = '16px Arial';
    ctx.fillText('Cwm fjordbank glyphs vext quiz, 😃', 0, 20);
    const fp = canvas.toDataURL();

    return hash(fp);
}

function detectInstalledFonts() {
    // TODO: Implement a mechanism to identify which of the fonts in FONTS are
    // installed (see helpers.js)
    const inferredFonts = [];

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const testString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    ctx.font = "72px monospace";
    const baselineWidth = ctx.measureText(testString).width;
    for (const font of FONTS) {
        ctx.font = `72px ${font}, monospace`;
        const width = ctx.measureText(testString).width;
        if (width !== baselineWidth) {
            inferredFonts.push(font);
        }
    }

    return inferredFonts;
}

function graphicalCanvasFingerprint() {
    // TODO: Text-based canvas fingerprinting no longer works, so use the
    // canvas in a different way to build a browser fingerprint.
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx.fillRect(0, 0, 200, 200);

    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
    ctx.fill();

    ctx.globalCompositeOperation = "multiply";

    ctx.beginPath();
    ctx.arc(100, 100, 30, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(100, 100, 10, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
    ctx.fill();

    const fp = canvas.toDataURL();
    return hash(fp);
}

// ---------------------------------------------------------------------------
// DO NOT EDIT BELOW THIS LINE! 
// ---------------------------------------------------------------------------

export async function collect() {
    const out = {};
    try { out["part_one"]   = textCanvasFingerprint();      } catch { out["part_one"]   = null; }
    try { out["part_two"]   = detectInstalledFonts();       } catch { out["part_two"]   = null; }
    try { out["part_three"] = graphicalCanvasFingerprint(); } catch { out["part_three"] = null; }
    return out;
}
