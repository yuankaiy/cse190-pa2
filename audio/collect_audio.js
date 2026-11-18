// CSE 190 -- Audio Fingerprinting
//
// Place your implementation in the three functions below.
// Do not rename the functions and do not change `collect()`.

async function audioSum(){
    // TODO: Implement an audio sum fingerprint.
    const context = new OfflineAudioContext(1, 44100, 44100);
    const oscillator = context.createOscillator();
    const compressor = context.createDynamicsCompressor();
    oscillator.connect(compressor);
    compressor.connect(context.destination);

    oscillator.start(0);
    const renderedBuffer = await context.startRendering();
    const data = renderedBuffer.getChannelData(0);
    let fpSum = 0;

    for (let i = 0; i < data.length; i++) {
        fpSum += Math.abs(data[i]); 
    }

    return fpSum
}

async function audioSumWithSimpleFarbling() {
    // TODO: Implement an audio sum fingerprint in the presence of simple farbling.

    const TRIALS = 100;

    let sum = 0;

    for(let i = 0; i < TRIALS; i++){
        sum += await audioSum();
    }

    return sum/TRIALS;
}

// EXTRA CREDIT (optional). Leave this as-is if you don't do the extra credit. 

async function audioSumWithComplexFarbling() {
    // TODO: Implement an audio sum fingerprint in the presence of complex farbling.

    const context = new OfflineAudioContext(1, 44100, 44100);
    const oscillator = context.createOscillator();
    const compressor = context.createDynamicsCompressor();

    oscillator.connect(compressor);
    compressor.connect(context.destination);
    
    oscillator.start(0);
    const renderedBuffer = await context.startRendering();
    const data = renderedBuffer.getChannelData(0);

    let farbleProofSum = 0;


    for (let i = 0; i < data.length; i++) {
        if (data[i] > 0) {
            farbleProofSum += 1;
        } else if (data[i] < 0) {
            farbleProofSum -= 1;
        }
    }

    return farbleProofSum;
}


// DO NOT MODIFY collect(). The grader calls it and reads exactly these keys.
export async function collect() {
    const out = {};
    try { out["audio_sum"] = await audioSum(); } catch { out["audio_sum"] = null; }
    try { out["audio_sum_simple_farbled"] = await audioSumWithSimpleFarbling(); } catch { out["audio_sum_simple_farbled"] = null; }
    try { out["audio_sum_complex_farbled"] = await audioSumWithComplexFarbling(); } catch { out["audio_sum_complex_farbled"] = null; }
    return out;
}
