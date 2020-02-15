var pxi_output;
var pxi_full_buffer;
function set_result(result, id) {
  document.getElementById("result").textContent = result;
}


function run_pxi_fp() {
try {
  if (context = new(window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 44100, 44100), !context) {
    set_result("no_fp", "pxi_result");
    pxi_output = 0;
  }

  // Create oscillator
  pxi_oscillator = context.createOscillator();
  pxi_oscillator.type = "triangle";
  pxi_oscillator.frequency.value = 1e4;

  // Create and configure compressor
  pxi_compressor = context.createDynamicsCompressor();
  pxi_compressor.threshold && (pxi_compressor.threshold.value = -50);
  pxi_compressor.knee && (pxi_compressor.knee.value = 40);
  pxi_compressor.ratio && (pxi_compressor.ratio.value = 12);
  pxi_compressor.reduction && (pxi_compressor.reduction.value = -20);
  pxi_compressor.attack && (pxi_compressor.attack.value = 0);
  pxi_compressor.release && (pxi_compressor.release.value = .25);

  // Connect nodes
  pxi_oscillator.connect(pxi_compressor);
  pxi_compressor.connect(context.destination);

  // Start audio processing
  pxi_oscillator.start(0);
  context.startRendering();
  context.oncomplete = function(evnt) {
    pxi_output = 0;
    var sha1 = CryptoJS.algo.SHA1.create();
    for (var i = 0; i < evnt.renderedBuffer.length; i++) {
        sha1.update(evnt.renderedBuffer.getChannelData(0)[i].toString());
    }
    hash = sha1.finalize();
    pxi_full_buffer_hash = hash.toString(CryptoJS.enc.Hex);
    set_result(pxi_full_buffer_hash, "pxi_full_buffer_result");
    console.log(pxi_full_buffer_hash);
    pxi_compressor.disconnect();
  }
} catch (u) {
    pxi_output = 0;
    set_result("no_fp", "pxi_result");
  }
}

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === "complete") {
        document.getElementById("fingerprint").addEventListener('click', run_pxi_fp);
    }
});
