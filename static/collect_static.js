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
    try { out["userAgent"] = navigator.userAgent; } catch { out["userAgent"] = null; }
    return fingerprint(out);
}
