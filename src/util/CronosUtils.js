let cronosUtil = (function(confirmation){

    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", 
    "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const days = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sabado"];

    const currentMonth = new Date().getMonth();
    const month = currentMonth + 1;
    const lastMonth = month > 0? month - 1: 11;
    const twiceLastMonth = lastMonth > 0? lastMonth - 1: 11;
    const invalidMonth = twiceLastMonth > 0? twiceLastMonth - 1: 11;
    
    let getHour = (time) => formatNumber(parseInt(time/60)) + "h " + formatNumber(time%60) +"min";

    let getDayNeedTime = function(){
        let h = confirmation.weeklyHourlyLoadSelect.value;
        if(h*1 == 40) {
            return 8 * 60;
        }
        return 8 * 60 + 48;
    }

    return {
        getMonthName: idx => months[idx > 0? idx - 1: 11],
        getDayName: idx => days[idx],
        getCurrentMonth: () => month,
        getLastMonth: () => lastMonth, 
        getTwiceLastMonth: () => twiceLastMonth,
        getWeekNeedTime: (n) => getDayNeedTime() * n,
        getInitialWeek: (m) => m == month? 0: (month - (m + 1))* 4 + parseInt(new Date().getDate()/7),
        getHour: getHour
    }

})(ConfirmationModalTemplate);