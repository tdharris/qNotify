var config = require('../config.json'),
	logme = require('logme'),
    fs = require('fs'),
    path = require('path'),
    pjson = require('../package.json');

var	logDirectory = path.resolve(process.cwd(), config.logDirectory);

module.exports = function() {

	// Ensure logDirectory exists
	ensureExists(logDirectory, 0744, function(err) {
	    if (err) logme.error('Problem creating log directory: ', logDirectory, err);
	});
	
	// Verify logrotate file exists or hasn't been reconfigured
	fs.readFile('/etc/logrotate.d/'+pjson.name, 'utf8', function(err,data){
	    if (err) createLogRotate();
	    else if (data.indexOf(logDirectory) == -1) {
            // Log directory change, reconfigure logrotate file:
            createLogRotate();
	    }

	});

};

var ensureExists = function(path, mask, cb) {
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
};

var createLogRotate = function() {

// Create log rotate file
var logRotateFile = path.resolve(logDirectory, '*.log') + " { \n \
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

    fs.writeFile('/etc/logrotate.d/'+pjson.name, logRotateFile, function(err) {
        if (err) {
            logme.error('Problem creating logrotate file: /etc/logrotate.d/'+pjson.name+': ', err);
        } else {
            logme.info('Configured /etc/logrotate.d/'+pjson.name);
        }
    });

};