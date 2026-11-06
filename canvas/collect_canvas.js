// CSE 190 -- Canvas Fingerprinting
//
// Place your implementation in the three functions below. 
// Do not rename the functions and do not change `collect()`.

import { hash, canon, FONTS } from "./helpers.js";

function textCanvasFingerprint() {
    // TODO: Implement a basic, text-based canvas fingerprint.
    const fp = "";
    return hash(fp);
}

function detectInstalledFonts() {
    // TODO: Implement a mechanism to identify which of the fonts in FONTS are
    // installed (see helpers.js)
    const inferredFonts = [];
    return inferredFonts;
}

function graphicalCanvasFingerprint() {
    // TODO: Text-based canvas fingerprinting no longer works, so use the
    // canvas in a different way to build a browser fingerprint.
    const fp = "";
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
