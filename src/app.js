(function(){

    let month = new Date().getMonth() + 1;
    let lastMonth = month == 1? 12 :month - 1;
    let twiceLastMonth = lastMonth == 1? 12: lastMonth -1;
    let invalidMonth = twiceLastMonth == 1? 12: twiceLastMonth -1;

    let cleanLocalData = () => {
        if(localStorage.getItem(`month-${invalidMonth}`) != undefined && localStorage.getItem(`month-${invalidMonth}`) != "null"){
            localStorage.removeItem(`month-${invalidMonth}`);
        }
    }

    cleanLocalData();

})();

let isValidWeek = (week) => {
    for(var i = 0; i < week.length; i++){
        let day = week[i];
        if(cronosUtil.isWeekDay(day) && day.accumulation > 0){
            return true;
        }
    }
    return false;
}

let processCountablesDays = (week) => {
    week.forEach(day => {
        if(cronosUtil.isWeekDay(day) && !day.isHoliday && !day.isExcludedDay) day.countableDay = true;
    });
}

let getMonthData = function(month, done, toUpdate){

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

        if(weekData.final) {
            let week = []

            days.sort(function(a, b){return a.day - b.day})
            .forEach(d => {
                week.push(d);
                if(d.dayOfWeek == 0 || d == days[days.length - 1]){
                    if(isValidWeek(week)) monthWeeks.push(week);
                    week = [];
                }
            });

            localStorage.setItem(`month-${month}`,JSON.stringify(monthWeeks));
            done(month, monthWeeks);
        }
    }

    let period = PeriodManager.getPeriod(new Date().withMonth(month).withDay(28).adjustYear(month));

    search.searchDaysFromWeek(period, 0, month, processWeek, null);
}

let month = new Date().getMonth() + 1;
let lastMonth = month == 1? 12 :month - 1;
let twiceLastMonth = lastMonth == 1? 12: lastMonth -1;
let invalidMonth = twiceLastMonth == 1? 12: twiceLastMonth -1;

let buildMonthReport = function(month, monthWeeks){
    var monthReport = `<center><h1>Mês ${cronosUtil.getMonthName(month)}</h1>`;
    monthWeeks.forEach(w => { monthReport += ReportTemplate.getWeekReport(w); })
    return monthReport + "</center>";
}

let enableBtn = btn => btn.disabled = false;
let changeByPlusButton = btn => btn.classList.add("PlusButton");
let processButton = btn => {
    enableBtn(btn);
    changeByPlusButton(btn);
}

let buildButton = function(btn, month, content) {
    btn.addEventListener("click", function(month, content){
        PDF.generate("",`Relatório de ${cronosUtil.getMonthName(month)}`,content);
        PDF.print();
    });
}

let processMonthInfo = (element, monthWeeks) => {
    var acc = search.getAccumulation(monthWeeks);
    element.innerHTML  = (acc.saldo < 0? "-": "+") + acc.saldoHour + "h e " + acc.saldoMin + "min";
    element.style.color = acc.saldo < 0? "red": "green";
}

let reportMonth = month;

let generatReportFunction = [];


let generateReport = (searchData) => {
    
    ConfirmationModalTemplate.toggle();
 
    getMonthData(reportMonth, function(reportMonth, monthWeeks){
        
        try{
            PDF.generate("",`Relatório de ${cronosUtil.getMonthName(reportMonth)}`,
            buildMonthReport(reportMonth, monthWeeks));
            PDF.print();
            LoaderTemplate.hide();
        } catch(err){
            ErrorMessageTemplate.show("Ocorreu um erro ao gerar o relatório, caso persista <a target='target' href='https://github.com/erickLFLopes/cronos-kairos/issues'> nos informe</a>");
            console.error(err.message);
            LoaderTemplate.hide();
        }
    }, searchData);
   
}

let isValidateLocalData = () => localStorage.getItem(`month-${reportMonth}`) != undefined && localStorage.getItem(`month-${reportMonth}`) != "null";

ConfirmationModalTemplate.comfirmInput.addEventListener("click", () => generateReport(true));
ConfirmationModalTemplate.notComfirmInput.addEventListener("click", () => generateReport(false));

let btn = viewManager.btnCurrentMonth;


let showSearchModal = (month) => {
    reportMonth = month;
    if(isValidateLocalData()){
        ConfirmationModalTemplate.toggleOldSearchBtn(true);
    }else{
        ConfirmationModalTemplate.toggleOldSearchBtn(false);
    }
    
    ConfirmationModalTemplate.toggle();
}

btn.addEventListener("click", function(){
    showSearchModal(cronosUtil.getCurrentMonth()); 
});

viewManager.btnLastMonth.addEventListener("click", function(){ 
    showSearchModal(cronosUtil.getLastMonth()); 
});

viewManager.btnTwiceLastMonth.addEventListener("click", function(){ 
    showSearchModal(cronosUtil.getTwiceLastMonth()); 
});