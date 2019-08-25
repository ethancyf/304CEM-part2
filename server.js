var http = require('http');
var fs = require("fs");
var qs = require('querystring');

var MongoClient = require('mongodb').MongoClient;

var dbUrl = "mongodb://localhost:27017/";



http.createServer(function(request, response) {

if(request.url === "/"){
		console.log("Requested URL is url" +request.url);
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + request.url);
	}
    else if(request.url==="/signup"){      
        if (request.method === "POST") {
			formData = '';
			msg = '';
			return request.on('data', function(data) {
				formData += data;
				console.log(formData);
				return request.on('end', function() {
					var user;
					user = qs.parse(formData);
					msg = JSON.stringify(user);
					info=formData.split("&");  
					var a=[];
					for(i=0; i<info.length; i++){ 
						var d=info[i].split("=");  
						a[i]=d[1];
					}
					console.log("a0="+a[0]);
					console.log("a1="+a[1]);
					stringMsg = JSON.parse(msg);
					MongoClient.connect(dbUrl, function(err, db) {
						if (err) throw err;
						var dbo = db.db("mydb");
						var myobj = stringMsg;
						dbo.collection("userlist").findOne({"loginname":a[0]}, function(err, result) {
							if (err) throw err;
							console.log(result);
							if (result != null){
								console.log("User is existed");
								response.end("User is existed, register fail");
							} else {
								dbo.collection("userlist").insertOne(myobj, function(err, res) {
							if (err) throw err;
									console.log("1 document inserted");
									response.end("Register success");
								});
							}
							db.close();	
						});
					}); 
				});
			});
		} else {
			sendFileContent(response, "signup.html", "text/html");
		}      
	} else if(request.url==="/login"){
		if (request.method === "POST") {
			formData = '';
			msg = '';
			return request.on('data', function(data) {
				formData += data;
				console.log(formData);
				return request.on('end', function() {
					var user;
					user = qs.parse(formData);
					msg = JSON.stringify(user);
					info=formData.split("&");  
					var a=[];
					for(i=0; i<info.length; i++){ 
						var d=info[i].split("=");  
						a[i]=d[1];
					}
					console.log("a0="+a[0]);
					console.log("a1="+a[1]);
					MongoClient.connect(dbUrl, function(err, db) {
						if (err) throw err;
						var dbo = db.db("mydb");
						dbo.collection("banlist").findOne({"loginname":a[0]}, function(err, result) {
							if(result==null){
						dbo.collection("userlist").findOne({"loginname":a[0]}, function(err, result) {
							if (err) throw err;
							if( result != null){
								if (result.password == a[1]){
									console.log(result.password);
									console.log("success");
									response.end("success");
								} else {
									console.log("Wrong Password");
									response.end("The account or password is not correct.");
								}
							} else {
								console.log("no this one");
								response.end("The account or password is not correct.");
							}
						});
						}else{
							console.log("banned account");
							response.end("This account is banned.");
						}
						});
					});
				});
			});
		} else {
			sendFileContent(response, "index.html", "text/html");
		}        
		}  
	else if(request.url==="/changepassword"){
		if (request.method === "POST") {
			formData = '';
			msg = '';
			return request.on('data', function(data) {
				formData += data;
				console.log(formData);
				return request.on('end', function() {
					var user;
					user = qs.parse(formData);
					msg = JSON.stringify(user);
					info=formData.split("&");  
					var a=[];
					for(i=0; i<info.length; i++){ 
						var d=info[i].split("=");  
						a[i]=d[1];
					}
					console.log("a0="+a[0]);
					console.log("a1="+a[1]);
					
					MongoClient.connect(dbUrl, function(err, db) {
  					if (err) throw err;
						var dbo = db.db("mydb");
						var myquery = { loginname:a[0]};
						var newvalues = { $set: { loginname:a[0], password: a[1] } };
						dbo.collection("userlist").updateOne(myquery,newvalues, function(err, res) {
						if (err) throw err;
						console.log("1 document updated");
							response.end("password updated")
						db.close();
						});
					}); 
						
				});
			});
		} else {
			sendFileContent(response, "changepassword.html", "text/html");
		}        
		} 
	else if(request.url==="/getfav"){
		if (request.method === "POST") {
			console.log("test");
			formData = '';
			msg = '';
			return request.on('data', function(data) {
				formData += data;
				console.log(formData);
					return request.on('end', function() {
						var user;
						user = qs.parse(formData);
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						MongoClient.connect(url, function(err, db) {
							if (err) throw err;
							var dbo = db.db("mydb");
							var myobj = stringMsg;
							dbo.collection("farlist").find({myobj}).toArray(function(err, result) {
								if (err) throw err;
								console.log(result);
								response.end(result);
								db.close();
							});
						}); 
					});
			});
		} else {
			sendFileContent(response, "myfav.html", "text/html");
		}        
	} 
	else if(request.url==="/insertfav"){      
		if (request.method === "POST") {
			formData = '';
			msg = '';
			return request.on('data', function(data) {
				formData += data;
				console.log(formData);
				return request.on('end', function() {
					var user;
					user = qs.parse(formData);
					msg = JSON.stringify(user);//loginname=Ethan&colorset=#12345,#12345,#12345,#12345,#12345
					infotype=formData.split("&");  //infotype[0]:loginname=Ethan    infotype[1]:colorset=#12345,#12345,#12345,#12345,#12345
						var username=infotype[0].split(":");   //user[0]:loginname    user[1]:Ethan        
						var colorset=infotype[1].split(":");//colorset[0]:colorset     colorset[1]:#12345,#12345,#12345,#12345,#12345
					
				for(i=0; i<username.length; i++){ 
					var color=colorset[i].split(",");   //color[0]:#12345...
				}
					console.log("username="+username[1]);
					console.log("color0="+color[0]);
					console.log("color1="+color[1]);
					console.log("color2="+color[2]);
					console.log("color3="+color[3]);
					console.log("color4="+color[4]);
					//stringMsg = JSON.parse(msg);
					MongoClient.connect(dbUrl, function(err, db) {
						if (err) throw err;
						var dbo = db.db("mydb");
						var myobj = {loginname:username[1],color0:color[0],color1:color[1],color2:color[2],color3:color[3],color4:color[4]};
						console.log(myobj)
						dbo.collection("favlist").find(myobj).toArray( function(err, result) {
							if (err) throw err;
						
							console.log(result);
			
							if (result != ""){
								dbo.collection("favlist").deleteOne(myobj, function(err, res) {
									if (err) throw err;
									console.log("1 document deleted");
									response.end("delete");
								});
							} else {
								dbo.collection("favlist").insertOne(myobj, function(err, res) {
							if (err) throw err;
							console.log("1 document inserted");
									response.end("saved");
								});
							}
							db.close();	
						});
					}); 
				});
			});
		}	
	} 
	else if(request.url==="/getuserfav"){      
		if (request.method === "POST") {
			formData = '';
			msg = '';
			return request.on('data', function(data) {
				formData += data;
				return request.on('end', function() {
					var user;
					user = qs.parse(formData);
					msg = JSON.stringify(user);
					stringMsg = JSON.parse(msg);
					MongoClient.connect(dbUrl, function(err, db) {
						if (err) throw err;
						var dbo = db.db("mydb");
						var myobj = stringMsg;
						dbo.collection("favlist").find({}).toArray(function(err, result) {
							if (err) throw err;
							if(result != ""){
							console.log(result[0].color0);
							console.log(result[0].color1);
							console.log(result[0].color2);
							console.log(result[0].color3);
							console.log(result[0].color4);
								var getcolorset = [];
								
						
								for(i=0;i<result.length;i++){
									getcolorset[i] = {"color0":result[i].color0,"color1":result[i].color1,"color2":result[i].color2,"color3":result[i].color3,"color4":result[i].color4}
								}
								console.log(getcolorset);
								response.end(JSON.stringify(getcolorset));	
								}else{response.end("null")}
						});
					}); 
				});
			});
		}		else {
			sendFileContent(response, "myfav.html", "text/html");
		}    
	} 
	else if(request.url==="/delfav"){      
		if (request.method === "POST") {
			formData = '';
			msg = '';
			return request.on('data', function(data) {
				formData += data;
				console.log(formData);
				return request.on('end', function() {
					var user;
					infotype=formData.split("&");  //infotype[0]:loginname=Ethan    infotype[1]:colorset=#12345,#12345,#12345,#12345,#12345
						var username=infotype[0].split(":");   //user[0]:loginname    user[1]:Ethan        
						var colorset=infotype[1].split(":");//colorset[0]:colorset     colorset[1]:#12345,#12345,#12345,#12345,#12345
					
				for(i=0; i<username.length; i++){ 
					var color=colorset[i].split(",");   //color[0]:#12345...
				}
					console.log("username="+username[1]);
					console.log("color0="+color[0]);
					console.log("color1="+color[1]);
					console.log("color2="+color[2]);
					console.log("color3="+color[3]);
					console.log("color4="+color[4]);
					var myobj = {loginname:username[1],color0:color[0],color1:color[1],color2:color[2],color3:color[3],color4:color[4]};
					MongoClient.connect(dbUrl, function(err, db) {
						if (err) throw err;
						var dbo = db.db("mydb");
						dbo.collection("favlist").deleteOne(myobj, function(err, obj) {
							if (err) throw err;
							console.log("1 document deleted");
							response.end("deleted");
							db.close();
						});
					}); 
				});
			});
		} 
		else {
			sendFileContent(response, "myfav.html", "text/html");
		}      
	}	else if(request.url==="/user"){      
		if (request.method === "POST") {
			formData = '';
			msg = '';
			return request.on('data', function(data) {
				formData += data;
				return request.on('end', function() {
				
					MongoClient.connect(dbUrl, function(err, db) {
						if (err) throw err;
						var dbo = db.db("mydb");
						dbo.collection("userlist").find({}).toArray(function(err, result) {
							if (err) throw err;
							console.log(result);
							var count = Object.keys(result).length;
							response.end(JSON.stringify(count));
							db.close();
						});
					}); 
				});
			});
		} else {
			sendFileContent(response, "index.html", "text/html");
		}    
  
	} else if(request.url==="/bannednum"){      
		if (request.method === "POST") {
			formData = '';
			msg = '';
			return request.on('data', function(data) {
				formData += data;
				return request.on('end', function() {
				
					MongoClient.connect(dbUrl, function(err, db) {
						if (err) throw err;
						var dbo = db.db("mydb");
						dbo.collection("banlist").find({}).toArray(function(err, result) {
							if (err) throw err;
							console.log(result);
							var count = Object.keys(result).length;
							response.end(JSON.stringify(count));
							db.close();
						});
					}); 
				});
			});
		} else {
			sendFileContent(response, "admin.html", "text/html");
		} 
  
	}else if(request.url==="/banneduser"){      
		if (request.method === "POST") {
			formData = '';
			msg = '';
			return request.on('data', function(data) {
				formData += data;
				return request.on('end', function() {
					MongoClient.connect(dbUrl, function(err, db) {
						if (err) throw err;
						var dbo = db.db("mydb");
						dbo.collection("banlist").find({}).toArray(function(err, result) {
							if (err) throw err;
							console.log(result);
							response.end(JSON.stringify(result));
							db.close();
						});
					}); 
				});
			});
		} else {
			sendFileContent(response, "admin.html", "text/html");
		} 
  
	} else if(request.url==="/insertcolorset"){      
		if (request.method === "POST") {
			formData = '';
			msg = '';
			return request.on('data', function(data) {
				formData += data;
				console.log(formData);
				return request.on('end', function() { 
					var myobj = {color0:color[0],color1:color[1],color2:color[2],color3:color[3],color4:color[4]};
					MongoClient.connect(dbUrl, function(err, db) {
						if (err) throw err;
						var dbo = db.db("mydb");
						dbo.collection("favurl").upDate(myobj, function(err, obj) {
							if (err) throw err;
							console.log("1 document deleted");
							response.end("deleted");
							db.close();
						});
					}); 
				});
			});
		} 
		else {
			sendFileContent(response, "myfav.html", "text/html");
		}      
	}	
	
	else if(request.url==="/favurl"){
		if (request.method === "POST") {
			formData = '';
			msg = '';
			return request.on('data', function(data) {
				formData += data;
				return request.on('end', function() {
					
					MongoClient.connect(dbUrl, function(err, db) {
  					if (err) throw err;
						var dbo = db.db("mydb");
						dbo.collection("favurl").findOne({}, function(err, result) {
						if (err) throw err;
							var url = result.url;
							console.log(url);
							response.end(url);
						db.close();
						});
					}); 
						
				});
			});
		} else {
			sendFileContent(response, "changepassword.html", "text/html");
		}        
		} 
	
	else if(request.url==="/savefavurl"){
		if (request.method === "POST") {
			formData = '';
			msg = '';
			return request.on('data', function(data) {
				formData += data;
				console.log(formData);
				return request.on('end', function() {
					var user;
					user = qs.parse(formData);
					msg = JSON.stringify(user);
					url=formData.split("&");
					MongoClient.connect(dbUrl, function(err, db) {
  					if (err) throw err;
						var dbo = db.db("mydb");
						var myquery = { url:url[0]};
						var newvalues = { $set: { url:url[1]} };
						console.log("1:"+url[0]);
						console.log("2:"+url[1]);
						dbo.collection("favurl").updateOne(myquery,newvalues, function(err, res) {
						if (err) throw err;
						console.log("1 document updated");
							response.end("password updated")
						db.close();
						});
					}); 
						
				});
			});
		} else {
			sendFileContent(response, "changepassword.html", "text/html");
		}        
		} 
	else if(/^\/[a-zA-Z0-9\/]*.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
	else if(/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
	else if(/^\/[a-zA-Z0-9\/]*.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
	else if(/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
	else if(/^\/[a-zA-Z0-9\/-/][^.]*.mobirise$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/mobirise");
  	}
  	else if(/^\/[a-zA-Z0-9\/-/][^.]*.touch-swipe.min.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
  	}
  	else if(/^\/[a-zA-Z0-9\/-/][^.]*.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
  	else if(/^\/[a-zA-Z0-9\/-/][^.]*.min.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
	else if(/^\/[a-zA-Z0-9\/-/][^.]*.min.js.map$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/map");
	}
	else if(/^\/[a-zA-Z0-9\/-/][^.]*.css.map$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/map");
  	}
  	else if(/^\/[a-zA-Z0-9\/-/][^.]*.min.css.map$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/map");
  	}
	else if(/^\/[a-zA-Z0-9\/-/][^.]*.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
	else if(/^\/[a-zA-Z0-9\/-/][^.]*.min.css$/.test(request.url.toString())){
	  sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
	else if(/^\/[a-zA-Z0-9\/-/][^.]*.png$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/png");
	}
	else if(/^\/[a-zA-Z0-9\/-/][^.]*.jpg$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/jpg");
	}
	else if(/^\/[a-zA-Z0-9\/-/][^.]*.eot$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/eot");
  	}
  	else if(/^\/[a-zA-Z0-9\/-/][^.]*.svg$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/svg");
	}
	else if(/^\/[a-zA-Z0-9\/-/][^.]*.ttf$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/ttf");
	}
	else if(/^\/[a-zA-Z0-9\/-/][^.]*.woff$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/woff");
  	}
	else if(/^\/[a-zA-Z0-9\/-/][^.]*.woff2$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/woff2");
	}
	else if(/^\/[a-zA-Z0-9\/-/][^.]*.html$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/html");
 	 }
	else if(/^\/[a-zA-Z0-9\/-/][^.]*.ico$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/ico");
	}
	else if(/^\/[a-zA-Z0-9\/-/][^.]*.bundle.min.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/ico");
	}
	else if(/^\/[a-zA-Z0-9\/-/][^.]*.jquery.min$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/ico");
	}
 	 else if(/^\/[a-zA-Z0-9\/-/][^.]*.easing.min.js$/.test(request.url.toString())){
	  sendFileContent(response, request.url.toString().substring(1), "text/ico");
	 }
	else if(/^\/[a-zA-Z0-9\/-/][^.]*.agency.min$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/ico");
	}
	else if(/^\/[a-zA-Z0-9\/-/][^.]*.woff$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/ico");
	}
	else if(/^\/[a-zA-Z0-9\/-/][^.]*.woff2$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/ico");
	}
	else if(/^\/[a-zA-Z0-9\/-/][^.]*.ttf$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/ico");
	}
	else if(/^\/[a-zA-Z0-9\/-/][^.]*.bundle.min.js.map$/.test(request.url.toString())){
	  sendFileContent(response, request.url.toString().substring(1), "text/ico");
	}
	else{
		console.log("Requested URL is: " + request.url);
		response.end();
	}
}).listen(9999)

function sendFileContent(response, fileName, contentType){
	fs.readFile(fileName, function(err, data){
		if(err){
			response.writeHead(404);
			response.write("Not Found!");
		}
		else{
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
		}
		response.end();
	});
}