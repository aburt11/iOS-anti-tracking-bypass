/**
 * It overrides the default `document.cookie` getter and setter to store cookies in localStorage
 * instead of in the document
 * This should allow your applications/plugins/SDK's etc that rely on cookies and sessions to work
 * without any issues on iOS mobile devices and safari 
 * lol Apple.
 */
  function bypassiOSCookieBlocking() {
    this.cookieFix = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie')
      Object.defineProperty(document, 'cookie', {
        get: () => {
          let res = [];
          Object.keys(localStorage).forEach(function (key) {
            if (key.startsWith('cookie-')) {
              const item = JSON.parse(localStorage.getItem(key));
              if (item.expiry && new Date(item.expiry) < new Date()) {
                localStorage.removeItem(key);
              } else {
                res.push(key.replace('cookie-', '') + '=' + item.value);
              }
            }
          });
          return res.join('; ');
        },
        set: (val) => {
          var regex = new RegExp("([^=;]*)\\s*=\\s*([^;]*);(.*expires=([^;]+);)?");
          var matches = regex.exec(val);
          this.cookieFix.set.call(document, val);
          localStorage.setItem('cookie-' + matches[1], JSON.stringify({
            value: matches[2],
            expiry: matches[4]
          }));
        }
      });
    
  }
