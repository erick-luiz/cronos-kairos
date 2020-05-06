let Order = (function(){

	let orders = [];

	let getOrders = function(callback){
	    
	    let currentYear = new Date().getFullYear();

        var url = '/Dimep/PedidosJustificativas/Index/';
        var url_atual = window.location.pathname;
        if(url_atual){
            var idUser = url_atual.substring(url_atual.lastIndexOf("/") + 1);
            url += idUser;
        }
        
        var xhttp = new XMLHttpRequest();
	    
	    xhttp.onreadystatechange = function() {
	        if (this.readyState == 4 && this.status == 200) {
	        	callback(this.responseText);
	        }
	    };
	    xhttp.open("GET", url, true);
	    xhttp.send();
	}

	buildSimpleDay = (element) => {
		
		let tds = element.querySelectorAll("td");
		let fullDate = tds[0].innerText.trim();
		let fullHour = tds[1].innerText.trim();

		let day = fullDate.replace(/[\s\S]*(\d{2})\/\d{2}\/\d{4}/, "$1");
		let month = fullDate.replace(/[\s\S]*\d{2}\/(\d{2})\/\d{4}/, "$1");
		let year = fullDate.replace(/[\s\S]*\d{2}\/\d{2}\/(\d{4})/, "$1");
		let hour = fullHour.replace(/(\d{2}):\d{2}/, "$1");
		let minute = fullHour.replace(/\d{2}:(\d{2})/, "$1");

		return {
		   baseDate: new Date(year, month - 1, day, 0, 0),
		   date: new Date(year, month - 1, day, hour, minute),
		   day: day, 
		   month: month,
		   year: year,
		   hour: hour,
		   minute: minute
		}
    }

	getOrders((response) => {
		let dias = $(response).find('#TabSituacaoPedido1 tr');
		for(i = 1; i < dias.length; i++){
			orders.push(buildSimpleDay(dias[i]));
        }
        if(orders.length == 0) {
            console.warn("Não encontramos seus pedidos");
        }
	});

	let getOdersForDay = (date) => {
		let out = [];
		for(i = 0; i < orders.length; i++){
			if(orders[i].baseDate.toDateString() == date.toDateString()) {
				out.push(orders[i].date);
			}
		}
		return out;
	}

    return {getOdersForDay, orders}

})();