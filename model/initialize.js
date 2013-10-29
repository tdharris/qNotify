var mongoose = require('mongoose');
var logIt = require('../njs/logIt');

var dbname = 'qNotify';
var uri = 'mongodb://localhost/' + dbname;
logIt('Running mongoose version %s', mongoose.version);
logIt('connecting to %s', uri);

// Connect to db
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
mongoose.connect(uri, function (err) {
		if (err) throw err;
})