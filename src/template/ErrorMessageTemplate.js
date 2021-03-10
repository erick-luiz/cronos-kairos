var ErrorMessageTemplate = (function(){

    const _errorComponent = document.createElement('div');
    const _closeBtn = document.createElement('span');
    const _messageP = document.createElement('p');

    _errorComponent.setAttribute('id','alert-msg');
    _errorComponent.classList.add('hide');
    _errorComponent.classList.add('alert-msg');
    _errorComponent.appendChild(_closeBtn);
    _errorComponent.appendChild(_messageP);
    document.querySelector('#menu-viewer').appendChild(_errorComponent);

    let _hide = function(){
        _errorComponent.classList.add('hide');
    }

    _closeBtn.classList.add('close-btn');
    _closeBtn.innerText = 'x';
    _closeBtn.addEventListener("click", function(){
        _hide();
    });

    let show = function(msg){
        if(msg){
            _messageP.innerHTML = msg;
            _errorComponent.classList.remove('hide');
        }
    }

    return {
        show:show
    };

})();
