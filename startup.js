var logRotate = require('./njs/logRotate'),
    config = require('./config.json'),
    startStopDaemon = require('start-stop-daemon'),
    startApp = require('./app');

logRotate();

startStopDaemon({
	'max': 0,
    'append': true,
    'outFile': config.logDirectory + '/app.log',
    'errFile': config.logDirectory + '/err.log'
}, function() {
    startApp();
});