const floodProtection = require('./AntiFlood')
const floodProtectionPerUser = require('./AntiFloodPerUser')

/*
*	Constructor
*	@name => name of function
*	@time => couldown time
*/
function BaseFnc(name, time) {
	if (time === undefined) {
		time = 0
	}
	if (name === undefined) {
		throw new ExceptionUtilisateur("Undefined function name");
	}
	this.name = name
	this.time = time
	this.callback = undefined
	this.antiflood = new floodProtection(time);
}

/*
*	setFloodProtection*
*	@AntiFloodName => antiflood system perUser|global
*/
BaseFnc.prototype.setFloodProtection = function(AntiFloodName) {
	switch(AntiFloodName) {
	    case "perUser":
	    	this.antiflood = new floodProtectionPerUser(this.time)
	        break;
	    case "perCall":
	    	this.antiflood = new floodProtectionPerUser(this.time)
	        break;
	    default:
	        this.antiflood = new floodProtection(this.time);
	}
};

/*
*	setCallback*
*	@callback => set function to execute
*/
BaseFnc.prototype.setCallback = function(callback) {
	if (callback === undefined) {
		throw new ExceptionUtilisateur("Undefined callback function");
	}
	this.callback = callback
};

BaseFnc.prototype.call = function(param, key) {
	if (this.antiflood.couldExec(key)) {
		this.antiflood.refreshExecTime(key)
		this.callback(param)
		return true
	}
	return false
};

module.exports = BaseFnc;