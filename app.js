var express = require('express'),
	fs = require('fs'),
	addNotify = require("./njs/addNotify"),
	removeNotify = require('./njs/removeNotify'),
	setops = require('setops'),
	logIt = require('./njs/logIt'),
	scheduler = require('node-schedule'),
	exec = require('child_process').exec,
	logme = require('logme'),
	config = require('./config.json');

app = express();
STATIC_DIR = __dirname+'/public';

var options = {
  key: fs.readFileSync(config.privateKey),
  cert: fs.readFileSync(config.certificate)
};
	
	var userList = [];

	app.configure(function(){
	  app.use(express.static(STATIC_DIR));
	  app.use(express.bodyParser());
	});

	app.post('/addNotify', function(req, res){
		newRequest('[addNotify]', req);
		addNotify([req.body.email, req.body.txt], function(err) {
		if(err) return res.send("failure");
		var iconValue = 0;

			var user = [req.body.username];
			if (user) {
				userList = setops(user).union(userList);
				console.log(new Date()+" [sid:"+sid+"] [addNotify] [userList] current list: " + userList);
			}
			
			res.send("success");
		});	
	});

	app.post('/removeNotify', function(req, res){
		newRequest('[removeNotify]', req);
		removeNotify([req.body.email, req.body.txt], function(err) {
		if(err) return res.send("failure");
		userList = userList.filter(function(val) { return val != req.body.username; });
			logIt("[removeNotify] [userList] current list: " + userList);
			res.send("success");
		});
	});

	app.post('/getUsers', function(req, res){
		res.send(userList);
	});

function newRequest(type, req) {
	sid = Math.random().toString(36).substring(7);
	console.log(new Date()+" [sid:"+sid+"]", type, "New request from", req.ip+":", req.body.username, "-", req.body.email+",", req.body.txt);
};

process.on( 'SIGINT', function() {
  console.log(new Date()+" Express server shutting down.");
  process.exit()
});

// Listen on http:80
http = express();
http.listen(config.httpPort, function() {
	logme.info('qNotify is listening via http on ' + this.address().address + ':' + this.address().port + ' and redirecting to port ' + config.httpsPort);
});

// Redirect from http:80 --> https:443
http.get('*',function(req,res){  
    res.redirect('https://' + req.headers.host + req.url)
});

// Listen on https:443
serverhttps = require('https').createServer(options, app);
serverhttps.listen(config.httpsPort, function() {
	logme.info('qNotify is listening securely on ' + this.address().address + ':' + this.address().port);
});

scheduler.scheduleJob({hour: 21, minute: 0}, function(){
    exec('qmon -S EmailAddress=null', function(err, stdout, stderr) {
	    if (err) {
	    	console.log(new Date()+' [scheduler] [reset] exec error: ' + err);
	    }
	    else {
    	    userList = [];
    	    console.log(new Date()+' [scheduler] [reset] Cleared userList.');
	    }
	});

});
