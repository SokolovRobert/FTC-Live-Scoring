var MongoClient = require('mongodb').MongoClient,
    settings = require('./config.js'),
    Guid = require('Guid');

var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
var exports = module.exports = {};

//Create the collection
MongoClient.connect(fullMongoUrl)
    .then(function(db) {
        return db.createCollection('score');
    });

MongoClient.connect(fullMongoUrl)
    .then(function(db) {
        var myLogin = db.collection("user");

        exports.onLoad = /// UPDATE ME MAKE TABLE, INSERT ISNTEAD OF UPDATE

        exports.setScore = function(num){
            if(num==1){
                return myLogin.updateOne({ $set: { "profile.redCorScore": 1}});    
            }
            return false;
        }

        exports.getScore = function(num){
            if(num==1){
                var ret = myLogin.find({currentSessionId : sessionID}).toArray();
                console.log("-~-~-"+ret);
            }
            return ret;
        }

        function updatefname(sessionID, fname){
        	return myLogin.updateOne({currentSessionId: sessionID}, { $set: { "profile.firstName": fname}});
        }

        function updatelname(sessionID, lname){
			return myLogin.updateOne({currentSessionId: sessionID}, { $set: { "profile.lastName": lname}});
        }

        function updatehob(sessionID, hob){
			return myLogin.updateOne({currentSessionId: sessionID}, { $set: { "profile.hobby": hob}});
        }

        function updatepname(sessionID, pname){
			return myLogin.updateOne({currentSessionId: sessionID}, { $set: { "profile.petName": pname}});
        }

        exports.updateProfile = function(sessionID, fname, lname, hob, pname){
        	if(!sessionID && !fname && !lname && !hob && !pname){
        		return Promise.reject("Error finding proper account to update. Please try clearing cookies.");
        	}
        	return myLogin.count({currentSessionId: sessionID}).then(function(count){
        		if(count == 1){
        			if(fname){
        				updatefname(sessionID, fname);
        			}
        			if(lname){
        				updatelname(sessionID, lname);
        			}
        			if(hob){
        				updatehob(sessionID, hob);
        			}
        			if(pname){
        				updatepname(sessionID, pname);
        			}
        			return 1;
        		}else{
        			return Promise.reject("Error finding proper account to update. Please try clearing cookies.");
        		}
        	});
        };

        exports.checkUser = function(user, pass){
        	if(!user || !pass){
        		return Promise.rejet("No username or password provided");
        	}
        	return myLogin.count({username: user, encryptedPassword: pass}).then(function(count){
        		if(count == 1){
        			return myLogin.find({username: user, encryptedPassword: pass}).toArray().then(function(userInfo){
        				var userID = userInfo[0]._id;
        				var now = new Date();
						var newSessionID = "_"+userID+now;
						newSessionID = newSessionID.replace(/[^a-zA-Z0-9]/g, '');
						//console.log(userID+"-~-~-"+newSessionID);
		                return myLogin.updateOne({ username: user }, { $set: {currentSessionId: newSessionID}}).then(function() {
	                		return newSessionID;
	                	});
        			});
        		}else{
        			return Promise.reject("Username and password do not match");
        		}
        	});
        };

        exports.findUserBySession = function(id) {
        	//console.log("~~~~~~~~~~~~~~~~~~~~~~~"+id);
        	if(!id){
        		return Promise.rejet("No sessionID provided");
        	}
            return myLogin.count({ currentSessionId: id}).then(function(count) {
            	//console.log("~~~~~~~~~~~~~~~~~~~~~~~"+count);

            	// There is a user with the session Id
            	if(count == 1){
	                return myLogin.find({currentSessionId : id}).toArray();

	            // There is no user with the session Id
            	}else{
            		return Promise.reject("Not a valid (or duplicate) sessionID");
            	}
            });
        };


        exports.removeSession = function (sessionID){
        	if(sessionID){
        		return myLogin.count({ currentSessionId: sessionID}).then(function(count) {
        			if(count == 1){
        				var newID = Math.round((Math.pow(36, 128 + 1) - Math.random() * Math.pow(36, 128))).toString(36).slice(1);
        				console.log("Scrambled id = "+newID);
						return myLogin.updateOne({ currentSessionId: sessionID }, { $set: {currentSessionId: newID}});
        			}else{
        				return Promise.reject("Not a valid (or duplicate) sessionID");
        			}
        		});
        	}else{
        		return Promise.reject("No sessionID entered");
        	}
        }

        exports.createUser = function(user, pass) {
            if (!user || !pass) {
                return Promise.reject("field not provided");
            }

            return myLogin.count({ username: user}).then(function(count) {
            	//console.log("@@@@@@@"+count);
            	if(!count){
	                //console.log("%%%%%%%%%%%" + count);
	                var newID = Guid.create().toString();
	                //console.log("!!!!!!!!!!!!!!!"+newID);
	                return myLogin.insertOne({ _id: newID , username: user, encryptedPassword: pass,
	                 currentSessionId: newID,
	             		profile: {firstName:"Not set yet", lastName:"Not set yet", hobby:"Not set yet", petName:"Not set yet"}}).then(function(newDoc) {
	                	return newID;
	                });
            	}else{
            		//console.log("$$$$$$$$" + count);
            		return Promise.reject("User already exists");
            	}
            });
        };

        exports.getAllusers = function() {
            // write the body here
            // return a promise that resolves to all the users in your collection.
            return myLogin.find().toArray();
        }
    });