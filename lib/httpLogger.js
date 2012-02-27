var fs = require('fs');

function joinBuffers(bufferStore){

  if (!bufferStore.length) { return new Buffer(0); }

  var length = bufferStore
    .map(function(b) { return b.length; })
    .reduce(function(previous, current) { return previous + current; });

  var result = new Buffer(length);
  var startPos = 0;
  bufferStore.forEach(function(buffer){
    buffer.copy(result, startPos);
    startPos += buffer.length;
  });
  return result;
}


function Logger(){};

Logger.prototype.applyRequest = function(req, logObj) {
  logObj.url = req.url;
  logObj.headers = req.headers;

  var reqData = [];
  req.on('data', function(data){ reqData.push(data); });
  req.on('end', function() { 
    var data = joinBuffers(reqData).toString();
    if (data) {
      logObj.data = data; 
    }
  });
};

Logger.prototype.applyResponse = function(res, logObj) {
  logObj.statusCode = res.statusCode;
  logObj.headers = res.headers;

  var resData = [];
  res.on('data', function(data){ resData.push(data); });
  res.on('end', function() { 
    var data = joinBuffers(resData).toString();
    if (data) {
      logObj.data = data;
    }
  });
}

module.exports = Logger;