var sys = require('sys');
var exec = require('child_process').exec;

module.exports=function getEmail(next) {
	exec('qmon -s | grep -i EmailAddress| cut -d "=" -f2', function(err, stdout, stderr) {
		// console.log(arguments);
		if (err) return next(err);

		currentEmail = stdout.toString().replace(/[\n\r]/g, '');
		// stdout.toString().replace(/^EmailAddress="(.+)"/m, '$1');
	    next(null, currentEmail);
	});
};
