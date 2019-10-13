"use strict";

require("core-js/modules/es6.regexp.replace");

var search = function (w) {
  'use strict';

  var formatNumber = function formatNumber(n) {
    return ("0" + n).slice(-2);
  };

  var formatHour = function formatHour(date) {
    return formatNumber(date.getHours()) + ":" + formatNumber(date.getMinutes());
  };

  var getDayNeedTime = function getDayNeedTime() {
    return 8 * 60 + 48;
  };

  var getWeekNeedTime = function getWeekNeedTime(n) {
    return getDayNeedTime() * n;
  };

  var avaliableMonth = new Date().getMonth() + 1;

  var getEntrada = function getEntrada(element) {
    return element.querySelector('.TimeINVisualizacao') ? element.querySelector('.TimeINVisualizacao').textContent : "";
  };

  var getAlmoco = function getAlmoco(element) {
    return element.querySelector('.TimeOUTVisualizacao') ? element.querySelector('.TimeOUTVisualizacao').textContent : "";
  };

  var getVoltaAlmoco = function getVoltaAlmoco(element) {
    return element.querySelectorAll('.TimeINVisualizacao')[1] ? element.querySelectorAll('.TimeINVisualizacao')[1].textContent : "";
  };

  var getSaida = function getSaida(element) {
    return element.querySelectorAll('.TimeOUTVisualizacao')[1] ? element.querySelectorAll('.TimeOUTVisualizacao')[1].textContent : "";
  };

  var getData = function getData(element) {
    return element.querySelectorAll('input')[5] ? element.querySelectorAll('input')[5].value : "";
  };

  var getAccumulationValue = function getAccumulationValue(d1, d2) {
    var initialTime = d1.getHours() * 60 + d1.getMinutes();
    var finalTime = d2.getHours() * 60 + d2.getMinutes();
    var out = finalTime - initialTime;
    return out > 0 ? out : 0;
  };

  var returnDay = function returnDay(element) {
    var data = getData(element).replace(/(\d{2})_(\d{2})_(\d{4})/, "$2/$1/$3");
    var start = new Date(data + " " + getEntrada(element));
    var end = new Date(data + " " + getAlmoco(element));
    var start1 = new Date(data + " " + getVoltaAlmoco(element));
    var end1 = new Date(data + " " + getSaida(element));
    var h = (getAccumulationValue(start, end) + getAccumulationValue(start1, end1)) / 60;
    var m = (getAccumulationValue(start, end) + getAccumulationValue(start1, end1)) % 60;
    return {
      day: data.replace(/\d{2}\/(\d{2})\/\d{4}/, "$1"),
      month: data.replace(/(\d{2})\/\d{2}\/\d{4}/, "$1"),
      formatedEN: data.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2"),
      formatedPT: data.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"),
      date: data,
      isHoliday: evaluatorHoliday.verifyDate(start),
      countableDay: false,
      dayOfWeek: start.getDay(),
      s: formatHour(start),
      e: formatHour(end),
      s1: formatHour(start1),
      e1: formatHour(end1),
      accumulation: getAccumulationValue(start, end) + getAccumulationValue(start1, end1)
    };
  };

  var processDays = function processDays(obj, month) {
    var list = [];
    var dias = $(obj).find('.DiaApontamento');

    for (var i = 0; i < dias.length; i++) {
      var day = returnDay(dias[i]);

      if (day.month == month) {
        list.push(day);
      }
    }

    return list;
  };

  var containInitDate = function containInitDate(listDays, month) {
    for (var i = 0; i < listDays.length; i++) {
      if (listDays[i] && listDays[i].day && listDays[i].day * 1 == 1 && listDays[i].month && listDays[i].month * 1 == month) {
        return true;
      }
    }

    return false;
  };

  var getAccumulationWeek = function getAccumulationWeek(week) {
    var value = 0;

    for (var i = 0; i < week.length; i++) {
      if (week[i] && week[i].accumulation && week[i].accumulation * 1 > 0) {
        value += week[i].accumulation * 1;
      }
    }

    return {
      accumulation: value,
      hour: parseInt(value / 60),
      min: value % 60
    };
  };

  var searchDaysFromWeek = function searchDaysFromWeek(week, month, done, err) {
    w.dtoPessoaApontamentos.Week = week;
    var self = this;
    var list = [];
    $.ajax({
      complete: function complete() {
        retrivingPonto = 0;
      },
      url: '/Dimep/Ponto/BuscarApontamentos',
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'html',
      data: JSON.stringify(dtoPessoaApontamentos),
      success: function success(data) {
        var formattedData = data.replace(/\<scrip[\s\S]*?\<\/script\>/gi, "");
        list = list.concat(processDays(formattedData, month));

        if (!containInitDate(list, month)) {
          searchDaysFromWeek(week - 1, month, done);
          done({
            week: list,
            final: false
          });
        } else {
          done({
            week: list,
            final: true
          });
        }
      },
      error: function error(jqXHR, textStatus, errorThrown) {
        if (jqXHR.responseText.indexOf('/Account/LogOn') >= 0 && jqXHR.responseText.indexOf('.indexOf(\'/Account/LogOn\')') < 0) {
          location.reload();
        }
      }
    });
  };

  return {
    searchDaysFromWeek: searchDaysFromWeek,
    getAccumulationWeek: getAccumulationWeek
  };
}(window);