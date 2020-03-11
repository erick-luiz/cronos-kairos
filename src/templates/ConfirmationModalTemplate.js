ConfirmationModalTemplate = (function(){

    let modalHtml = `
        <div class="modal-content">
            <span class="close-button">×</span>
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

    return {
        toggle: () => modal.classList.toggle("show-modal"),
        comfirmInput: comfirmInput,
        notComfirmInput: notComfirmInput
    }

})();