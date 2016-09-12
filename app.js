console.log("Starting Server");
// Online version Sep/12 
var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

//List of users
var users=[];
var socketIDs=[];

//Initialize an object to record what public chat rooms we have active
var publicRooms=[];
//By default, we have a general chat
publicRooms.push({name: "General", users:[]});
publicRooms.push({name: "Sports", users:[]});

//Initialize array to hold data on private (password protected) rooms
var privateRooms=[];

//Listen on port 80 or 5000

const PORT=process.env.PORT || 80;

app.listen(PORT);

function handler(req, res) {
	//If they request the css
	if(req.url.indexOf(".css")>-1){
    	//process.nextTick(function(){
    	console.log("css requested");
    	//Read it to them
    	fs.readFile(__dirname + '/CSS/clientCSS.css', function(cssErr, cssData){
        	//If there is an error, report it
        	if(cssErr) {
            	console.log("ERROR LOADING CSS: "+cssErr);
            	res.writeHead(500);
            	res.end('Error loading clientCSS.css');
        	} else{
            	//Otherwise, send it to the client
            	res.writeHead(200);
            	res.end(cssData);
        	}
   	});
	//If they request the javascript file
	} else if(req.url.indexOf(".js")>-1){
    	console.log("JavaScript requested");
    	//Read it to them
    	fs.readFile(__dirname + '/JavaScript/clientJS.js', function(jsErr, jsData){
         	//If there is an error, report it
        	if(jsErr) {
            	console.log("ERROR LOADING JAVASCRIPT: "+jsErr);
            	res.writeHead(500);
            	res.end('Error loading test.js');
        	} else{
            	res.writeHead(200);
            	res.end(jsData);
        	}
    	});
	//Default to giving them the client
	} else { //fs.readFile(__dirname + '/../chatServerRossi/chat_index.html',
    	fs.readFile(__dirname + '/client.html', function(err, data){
        	if(err) {
            	res.writeHead(500);
            	return res.end('Error loading client.html');
        	}
         	//200 is ok
        	res.writeHead(200, {'Content-Type': 'text/html; charset=ascii'});
        	res.end(data);
    	});
  }
} // END function handler(req, res)
/*****************************************************/
//Returns an aray with all the names of the public chat rooms
function getPublicRoomNames(){
    //The array that will be returned
    var toReturn=[];
    
    //Go through the list of public rooms
    for(var i=0;i<publicRooms.length;i++){
   	 //And add their names only to toReturn
   	 toReturn.push(publicRooms[i].name);
    }
    
    //Return toReturn
    return toReturn;
}

