let viewManager = (function(){
    

    let buttonTemplate = (month) => `
            <button disabled id="Month-${month}" style="margin-rigth:1%;">
                Gerar relatório de ${cronosUtil.getMonthName(month)}
            </button>
        `;


    let reportOptions = `<div class="marginTop20" style="overflow:hidden; background-color: #E1E0E0; border: 2px solid #E1E0E0;-moz-border-radius: 4px;-webkit-border-radius: 4px;border-radius: 4px;margin-bottom: 10px;">
            <div style="float:left;width:2%;background-color:#E1E0E0;padding-top:5px;text-align:center">
            <i class="fa fa-pencil"></i>
            </div>
            <div style="float:left;  width:98%; background-color:#fff">        <div style="padding: 10px">
                <br>
                ${buttonTemplate(cronosUtil.getTwiceLastMonth())}
                ${buttonTemplate(cronosUtil.getLastMonth())}
                ${buttonTemplate(cronosUtil.getCurrentMonth())}
                </div>
                saldo do Mês: <span id="month-acc"></span>
                </div>
            
    </div></div>`;

    let element = document.querySelector(".PageTitle +div");
    element.insertAdjacentHTML("beforeBegin",reportOptions);
    
    let btnCurrentMonth = document.querySelector("#Month-"+cronosUtil.getCurrentMonth());
    let btnLastMonth = document.querySelector("#Month-"+cronosUtil.getLastMonth());
    let btnTwiceLastMonth = document.querySelector("#Month-"+cronosUtil.getTwiceLastMonth());
    let monthAccumulation = document.querySelector("#month-acc");

    return {
        btnCurrentMonth:btnCurrentMonth,
        btnLastMonth:btnLastMonth,
        btnTwiceLastMonth:btnTwiceLastMonth,
        monthAccumulation:monthAccumulation
    }

})();