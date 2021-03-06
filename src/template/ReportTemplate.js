let ReportTemplate = (function(cronosUtil){

    let _getColor = (time, needTime) => time < needTime? 'red':'#0bb50bd4';

    const _getFormatedTr = (day, backgrounColor) => `<tr style="background-color:${backgrounColor};">
            <td>${cronosUtil.getDayName(day.dayOfWeek)}</td>
            <td>${day.formatedPT}</td><td>${day.s}</td>
            <td>${day.e}</td><td>${day.s1}</td>
            <td>${day.e1}</td><td>${cronosUtil.getHour(day.accumulation)}</td></tr>`;

    const _getDefaultTr = (day, backgrounColor) => `<tr style="background-color:${backgrounColor};">
            <td>${cronosUtil.getDayName(day.dayOfWeek)}</td>
            <td>${day.formatedPT}</td><td>-</td>
            <td>-</td><td>-</td>
            <td>-</td><td>-</td></tr>`;

    let getWeekReport = function(weeks){

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
    
            let color = day.isHoliday? "#ff980073": day.isExcludedDay? "#ff4040": "#fff";
            if(day.accumulation == 0){
                content += _getDefaultTr(day, color);
            }else{
                weekTime += day.accumulation;
                content += _getFormatedTr(day, color);
            }
            if(day.countableDay) countableDaysOfWeek++;
        });
        let needTime = cronosUtil.getWeekNeedTime(countableDaysOfWeek);
    
        content += `<tr>
                    <td colspan="6"> Tempo necessário: ${cronosUtil.getHour(needTime)} </td>
                    <td style='color:${_getColor(weekTime,needTime)};'>${cronosUtil.getHour(weekTime)}</td>
                </tr></table><br><br>`;
        return content;
    }

    return {
        getWeekReport: getWeekReport
    }
})(cronosUtil);