var PDF = (function(){

    var configs = {
        heightWindow: 700,
        widthWindow: 700,
        template: `
            <html>
                <head>
                    <style>
                        {{style}}  
                    </style>
                    <title>{{title}}</title>
                </head>
                <body>
                    {{data}}
                </body>
            </html>`,
        templateData:{"style":"","title":"","data":""},
        setWidthWindow(width){
            this.widthWindow = width | this.widthWindow;
        },
        setHeightWindow(height){
            this.heightWindow = height | this.heightWindow;
        }, 
        changeTemplate(selector, value){
            this.templateData[selector] = value;
        }
    }

    function print(){
        
        let currentTamplate = configs.template;
        let data = configs.templateData;
        for (var key in data) {
            let selector = "{{"+key+"}}";
            currentTamplate = currentTamplate.replace(selector, data[key]);
        }

        var win  = window.open('', '', 'height='+configs.widthWindow+',width='+configs.heightWindow);
        win.document.write(currentTamplate);
        win.print(); 
        win.document.close();
    };

    function generate(style, title, data){
        configs.changeTemplate('style', style);
        configs.changeTemplate('title', title);
        configs.changeTemplate('data', data);
    }; 
    
    return {
        generate: generate, 
        print: print, 
        configs: configs
    };

})();