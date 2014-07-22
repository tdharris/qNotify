var forever = require('forever-monitor'),
    logme = require('logme'),
    fs = require('fs'),
    path = require('path'),
    config = require('./config.json');

// Check for logrotate
var logRotateFile = path.resolve(__dirname, config.logDirectory, '*.log') + " { \n \
    compress \n \
    compresscmd /usr/bin/gzip \n \
    dateext \n \
    maxage 14 \n \
    rotate 99 \n \
    missingok \n \
    notifempty \n \
    size +4096k \n \
    create 640 root root \n \
}";

fs.writeFile('/etc/logrotate.d/qNotify', logRotateFile, function(err) {
    if (err) {
        logme.error('Problem creating logrotate file: /etc/logrotate.d/qNotify: ', err);
    } else {
        logme.info('Created /etc/logrotate.d/qNotify');
    }
});

var child = new(forever.Monitor)('app.js', {
    max: 3,
    silent: false,
    options: [],
    'logFile': config.logDirectory + '/forever.log', // Path to log output from forever process (when daemonized)
    'outFile': config.logDirectory + '/app.log', // Path to log output from child stdout
    'errFile': config.logDirectory + '/err.log' // Path to log output from child stderr
});

child.on('exit', function() {
    logme.info('app.js has exited after 3 restarts');
});

child.on('watch:restart', function(info) {
    logme.error('Restaring script because ' + info.file + ' changed');
});

child.on('restart', function() {
    logme.error('Forever restarting script for ' + child.times + ' time');
});

child.on('exit:code', function(code) {
    logme.error('Forever detected script exited with code ' + code);
});

process.on("SIGINT", function() {
    logme.warning('myNovellApp Shutting Down...');
    process.exit();
});

child.start();