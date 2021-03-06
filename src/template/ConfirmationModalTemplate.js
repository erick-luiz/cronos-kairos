var ConfirmationModalTemplate = (function(){

    let modalHtml = `
        <div class="modal-content">
            <span class="close-button">×</span>
            <h2>Configurações do relatório</h2>
            <br/>
            Remover dias: <input type="text" id="days-to-exclude" value=""/>
            <br /><br /><br />
            Carga Horaria do Calculo
            <select id="weekly-hourly-load">
                <option value="40">40</option>
                <option value="44">44</option>
            </select>
            <br /><br />
            <h3>Deseja atualizar os dados?</h3>
            <br /><br />
            <input type="button" value="Sim" id="comfirm-yes" /> <input type="button" id="comfirm-no" value="Não, use da busca anterior" /> 
        </div>
    `;

    let modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = modalHtml;
    document.querySelector('body').appendChild(modal);

    let closeButton = modal.querySelector(".close-button");
    closeButton.addEventListener("click", function(){ modal.classList.remove("show-modal") });
    let comfirmInput = modal.querySelector("#comfirm-yes");
    let notComfirmInput = modal.querySelector("#comfirm-no");
    let daysToExcludeInput = modal.querySelector("#days-to-exclude");
    let weeklyHourlyLoadSelect = modal.querySelector("#weekly-hourly-load");

    let toggle = function(){
        modal.classList.toggle("show-modal")
    }

    return {
        toggle: toggle,
        comfirmInput: comfirmInput,
        notComfirmInput: notComfirmInput,
        daysToExcludeInput: daysToExcludeInput,
        weeklyHourlyLoadSelect: weeklyHourlyLoadSelect
    }

})();