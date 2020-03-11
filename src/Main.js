(function(){

    let month = new Date().getMonth() + 1;
    let lastMonth = month == 1? 12 :month - 1;
    let twiceLastMonth = lastMonth == 1? 12: lastMonth -1;
    let invalidMonth = twiceLastMonth == 1? 12: twiceLastMonth -1;

    cleanLocalData = () => {
        if(localStorage.getItem(`month-${invalidMonth}`) != undefined && localStorage.getItem(`month-${invalidMonth}`) != "null"){
            localStorage.removeItem(`month-${invalidMonth}`);
        }
    }

    cleanLocalData();

})();

// FIX: inserir na func anonima 

formatNumber = (n) => ("0" + n).slice(-2);  
getHour = (time) => formatNumber(parseInt(time/60)) + "h " + formatNumber(time%60) +"min";

getFormatedTr = (day, backgrounColor) => `<tr style="background-color:${backgrounColor};">
            <td>${cronosUtil.getDayName(day.dayOfWeek)}</td>
            <td>${day.formatedPT}</td><td>${day.s}</td>
            <td>${day.e}</td><td>${day.s1}</td>
            <td>${day.e1}</td><td>${getHour(day.accumulation)}</td></tr>`;

getDefaultTr = (day, backgrounColor) => `<tr style="background-color:${backgrounColor};">
            <td>${cronosUtil.getDayName(day.dayOfWeek)}</td>
            <td>${day.formatedPT}</td><td>-</td>
            <td>-</td><td>-</td>
            <td>-</td><td>-</td></tr>`;

getColor = (time, needTime) => time < needTime? 'red':'#0bb50bd4';

getWeekReport = function(weeks){

    let firstDay = weeks[0];
    let lastDay = weeks[weeks.length -1];
    let weekTime = 0;
    
    let content = `<table border="1" style="border-collapse: collapse;">
        <tr><th colspan="7">Semana de ${firstDay.formatedPT} à ${lastDay.formatedPT}</th></tr>
        <tr>
            <th>dia da semana</th>
            <th>dia do mês</th>
            <th>Entrada</th>
            <th>Saída para Almoço</th>
            <th>Retorno do Almoço</th>
            <th>Saída</th>
            <th>Total</th>
        </tr>`;

    let countableDaysOfWeek = 0;
    weeks.forEach(day => {

        let color = day.isHoliday? "#ff980073": "#fff";
        if(day.accumulation == 0){
            content += getDefaultTr(day, color);
        }else{
            weekTime += day.accumulation;
            content += getFormatedTr(day, color);
        }
        if(day.countableDay) countableDaysOfWeek++;
    });
    let needTime = cronosUtil.getWeekNeedTime(countableDaysOfWeek);

    content += `<tr>
                <td colspan="6"> Tempo necessário: ${getHour(needTime)} </td>
                <td style='color:${getColor(weekTime,needTime)};'>${getHour(weekTime)}</td>
            </tr></table><br><br>`;
    return content;
}

// ################################# MAIN

isHoliday = (day) => day.isHoliday;
isWeekEndDay = (day) => day.dayOfWeek == 0 || day.dayOfWeek == 6;
isWeekDay = (day) => !isWeekEndDay(day);

isValidWeek = (week) => {
    for(var i = 0; i < week.length; i++){
        let day = week[i];
        if(isWeekDay(day) && day.accumulation > 0){
            return true;
        }
    }
    return false;
}

processCountablesDays = (week) => {
    week.forEach(day => {
        if(isWeekDay(day) && !isHoliday(day)) day.countableDay = true;
    });
}

