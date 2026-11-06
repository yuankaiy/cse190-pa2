// CSE 190 -- Audio Fingerprinting
//
// Place your implementation in the three functions below.
// Do not rename the functions and do not change `collect()`.

async function audioSum(){
    // TODO: Implement an audio sum fingerprint.
}

async function audioSumWithSimpleFarbling() {
    // TODO: Implement an audio sum fingerprint in the presence of simple farbling.
}

// EXTRA CREDIT (optional). Leave this as-is if you don't do the extra credit. 
async function audioSumWithComplexFarbling() {
    // TODO: Implement an audio sum fingerprint in the presence of complex farbling.
}


// DO NOT MODIFY collect(). The grader calls it and reads exactly these keys.
export async function collect() {
    const out = {};
    try { out["audio_sum"] = await audioSum(); } catch { out["audio_sum"] = null; }
    try { out["audio_sum_simple_farbled"] = await audioSumWithSimpleFarbling(); } catch { out["audio_sum_simple_farbled"] = null; }
    try { out["audio_sum_complex_farbled"] = await audioSumWithComplexFarbling(); } catch { out["audio_sum_complex_farbled"] = null; }
    return out;
}
