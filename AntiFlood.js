function FloodProtection(t) {
	this.time = t * 1000
	this.lastExecTime = undefined
}

FloodProtection.prototype.setDeltaTime = function(t) {
	this.time = t * 1000
};

FloodProtection.prototype.couldExec = function() {
	if (this.lastExecTime === undefined) {
		return true;
	}else{
		if (this.lastExecTime.getTime() + this.time > new Date()) {
			return false
		}else{
			return true	
		}
	}
};

FloodProtection.prototype.refreshExecTime = function(t) {
	this.lastExecTime = new Date();
};


module.exports = FloodProtection;