// DO NOT EDIT

// Dumb hash -- not cryptographically secure but good enough for us
function hash(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h.toString(16).padStart(8, "0");
}

// Canonicalizes outputs for all students
function canon(v) {
    if (v === null || typeof v !== "object")
        return typeof v === "number" ? Number(v.toFixed(6)) : v;
    if (Array.isArray(v)) return v.map(canon);
    return Object.fromEntries(Object.keys(v).sort().map(k => [k, canon(v[k])]));
}

// Canonicalizes the feature list and hashes it. 
function fingerprint(out) {
    const canonical = JSON.stringify(canon(out));
    try { window.__FP_FEATURES__ = canonical; } catch {}
    return hash(canonical);
}

export { hash, canon, fingerprint };
