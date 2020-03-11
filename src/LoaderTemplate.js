var LoaderTemplate = (function(){

        let loaderHtml = `
            <div id="modal">
                <div id="header">
                    <h1>Aguarde um minuto</h1>
                </div>
                <div id="body">
                    <p>Estamos carregando os dados</p>
                </div>
                <div class="loader loader--style4" title="3">
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     width="24px" height="24px" viewBox="0 0 24 24" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                    <rect x="0" y="0" width="4" height="7" fill="#333">
                      <animateTransform  attributeType="xml"
                        attributeName="transform" type="scale"
                        values="1,1; 1,3; 1,1"
                        begin="0s" dur="0.6s" repeatCount="indefinite" />
                    </rect>
                    <rect x="10" y="0" width="4" height="7" fill="#333">
                      <animateTransform  attributeType="xml"
                        attributeName="transform" type="scale"
                        values="1,1; 1,3; 1,1"
                        begin="0.2s" dur="0.6s" repeatCount="indefinite" />
                    </rect>
                    <rect x="20" y="0" width="4" height="7" fill="#333">
                      <animateTransform  attributeType="xml"
                        attributeName="transform" type="scale"
                        values="1,1; 1,3; 1,1"
                        begin="0.4s" dur="0.6s" repeatCount="indefinite" />
                    </rect>
                  </svg>
                </div>
            </div>`;

        let loader = document.createElement('div');
        loader.setAttribute('id','overlay-plugin');
        loader.classList.add('hide');
        loader.innerHTML = loaderHtml;
        document.querySelector('body').appendChild(loader);

        let hide = function(){
            loader.classList.add('hide');
        }

        let show = function(){
            loader.classList.remove('hide');
        }

        return {
            hide:hide,
            show:show
        };
})();