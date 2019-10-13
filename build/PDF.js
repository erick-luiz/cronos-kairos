"use strict";

require("core-js/modules/es6.regexp.replace");

var PDF = function () {
  var configs = {
    heightWindow: 700,
    widthWindow: 700,
    template: "\n            <html>\n                <head>\n                    <style>\n                        {{style}}  \n                    </style>\n                    <title>{{title}}</title>\n                </head>\n                <body>\n                    {{data}}\n                </body>\n            </html>",
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
      this.templateData[selector] = value;
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