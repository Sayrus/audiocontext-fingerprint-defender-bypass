setTimeout(function() {
  if (document.documentElement.dataset.acxscriptallow === "true") {
    alert("You are using AudioContext Fingerprint Defender !");
  } else {
    alert("You are not using AudioContext Fingerprint Defender !");
  }
}, 1000);
