var mongoose = require('mongoose');
var logIt = require('../njs/logIt');
var initialize = require('./initialize');

// Methods
User.handleRequest = function updateUser(user) {
	User.findOneAndUpdate({ username: user.username }, { $set: user }, {}, function(err, user) {
	   	if (err != null) {
	   		done(err);
	   	}
	  	
	  	else { 
	  		user.save(function (err, savedUser, numberAffected) {
				if (err != null) {
					done(err);
				}
				else {
					logIt("Updated user: " + savedUser.username);
					done();
				}
			})
	  	}
	})
}

User.createUser = function(user) {
	var newUser = new User(user);
	newUser.save(function (err, savedUser, numberAffected) {
		if (err != null) { 
			done(err);
		} 
		else {
			logIt("Added user: " + savedUser.username);
			done();
		}
	});
}

User.removeUser = function removeUser(user) {
	User.remove({username: user.username}, function(err){
		if(err) {
			done(err);
		}
		else {
			logIt("Removed user: " + user.username);
			done();
		} 
	});
}

User.getUsers = function() {
	User.find({}).exec(function(err, result) { 
		if (err != null) { 
			done(err);
		} else {
			logIt("Request to retrieve users: "+result);
			return result;
		};
	});
}

User.clearUsers = function() {
	db.dropCollection("User", function(err, result) {
		if (err) {
			done(err);
		}
		else {
			logIt("userList has been cleared according to scheduler.");
			done();
		}
	})
}

function done(err) {
	if (err) {
		logIt("Error with database: " + err);
		mongoose.disconnect();
	}
		// mongoose.connection.db.dropDatabase(function() {
	else {
		mongoose.disconnect();
	}
  // })
};


// User.findUser = function findUser(user) {
// 	User.findOne({ username: user.username }, function(err, user) {
// 		logIt('\nRetrieve a single user:\n' + user);
// 		return user;
// 	});
// }



// Retrieve a single user
	// function findUser(user) {
	// 	User.findOne({ username: user.username }, function(err, user) {
	// 		console.log('\nRetrieve a single user:\n' + user);
	// 	});
	// }

// Test function: Request comes in to add a user.
	 // function createRequest(next) {
	 // 	var request = { username: 'user8', email: 'user8@domain.com' };
	 // 	console.log("-------- REQUEST ----------");
	 // 	console.log(request);
	 // 	next(request);
	 // }
	 	
	 // 	createRequest(function(request) {
	 // 		// console.log(request);
		//  	User.findOne({ username: request.username }, function(err, user) {
		// 		console.log("------ Finding: " + request.username + " ------");
		//     		if (err != null) {
		//     			done(err);
		//     		}
		//   	    	else if (user != null) {
		//   	    		console.log("User found: " + user.username);
		//   	    		updateUser(request);
		//   	    	}	  	    		
		//     		else {
		//     			createUser(request);    			
		//     		}
	 //       	});
	 // 	});



// Creating one user.
// function createUser(user) {
// 	console.log("Creating user: " + user.username);
// 	var newUser = new User(user);
// 	newUser.save(function (err, savedUser, numberAffected) {
// 		if (err != null) done(err);
// 		done("User has been created: " + savedUser.username);
// 	});
// };

// function removeUser(user) {
// 	User.remove({username: user.username}, function(err){
// 		if(err) throw err;
// 		else {
// 			logIt("User has been removed: " + user.username);
// 			done();
// 		} 
// 	});
// }

// function updateUser(user) {
// 	User.findOneAndUpdate({ username: user.username }, { $set: user }, {}, function(err, user) {
// 	   	if (err != null) {
// 	   		done(err);
// 	   	}
	  	
// 	  	else { 
// 	  		user.save(function (err, savedUser, numberAffected) {
// 				if (err != null) {
// 					done(err);
// 				}

// 				logIt("User has been updated: " + savedUser.username);
// 				done();
// 			})
// 	  	}
// 	})
// }
	
	// createUser({ username: 'tharris', email: 'tharris@novell.com' });
	// createUser({ username: 'snielson', email: 'snielson@novell.com' });

	// // Retrieve all users
	// 	User.find({}).exec(function(err, result) { 
	// 		if (!err) { 
	// 			console.log("\nRetrieve all users:\n"+result);
	// 		} else {
	// 			done(err);
	// 		};
	// 	});

	
		
	// // Update a specific user
 //    	User.findOneAndUpdate({ username: 'tharris' }, { $set: { txt: '5302001919@vtext.com' }}, {}, function(err, user) {
	//     	if (err) done(err);
	//     	else {
	//     		user.save(function(err) {
	//     			console.log('\nUpdate specific user:\n' + user);
	//     		});
	//     	}
	//     });



// else User.findOneAndUpdate({ username: request.username }, { $set: request }, {}, function(err, user) {
//    	if (err) done(err);
//   		user.save();
//   		console.log('\nUpdate specific user:\n' + user);
// }

function done(err, user, showUser) {
	if (err) { 
		logIt("Error with database: " + err);
		mongoose.disconnect();
	}
	showUser(user);
		// mongoose.connection.db.dropDatabase(function() {
		mongoose.disconnect();
  // })
};




//   	// User.create({ username: 'tharris', email: 'tharris@novell.com' }, function (err, user) {
//    //  if (err) return done(err);
    
//     // console.log("\nCreated new user:\n" + user);

//   // Retrieve a single user
// 		User.findOne({ username: 'tharris' }, function(err, user) {
// 			console.log('\nFinding a specific user:\n' + user);
// 		});

//     // Test Below
//     	// // Find/Update or Create
// 	    // 	userSchema.connection.findOne({username: request.username}, function(err, user) {
// 	    // 		// Create user if not already there
// 	    // 		if (!err && !user) {
// 	    // 			User.create({username: request.username, email: request.email, txt: request.txt}, function(err, user) {
// 	    // 				if (err) return done(err);
// 	    // 				console.log("User created: " + user);
// 	    // 			});
// 	    // 		}
// 	    // 		else if (!err) {
// 	    // 			// Otherwise, user was found, update entries

// 	    // 		}
// 	    // 	});

    // done(err);
// }

// function done(err) {
//   if (err) console.error(err);
//   	mongoose.connection.db.dropDatabase(function() {
//     mongoose.disconnect();
//   })
}