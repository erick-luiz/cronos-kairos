var ConfirmationModalTemplate = (function(){

    let modalHtml = `
        <div class="modal-content">
            <span class="close-button">×</span>
            <h2>Configurações do relatório</h2>
            <br/>
            Carga Horaria do Calculo
            <select id="weekly-hourly-load" class="select-hours">
                <option value="40" selected>40</option>
                <option value="44">44</option>
                <option value="30">30</option>
            </select>
            <br /><br /><br />
            Remover dias: <input type="text" id="days-to-exclude" value=""/>
            <br /><br /><br />
            <input type="button" value="Nova consulta" id="comfirm-yes" /> <input type="button" id="comfirm-no" value="Usar consulta anterior" /> 
        </div>
    `;

    let modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = modalHtml;
    document.querySelector('body').appendChild(modal);

    // TODO: ajustar nomes de variaveis
    let closeButton = modal.querySelector(".close-button");
    closeButton.addEventListener("click", function(){ modal.classList.remove("show-modal") });
    let comfirmInput = modal.querySelector("#comfirm-yes");
    let notComfirmInput = modal.querySelector("#comfirm-no");
    let daysToExcludeInput = modal.querySelector("#days-to-exclude");
    let weeklyHourlyLoadSelect = modal.querySelector("#weekly-hourly-load");

    let toggle = function(){
        modal.classList.toggle("show-modal")
    }

    let toggleOldSearchBtn = function(show){
        if(show){
            notComfirmInput.classList.remove("hide");
        } else {
            notComfirmInput.classList.add("hide");
        }
    }

    return {
        toggle: toggle,
        comfirmInput: comfirmInput,
        notComfirmInput: notComfirmInput,
        daysToExcludeInput: daysToExcludeInput,
        weeklyHourlyLoadSelect: weeklyHourlyLoadSelect,
        toggleOldSearchBtn: toggleOldSearchBtn
    }

})();