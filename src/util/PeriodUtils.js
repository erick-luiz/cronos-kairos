let periodUtils = (function(){

    let periods = document.querySelectorAll("select[name=per] option")

    let periods2 = Array.prototype.slice.call(periods); 
    
    let getDate = (date) => new Date(date.replace(/(\d{2})\/(\d{2})\/(\d{4})/,"$2-$1-$3"));
    
    
    let getDatesInArr = (p) => {
        return {
        "dates": p.text.replace(/[\s\S]*(\d{2}\/\d{2}\/\d{4})[\s\S]*(\d{2}\/\d{2}\/\d{4})[\s\S]*/g,"$1;$2").split(";"),
        "value": p.value
        };
    }

    let getPeriod = (arrP) => {
        return {
            "init": getDate(arrP.dates[0]), 
            "end": getDate(arrP.dates[1]+"  23:59:59"),
            "value": arrP.value
        };
    }
    
    let periodsNormalizeds = periods2.map(getDatesInArr).map(getPeriod)
    
    
    var getDatePeriod = function(d, p){
        if(!d) return p;

        let period = periodsNormalizeds.filter(p => p.init <= d && d <= p.end)
        if(period.length > 0)   return period[0].value;
        
        return p? p: currentPeriod;
    }

    let currentPeriod = getDatePeriod(new Date());

    return {
        getPeriod: getDatePeriod
    }
})();
