"use strict";

var viewManager = function () {
  var buttonTemplate = function buttonTemplate(month) {
    return "\n            <button disabled id=\"Month-".concat(month, "\" style=\"margin-rigth:1%;\">\n                Gerar relat\xF3rio de ").concat(cronosUtil.getMonthName(month), "\n            </button>\n        ");
  };

  var reportOptions = "<div class=\"marginTop20\" style=\"overflow:hidden; background-color: #E1E0E0; border: 2px solid #E1E0E0;-moz-border-radius: 4px;-webkit-border-radius: 4px;border-radius: 4px;margin-bottom: 10px;\">\n            <div style=\"float:left;width:2%;background-color:#E1E0E0;padding-top:5px;text-align:center\">\n            <i class=\"fa fa-pencil\"></i>\n            </div>\n            <div style=\"float:left;  width:98%; background-color:#fff\">        <div style=\"padding: 10px\">\n                <br>".concat(buttonTemplate(cronosUtil.getCurrentMonth()), "\n                ").concat(buttonTemplate(cronosUtil.getLastMonth()), "\n                ").concat(buttonTemplate(cronosUtil.getTwiceLastMonth()), "\n                </div>\n                </div>\n            \n    </div></div>");
  var element = document.querySelector(".PageTitle +div");
  element.insertAdjacentHTML("beforeBegin", reportOptions);
  var btnCurrentMonth = document.querySelector("#Month-" + cronosUtil.getCurrentMonth());
  var btnLastMonth = document.querySelector("#Month-" + cronosUtil.getLastMonth());
  var btnTwiceLastMonth = document.querySelector("#Month-" + cronosUtil.getTwiceLastMonth());
  return {
    btnCurrentMonth: btnCurrentMonth,
    btnLastMonth: btnLastMonth,
    btnTwiceLastMonth: btnTwiceLastMonth
  };
}();