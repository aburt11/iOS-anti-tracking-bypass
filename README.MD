# CookieMonsta.js

# iOS/safari anti-tracking bypass

As of iOS 14, apple tries to block trackers by disabling cookies in browser session. this can be annoying as many SDK's and extensions use cookies for session persistance (telemetry like datadog, google analytics 360 etc.)

# How does it work?

this little function simply overrides the getter and setter for window.cookies, and instead routes the storage and reading of cookies to localStorage :)

## Installation

Just copy and paste, then invoke the function in index.js
good luck, have fun!
