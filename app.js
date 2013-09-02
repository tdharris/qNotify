/*
	Dependencies.
*/
var express = require('express');
var fs = require('fs');
var addNotify = require("./njs/addNotify");
var removeNotify = require('./njs/removeNotify');
var setops = require('setops');
var logIt = require('./njs/logIt');
var scheduler = require('node-schedule');
var exec = require('child_process').exec;

app = express();
STATIC_DIR = __dirname+'/public';

var options = {
  key: fs.readFileSync('./ssl/privatekey.pem'),
  cert: fs.readFileSync('./ssl/certificate.pem')
};

serverhttps = require('https').createServer(options, app);
	
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

// Redirect http (80) to https (443)
http = express();
http.get('*',function(req,res){  
    res.redirect('https://tharris7.lab.novell.com'+req.url)
});
 http.listen(80);

serverhttps.listen(443);
console.log(new Date()+' Express server is listening securely on port ' + '443');

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
