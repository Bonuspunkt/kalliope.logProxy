var http = require('http');

var test = require('tap').test;
var LogProxy = require('../lib/logProxy');

test('desc', function(t) {

  var server = http.createServer(function(req, res) {
    res.writeHead(200, { 
      'content-type': 'text/plain',
      'content-length': 2
    });
    res.end('hi');
  }).listen(40000, '127.0.0.1');

  var proxy = new LogProxy('127.0.0.1', 40000);
  proxy.on('done', function(log) {

    t.deepEqual(log, { 
      request: { 
        url: '/',
        headers: { 
          host: '127.0.0.1', 
          connection: 'keep-alive' 
        } 
      },
      response: { 
        statusCode: 200,
        headers: {
          'content-type': 'text/plain',
          'content-length': '2',
          'connection': 'keep-alive' 
        },
        data: 'hi' 
      } 
    });

    server.close();
    proxy.close();
    t.end();
  });
  proxy.listen(40001, '127.0.0.1');


  process.nextTick(function(){
    http.get({
      host: '127.0.0.1',
      port: 40001,
      headers: { 
        host: '127.0.0.1', 
        connection: 'keep-alive' 
      }
    });
  })
});
