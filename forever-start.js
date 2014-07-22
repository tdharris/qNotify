var forever = require('forever-monitor'),
    logme = require('logme'),
    fs = require('fs'),
    path = require('path'),
    config = require('./config.json');

// Check for logrotate
function ensureExists(path, mask, cb) {
    if (typeof mask == 'function') { // allow the `mask` parameter to be optional
        cb = mask;
        mask = 0777;
    }
    fs.mkdir(path, mask, function(err) {
        if (err) {
            if (err.code == 'EEXIST') cb(null); // ignore the error if the folder already exists
            else cb(err); // something else went wrong
        } else cb(null); // successfully created folder
    });
}

var logDirectory = path.resolve(__dirname, config.logDirectory);
ensureExists(logDirectory, 0744, function(err) {
    if (err) logme.error('Problem creating log directory: ', logDirectory);
});

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

var createLogRotate = function() {
    fs.writeFile('/etc/logrotate.d/qNotify', logRotateFile, function(err) {
        if (err) {
            logme.error('Problem creating logrotate file: /etc/logrotate.d/qNotify: ', err);
        } else {
            logme.info('Configured /etc/logrotate.d/qNotify');
        }
    });
}

fs.readFile('/etc/logrotate.d/qNotify', 'utf8', function(err,data){
    if (err) createLogRotate();
    else {
        if (data.indexOf(logDirectory) == -1) {
            // Log directory change, reconfigure logrotate file:
            createLogRotate();
        }
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