getMonthData = function(month, done, toUpdate){


    if(!toUpdate){
        done(month, JSON.parse(localStorage.getItem(`month-${month}`)));
        return;
    }

    let monthWeeks = [];
    let days = [];
    let processWeek = function(weekData) {
        if(weekData.week.length > 0){
            processCountablesDays(weekData.week);
            days = days.concat(weekData.week);
        };
        // console.log(days);
        if(weekData.final) {
            let week = []
            // days.reverse();
            // days.sort(function(a, b){return a.dayOfWeek - b.dayOfWeek}); 
            days.sort(function(a, b){return a.day - b.day})
            .forEach(d => {
                week.push(d);
                if(d.dayOfWeek == 0 || d == days[days.length - 1]){
                    if(isValidWeek(week)) monthWeeks.push(week);
                    week = [];
                }
            });
            // monthWeeks.push(weekData.week);
            localStorage.setItem(`month-${month}`,JSON.stringify(monthWeeks));
            done(month, monthWeeks);
        }
    }

    let weekInit = cronosUtil.getInitialWeek(month);
    let period = PeriodManager.getPeriod(new Date().withMonth(month).withDay(28).adjustYear(month));

    search.searchDaysFromWeek(period, 0, month, processWeek, null);
}

let month = new Date().getMonth() + 1;
let lastMonth = month == 1? 12 :month - 1;
let twiceLastMonth = lastMonth == 1? 12: lastMonth -1;
let invalidMonth = twiceLastMonth == 1? 12: twiceLastMonth -1;

buildMonthReport = function(month, monthWeeks){
    var monthReport = `<center><h1>Mês ${cronosUtil.getMonthName(month)}</h1>`;
    monthWeeks.forEach(w => { monthReport += getWeekReport(w); })
    return monthReport + "</center>";
}

enableBtn = btn => btn.disabled = false;
changeByPlusButton = btn => btn.classList.add("PlusButton");
processButton = btn => {
    enableBtn(btn);
    changeByPlusButton(btn);
}

buildButton = function(btn, month, content) {
    btn.addEventListener("click", function(month, content){
        PDF.generate("",`Relatório de ${cronosUtil.getMonthName(month)}`,content);
        PDF.print();
    });
}

processMonthInfo = (element, monthWeeks) => {
    var acc = search.getAccumulation(monthWeeks);
    element.innerHTML  = (acc.saldo < 0? "-": "+") + acc.saldoHour + "h e " + acc.saldoMin + "min";
    element.style.color = acc.saldo < 0? "red": "green";
}

reportMonth = month;
generateReportClick = (toUpdate) => {
    ConfirmationModalTemplate.toggle();
    if(toUpdate){
        generateReport();
    }else{
        generateLocalReport();
    }
}
generateReport = function(){
    LoaderTemplate.show();
    getMonthData(reportMonth, function(reportMonth, monthWeeks){
        PDF.generate("",`Relatório de ${cronosUtil.getMonthName(reportMonth)}`,
        buildMonthReport(reportMonth, monthWeeks));
        LoaderTemplate.hide();
        PDF.print();
    }, true);
};

generateLocalReport = function(){
    getMonthData(reportMonth, function(reportMonth, monthWeeks){
        PDF.generate("",`Relatório de ${cronosUtil.getMonthName(reportMonth)}`,
        buildMonthReport(reportMonth, monthWeeks));
        PDF.print();
    }, false);
};

validateLocalData = () => localStorage.getItem(`month-${reportMonth}`) != undefined && localStorage.getItem(`month-${reportMonth}`) != "null";

ConfirmationModalTemplate.comfirmInput.addEventListener("click", () => generateReportClick(true));
ConfirmationModalTemplate.notComfirmInput.addEventListener("click", () => generateReportClick(false));

let btn = viewManager.btnCurrentMonth;
btn.addEventListener("click", function(){
    reportMonth = month;
    if(validateLocalData()){
        ConfirmationModalTemplate.toggle();
    }else{
        generateReport();
    }
});

let btnLastMonth = viewManager.btnLastMonth;
btnLastMonth.addEventListener("click", function(){
    reportMonth = lastMonth;
    if(validateLocalData()){
        ConfirmationModalTemplate.toggle();
    }else{
        generateReport();
    }
});


let btnTwiceLastMonth = viewManager.btnTwiceLastMonth;
btnTwiceLastMonth.addEventListener("click", function(){
    reportMonth = twiceLastMonth;
    if(validateLocalData()){
        ConfirmationModalTemplate.toggle();
    }else{
        generateReport();
    }
});


