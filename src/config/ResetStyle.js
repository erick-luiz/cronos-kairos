(function(){

  let btnsStyle = `
    .month-btn {
      box-shadow:inset 0px 1px 0px 0px #a4e271;
      background:linear-gradient(to bottom, #89c403 5%, #77a809 100%);
      background-color:#89c403;
      border-radius:6px;
      border:1px solid #74b807;
      display:inline-block;
      cursor:pointer;
      color:#ffffff;
      font-family:Arial;
      font-size:15px;
      font-weight:bold;
      padding:6px 24px;
      text-decoration:none;
      text-shadow:0px 1px 0px #528009;
    }
    .month-btn:hover {
      background:linear-gradient(to bottom, #77a809 5%, #89c403 100%);
      background-color:#77a809;
    }
    .month-btn:active {
      position:relative;
      top:1px;
    }
    `;

    var loaderStyleCss = `
      #overlay-plugin{
        position:fixed;
        background:rgba(0,0,0,0.8);
        width:100%;
        height:100%;
        top:0;left:0;
        z-index:10;
        display:flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
        color:#777;
        text-align:center;
        font-family:"Gill sans", sans-serif
      }
      #overlay-plugin #modal{
        margin:auto;
        position:absolute;
        background:#ffffff;
        z-index:2;
        border-radius:10px;
        padding:2%
      }
      #overlay-plugin h1{
        margin:1em 0;
        border-bottom:1px dashed;
        padding-bottom:1em;
        font-weight:lighter
      }
      #overlay-plugin p{
        font-style:italic
      }
      #overlay-plugin .loader{
        margin:0 0 2em;
        height:100px;
        width:20%;
        text-align:center;
        padding:1em;
        margin:0 auto 1em;
        display:inline-block;
        vertical-align:top
      }
      .hide{
        display:none !important
      }
      svg path,svg rect{
        fill:#FF6700
      }`;

    var confirmModalStyle = `
      .modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        visibility: hidden;
        transform: scale(1.1);
        transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
      }
      .modal-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 1rem 1.5rem;
          width: 24rem;
          border-radius: 0.5rem;
      }
      .close-button {
          float: right;
          width: 1.5rem;
          line-height: 1.5rem;
          text-align: center;
          cursor: pointer;
          border-radius: 0.25rem;
          background-color: lightgray;
      }
      .close-button:hover {
          background-color: darkgray;
      }
      .show-modal {
          opacity: 1;
          visibility: visible;
          transform: scale(1.0);
          transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
      }

      .select-hours {
        padding: 0.1rem
      }
    `;

    var errorMsgStyle = `
      .alert-msg {
        padding: 10px;
        background-color: #f44336;
        color: white;
        margin: 0.7rem;
      }
      
      .close-btn {
        margin-left: 15px;
        color: white;
        font-weight: bold;
        float: right;
        font-size: 16px;
        line-height: 10px;
        cursor: pointer;
        transition: 0.3s;
      }
      
      .close-btn:hover {
        color: black;
      }
    `; 

    GM_addStyle(btnsStyle);
    GM_addStyle(loaderStyleCss);
    GM_addStyle(confirmModalStyle);
    GM_addStyle(errorMsgStyle);

})();