function t(t,e,i,s){var r,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,i,n):r(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,m=g.trustedTypes,f=m?m.emptyScript:"",v=g.reactiveElementPolyfillSupport,y=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,r=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??$)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,v?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.1");const w=globalThis,A=w.trustedTypes,k=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+S,P=`<${C}>`,O=document,T=()=>O.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,N="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,H=/>/g,D=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,L=/"/g,I=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),V=new WeakMap,q=O.createTreeWalker(O,129);function Y(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=z;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,d=0;for(;d<i.length&&(n.lastIndex=d,c=n.exec(i),null!==c);)d=n.lastIndex,n===z?"!--"===c[1]?n=R:void 0!==c[1]?n=H:void 0!==c[2]?(I.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=D):void 0!==c[3]&&(n=D):n===D?">"===c[0]?(n=r??z,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?D:'"'===c[3]?L:j):n===L||n===j?n=D:n===R||n===H?n=z:(n=D,r=void 0);const h=n===D&&t[e+1].startsWith("/>")?" ":"";o+=n===z?i+P:l>=0?(s.push(a),i.slice(0,l)+E+i.slice(l)+S+h):i+S+(-2===l?e:h)}return[Y(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[c,l]=K(t,e);if(this.el=J.createElement(c,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=l[o++],i=s.getAttribute(t).split(S),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?it:X}),s.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(I.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],T()),q.nextNode(),a.push({type:2,index:++r});s.append(t[e],T())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)a.push({type:7,index:r}),t+=S.length-1}r++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,s){if(e===W)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=U(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=Z(t,r._$AS(t,e.values),r,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);q.currentNode=s;let r=q.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new st(r,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(r=q.nextNode(),o++)}return q.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),U(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new J(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Q(this.O(T()),this.O(T()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=Z(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==W,o&&(this._$AH=t);else{const s=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=Z(this,s[i+n],e,n),a===W&&(a=this._$AH[n]),o||=!U(a)||a!==this._$AH[n],a===F?t=F:t!==F&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class it extends X{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??F)===W)return;const i=this._$AH,s=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==F&&(i===F||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const rt=w.litHtmlPolyfillSupport;rt?.(J,Q),(w.litHtmlVersions??=[]).push("3.3.1");const ot=globalThis;class nt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Q(e.insertBefore(T(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const at=ot.litElementPolyfillSupport;at?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.1");const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},lt={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:$},dt=(t=lt,e,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t)}}throw Error("Unsupported decorator location: "+s)};function ht(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}const pt=n`
  :host {
    display: block;
  }

  ha-card {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid var(--divider-color);
  }

  .card-header-content {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
  }

  .card-header ha-icon {
    color: var(--primary-color);
    --mdc-icon-size: 24px;
  }

  .card-title {
    font-size: 20px;
    font-weight: 500;
    color: var(--primary-text-color);
    margin: 0;
  }

  .card-count {
    background: var(--primary-color);
    color: var(--text-primary-color);
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
  }

  .card-content {
    flex: 1;
    overflow-y: auto;
    padding: 8px;
  }

  .package-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .package-item {
    background: var(--card-background-color);
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    padding: 12px 16px;
    transition: all 0.2s ease-in-out;
  }

  .package-item:hover {
    background: var(--secondary-background-color);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }

  .package-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .package-tracking {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .tracking-link {
    font-size: 16px;
    font-weight: 600;
    color: var(--primary-color);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: color 0.2s;
  }

  .tracking-link:hover {
    color: var(--accent-color);
    text-decoration: underline;
  }

  .tracking-link ha-icon {
    --mdc-icon-size: 18px;
  }

  .copy-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: var(--secondary-text-color);
    display: flex;
    align-items: center;
    border-radius: 4px;
    transition: all 0.2s;
  }

  .copy-button:hover {
    background: var(--divider-color);
    color: var(--primary-text-color);
  }

  .copy-button ha-icon {
    --mdc-icon-size: 18px;
  }

  .package-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .package-detail {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: var(--secondary-text-color);
  }

  .package-detail ha-icon {
    --mdc-icon-size: 16px;
    color: var(--primary-color);
  }

  .package-detail-label {
    font-weight: 500;
    min-width: 80px;
  }

  .package-detail-value {
    flex: 1;
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
    border-top: 1px solid var(--divider-color);
    font-size: 12px;
    color: var(--secondary-text-color);
    gap: 6px;
  }

  .card-footer ha-icon {
    --mdc-icon-size: 14px;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 16px;
    text-align: center;
    color: var(--secondary-text-color);
  }

  .empty-state ha-icon {
    --mdc-icon-size: 64px;
    color: var(--disabled-text-color);
    margin-bottom: 16px;
  }

  .empty-state-title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 8px;
    color: var(--primary-text-color);
  }

  .empty-state-description {
    font-size: 14px;
    max-width: 300px;
  }

  .summary-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px 16px;
    background: var(--secondary-background-color);
    border-bottom: 1px solid var(--divider-color);
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: var(--card-background-color);
    border-radius: 6px;
    font-size: 13px;
  }

  .stat-item ha-icon {
    --mdc-icon-size: 16px;
    color: var(--primary-color);
  }

  .stat-label {
    color: var(--secondary-text-color);
  }

  .stat-value {
    font-weight: 600;
    color: var(--primary-text-color);
  }

  /* Scrollbar styling */
  .card-content::-webkit-scrollbar {
    width: 6px;
  }

  .card-content::-webkit-scrollbar-track {
    background: transparent;
  }

  .card-content::-webkit-scrollbar-thumb {
    background: var(--divider-color);
    border-radius: 3px;
  }

  .card-content::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-text-color);
  }

  /* Responsive design */
  @media (max-width: 600px) {
    .card-header {
      padding: 12px;
    }

    .card-title {
      font-size: 18px;
    }

    .package-item {
      padding: 10px 12px;
    }

    .tracking-link {
      font-size: 14px;
    }
  }
