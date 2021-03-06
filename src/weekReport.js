let days = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sabado"];
let avaliableMonth = new Date().getMonth() + 1;

var getEntrada = function (element) {
    return element.querySelector('.TimeINVisualizacao') ? element.querySelector('.TimeINVisualizacao').textContent : "";
}

var getAlmoco = function(element){
    return element.querySelector('.TimeOUTVisualizacao') ? element.querySelector('.TimeOUTVisualizacao').textContent : "";
}

var getVoltaAlmoco = function (element) {
    return element.querySelectorAll('.TimeINVisualizacao')[1] ? element.querySelectorAll('.TimeINVisualizacao')[1].textContent : "";
}

var getSaida = function(element) {
    return element.querySelectorAll('.TimeOUTVisualizacao')[1] ? element.querySelectorAll('.TimeOUTVisualizacao')[1].textContent : "";
}

var getData = function(element) {
    return element.querySelectorAll('input')[5] ? element.querySelectorAll('input')[5].value : "";
}

var getAccumulationValue = function(d1, d2){
    var initialTime = d1.getHours()*60 + d1.getMinutes();
    var finalTime = d2.getHours()*60 + d2.getMinutes();
    var out = finalTime - initialTime;
    return out > 0? out : 0;
}

let formatHour = (date) => formatNumber(date.getHours()) + ":" + formatNumber(date.getMinutes());

let returnDay = function (element){
    var data = getData(element).replace(/(\d{2})_(\d{2})_(\d{4})/,"$2/$1/$3");

    var start = new Date(data + " " + getEntrada(element));
    var end = new Date(data + " " + getAlmoco(element));
    var start1 = new Date(data + " " + getVoltaAlmoco(element));
    var end1 = new Date(data + " " + getSaida(element));
    var h = (getAccumulationValue(start, end) + getAccumulationValue(start1, end1))/60;
    var m = (getAccumulationValue(start, end) + getAccumulationValue(start1, end1)) % 60;

    return {
        day:data.replace(/\d{2}\/(\d{2})\/\d{4}/,"$1"),
        month:data.replace(/(\d{2})\/\d{2}\/\d{4}/,"$1"),
        formatedEN:data.replace(/(\d{2})\/(\d{2})\/(\d{4})/,"$3-$1-$2"),
        formatedPT:data.replace(/(\d{2})\/(\d{2})\/(\d{4})/,"$2/$1/$3"),
        date: data,
        dayOfWeek: start.getDay(),
        s:formatHour(start) ,
        e:formatHour(end),
        s1:formatHour(start1),
        e1:formatHour(end1),
        accumulation: getAccumulationValue(start, end) + getAccumulationValue(start1, end1)
    }
}

document.querySelectorAll("div[id^=ApontID]")

let getDayNeedTime = () => 8 * 60 + 48; 
let getWeekNeedTime = (n) => getDayNeedTime() * n;
let getColor = (time) => time < getWeekNeedTime(5)? 'red':'#0bb50bd4';

let getFormatedTr = (day) => `<tr><td>${days[day.dayOfWeek]}</td>
			<td>${day.formatedPT}</td><td>${day.s}</td>
			<td>${day.e}</td><td>${day.s1}</td>
			<td>${day.e1}</td><td>${getHour(day.accumulation)}</td></tr>`;

let getDefaultTr = (day) => `<tr><td>${days[day.dayOfWeek]}</td>
			<td>${day.formatedPT}</td><td>-</td>
			<td>-</td><td>-</td>
			<td>-</td><td>-</td></tr>`;


let formatNumber = (n) => ("0" + n).slice(-2);  
let getHour = (time) => formatNumber(parseInt(time/60)) + "h " + formatNumber(time%60) +"min";

let weekTime = 0;


content = `<table border="1" style="border-collapse: collapse;">
	<tr><th colspan="7">Semana 1 de 12 à 29</th></tr>
	<tr>
		<th>dia da semana</th>
		<th>dia do mês</th>
		<th>Entrada</th>
		<th>Saída para Almoço</th>
		<th>Retorno do Almoço</th>
		<th>Saída</th>
		<th>Total</th>
	</tr>`;

document.querySelectorAll("div[id^=ApontID]").forEach(d => {
	let day = returnDay(d);
	if(day.month != avaliableMonth || day.accumulation == 0){
		content += getDefaultTr(day);
	}else{
		weekTime += day.accumulation;
		content += getFormatedTr(day);
	}
});
content += `<tr>
			<td colspan="6"></td>
			<td style='color:${getColor(weekTime)};'>${getHour(weekTime)}</td>
		</tr></table>`;

// getHour(weekTime);


var PDF = (function(){
	
    var configs = {
    	heightWindow: 700,
    	widthWindow: 700,
    	template: `
	        <html>
	            <head>
	                <style>
	                    {{style}}  
	                </style>
	                <title>{{title}}</title>
	            </head>
	            <body>
	                {{data}}
	            </body>
	        </html>`,
	    templateData:{"style":"","title":"","data":""},
    	setWidthWindow(width){
    		this.widthWindow = width | this.widthWindow;
    	},
    	setHeightWindow(height){
			this.heightWindow = height | this.heightWindow;
    	}, 
    	changeTemplate(selector, value){
			this.templateData[selector] = value;

    		//selector = "{{"+selector+"}}";
    		//this.currtentTemplate = this.template.replace(selector, value);
    	}
    }

    function print(){
    	
    	let currentTamplate = configs.template;
    	let data = configs.templateData;
    	for (var key in data) {
  			let selector = "{{"+key+"}}";
    		currentTamplate = currentTamplate.replace(selector, data[key]);
		}

    	var win  = window.open('', '', 'height='+configs.widthWindow+',width='+configs.heightWindow);
    	win.document.write(currentTamplate);
        win.print(); 
        win.document.close();
    };

    function generate(style, title, data){
		configs.changeTemplate('style', style);
		configs.changeTemplate('title', title);
		configs.changeTemplate('data', data);
    }; 
	
	return {
		generate: generate, 
		print: print, 
		configs: configs
	};

})();