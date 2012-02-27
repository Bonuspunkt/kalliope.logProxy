var events = require('events');
var http = require('http');
var util = require('util');

var HttpLogger = require('./httpLogger');

var logger = new HttpLogger();

function LogProxy(host, port) {

  http.Server.call(this);

  this.on('request', function(cliReq, cliRes){

    var self = this;

    // should this line be here?
    cliReq.headers.host = host;

    var logEntry = { request: {}, response: {} };
    logger.applyRequest(cliReq, logEntry.request);

    var srvReq = http.request({
      host: host,
      port: port,
      path: cliReq.url,
      method: cliReq.method,
      headers: cliReq.headers
    });

    cliReq.pipe(srvReq);

    srvReq.on('response', function(srvRes) {
      
      logger.applyResponse(srvRes, logEntry.response);

      srvRes.on('end', function(){
        self.emit('done', logEntry);
      });

      cliRes.writeHead(srvRes.statusCode, srvRes.headers);
      srvRes.pipe(cliRes);

    });
  });

}

util.inherits(LogProxy, http.Server);

module.exports = LogProxy;