`;function ut(t){const e=t.toLowerCase(),i={ups:"mdi:package-variant",usps:"mdi:email",fedex:"mdi:truck-fast",dhl:"mdi:airplane",amazon:"mdi:amazon","ui.com":"mdi:package-variant-closed"};for(const[t,s]of Object.entries(i))if(e.includes(t))return s;return"mdi:package"}let gt=class extends nt{setConfig(t){this.config=t}render(){if(!this.hass||!this.config)return B``;const t=this._getTrackingNumberEntities();return B`
      <div class="card-config">
        <!-- Entity Selection -->
        <div class="section">
          <div class="section-title">Entity</div>
          <div class="option">
            <div class="option-label">Entity</div>
            <div class="option-description">
              Select a sensor entity that contains tracking number data
            </div>
            <ha-combo-box
              .hass=${this.hass}
              .label=${"Entity"}
              .value=${this.config.entity||""}
              .items=${t.map(t=>({value:t.entity_id,label:`${t.friendly_name} (${t.entity_id})`}))}
              @value-changed=${t=>{const e=t.detail.value;e&&this._comboBoxValueChanged(e,"entity")}}
            ></ha-combo-box>
            ${0===t.length?B`
                  <div class="no-entities">
                    No sensor entities ending with "_tracking_numbers" found.
                    Please ensure you have a tracking number integration configured.
                  </div>
                `:""}
          </div>

          <div class="option">
            <div class="option-label">Title (Optional)</div>
            <div class="option-description">
              Custom title for the card. Leave empty to use entity friendly name
            </div>
            <ha-textfield
              .label=${"Title"}
              .value=${this.config.title||""}
              placeholder="Tracking Numbers"
              @input=${t=>this._valueChanged(t,"title")}
            ></ha-textfield>
          </div>
        </div>

        <!-- Display Options -->
        <div class="section">
          <div class="section-title">Display Options</div>

          <div class="switch-row">
            <div class="switch-label">
              <div class="switch-title">Show Summary</div>
              <div class="switch-description">
                Display summary statistics by carrier
              </div>
            </div>
            <ha-switch
              .checked=${!1!==this.config.show_summary}
              @change=${t=>this._switchChanged(t,"show_summary")}
            ></ha-switch>
          </div>

          <div class="switch-row">
            <div class="switch-label">
              <div class="switch-title">Show Carrier</div>
              <div class="switch-description">
                Display carrier information for each package
              </div>
            </div>
            <ha-switch
              .checked=${!1!==this.config.show_carrier}
              @change=${t=>this._switchChanged(t,"show_carrier")}
            ></ha-switch>
          </div>
        </div>

        <!-- Sorting Options -->
        <div class="section">
          <div class="section-title">Sorting</div>

          <div class="option">
            <div class="option-label">Sort By</div>
            <div class="option-description">
              Choose how to sort the packages
            </div>
            <ha-select
              .label=${"Sort By"}
              .value=${this.config.sort_by||"last_updated"}
              @selected=${t=>{this._selectChanged(t.detail.value,"sort_by")}}
              @closed=${t=>t.stopPropagation()}
            >
              <mwc-list-item value="last_updated">Last Updated</mwc-list-item>
              <mwc-list-item value="first_seen">First Seen</mwc-list-item>
              <mwc-list-item value="carrier">Carrier</mwc-list-item>
              <mwc-list-item value="tracking_number">Tracking Number</mwc-list-item>
            </ha-select>
          </div>

          <div class="option">
            <div class="option-label">Sort Direction</div>
            <div class="option-description">
              Sort in ascending or descending order
            </div>
            <ha-select
              .label=${"Sort Direction"}
              .value=${this.config.sort_direction||"desc"}
              @selected=${t=>{this._selectChanged(t.detail.value,"sort_direction")}}
              @closed=${t=>t.stopPropagation()}
            >
              <mwc-list-item value="desc">Newest First</mwc-list-item>
              <mwc-list-item value="asc">Oldest First</mwc-list-item>
            </ha-select>
          </div>
        </div>

        <!-- Advanced Options -->
        <div class="section">
          <div class="section-title">Advanced</div>

          <div class="option">
            <div class="option-label">Maximum Items</div>
            <div class="option-description">
              Limit the number of packages displayed. Leave empty to show all
            </div>
            <ha-textfield
              .label=${"Maximum Items"}
              .value=${this.config.max_items||""}
              placeholder="Unlimited"
              type="number"
              min="1"
              @input=${t=>this._valueChanged(t,"max_items")}
            ></ha-textfield>
          </div>
        </div>
      </div>
    `}_getTrackingNumberEntities(){return this.hass?Object.keys(this.hass.states).filter(t=>t.startsWith("sensor.")&&t.endsWith("_tracking_numbers")).map(t=>({entity_id:t,friendly_name:this.hass.states[t].attributes.friendly_name||t})).sort((t,e)=>t.friendly_name.localeCompare(e.friendly_name)):[]}_comboBoxValueChanged(t,e){if(!this.config||!this.hass)return;if(this.config[e]===t)return;const i={...this.config,[e]:t};this.config=i;const s=new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0});this.dispatchEvent(s)}_selectChanged(t,e){if(!this.config||!this.hass)return;if(this.config[e]===t)return;const i={...this.config,[e]:t};this.config=i;const s=new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0});this.dispatchEvent(s)}_valueChanged(t,e){if(!this.config||!this.hass)return;const i=t.target;let s;if(s=""===i.value||void 0===i.value?void 0:"max_items"===e?i.value?parseInt(i.value,10):void 0:i.value,this.config[e]===s)return;const r={...this.config};void 0===s||""===s?delete r[e]:r[e]=s,this.config=r;const o=new CustomEvent("config-changed",{detail:{config:r},bubbles:!0,composed:!0});this.dispatchEvent(o)}_switchChanged(t,e){if(!this.config||!this.hass)return;const i=t.target.checked;if(this.config[e]===i)return;const s={...this.config,[e]:i};this.config=s;const r=new CustomEvent("config-changed",{detail:{config:s},bubbles:!0,composed:!0});this.dispatchEvent(r)}};gt.styles=n`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .option {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .option-label {
      font-weight: 500;
      color: var(--primary-text-color);
      font-size: 14px;
    }

    .option-description {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: -4px;
    }

    ha-entity-picker,
    ha-textfield,
    ha-select,
    ha-combo-box {
      width: 100%;
    }

    .no-entities {
      padding: 8px 12px;
      background: var(--warning-color, #ffa726);
      color: var(--text-primary-color);
      border-radius: 4px;
      font-size: 13px;
      margin-top: 8px;
    }

    .switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;
    }

    .switch-label {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .switch-title {
      font-weight: 500;
      color: var(--primary-text-color);
      font-size: 14px;
    }

    .switch-description {
      font-size: 12px;
      color: var(--secondary-text-color);
    }

    ha-switch {
      margin-left: 16px;
    }

    .section {
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      padding: 16px;
      background: var(--card-background-color);
    }

    .section-title {
      font-weight: 600;
      color: var(--primary-text-color);
      font-size: 16px;
      margin-bottom: 12px;
    }
  `,t([ht({attribute:!1})],gt.prototype,"hass",void 0),t([ht({attribute:!1})],gt.prototype,"config",void 0),gt=t([ct("tracking-number-card-editor")],gt);console.info("%c TRACKING-NUMBER-CARD %c v4.0.0 ","color: white; background: #039be5; font-weight: bold; padding: 2px 4px; border-radius: 3px 0 0 3px;","color: #039be5; background: white; font-weight: bold; padding: 2px 4px; border-radius: 0 3px 3px 0;");let mt=class extends nt{setConfig(t){if(!t.entity)throw new Error("You need to define an entity");this.config={show_summary:!0,show_carrier:!0,sort_by:"last_updated",sort_direction:"desc",...t}}getCardSize(){return 3}static getConfigElement(){return document.createElement("tracking-number-card-editor")}static getStubConfig(){return{type:"custom:tracking-number-card",entity:"",show_summary:!0,show_carrier:!0,sort_by:"last_updated",sort_direction:"desc"}}render(){if(!this.config||!this.hass)return B``;const t=this.hass.states[this.config.entity];if(!t)return this._renderError("Entity not found");const e=t.attributes,i=function(t,e="last_updated",i="desc"){const s=[...t].sort((t,s)=>{let r,o;switch(e){case"first_seen":r=new Date(t.first_seen).getTime(),o=new Date(s.first_seen).getTime();break;case"last_updated":default:r=new Date(t.last_updated).getTime(),o=new Date(s.last_updated).getTime();break;case"carrier":r=t.carrier.toLowerCase(),o=s.carrier.toLowerCase();break;case"tracking_number":r=t.tracking_number.toLowerCase(),o=s.tracking_number.toLowerCase()}return r<o?"asc"===i?-1:1:r>o?"asc"===i?1:-1:0});return s}(e.packages||[],this.config.sort_by,this.config.sort_direction),s=this.config.max_items?i.slice(0,this.config.max_items):i;return B`
      <ha-card>
        ${this._renderHeader(e)}
        ${this.config.show_summary?this._renderSummary(e):""}
        <div class="card-content">
          ${s.length>0?this._renderPackageList(s):this._renderEmptyState()}
        </div>
        ${this._renderFooter(e)}
      </ha-card>
    `}_renderHeader(t){const e=this.config?.title||t.friendly_name||"Tracking Numbers",i=t.count||0,s=t.icon||"mdi:package-variant-closed";return B`
      <div class="card-header">
        <div class="card-header-content">
          <ha-icon .icon=${s}></ha-icon>
          <h2 class="card-title">${e}</h2>
        </div>
        <div class="card-count">${i}</div>
      </div>
    `}_renderSummary(t){if(!t.summary)return B``;const e=Object.entries(t.summary.by_carrier||{});return 0===e.length?B``:B`
      <div class="summary-stats">
        ${e.map(([t,e])=>B`
            <div class="stat-item">
              <ha-icon .icon=${ut(t)}></ha-icon>
              <span class="stat-label">${t}:</span>
              <span class="stat-value">${e}</span>
            </div>
          `)}
      </div>
    `}_renderPackageList(t){return B`
      <div class="package-list">
        ${t.map(t=>this._renderPackageItem(t))}
      </div>
    `}_renderPackageItem(t){return B`
      <div class="package-item">
        <div class="package-header">
          <div class="package-tracking">
            <a
              href=${t.link}
              target="_blank"
              rel="noopener noreferrer"
              class="tracking-link"
              title="Open tracking link"
            >
              ${t.tracking_number}
              <ha-icon icon="mdi:open-in-new"></ha-icon>
            </a>
            <button
              class="copy-button"
              @click=${()=>this._handleCopy(t.tracking_number)}
              title="Copy tracking number"
            >
              <ha-icon icon="mdi:content-copy"></ha-icon>
            </button>
          </div>
        </div>
        ${this._renderPackageDetails(t)}
      </div>
    `}_renderPackageDetails(t){const e=[];return this.config?.show_carrier&&e.push(B`
        <div class="package-detail">
          <ha-icon .icon=${ut(t.carrier)}></ha-icon>
          <span class="package-detail-label">Carrier:</span>
          <span class="package-detail-value">${t.carrier}</span>
        </div>
      `),0===e.length?B``:B`
      <div class="package-details">
        ${e}
      </div>
    `}_renderEmptyState(){return B`
      <div class="empty-state">
        <ha-icon icon="mdi:package-variant"></ha-icon>
        <div class="empty-state-title">No packages to track</div>
        <div class="empty-state-description">
          When you have packages to track, they will appear here.
        </div>
      </div>
    `}_renderFooter(t){return t.last_update?B`
      <div class="card-footer">
        <ha-icon icon="mdi:update"></ha-icon>
        <span>Last synced: ${function(t){const e=new Date(t),i=new Date,s=i.getTime()-e.getTime(),r=Math.floor(s/1e3),o=Math.floor(r/60),n=Math.floor(o/60),a=Math.floor(n/24);return r<60?"just now":o<60?`${o} minute${1!==o?"s":""} ago`:n<24?`${n} hour${1!==n?"s":""} ago`:a<7?`${a} day${1!==a?"s":""} ago`:e.toLocaleDateString(void 0,{month:"short",day:"numeric",year:e.getFullYear()!==i.getFullYear()?"numeric":void 0})}(t.last_update)}</span>
      </div>
    `:B``}_renderError(t){return B`
      <ha-card>
        <div class="card-header">
          <div class="card-header-content">
            <ha-icon icon="mdi:alert-circle"></ha-icon>
            <h2 class="card-title">Error</h2>
          </div>
        </div>
        <div class="card-content">
          <div class="empty-state">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
            <div class="empty-state-title">${t}</div>
          </div>
        </div>
      </ha-card>
    `}async _handleCopy(t){if(await async function(t){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(t),!0;{const e=document.createElement("textarea");e.value=t,e.style.position="fixed",e.style.left="-999999px",e.style.top="-999999px",document.body.appendChild(e),e.focus(),e.select();const i=document.execCommand("copy");return e.remove(),i}}catch(t){return console.error("Failed to copy text:",t),!1}}(t)){const e=new CustomEvent("hass-notification",{detail:{message:`Copied ${t} to clipboard`,duration:2e3},bubbles:!0,composed:!0});this.dispatchEvent(e)}}};mt.styles=pt,t([ht({attribute:!1})],mt.prototype,"hass",void 0),t([function(t){return ht({...t,state:!0,attribute:!1})}()],mt.prototype,"config",void 0),mt=t([ct("tracking-number-card")],mt),window.customCards=window.customCards||[],window.customCards.push({type:"tracking-number-card",name:"Tracking Number Card",description:"A modern card for displaying tracking numbers with clickable links",preview:!0,configurable:!0,documentationURL:"https://github.com/ljmerza/tracking-number-card"});export{mt as TrackingNumberCard};
//# sourceMappingURL=tracking-number-card.js.map
