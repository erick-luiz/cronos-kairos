(function(){
    let menuStyleCss = `
    .button {
      backface-visibility: hidden;
      position: relative;
      cursor: pointer;
      display: inline-block;
      white-space: nowrap;
      background: rgba(100%,100%,100%,0.773);
      border-radius: 5px;
      border: 1px solid #262626;
      border-width: 1px 1px 1px 1px;
      padding: 5px 37px 5px 15px;
      box-shadow: inset 1px -1px 1px 0px #ffffff,inset 0px -13px 16px rgba(13.096774193548388%,13.096774193548388%,13.096774193548388%,0.114),0px 2px 1px rgba(0%,0%,0%,0.214);
        color: #393939;
      font-size: 16px;
      font-family: Helvetica Neue;
      font-weight: 900;
      font-style: normal;
      text-shadow: 0px 1px 0px #ffffff
      }
      .button > div {
        color: #999999;
      font-size: 10px;
      font-family: Helvetica Neue;
      font-weight: initial;
      font-style: normal;
      text-align: center;
      margin: 0px 0px 0px 0px
      }
      .button > i {
        font-size: 1em;
      background: rgba(74.32258064516128%,74.32258064516128%,74.32258064516128%,0.558);
      border-radius: 2px;
      border: 0px solid #191717;
      border-width: 0px 0px 0px 1px;
      padding: 7px 7px 7px 7px;
      margin: 0px 0px 0px 0px;
      position: absolute;
      top: 0px;
      right: 0px;
      width: 32px;
      height: 32px;
      box-shadow: inset -1px -1px 1px #ffffff
      }
      .button > .ld {
        color: #cd6666;
      font-size: initial
      }
    `;

    var loaderStyleCss = `#overlay-plugin{position:fixed;background:rgba(0,0,0,0.8);width:100%;height:100%;top:0;left:0;z-index:10;display:flex;flex-direction:row;justify-content:center;align-items:center;color:#777;text-align:center;font-family:"Gill sans", sans-serif}#overlay-plugin #modal{margin:auto;position:absolute;background:#ffffff;z-index:2;border-radius:10px;padding:2%}#overlay-plugin h1{margin:1em 0;border-bottom:1px dashed;padding-bottom:1em;font-weight:lighter}#overlay-plugin p{font-style:italic}#overlay-plugin .loader{margin:0 0 2em;height:100px;width:20%;text-align:center;padding:1em;margin:0 auto 1em;display:inline-block;vertical-align:top}.hide{display:none !important}svg path,svg rect{fill:#FF6700}`;

    GM_addStyle(menuStyleCss);
    GM_addStyle(loaderStyleCss);

})();