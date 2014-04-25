'use strict';
var retryConfig = require('./retryConfigOptions');
//takes arguments (hours, minutes, seconds) for the maximum elapsed time for retries
retryConfig.saveToFile(7,0,0);
console.log('retry configurations have been written to directory '+retryConfig.dirLogs);
