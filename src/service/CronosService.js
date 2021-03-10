var search = (function (w, periodManager, LoaderTemplate, Order, ReportConfig){
    'use strict';

    let formatNumber = (n) => ("0" + n).slice(-2);  
    let formatHour = (date) => formatNumber(date.getHours()) + ":" + formatNumber(date.getMinutes());
    let getDayNeedTime = () => ReportConfig.getDayNeedTime(); 
    let getWeekNeedTime = (n) => getDayNeedTime() * n;

    var getEntrada = function (element) {
        return element.querySelector('.TimeINVisualizacao') ? element.querySelector('.TimeINVisualizacao').textContent : "";
    }

    var getAlmoco = function(element){
        return element.querySelector('.TimeOUTVisualizacao') ? element.querySelector('.TimeOUTVisualizacao').textContent : "";
    }

    var getVoltaAlmoco = function (element) {
        return element.querySelectorAll('.TimeINVisualizacao')[1] ? element.querySelectorAll('.TimeINVisualizacao')[1].textContent : "";
    }

    var getSaida = function(element) {
        return element.querySelectorAll('.TimeOUTVisualizacao')[1] ? element.querySelectorAll('.TimeOUTVisualizacao')[1].textContent : "";
    }

    var getData = function(element) {
        return element.querySelectorAll('input')[5] ? element.querySelectorAll('input')[5].value : "";
    }

    var getAccumulationValue = function(d1, d2){
        var initialTime = d1.getHours()*60 + d1.getMinutes();
        var finalTime = d2.getHours()*60 + d2.getMinutes();
        var out = finalTime - initialTime;
        return out > 0? out : 0;
    }

    var returnDay = function (element){

        var data = getData(element).replace(/(\d{2})_(\d{2})_(\d{4})/,"$2/$1/$3");

        var outDates = [];
        
        var hours = [getEntrada(element), getAlmoco(element),getVoltaAlmoco(element),getSaida(element)]; 

        for(let i = 0; i < hours.length; i++){
            if(hours[i] != ""){
                outDates.push(new Date(data + " " + hours[i]));
            }
        }

        var baseDate = new Date(data);
        outDates = outDates.concat(Order.getOdersForDay(baseDate));
        outDates.sort();

        while(outDates.length < 4){
            outDates.push(baseDate);
        }

        var start = outDates[0];
        var end = outDates[1];
        var start1 = outDates[2];
        var end1 = outDates[3];

        var h = (getAccumulationValue(start, end) + getAccumulationValue(start1, end1))/60;
        var m = (getAccumulationValue(start, end) + getAccumulationValue(start1, end1)) % 60;
        var day = data.replace(/\d{2}\/(\d{2})\/\d{4}/,"$1");
        let daysToExclude = ReportConfig.getDaysToExclude();

        return {
            day:day,
            month:data.replace(/(\d{2})\/\d{2}\/\d{4}/,"$1"),
            formatedEN:data.replace(/(\d{2})\/(\d{2})\/(\d{4})/,"$3-$1-$2"),
            formatedPT:data.replace(/(\d{2})\/(\d{2})\/(\d{4})/,"$2/$1/$3"),
            date: data,
            start: start,
            isHoliday: evaluatorHoliday.verifyDate(start),
            isExcludedDay: daysToExclude.includes(day),
            countableDay: false,
            dayOfWeek: start.getDay(),
            s:formatHour(start) ,
            e:formatHour(end),
            s1:formatHour(start1),
            e1:formatHour(end1),
            accumulation: daysToExclude.includes(day)? 0: getAccumulationValue(start, end) + getAccumulationValue(start1, end1)
        }
    }

    var processDays = function(obj, month){
        var list = [];
        var dias = $(obj).find('.DiaApontamento');
        for(var i = 0; i < dias.length; i++){
            var day = returnDay(dias[i]);
            if(day.month == month){
                list.push(day);
            }
        }
        return list;
    }

    var containInitDate = function(listDays, month){
        for(var i = 0; i < listDays.length; i++){
            if(listDays[i] && listDays[i].day
                && listDays[i].day * 1 == 1 && listDays[i].month && listDays[i].month * 1 == month) {
                return true;
            }
        }
        return false;
    }

    var getAccumulationWeek = function(week){
        var value = 0;
        for(var i = 0; i < week.length; i++){
            if(week[i] && week[i].accumulation && week[i].accumulation * 1 > 0) {
                 value += week[i].accumulation * 1;
            }
        }
        return {accumulation: value, hour: parseInt(value/60), min: value%60 };
    }

    var getAccumulation = function(weeks){
        var monthDays = [];
        for(var i = 0; i < weeks.length; i++){
            for(var x = 0; x < weeks[i].length; x++){
                monthDays.push(weeks[i][x]);
            }
        }

        var value = 0;
        var contableDays = 0;
        for(var i = 0; i < monthDays.length; i++){
            if(monthDays[i] && monthDays[i].accumulation) {
                value += monthDays[i].accumulation * 1;
            }

            if(monthDays[i] && monthDays[i].countableDay) contableDays += 1;
        }

        var needed = getWeekNeedTime(contableDays);
        var saldo = value - needed;
        return {
            accumulation: value, 
            hour: parseInt(value/60), 
            min: value%60,
            needed: needed,
            neededHour: parseInt(needed/60),
            neededMin: needed%60,
            saldo: saldo,
            saldoHour: Math.abs(parseInt(saldo/60)),
            saldoMin: Math.abs(saldo%60)
        };
    }

    let searchDaysFromWeek = function(period, week, month, done, err){
        LoaderTemplate.show();

        dtoPessoaApontamentos.Week = week;
        dtoPessoaApontamentos.IdPeriodo = period;

        var self = this;
        var list = [];

        $.ajax({
            complete : function() { retrivingPonto = 0; } ,
            url: '/Dimep/Ponto/BuscarApontamentos',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'html',
            data: JSON.stringify(dtoPessoaApontamentos),
            success: function(data) {
                var formattedData = data.replace(/\<scrip[\s\S]*?\<\/script\>/gi,"");

                list = list.concat(processDays(formattedData, month));
                if(!containInitDate(list, month)) {

                    if(list.length > 0){
                        list.sort((d,d2) => d2.day - d.day);
                        var nextDate = new Date(list[0].start);
                        nextDate.minusDay();
                        var newPeriod = periodManager.getPeriod(nextDate);
                        if(period != newPeriod) week = 1;
                        period = newPeriod;
                    }
                    searchDaysFromWeek(period, week-1,month, done)
                    done({week:list, final: false});
                } else{
                    done({week:list, final:true});
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
                if (jqXHR.responseText.indexOf('/Account/LogOn') >= 0 &&
                    jqXHR.responseText.indexOf('.indexOf(\'/Account/LogOn\')') < 0) {
                    location.reload();
                }
                LoaderTemplate.hide();
            }
        });
    }

    return {
        searchDaysFromWeek: searchDaysFromWeek,
        getAccumulationWeek: getAccumulationWeek,
        getAccumulation:getAccumulation
    }

})(window, PeriodManager, LoaderTemplate, Order, ReportConfig);