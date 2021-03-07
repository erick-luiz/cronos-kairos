let cronosUtil = (function(confirmation){

    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", 
    "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const days = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sabado"];

    const currentMonth = new Date().getMonth();
    const month = currentMonth + 1;
    const lastMonth = month > 0? month - 1: 11;
    const twiceLastMonth = lastMonth > 0? lastMonth - 1: 11;
    // const invalidMonth = twiceLastMonth > 0? twiceLastMonth - 1: 11;
    
    let _formatNumber = (n) => ("0" + n).slice(-2);
    let getHour = (time) => _formatNumber(parseInt(time/60)) + "h " + _formatNumber(time%60) +"min";

    let _weeklyHourly = {
        "40": 8 * 60,
        "44": 8 * 60 + 48,
        "30": 6 * 60
    };

    let getDayNeedTime = function(){
        let h = confirmation.weeklyHourlyLoadSelect.value;
        if(!h) return _weeklyHourly["40"];

        return _weeklyHourly[h];
    }

    let isWeekEndDay = (day) => day.dayOfWeek == 0 || day.dayOfWeek == 6;
    let isWeekDay = (day) => !isWeekEndDay(day);

    return {
        getMonthName: idx => months[idx > 0? idx - 1: 11],
        getDayName: idx => days[idx],
        getCurrentMonth: () => month,
        getLastMonth: () => lastMonth, 
        getTwiceLastMonth: () => twiceLastMonth,
        getWeekNeedTime: (n) => getDayNeedTime() * n,
        getInitialWeek: (m) => m == month? 0: (month - (m + 1))* 4 + parseInt(new Date().getDate()/7),
        getHour: getHour,
        isWeekEndDay: isWeekEndDay,
        isWeekDay: isWeekDay
    }

})(ConfirmationModalTemplate);