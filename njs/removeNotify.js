var sys = require('sys');
var getEmail = require('./getEmail');
var logIt = require('./logIt');
var updateEmail = require('./updateEmail');

module.exports=function removeNotify(remove, done) {
	var exec = require('child_process').exec;

	function removeEmail(values) {
		remove = remove.filter(Boolean);
		values = values.filter(function (value) {
			return !~remove.indexOf(value);
		});

		logIt('[removeNotify] [removeValues] keeping:', values.join(','));
		// TO-DO: exec stuff
		updateEmail(values.join(','), done);
	}

	getEmail(function(err, result) {
		removeEmail(result.split(','));
	});
}
