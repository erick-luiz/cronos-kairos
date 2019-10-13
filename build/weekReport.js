"use strict";

require("core-js/modules/es6.regexp.replace");

days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"];
avaliableMonth = new Date().getMonth() + 1;

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

formatHour = function formatHour(date) {
  return formatNumber(date.getHours()) + ":" + formatNumber(date.getMinutes());
};

returnDay = function returnDay(element) {
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
    dayOfWeek: start.getDay(),
    s: formatHour(start),
    e: formatHour(end),
    s1: formatHour(start1),
    e1: formatHour(end1),
    accumulation: getAccumulationValue(start, end) + getAccumulationValue(start1, end1)
  };
};

document.querySelectorAll("div[id^=ApontID]");

getDayNeedTime = function getDayNeedTime() {
  return 8 * 60 + 48;
};

getWeekNeedTime = function getWeekNeedTime(n) {
  return getDayNeedTime() * n;
};

getColor = function getColor(time) {
  return time < getWeekNeedTime(5) ? 'red' : '#0bb50bd4';
};

getFormatedTr = function getFormatedTr(day) {
  return "<tr><td>".concat(days[day.dayOfWeek], "</td>\n\t\t\t<td>").concat(day.formatedPT, "</td><td>").concat(day.s, "</td>\n\t\t\t<td>").concat(day.e, "</td><td>").concat(day.s1, "</td>\n\t\t\t<td>").concat(day.e1, "</td><td>").concat(getHour(day.accumulation), "</td></tr>");
};

getDefaultTr = function getDefaultTr(day) {
  return "<tr><td>".concat(days[day.dayOfWeek], "</td>\n\t\t\t<td>").concat(day.formatedPT, "</td><td>-</td>\n\t\t\t<td>-</td><td>-</td>\n\t\t\t<td>-</td><td>-</td></tr>");
};

formatNumber = function formatNumber(n) {
  return ("0" + n).slice(-2);
};

getHour = function getHour(time) {
  return formatNumber(parseInt(time / 60)) + "h " + formatNumber(time % 60) + "min";
};

weekTime = 0;
content = "<table border=\"1\" style=\"border-collapse: collapse;\">\n\t<tr><th colspan=\"7\">Semana 1 de 12 \xE0 29</th></tr>\n\t<tr>\n\t\t<th>dia da semana</th>\n\t\t<th>dia do m\xEAs</th>\n\t\t<th>Entrada</th>\n\t\t<th>Sa\xEDda para Almo\xE7o</th>\n\t\t<th>Retorno do Almo\xE7o</th>\n\t\t<th>Sa\xEDda</th>\n\t\t<th>Total</th>\n\t</tr>";
document.querySelectorAll("div[id^=ApontID]").forEach(function (d) {
  var day = returnDay(d);

  if (day.month != avaliableMonth || day.accumulation == 0) {
    content += getDefaultTr(day);
  } else {
    weekTime += day.accumulation;
    content += getFormatedTr(day);
  }
});
content += "<tr>\n\t\t\t<td colspan=\"6\"></td>\n\t\t\t<td style='color:".concat(getColor(weekTime), ";'>").concat(getHour(weekTime), "</td>\n\t\t</tr></table>"); // getHour(weekTime);

var PDF = function () {
  var configs = {
    heightWindow: 700,
    widthWindow: 700,
    template: "\n\t        <html>\n\t            <head>\n\t                <style>\n\t                    {{style}}  \n\t                </style>\n\t                <title>{{title}}</title>\n\t            </head>\n\t            <body>\n\t                {{data}}\n\t            </body>\n\t        </html>",
    templateData: {
      "style": "",
      "title": "",
      "data": ""
    },
    setWidthWindow: function setWidthWindow(width) {
      this.widthWindow = width | this.widthWindow;
    },
    setHeightWindow: function setHeightWindow(height) {
      this.heightWindow = height | this.heightWindow;
    },
    changeTemplate: function changeTemplate(selector, value) {
      this.templateData[selector] = value; //selector = "{{"+selector+"}}";
      //this.currtentTemplate = this.template.replace(selector, value);
    }
  };

  function print() {
    var currentTamplate = configs.template;
    var data = configs.templateData;

    for (var key in data) {
      var selector = "{{" + key + "}}";
      currentTamplate = currentTamplate.replace(selector, data[key]);
    }

    var win = window.open('', '', 'height=' + configs.widthWindow + ',width=' + configs.heightWindow);
    win.document.write(currentTamplate);
    win.print();
    win.document.close();
  }

  ;

  function generate(style, title, data) {
    configs.changeTemplate('style', style);
    configs.changeTemplate('title', title);
    configs.changeTemplate('data', data);
  }

  ;
  return {
    generate: generate,
    print: print,
    configs: configs
  };
}();