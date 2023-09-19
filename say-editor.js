export default class SayEditor extends HTMLElement {
  constructor() {
    super();
    this.asyncEditorPromise = new Promise((res) => this._asyncEditorPromiseResolver = res);
  }

  baseUrl = "https://embeddable.gelinkt-notuleren.lblod.info/assets/";
  styleFiles = ["frontend-embeddable-notule-editor.css", "vendor.css"];
  javascriptFiles = [
    "vendor.js",
    "frontend-embeddable-notule-editor-app.js",
    "frontend-embeddable-notule-editor.js"
  ];

  async connectedCallback() {
    this.shadow = this.attachShadow({ mode: "closed" });
    const shadow = this.shadow;
    /* shadow.appendChild(document.getElementById("extra-styles").content.cloneNode(true)); */
    const extraStylesNode = document.createElement("style");
    extraStylesNode.textContent = this.extraStyle;
    shadow.appendChild(extraStylesNode);

    this.styleFiles.forEach((file) => {
      const link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("type", "text/css");
      link.setAttribute("href", this.baseUrl + file);
      shadow.appendChild(link);
    });

    await this.ensureJsLoaded();
    this.boot();
  }

  ensureJsLoaded() {
    const shadow = this.shadow;
    if (!document.sayEditorLoadPromise) {
      document.sayEditorLoadPromise = new Promise((resolve) => {
        const walkJsFiles = () => {
          if (this.javascriptFiles.length) {
            // only need to be loaded once
            const [file, ...rest] = this.javascriptFiles;
            this.javascriptFiles = rest;
            const scriptTag = document.createElement("script");
            scriptTag.setAttribute("src", this.baseUrl + file);
            scriptTag.addEventListener("load", () => {
              walkJsFiles();
            });
            shadow.appendChild(scriptTag);
          } else {
            resolve();
          }
        };
        walkJsFiles();
      });
    }

    return document.sayEditorLoadPromise;
  }

  boot() {
    const shadow = this.shadow;

    let App = require('frontend-embeddable-notule-editor/app').default.create({
      autoboot: false,
      name: 'frontend-embeddable-notule-editor'
    });

    const editorContainer = document.createElement("div");
    shadow.appendChild(editorContainer);

    App.visit('/', { rootElement: editorContainer }).then(() => {
      const editorElement = editorContainer.getElementsByClassName('notule-editor')[0];
      const arrayOfPluginNames = ['citation', 'rdfa-date'];
      const userConfigObject = {};
      editorElement.initEditor(arrayOfPluginNames, userConfigObject);
      this.editorElement = editorElement;
      this._asyncEditorPromiseResolver(editorElement);
    });
  }

  get extraStyle() {
    return `:root, :host {
         --au-white:#ffffff;
         --au-gray-100:#f7f9fc;
         --au-gray-200:#e8ebee;
         --au-gray-300:#cfd5dd;
         --au-gray-400:#afb9c5;
         --au-gray-500:#8695a8;
         --au-gray-600:#7f8b99;
         --au-gray-700:#687483;
         --au-gray-800:#4f5864;
         --au-gray-900:#333332;
         --au-gray-1000:#000000;
         --au-blue-100:#f4f7fb;
         --au-blue-200:#e4ebf5;
         --au-blue-300:#b2ccef;
         --au-blue-500:#5990de;
         --au-blue-600:#3779d7;
         --au-blue-700:#0055cc;
         --au-blue-800:#004ab2;
         --au-blue-900:#003b8e;
         --au-yellow-100:#fff9d5;
         --au-yellow-200:#fff29b;
         --au-yellow-300:#ffe615;
         --au-yellow-400:#ffc515;
         --au-yellow-600:#7f6e3b;
         --au-yellow-900:#473d21;
         --au-orange-200:#fff9e8;
         --au-orange-300:#ffeeb9;
         --au-orange-400:#ffe49c;
         --au-orange-500:#ffa10a;
         --au-orange-600:#d07b06;
         --au-orange-700:#9f5804;
         --au-red-100:#fdf7f7;
         --au-red-200:#fbeded;
         --au-red-300:#f4c8c9;
         --au-red-400:#f1aeae;
         --au-red-500:#e77474;
         --au-red-600:#d2373c;
         --au-red-700:#aa2729;
         --au-red-900:#470000;
         --au-green-100:#f8fcf9;
         --au-green-200:#ecf6ee;
         --au-green-300:#c5e5cc;
         --au-green-400:#b1dcbb;
         --au-green-500:#009e47;
         --au-green-700:#007a37;
         --au-green-900:#323d08;
         --vl-white:#ffffff;
         --vl-grey-05:#f7f9fc;
         --vl-grey-10:#e8ebee;
         --vl-grey-20:#cfd5dd;
         --vl-grey-50:#8695a8;
         --vl-grey-70:#687483;
         --vl-grey-100:#333332;
         --vl-grey-110:#000000;
         --vl-yellow-100:#ffe615;
         --vl-blue-15:#e4ebf5;
         --vl-blue-30:#b2ccef;
         --vl-blue-65:#5990de;
         --vl-blue-100:#0055cc;
         --vl-blue-110:#003b8e;
         --vl-green-10:#ecf6ee;
         --vl-green-30:#c5e5cc;
         --vl-green-40:#b1dcbb;
         --vl-green-100:#009e47;
         --vl-green-130:#007a37;
         --vl-red-10:#fbeded;
         --vl-red-30:#f4c8c9;
         --vl-red-40:#f1aeae;
         --vl-red-100:#d2373c;
         --vl-red-130:#aa2729;
         --vl-orange-10:#fff9e8;
         --vl-orange-30:#ffeeb9;
         --vl-orange-40:#ffe49c;
         --vl-orange-100:#ffa10a;
         --vl-orange-110:#d07b06;
         --vl-orange-120:#9f5804;
         --vl-lime-100:#a3cc00;
         --vl-lime-120:#6f8b00;
         --vl-brick-100:#d53d5e;
         --vl-brick-120:#85273b;
         --vl-chocolate-100:#d26e25;
         --vl-chocolate-120:#904e1d;
         --vl-picton-100:#32b1e9;
         --vl-picton-120:#16465b;
         --au-page-bg:#ffffff;
         --au-select-text-color:#333332;
         --au-select-text-bg:#e4ebf5;
         --au-divider-color:#e8ebee;
         --au-outline-color:#5990de;
         --au-global-font-size:1.5rem;
         --au-global-line-height:1.5;
         --au-font:"flanders-sans",BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
         --au-font-secondary:"flanders-serif";
         --au-font-tertiary:courier,monospace;
         --au-light:300;
         --au-regular:400;
         --au-medium:500;
         --au-bold:700;
         --au-base:1.5rem;
         --au-para:1.8rem;
         --au-para-small:1.6rem;
         --au-lead:2.2rem;
         --au-lead-medium:2rem;
         --au-lead-small:1.8rem;
         --au-small:1.4rem;
         --au-tiny:1.3rem;
         --au-h-functional-small:1.3rem;
         --au-h-functional:1.5rem;
         --au-h6:1.6rem;
         --au-h5:1.8rem;
         --au-h4:2rem;
         --au-h3-small:2.2rem;
         --au-h3:2.6rem;
         --au-h2-small:2.6rem;
         --au-h2:3.2rem;
         --au-h1-small:3rem;
         --au-h1-medium:4rem;
         --au-h1:4.4rem;
         --au-icon-size:1.3rem;
         --au-icon-size-medium:1.6rem;
         --au-icon-size-large:1.9rem;
         --au-radius:0.3rem;
         --au-border:0.2rem;
         --au-outline-border:0.3rem;
         --au-outline-border-style:solid;
         --au-outline:#5990de 0.3rem solid;
         --au-outline-offset:0.2rem;
         --au-outline-offset-negative:-0.3rem;
         --au-duration:0.125s;
         --au-easing:cubic-bezier(0.19, 1, 0.22, 1);
         --au-transition:0.125s cubic-bezier(0.19, 1, 0.22, 1);
         --au-z-index-alpha:1;
         --au-z-index-beta:2;
         --au-z-index-gamma:3;
         --duet-color-primary:var(--au-blue-700);
         --duet-color-text:var(--au-gray-1000);
         --duet-color-text-active:var(--au-white);
         --duet-color-placeholder:var(--au-gray-700);
         --duet-color-button:var(--au-white);
         --duet-color-surface:var(--au-white);
         --duet-color-overlay:rgba(0, 0, 0, 0.3);
         --duet-font:var(--au-font);
         --duet-font-normal:400;
         --duet-font-bold:500;
         --duet-radius:0.3rem;
         --duet-z-index:10
       }

       :host {
         font-family: var(--au-font);
         font-size: 62.5%; /* [4] */
         min-height: 100%; /* [3] */
         background-color: var(--au-page-bg);
         text-rendering: optimizeLegibility;
         -webkit-overflow-scrolling: touch;
       }

       :host {
         font-size: var(--au-global-font-size); /* [4] */
         line-height: var(--au-global-line-height); /* [1] */
       }

       ::-moz-selection {
         color: var(--au-select-text-color);
         background-color: var(--au-select-text-bg);
       }

       ::selection {
         color: var(--au-select-text-color);
         background-color: var(--au-select-text-bg);
       }`;
  }
}