//Returns an aray with all the names of the users
function getUsers(){
    //The array that will be returned
    var toReturn=[];
    
    //Go through the list of public rooms
    for(var i=0;i<users.length;i++){
   	 //And add their names only to toReturn
   	 toReturn.push(users[i].username);
    }
    
    //Return toReturn
    return toReturn;
}
/*****************************************************/
//When a browser connects to the webpage
io.on('connection', function (socket){
	console.log("New connection");
	//Initiate the username variable
	var username="guest0";
    
    //Whether or not the name is taken
    var taken=true;
    
	//Do while to generate a random name and then check it's availability
	while(true==taken){
   	 //Generate a random name
    	username="guest" +Math.floor(Math.random()*100000);
   	 
   	 //Assume it isn't taken
   	 taken=false;
   	 
   	 //Go through the array of users and
   	 for(var i=0;i<users.length;i++){
   		 
   		 //If it is in use
   		 if(users[i].username==username){
   			 //Mark it as such and break out of the array
   			 taken=true;
   			 break;
   		 }
   	 }
   	 
    }
   	 
    console.log("Name: "+username);
    //Send the user their username and who else is online
    
    //Add them to the General chatroom's user list
    publicRooms[0].users.push(username);
    
    socket.emit('welcome', {name:username, others:getUsers(), rooms:getPublicRoomNames()});
    //Add the user to the list of the online users
    users.push({username:username, socket:socket.id});
    //Add the user's socket's id
    socketIDs.push(socket.id);
    console.log("users: "+users);
    //console.log("ids: "+socketIDs);
    
    //Join the General room
    socket.join("General");
    
	//2 is a new user, username is the selected username
    io.to("General").emit('messageFromServer', {type:"2", name:username, room:"General"} );
    
	/*****************************************************/
	//3 is a user leaves
	socket.on('disconnect', function () {
    	console.log("Disconnected user:"+username);
    	//Search for the name of the user that left
    	for(var i=0;i<users.length;i++){
     	//If it matches, we remove it
        	if(username==users[i].username){
   			 
   			 users.splice(i,1);
   			 socketIDs.splice(i,1);
   			 
   			 //Remove the user from the chat rooms
   			 //Start with public rooms
   			 for(var j=0;j<publicRooms.length;j++){
   				 //Search through each room's list of users
   				 for(var k=0;k<publicRooms[j].users.length;k++){
   					 //If there is a match
   					 if(username==publicRooms[j].users[k]){
   						 //Remove it
   						 publicRooms[j].users.splice(k,1);
   					 }
   				 }
   			 }
   			 
   			 //Next do private rooms
   			 for(var j=0;j<privateRooms.length;j++){
   				 //Search through each room's list of users
   				 for(var k=0;k<privateRooms[j].users.length;k++){
   					 //If there is a match
   					 if(username==privateRooms[j].users[k]){
   						 //Remove it
   						 privateRooms[j].users.splice(k,1);
   					 }
   				 }
   			 }
   			 
   			 /*
             	//Replace it with the user at the end of the list
             	users[i]=users[users.length-1];
             	users.pop()
            	 
             	//Repeat for the socket IDs
             	socketIDs[i]=socketIDs[socketIDs.length-1];
             	socketIDs.pop();
   			  */
   			  break;
        	}
    	}
    	//Emit the username aong with the signal
    	io.sockets.emit("messageFromServer", {type:"3", user:username});
	});
	/*****************************************************/
	//Unused event handler
	socket.on('my other event', function (data) {
    	console.log(data);
	});
	/*****************************************************/
	//When there is a message to the server from our chat
	socket.on('messageToServer', function (data) {
    	//Log it
    	console.log("Received: "+JSON.stringify(data) );
    	//And send it to the clients io.sockets.emit is ALL sockets
    	//socket.emit is for the current client only
    	io.to(data["room"]).emit('messageFromServer', { type:"0", sender:username, message:data["message"], room:data["room"] });
	});
    
	/*****************************************************/
	//When a user changes their username
	socket.on('newName', function(data){
    	//Log the name
    	console.log("New name attempt: "+username+" -> "+data["updatedName"]);
    	var oldUsername=username;  
    	//If the desired name is not already taken
    	//(That is to say, not found in the array of usernames of current users)
   	 
   	 //Index of the username;-1 means it is not taken
   	 var index=-1;
   	 
   	 //Search through the array looking for it
   	 for(var i=0;i<users.length;i++){
   		 
   		 //IF we find it
   		 if(users[i].username==data["updatedName"]){
   			 index=i;//Record the location
   			 break;    //And break out of the loop
   		 }
   	 }
   	 
   	 //If it is not found
    	if(-1==index){
        	//Log that it was a success
        	console.log("Successful: "+username+" -> "+data["updatedName"]);
        	//Update the list of users
        	//Search for the old username
        	for(var i=0;i<users.length;i++){
            	//When it is found
            	if(username==users[i].username){
                	//Update it
                	users[i].username=data["updatedName"];
                	break; //And exit the loop
            	}
        	}
        	//Update the (local) username
        	username=data["updatedName"];
        	//And send the response to the user
        	socket.emit('messageFromServer', {type:"1", result:"yes", updatedName:username} );
        	//io.sockets.emit sends a message to ALL THE USERS
        	io.sockets.emit('messageFromServer', {type:"4", oldName:oldUsername, newName:username} );
   		 
   	 //If it was found, report an error
    	}else{
        	console.log("Not successful: "+username+" -> "+data["updatedName"]);
        	//And send the response to the user
        	socket.emit('messageFromServer', {type:"1", result:"no", reason:"Name is already taken."} );
    	}
  	});
	/*****************************************************/
	//When a user tries to join/create a new chat room
	socket.on('newChatRoom', function(data){
    	console.log("New chat room message: "+JSON.stringify(data));
   	 //console.log("Existing rooms: "+getPublicRoomNames());
   	 
   	 //Get the data
    	var room=data["room"];
    	var newChatUser=data["user"];
   	 
   	 //Initialize the index variable
    	var index=-1;
   	 
   	 //If there is no password, we search the public rooms
   	 if(""==data["password"] || null==data["password"]){
   		 for(var i=0;i<publicRooms.length;i++){
   			 //If the room is found
   			 if(publicRooms[i].name==room){
   				 //Record the index it is at
   				 index=i;
   				 break; //And break out of the loop
   			 }
   		 }
   	 //Otherwise, search the private rooms
   	 } else {
   		 for(var i=0;i<privateRooms.length;i++){
   			 //If the room is found
   			 if(privateRooms[i].name==room){
   				 //Record the index it is at
   				 index=i;
   				 break; //And break out of the loop
   			 }
   		 }
   	 }
   	 
    	//If the room was not found (i.e. if it does not exist)
    	if(-1==index){
        	console.log("Creating chatroom "+data["name"]);
        	var newRoom={
   			 name:room,
   			 users:newChatUser
        	};
        	publicRooms.push(newRoom);
        	//If it was found, we add users to it
   	 } else {
   		 console.log("Joining "+data["room"]);
   		 console.log("publicRooms[i]: "+JSON.stringify(publicRooms[index]));
   		 //Add the user to the list of users
   		 publicRooms[index].users.push(newChatUser);
   			 
   		 //Join the room
   		 //socket.join(data["name"]);
   	 }
    	//Join the chat
    	socket.join(room);
	});
    
	/*****************************************************/
	//When we get a new private message
	socket.on('newPrivateMessage', function(data){
    	console.log("New private message");
    	//Who the private message is sent to
    	var receiver=data["user"];
    	//And we get the index in the username list;
    	//This will be used to get the socket id
    	var index=-1;
   	 
   	 //Go through the list of users
   	 for(var i=0;i<users.length;i++){
   		 //If we find the user
   		 if(receiver==users[i].username){
   			 //Record the index
   			 index=i;
   			 break; //And break out of the loop
   		 }
   	 }   	 
   	 
    	//If not found, we send an error back
    	if(-1==index){
        	console.log("ERROR: user "+receiver+" not found.");
        	socket.emit("errorMessage", {msg:"ERROR: user "+receiver+" not found."});
    	}else{
   		 
   		 //USers may not send messages to themselves
   		 if(socket.id==socketIDs[index]){
   			 socket.emit("errorMessage", {msg:"ERROR: cannot send messages to yourself."});
   		 }
   		 
        	//Get the client's id
        	var senderIndex=socketIDs.indexOf(socket.id);
        	//Get the client's username based on the id
        	var originator=users[senderIndex].username;
    	 
        	//The object to be sent to the client
        	//Contains the private message and who the  sender/receiver are
        	var responseObject={
            	recipient:receiver,
            	sender:originator,
            	message:data["message"]
        	};
        	//Sends the responseObject to the client
        	console.log("Sending to "+socketIDs[index]+" "+receiver);
        	socket.to(socketIDs[index]).emit("newPrivateMessage", responseObject);
        	//console.log("Sending to "+socketIDs[senderIndex]+" "+originator);       	 
        	//socket.to(socketIDs[senderIndex]).emit("newPrivateMessage", responseObject);       	 

    	}
	});
    
	/*********************************/
	/*** ADMIN/DEBUGGING FUNCTIONS ***/
	/*********************************/
	 
	//Prints all the users
	socket.on('adminPrintUsers', function(data){
    	console.log("Printing Users:\n"+chatrooms[0].users);
	});
 
}); // END  io.on('connection', function (socket){
/*---------------------------------------------------------------------------------*/




