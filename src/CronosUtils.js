let cronosUtil = (function(){

    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", 
    "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const days = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sabado"];

    const currentMonth = new Date().getMonth();
    const month = currentMonth + 1;
    const lastMonth = month > 0? month - 1: 11;
    const twiceLastMonth = lastMonth > 0? lastMonth - 1: 11;
    
    let getDayNeedTime = () => 8 * 60 + 48; 

    return {
        getMonthName: idx => months[idx > 0? idx - 1: 11],
        getDayName: idx => days[idx],
        getCurrentMonth: () => month,
        getLastMonth: () => lastMonth, 
        getTwiceLastMonth: () => twiceLastMonth,
        getWeekNeedTime: (n) => getDayNeedTime() * n,
        getInitialWeek: (m) => m == month? 0: (month - (m + 1))* 4 + parseInt(new Date().getDate()/7)
    }

})();