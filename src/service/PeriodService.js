let PeriodManager = (function(){
	
	let Period = function(id, start, end){
		this.id = id; 
		this.start = start; 
		this.end = end;
	}

	let periods = [];

	let dateExp = "$2-$1-$3";
	let expD1 = data => data.replace(/[\s\S]*(\d{2})\/(\d{2})\/(\d{4})[\s\S]*\d{2}\/\d{2}\/\d{4}/, dateExp);
	let expD2 = data => data.replace(/[\s\S]*\d{2}\/\d{2}\/\d{4}[\s\S]*(\d{2})\/(\d{2})\/(\d{4})/, dateExp);

	let init = function(){
		let periodSelect = document.querySelector(".separatorPeriodo + div select")

		if(periodSelect){		

			for(let i = 0; i < periodSelect.length; i++){
				let option = periodSelect.options[i];
				let id = option.value

				let dateStr = option.textContent.trim();
			    let d1 = new Date(expD1(dateStr));
			    let d2 = new Date(expD2(dateStr));
			    periods.push(new Period(id,d1,d2));
			}

			periods.sort((i, i2) => i2.id - i.id)
		}
	}

	let getPeriod = function(date) { 

		for(let i = 0; i < periods.length; i++) {
			if(periods[i].start <= date && date <= periods[i].end){
				return periods[i].id;
			}
		}

		return periods[0].id;
	}

	init();

	return {
		getPeriod: getPeriod
	}

})();