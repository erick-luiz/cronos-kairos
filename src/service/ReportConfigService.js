let ReportConfig = (function(confirmation){

    let getDaysToExclude = function(){
        let daysToExclude = ConfirmationModalTemplate.daysToExcludeInput.value;
        if(daysToExclude.match(/[\d\,]/gi)){
            return daysToExclude.match(/\d*/g).filter(item => item.match(/\d/) && item*1 > 0 && item*1 < 32);
        }
        return [];
    }

    let getDayNeedTime = function(){
        let h = confirmation.weeklyHourlyLoadSelect.value;
        console.log("erick -> ", h);
        if(h*1 == 40) return 8 * 60;
        return 8 * 60 + 48;
    }

    return {
        getDaysToExclude: getDaysToExclude,
        getDayNeedTime: getDayNeedTime
    }

})(ConfirmationModalTemplate);