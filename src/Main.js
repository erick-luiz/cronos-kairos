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

getMonthData = function(month, done){

    let monthWeeks = [];

    let processWeek = function(weekData) {
        if(weekData.week.length > 0 && isValidWeek(weekData.week)){
            processCountablesDays(weekData.week);
            monthWeeks.push(weekData.week);
        };
        if(weekData.final) done(month, monthWeeks.reverse());
    }
    let weekInit = cronosUtil.getInitialWeek(month);
    search.searchDaysFromWeek(weekInit> 0? weekInit * -1: weekInit, month, processWeek, null);
}

let month = new Date().getMonth() + 1;
let lastMonth = month > 0? month - 1: 11;
let twiceLastMonth = lastMonth > 0? lastMonth - 1: 11;

buildMonthReport = function(month, monthWeeks){
    monthReport = `<center><h1>Mês ${cronosUtil.getMonthName(month)}</h1>`;
    monthWeeks.forEach(w => { monthReport += getWeekReport(w); })
    return monthReport + "</center>";
}

enableBtn = btn => btn.disabled = false;

buildButton = function(btn, month, content) {
    btn.addEventListener("click", function(month, content){
        PDF.generate("",`Relatório de ${cronosUtil.getMonthName(month)}`,content);
        PDF.print();
    });
}


getMonthData(month,function(month, monthWeeks){
    let btn = viewManager.btnCurrentMonth;

    btn.addEventListener("click", function(){
        PDF.generate("",`Relatório de ${cronosUtil.getMonthName(month)}`,
            buildMonthReport(month, monthWeeks));
        PDF.print();
    });
    enableBtn(btn);
});

getMonthData(lastMonth, function(month, monthWeeks){
    
    let btn = viewManager.btnLastMonth;
    btn.addEventListener("click", function(){
        PDF.generate("",`Relatório de ${cronosUtil.getMonthName(lastMonth)}`,
            buildMonthReport(lastMonth, monthWeeks));
        PDF.print();
    });
    enableBtn(btn);
});

getMonthData(twiceLastMonth, function(month, monthWeeks){
    let btn = viewManager.btnTwiceLastMonth;
    
    btn.addEventListener("click", function(){
        PDF.generate("",`Relatório de ${cronosUtil.getMonthName(twiceLastMonth)}`,
            buildMonthReport(twiceLastMonth, monthWeeks));
        PDF.print();
    });
    enableBtn(btn);
});
