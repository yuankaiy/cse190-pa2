// DO NOT EDIT

// Dumb hash
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

// Candidate families probed in part two. 
const FONTS = [
  "Arial", "Arial Black", "Comic Sans MS", "Courier New", "Georgia",
  "Impact", "Times New Roman", "Trebuchet MS", "Verdana", "Webdings",
  "Segoe UI", "Calibri", "Cambria", "Candara", "Consolas", "Constantia",
  "Corbel", "Franklin Gothic Medium", "Lucida Console", "MS Gothic", "Sylfaen", "Helvetica Neue", "Avenir", "Menlo", "Monaco", "Optima", "Palatino",
  "Skia", "Zapfino", "Chalkduster", "Hoefler Text", "DejaVu Sans", "DejaVu Serif", "Liberation Sans", "Liberation Serif",
  "Ubuntu", "Cantarell", "FreeSans", "Nimbus Roman", "Roboto", "Noto Sans", "Noto Serif", "Droid Sans", "Wingdings", "Bookman Old Style", "Gill Sans", "Baskerville",
  "Century Gothic", "MT Extra", "ZiggyZiggyBomb", "Blu8b", "Nosiree", "CSE190Probe"
];

export { hash, canon, FONTS};
