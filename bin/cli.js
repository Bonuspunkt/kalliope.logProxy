#!/usr/bin/env node
var program = require('commander');
var LogProxy = require('../lib/logProxy');

program
  .option('-sh, --serverHost <serverHost>', 
          'ip or hostname of the server to proxy [127.0.0.1]', '127.0.0.1')
  .option('-sp, --serverPort <serverPort>', 'name or ip of the server [80]', parseInt, 80)

  .option('-ph, --proxyHost <proxyHost>', 
          'ip where the proxy is running  [127.0.0.1]', '127.0.0.1')
  .option('-pp, --proxyPort <proxyHost>', 
          'port where the proxy is running [8080]', parseInt, 8080)
  .parse(process.argv);


var proxy = new LogProxy(program.serverHost, program.serverPort);

proxy.on('done', function(log){
  console.log(log);
});


proxy.listen(program.proxyPort, program.proxyHost);

console.log(
  'proxying', program.serverHost + ':' + program.serverPort,
  'to', program.proxyHost + ':' + program.proxyPort);
