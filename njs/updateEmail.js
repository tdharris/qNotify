var exec = require('child_process').exec;
var logIt = require('./logIt');

module.exports=function (emailAddress, done) {
	exec('qmon -S EmailAddress='+emailAddress, function(err, stdout, stderr) {
	    if (err) {
	    	logIt('[updateNotify] [putEmail] exec error:', err);
	    	return done(err);
	    }
	    logIt('[updateNotify] [putEmail] result:', emailAddress);
	    done(null);
	});
};
