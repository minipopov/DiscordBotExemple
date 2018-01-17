/*
*	Bot discord
*/
let ready = false;
const TOKEN = require('./private.js');
const Discord = require("discord.js");
const client = new Discord.Client();
client.on('ready', () => {
	ready = true;
	chanGeneral = client.channels.find("id", "317763543418011655")
});
client.on('error', (error) => {
	console.log(error)
})

client.login(TOKEN)
	.catch((error) => {
		console.dir(error)
		process.exit()
	});

/*
*	functionList is an array of list function
*/
functionList = []

// You should look BaseFnc
const BaseFnc = require('./BaseFnc')
const globalMessage = new BaseFnc("sendGlobal", 10)
globalMessage.setFloodProtection("perUser")
globalMessage.setCallback((params, steamID) => {
	// chanGeneral.send(params.text)
});

//Push new function
functionList.push(globalMessage)

/*
*	Webserver
*/
const http = require('http')
const url = require('url')
const serverRest = http.createServer()
serverRest.on('request', (request,response) => {
	
	if (request.url != '/favicon.ico') {
		let getArgs = url.parse(request.url, true).query
		let action = getArgs.action;
		if (Array.isArray(action)){
			action = action[0];
		}
		let steamID = getArgs.steamID;
		if (Array.isArray(steamID)){
			steamID = steamID[0];
		}
		let isCall = false

		delete getArgs.action;
		delete getArgs.steamID;

		if (steamID === undefined || steamID === "") {
			console.log("Try to call without steamID")
			response.end()
			return;
		}
		if (action === undefined || action === "") {
			console.log("Try to call without action")
			response.end()
			return;
		}
		for (var i = functionList.length - 1; i >= 0; i--) {
			item = functionList[i]
			if (action === item.name) {
				
				if(item.call(getArgs, steamID)){
					console.log("Called function named "+ action)
					response.end()
				}
				isCall = true
			}
		}
		if (!isCall) {
			console.log("Unfound function " + action + " called by " + steamID)
		}
	}
	response.end()
});
serverRest.listen(8080)
