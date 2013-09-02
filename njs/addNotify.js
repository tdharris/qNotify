var sys = require('sys');
var setops = require('setops');
var getEmail = require('./getEmail');
var logIt = require('./logIt');
var updateEmail = require('./updateEmail');

module.exports=function addNotify(values, done) {
	getEmail(function (err, result) {
		if (err) return logIt('[addNotify] [getEmail] exec error:', err);
		logIt('[addNotify] [getEmail] currentEmail from qmon:', result);
		values = values.filter(Boolean);
		result = result.split(',');
		logIt('[addNotify] [newEmail] appending:', values.join(','));
		result = setops(result).union(values);
		result = result.filter(Boolean);
		result = result.join(',');
		updateEmail(result, done);
	});
};
