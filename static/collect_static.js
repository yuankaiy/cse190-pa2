import { canon, fingerprint } from "./helpers.js";

export async function collect() {
    // TODO: Fill in this function with static features to help you discern
    // different browsers from one another.
    //
    // For each feature you identify, add it to the "out" struct, similarly to
    // the userAgent feature below. Wrap every lookup in try/catch: a property
    // that does not exist in one browser must not crash the whole fingerprint.
    //
    // Your fingerprint must be STATIC and DETERMINISTIC. Collecting anything
    // that changes between runs of the same browser (timings, Math.random,
    // Date.now) will score zero, even though it makes every instance look unique.
    //
    // DO NOT MODIFY the last line in this function (fingerprint(out)); this is
    // necessary to ensure your fingerprints are being properly compared to one
    // another.
    
    const out = {};

    /** NAVIGATOR API */
    try { out["userAgent"] = navigator.userAgent; } catch { out["userAgent"] = null; }
    try { out["language"] = navigator.language; } catch { out["language"] = null; }
    try { out["languages"] = navigator.languages; } catch { out["languages"] = null; }
    try { out["plugins"] = navigator.plugins; } catch { out["plugins"] = null; }
    try { out["platform"] = navigator.platform; } catch { out["platform"] = null; }
    try { out["vendor"] = navigator.vendor; } catch { out["vendor"] = null; }
    try { out["hardwareConcurrency"] = navigator.hardwareConcurrency; } catch { out["hardwareConcurrency"] = null; }

    /** SCREEN API */
    // Physical screen size the browser reports
    try { out["screenWidth"] = screen.width; } catch { out["screenWidth"] = null; }
    try { out["screenHeight"] = screen.height; } catch { out["screenHeight"] = null; }

    // Space left after OS taskbars/docks (may equal width/height in headless browsers)
    try { out["availWidth"] = screen.availWidth; } catch { out["availWidth"] = null; }
    try { out["availHeight"] = screen.availHeight; } catch { out["availHeight"] = null; }

    // Color depth (usually 24, sometimes 30 or 32)
    try { out["colorDepth"] = screen.colorDepth; } catch { out["colorDepth"] = null; }
    try { out["pixelDepth"] = screen.pixelDepth; } catch { out["pixelDepth"] = null; }

    // Orientation: type is e.g. "landscape-primary" or "portrait-primary"
    try { out["orientation"] = screen.orientation.type; } catch { out["orientation"] = null; }
    try { out["orientationAngle"] = screen.orientation.angle; } catch { out["orientationAngle"] = null; }


    
    return fingerprint(out);
}
