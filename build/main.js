"use strict";

formatNumber = function formatNumber(n) {
  return ("0" + n).slice(-2);
};

getHour = function getHour(time) {
  return formatNumber(parseInt(time / 60)) + "h " + formatNumber(time % 60) + "min";
};

getFormatedTr = function getFormatedTr(day, backgrounColor) {
  return "<tr style=\"background-color:".concat(backgrounColor, ";\">\n            <td>").concat(cronosUtil.getDayName(day.dayOfWeek), "</td>\n            <td>").concat(day.formatedPT, "</td><td>").concat(day.s, "</td>\n            <td>").concat(day.e, "</td><td>").concat(day.s1, "</td>\n            <td>").concat(day.e1, "</td><td>").concat(getHour(day.accumulation), "</td></tr>");
};

getDefaultTr = function getDefaultTr(day, backgrounColor) {
  return "<tr style=\"background-color:".concat(backgrounColor, ";\">\n            <td>").concat(cronosUtil.getDayName(day.dayOfWeek), "</td>\n            <td>").concat(day.formatedPT, "</td><td>-</td>\n            <td>-</td><td>-</td>\n            <td>-</td><td>-</td></tr>");
};

getColor = function getColor(time, needTime) {
  return time < needTime ? 'red' : '#0bb50bd4';
};

getWeekReport = function getWeekReport(weeks) {
  var firstDay = weeks[0];
  var lastDay = weeks[weeks.length - 1];
  var weekTime = 0;
  var content = "<table border=\"1\" style=\"border-collapse: collapse;\">\n        <tr><th colspan=\"7\">Semana de ".concat(firstDay.formatedPT, " \xE0 ").concat(lastDay.formatedPT, "</th></tr>\n        <tr>\n            <th>dia da semana</th>\n            <th>dia do m\xEAs</th>\n            <th>Entrada</th>\n            <th>Sa\xEDda para Almo\xE7o</th>\n            <th>Retorno do Almo\xE7o</th>\n            <th>Sa\xEDda</th>\n            <th>Total</th>\n        </tr>");
  var countableDaysOfWeek = 0;
  weeks.forEach(function (day) {
    var color = day.isHoliday ? "#ff980073" : "#fff";

    if (day.accumulation == 0) {
      content += getDefaultTr(day, color);
    } else {
      weekTime += day.accumulation;
      content += getFormatedTr(day, color);
    }

    if (day.countableDay) countableDaysOfWeek++;
  });
  var needTime = cronosUtil.getWeekNeedTime(countableDaysOfWeek);
  content += "<tr>\n                <td colspan=\"6\"> Tempo necess\xE1rio: ".concat(getHour(needTime), " </td>\n                <td style='color:").concat(getColor(weekTime, needTime), ";'>").concat(getHour(weekTime), "</td>\n            </tr></table><br><br>");
  return content;
}; // ################################# MAIN


isHoliday = function isHoliday(day) {
  return day.isHoliday;
};

isWeekEndDay = function isWeekEndDay(day) {
  return day.dayOfWeek == 0 || day.dayOfWeek == 6;
};

isWeekDay = function isWeekDay(day) {
  return !isWeekEndDay(day);
};

isValidWeek = function isValidWeek(week) {
  for (var i = 0; i < week.length; i++) {
    var day = week[i];

    if (isWeekDay(day) && day.accumulation > 0) {
      return true;
    }
  }

  return false;
};

processCountablesDays = function processCountablesDays(week) {
  week.forEach(function (day) {
    if (isWeekDay(day) && !isHoliday(day)) day.countableDay = true;
  });
};

getMonthData = function getMonthData(month, done) {
  var monthWeeks = [];

  var processWeek = function processWeek(weekData) {
    if (weekData.week.length > 0 && isValidWeek(weekData.week)) {
      processCountablesDays(weekData.week);
      monthWeeks.push(weekData.week);
    }

    ;
    if (weekData.final) done(month, monthWeeks);
  };

  var weekInit = cronosUtil.getInitialWeek(month);
  search.searchDaysFromWeek(weekInit > 0 ? weekInit * -1 : weekInit, month, processWeek, null);
};

var month = new Date().getMonth() + 1;
var lastMonth = month > 0 ? month - 1 : 11;
var twiceLastMonth = lastMonth > 0 ? lastMonth - 1 : 11;

buildMonthReport = function buildMonthReport(month, monthWeeks) {
  monthReport = "<center><h1>M\xEAs ".concat(cronosUtil.getMonthName(month), "</h1>");
  monthWeeks.reverse().forEach(function (w) {
    monthReport += getWeekReport(w);
  });
  return monthReport + "</center>";
};

enableBtn = function enableBtn(btn) {
  return btn.disabled = false;
};

buildButton = function buildButton(btn, month, content) {
  btn.addEventListener("click", function (month, content) {
    PDF.generate("", "Relat\xF3rio de ".concat(cronosUtil.getMonthName(month)), content);
    PDF.print();
  });
};

getMonthData(month, function (month, monthWeeks) {
  var btn = viewManager.btnCurrentMonth;
  btn.addEventListener("click", function () {
    PDF.generate("", "Relat\xF3rio de ".concat(cronosUtil.getMonthName(month)), buildMonthReport(month, monthWeeks));
    PDF.print();
  });
  enableBtn(btn);
});
getMonthData(lastMonth, function (month, monthWeeks) {
  var btn = viewManager.btnLastMonth;
  btn.addEventListener("click", function () {
    PDF.generate("", "Relat\xF3rio de ".concat(cronosUtil.getMonthName(lastMonth)), buildMonthReport(lastMonth, monthWeeks));
    PDF.print();
  });
  enableBtn(btn);
});
getMonthData(twiceLastMonth, function (month, monthWeeks) {
  var btn = viewManager.btnTwiceLastMonth;
  btn.addEventListener("click", function () {
    PDF.generate("", "Relat\xF3rio de ".concat(cronosUtil.getMonthName(twiceLastMonth)), buildMonthReport(twiceLastMonth, monthWeeks));
    PDF.print();
  });
  enableBtn(btn);
});