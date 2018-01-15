function FloodProtectionPerUser(t) {
	this.time = t * 1000
	this.table = {}
}

FloodProtectionPerUser.prototype.setDeltaTime = function(t) {
	this.time = t * 1000
};

FloodProtectionPerUser.prototype.couldExec = function(key) {
	if (this.table[key] === undefined) {
		return true;
	}else{
		if (this.table[key].getTime() + this.time > new Date()) {
			return false
		}else{
			return true	
		}
	}
};

FloodProtectionPerUser.prototype.refreshExecTime = function(key) {
	if (key === undefined) {
		console.log("no key set")
	}else{
		this.table[key] = new Date();
	}	
};


module.exports = FloodProtectionPerUser;