let getMonth = (month) =>  month == 0? 11: month -1;

Date.prototype.minusDay = function(){
    this.setDate(this.getDate() - 1);
}

Date.prototype.withMonth = function(month){
	this.setMonth(getMonth(month));
	return this;
}

Date.prototype.withDay = function(day){
	this.setDate(day);
	return this;
}

Date.prototype.adjustYear = function(month){
	let currentDate = new Date();
	if(currentDate.getMonth() < getMonth(month)){
		this.setFullYear(this.getFullYear() - 1);
	}
	return this;
}