# AudioContext Fingerprint Defender Bypass

Bypass the protection given by the AudioContext Fingerprint Defender add-on.

## Content Security Policy

Fully block the add-on using a simple CSP Header

### Usage

To run this example, you need NodeJS (or a webserver able to serve content with
the Content-Security-Policy header)
```console
$ npm install
$ node serve-csp.js
$ # Navigate to localhost:8000
```

Navigate to [localhost:8000](http://localhost:8000/csp.html).
You can now use Incognito Mode or refresh the page, your fingerprint will stay
the same.

### What's happening ?

To work, AudioContext Fingerprint Defender appends a script to the web.
Unfortunately, this script gets blocked by CSP:
```
Content Security Policy: The page’s settings blocked the loading of a resource at inline (“script-src”). inject.js:74:25
Content Security Policy: The page’s settings blocked the loading of a resource at inline (“script-src”). inject.js:122:38
```

This means that the whole add-on gets "disabled" by the Content Security Policy.

### Credits

All fingerprinting code was taken from: [ AudioContext Fingerprint Test Page](https://audiofingerprint.openwpm.com/)

## IFrame

Fingerprint inside an iframe by manually adding the `acxscriptallow` header.

WIP

## Detection

Verify if a user has the add-on enabled

### Usage

To run this example, simply serve the HTML page. This can be done using Python
http.server:
```console
$ make detection
```

Navigate to [localhost:8000](http://localhost:8000/). An alert tells you if your
are using the add-on.

### What's happening ?

For some reason, AudioContext Fingerprint Defender deciced to use an attribute
to later check if it has been executed successfully. This attribute can be used
by any script on the page including `detect.js`.
