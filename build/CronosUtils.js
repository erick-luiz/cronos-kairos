"use strict";

var cronosUtil = function () {
  var months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  var days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"];
  var currentMonth = new Date().getMonth();
  var month = currentMonth + 1;
  var lastMonth = month > 0 ? month - 1 : 11;
  var twiceLastMonth = lastMonth > 0 ? lastMonth - 1 : 11;

  var getDayNeedTime = function getDayNeedTime() {
    return 8 * 60 + 48;
  };

  return {
    getMonthName: function getMonthName(idx) {
      return months[idx > 0 ? idx - 1 : 11];
    },
    getDayName: function getDayName(idx) {
      return days[idx];
    },
    getCurrentMonth: function getCurrentMonth() {
      return month;
    },
    getLastMonth: function getLastMonth() {
      return lastMonth;
    },
    getTwiceLastMonth: function getTwiceLastMonth() {
      return twiceLastMonth;
    },
    getWeekNeedTime: function getWeekNeedTime(n) {
      return getDayNeedTime() * n;
    },
    getInitialWeek: function getInitialWeek(m) {
      return m == month ? 0 : (month - (m + 1)) * 4 + parseInt(new Date().getDate() / 7);
    }
  };
}();