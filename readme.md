# kalliope.logProxy
reverse proxy that logs all http calls _(be aware, WebSocket wont work, Comet and EventSource might not be logged like expected)_
##installation
if you planing on using the cli, install globally (`-g`)

    npm install https://github.com/Bonuspunkt/kalliope.logProxy/tarball/master

## usage as module

    var LogProxy = require('kalliope.logProxy');
    
    var proxy = new LogProxy('127.0.0.1', 80);
    proxy.on('done', function(log) {
      // log === {
      //   request: {
      //     url: '/',
      //     headers: {
      //       'user-agent': 'BROWSER'
      //     },
      //     data: [Buffer](http://nodejs.org/docs/latest/api/buffers.html)
      //   },
      //   response: {
      //     statusCode: '',
      //     headers: {
      //       'user-agent': 'BROWSER'
      //     },
      //     data: [Buffer](http://nodejs.org/docs/latest/api/buffers.html)
      //   }
      // }
    });
    proxy.listen(3000, '127.0.0.1');


## usage cli

    kalliope.logProxy [options]
    
      Options:
    
        -h, --help                      output usage information
        -sh, --serverHost <serverHost>  ip or hostname of the server to proxy [127.0.0.1]
        -sp, --serverPort <serverPort>  name or ip of the server [80]
        -ph, --proxyHost <proxyHost>    ip where the proxy is running  [127.0.0.1]
        -pp, --proxyPort <proxyHost>    port where the proxy is running [8080]

# (un)licence
    This is free and unencumbered software released into the public domain.

    Anyone is free to copy, modify, publish, use, compile, sell, or
    distribute this software, either in source code form or as a compiled
    binary, for any purpose, commercial or non-commercial, and by any
    means.

    In jurisdictions that recognize copyright laws, the author or authors
    of this software dedicate any and all copyright interest in the
    software to the public domain. We make this dedication for the benefit
    of the public at large and to the detriment of our heirs and
    successors. We intend this dedication to be an overt act of
    relinquishment in perpetuity of all present and future rights to this
    software under copyright law.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
    IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
    OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
    ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    OTHER DEALINGS IN THE SOFTWARE.

    For more information, please refer to <http://unlicense.org/>