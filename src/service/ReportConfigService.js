let ReportConfig = (function(confirmation){

    let getDaysToExclude = function(){
        let daysToExclude = ConfirmationModalTemplate.daysToExcludeInput.value;
        if(daysToExclude.match(/[\d\,]/gi)){
            return daysToExclude.match(/\d*/g).filter(item => item.match(/\d/) && item*1 > 0 && item*1 < 32);
        }
        return [];
    }

    return {
        getDaysToExclude: getDaysToExclude
    }

})(ConfirmationModalTemplate);