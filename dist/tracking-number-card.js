function t(t,e,i,s){var r,a=arguments.length,o=a<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(o=(a<3?r(o):a>3?r(e,i,o):r(e,i))||o);return a>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let a=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new a(i,t,s)},n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:d,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,m=g.trustedTypes,v=m?m.emptyScript:"",f=g.reactiveElementPolyfillSupport,_=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!c(t,e),w={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);r?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const a=r.fromAttribute(e,t.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,r=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??b)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==r||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[_("elementProperties")]=new Map,$[_("finalized")]=new Map,f?.({ReactiveElement:$}),(g.reactiveElementVersions??=[]).push("2.1.1");const x=globalThis,k=x.trustedTypes,A=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+S,O=`<${C}>`,D=document,P=()=>D.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,z="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,R=/>/g,F=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,j=/"/g,L=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),q=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),V=new WeakMap,W=D.createTreeWalker(D,129);function Y(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,s=[];let r,a=2===e?"<svg>":3===e?"<math>":"",o=U;for(let e=0;e<i;e++){const i=t[e];let n,c,d=-1,l=0;for(;l<i.length&&(o.lastIndex=l,c=o.exec(i),null!==c);)l=o.lastIndex,o===U?"!--"===c[1]?o=M:void 0!==c[1]?o=R:void 0!==c[2]?(L.test(c[2])&&(r=RegExp("</"+c[2],"g")),o=F):void 0!==c[3]&&(o=F):o===F?">"===c[0]?(o=r??U,d=-1):void 0===c[1]?d=-2:(d=o.lastIndex-c[2].length,n=c[1],o=void 0===c[3]?F:'"'===c[3]?j:H):o===j||o===H?o=F:o===M||o===R?o=U:(o=F,r=void 0);const h=o===F&&t[e+1].startsWith("/>")?" ":"";a+=o===U?i+O:d>=0?(s.push(n),i.slice(0,d)+E+i.slice(d)+S+h):i+S+(-2===d?e:h)}return[Y(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,a=0;const o=t.length-1,n=this.parts,[c,d]=Z(t,e);if(this.el=K.createElement(c,i),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=W.nextNode())&&n.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=d[a++],i=s.getAttribute(t).split(S),o=/([.?@])?(.*)/.exec(e);n.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?it:X}),s.removeAttribute(t)}else t.startsWith(S)&&(n.push({type:6,index:r}),s.removeAttribute(t));if(L.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],P()),W.nextNode(),n.push({type:2,index:++r});s.append(t[e],P())}}}else if(8===s.nodeType)if(s.data===C)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)n.push({type:7,index:r}),t+=S.length-1}r++}}static createElement(t,e){const i=D.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===q)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const a=T(e)?void 0:e._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),void 0===a?r=void 0:(r=new a(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=J(t,r._$AS(t,e.values),r,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??D).importNode(e,!0);W.currentNode=s;let r=W.nextNode(),a=0,o=0,n=i[0];for(;void 0!==n;){if(a===n.index){let e;2===n.type?e=new Q(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new st(r,this,t)),this._$AV.push(e),n=i[++o]}a!==n?.index&&(r=W.nextNode(),a++)}return W.currentNode=D,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),T(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(D.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new K(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Q(this.O(P()),this.O(P()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(t,e=this,i,s){const r=this.strings;let a=!1;if(void 0===r)t=J(this,t,e,0),a=!T(t)||t!==this._$AH&&t!==q,a&&(this._$AH=t);else{const s=t;let o,n;for(t=r[0],o=0;o<r.length-1;o++)n=J(this,s[i+o],e,o),n===q&&(n=this._$AH[o]),a||=!T(n)||n!==this._$AH[o],n===B?t=B:t!==B&&(t+=(n??"")+r[o+1]),this._$AH[o]=n}a&&!s&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class it extends X{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??B)===q)return;const i=this._$AH,s=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==B&&(i===B||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const rt=x.litHtmlPolyfillSupport;rt?.(K,Q),(x.litHtmlVersions??=[]).push("3.3.1");const at=globalThis;class ot extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Q(e.insertBefore(P(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}ot._$litElement$=!0,ot.finalized=!0,at.litElementHydrateSupport?.({LitElement:ot});const nt=at.litElementPolyfillSupport;nt?.({LitElement:ot}),(at.litElementVersions??=[]).push("4.2.1");const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},lt=(t=dt,e,i)=>{const{kind:s,metadata:r}=i;let a=globalThis.litPropertyMetadata.get(r);if(void 0===a&&globalThis.litPropertyMetadata.set(r,a=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t)}}throw Error("Unsupported decorator location: "+s)};function ht(t){return(e,i)=>"object"==typeof i?lt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function pt(t){return ht({...t,state:!0,attribute:!1})}const ut=o`
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

  .card-header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .add-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    padding: 4px;
    cursor: pointer;
    color: var(--secondary-text-color);
    border-radius: 4px;
  }

  .add-button:hover {
    color: var(--primary-color);
    background: var(--divider-color);
  }

  .add-button ha-icon {
    --mdc-icon-size: 20px;
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

  .package-header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .manual-badge {
    background: var(--accent-color);
    color: var(--text-primary-color);
    border-radius: 999px;
    padding: 2px 8px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .remove-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    padding: 4px;
    cursor: pointer;
    color: var(--secondary-text-color);
    border-radius: 4px;
  }

  .remove-button[disabled] {
    opacity: 0.4;
    pointer-events: none;
  }

  .remove-button:hover {
    color: var(--error-color);
    background: var(--divider-color);
  }

  .remove-button ha-icon {
    --mdc-icon-size: 18px;
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

  /* One grid for all rows so values line up under the widest label. */
  .package-details {
    display: grid;
    grid-template-columns: auto auto 1fr;
    align-items: center;
    column-gap: 8px;
    row-gap: 4px;
  }

  .package-detail {
    display: contents;
    font-size: 14px;
    color: var(--secondary-text-color);
  }

  .package-detail > .status-chip {
    grid-column: 1 / -1;
    justify-self: start;
  }

  .package-detail ha-icon {
    --mdc-icon-size: 16px;
    color: var(--primary-color);
  }

  .package-detail-label {
    font-weight: 500;
    white-space: nowrap;
    /* Fits "Est. delivery:" so values line up across cards too */
    min-width: 7em;
  }

  .package-detail-value {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .order-link {
    color: var(--primary-color);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .order-link:hover {
    color: var(--accent-color);
    text-decoration: underline;
  }

  .order-link ha-icon {
    --mdc-icon-size: 14px;
  }

  .delivery-source {
    margin-left: 6px;
    padding: 1px 6px;
    border-radius: 999px;
    font-size: 11px;
    color: var(--secondary-text-color);
    background: var(--divider-color);
    white-space: nowrap;
  }

  .status-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.4;
  }

  .status-chip ha-icon {
    --mdc-icon-size: 16px;
    color: inherit;
  }

  .status-chip.status-delivered {
    color: var(--success-color, #2e7d32);
    background: color-mix(in srgb, var(--success-color, #2e7d32) 15%, transparent);
  }

  .status-chip.status-out-for-delivery {
    color: #0d9488;
    background: color-mix(in srgb, #0d9488 15%, transparent);
  }

  .status-chip.status-transit {
    color: var(--info-color, #0288d1);
    background: color-mix(in srgb, var(--info-color, #0288d1) 15%, transparent);
  }

  .status-chip.status-pending {
    color: var(--warning-color, #f9a825);
    background: color-mix(in srgb, var(--warning-color, #f9a825) 15%, transparent);
  }

  .status-chip.status-exception {
    color: var(--error-color, #c62828);
    background: color-mix(in srgb, var(--error-color, #c62828) 15%, transparent);
  }

  .status-chip.status-unknown,
  .status-chip.status-default {
    color: var(--secondary-text-color);
    background: var(--divider-color);
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

  .dialog-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0 24px 24px;
  }

  .dialog-fields {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .dialog-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .dialog-field label {
    font-weight: 600;
    color: var(--primary-text-color);
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .dialog-field .required-marker {
    color: var(--error-color);
    font-size: 14px;
  }

  .dialog-input {
    width: 100%;
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-size: 14px;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }

  .dialog-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 1px var(--primary-color);
  }

  .field-helper {
    font-size: 12px;
    color: var(--secondary-text-color);
  }

  .dialog-error {
    color: var(--error-color);
    font-size: 14px;
  }

  .dialog-helper {
    color: var(--secondary-text-color);
    font-size: 13px;
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
`;function gt(t){const e=new Date(t),i=new Date,s=i.getTime()-e.getTime(),r=Math.floor(s/1e3),a=Math.floor(r/60),o=Math.floor(a/60),n=Math.floor(o/24);return r<60?"just now":a<60?`${a} minute${1!==a?"s":""} ago`:o<24?`${o} hour${1!==o?"s":""} ago`:n<7?`${n} day${1!==n?"s":""} ago`:e.toLocaleDateString(void 0,{month:"short",day:"numeric",year:e.getFullYear()!==i.getFullYear()?"numeric":void 0})}function mt(t){const e=/^(\d{4})-(\d{2})-(\d{2})$/.exec(t.trim());return e?new Date(Number(e[1]),Number(e[2])-1,Number(e[3])):new Date(t)}function vt(t){const e=mt(t);if(!Number.isFinite(e.getTime()))return t;const i=new Date;return e.toLocaleDateString(void 0,{month:"short",day:"numeric",year:e.getFullYear()!==i.getFullYear()?"numeric":void 0})}function ft(t){const e=t=>{if(function(t){return!!t.delivered_date||"delivered"===(t.delivery_status??"").toLowerCase()}(t))return[2,0];const e=function(t){if(!t.estimated_delivery)return;const e=mt(t.estimated_delivery);return Number.isFinite(e.getTime())?new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime():void 0}(t);return void 0===e?[1,0]:[0,e]};return[...t].sort((t,i)=>{const[s,r]=e(t),[a,o]=e(i);return s!==a?s-a:r-o})}function _t(t,e="first_seen",i="desc"){if("estimated_delivery"===e)return ft(_t(t,"first_seen",i));const s=(...t)=>{for(const e of t){if(!e)continue;const t=new Date(e).getTime();if(Number.isFinite(t))return t}return 0},r=t=>(t??"").toLowerCase(),a=[...t].sort((t,a)=>{let o,n;switch(e){case"first_seen":default:o=s(t.first_seen,t.last_updated),n=s(a.first_seen,a.last_updated);break;case"last_updated":o=s(t.last_updated,t.first_seen),n=s(a.last_updated,a.first_seen);break;case"carrier":o=r(t.carrier),n=r(a.carrier);break;case"tracking_number":o=r(t.tracking_number),n=r(a.tracking_number)}return o<n?"asc"===i?-1:1:o>n?"asc"===i?1:-1:0});return a}function yt(t){const e=t.toLowerCase(),i={ups:"mdi:package-variant",usps:"mdi:email",fedex:"mdi:truck-fast",dhl:"mdi:airplane",amazon:"mdi:amazon","ui.com":"mdi:package-variant-closed"};for(const[t,s]of Object.entries(i))if(e.includes(t))return s;return"mdi:package"}let bt=class extends ot{setConfig(t){const e={...t},i=e.sort_by;i&&"last_updated"!==i||(e.sort_by="first_seen"),this.config=e}render(){if(!this.hass||!this.config)return I``;const t=this._getTrackingNumberEntities();return I`
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
            ${0===t.length?I`
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

          <div class="switch-row">
            <div class="switch-label">
              <div class="switch-title">Show Order</div>
              <div class="switch-description">
                Display the retailer order number and link when available
              </div>
            </div>
            <ha-switch
              .checked=${!1!==this.config.show_order}
              @change=${t=>this._switchChanged(t,"show_order")}
            ></ha-switch>
          </div>

          <div class="switch-row">
            <div class="switch-label">
              <div class="switch-title">Show Status</div>
              <div class="switch-description">
                Display the delivery status chip
              </div>
            </div>
            <ha-switch
              .checked=${!1!==this.config.show_status}
              @change=${t=>this._switchChanged(t,"show_status")}
            ></ha-switch>
          </div>

          <div class="switch-row">
            <div class="switch-label">
              <div class="switch-title">Show Estimated Delivery</div>
              <div class="switch-description">
                Display the estimated delivery date
              </div>
            </div>
            <ha-switch
              .checked=${!1!==this.config.show_estimated_delivery}
              @change=${t=>this._switchChanged(t,"show_estimated_delivery")}
            ></ha-switch>
          </div>

          <div class="switch-row">
            <div class="switch-label">
              <div class="switch-title">Show Origin</div>
              <div class="switch-description">
                Display retailer or sender information when available
              </div>
            </div>
            <ha-switch
              .checked=${!1!==this.config.show_origin}
              @change=${t=>this._switchChanged(t,"show_origin")}
            ></ha-switch>
          </div>

          <div class="switch-row">
            <div class="switch-label">
              <div class="switch-title">Show Delivery Source</div>
              <div class="switch-description">
                Tag estimated delivery dates as coming from an email or the carrier
              </div>
            </div>
            <ha-switch
              .checked=${!1!==this.config.show_delivery_source}
              @change=${t=>this._switchChanged(t,"show_delivery_source")}
            ></ha-switch>
          </div>

          <div class="switch-row">
            <div class="switch-label">
              <div class="switch-title">Show Delivered Date</div>
              <div class="switch-description">
                Display the date a package was delivered
              </div>
            </div>
            <ha-switch
              .checked=${!1!==this.config.show_delivered}
              @change=${t=>this._switchChanged(t,"show_delivered")}
            ></ha-switch>
          </div>

          <div class="switch-row">
            <div class="switch-label">
              <div class="switch-title">Show Last Updated</div>
              <div class="switch-description">
                Display when the live carrier status was last updated
              </div>
            </div>
            <ha-switch
              .checked=${!1!==this.config.show_dates}
              @change=${t=>this._switchChanged(t,"show_dates")}
            ></ha-switch>
          </div>

          <div class="switch-row">
            <div class="switch-label">
              <div class="switch-title">Show Email Date</div>
              <div class="switch-description">
                Display the date of the first email about the package
              </div>
            </div>
            <ha-switch
              .checked=${!1!==this.config.show_email_date}
              @change=${t=>this._switchChanged(t,"show_email_date")}
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
              .value=${this.config.sort_by||"first_seen"}
              @selected=${t=>{this._selectChanged(t,"sort_by")}}
              @closed=${t=>t.stopPropagation()}
            >
              <mwc-list-item value="first_seen">First Seen</mwc-list-item>
              <mwc-list-item value="carrier">Carrier</mwc-list-item>
              <mwc-list-item value="tracking_number">Tracking Number</mwc-list-item>
              <mwc-list-item value="estimated_delivery">Estimated Delivery</mwc-list-item>
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
              @selected=${t=>{this._selectChanged(t,"sort_direction")}}
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
    `}_getTrackingNumberEntities(){return this.hass?Object.keys(this.hass.states).filter(t=>t.startsWith("sensor.")&&t.endsWith("_tracking_numbers")).map(t=>({entity_id:t,friendly_name:this.hass.states[t].attributes.friendly_name||t})).sort((t,e)=>t.friendly_name.localeCompare(e.friendly_name)):[]}_comboBoxValueChanged(t,e){if(!this.config||!this.hass)return;if(this.config[e]===t)return;const i={...this.config,[e]:t};this.config=i;const s=new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0});this.dispatchEvent(s)}_selectChanged(t,e){if(!this.config||!this.hass)return;const i=t.target,s=t.detail?.value;let r=s??i?.value;if("last_updated"===r&&(r="first_seen"),void 0===r)return;if(this.config[e]===r)return;const a={...this.config,[e]:r};this.config=a;const o=new CustomEvent("config-changed",{detail:{config:a},bubbles:!0,composed:!0});this.dispatchEvent(o)}_valueChanged(t,e){if(!this.config||!this.hass)return;const i=t.target;let s;if(s=""===i.value||void 0===i.value?void 0:"max_items"===e?i.value?parseInt(i.value,10):void 0:i.value,this.config[e]===s)return;const r={...this.config};void 0===s||""===s?delete r[e]:r[e]=s,this.config=r;const a=new CustomEvent("config-changed",{detail:{config:r},bubbles:!0,composed:!0});this.dispatchEvent(a)}_switchChanged(t,e){if(!this.config||!this.hass)return;const i=t.target.checked;if(this.config[e]===i)return;const s={...this.config,[e]:i};this.config=s;const r=new CustomEvent("config-changed",{detail:{config:s},bubbles:!0,composed:!0});this.dispatchEvent(r)}};bt.styles=o`
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
  `,t([ht({attribute:!1})],bt.prototype,"hass",void 0),t([ht({attribute:!1})],bt.prototype,"config",void 0),bt=t([ct("tracking-number-card-editor")],bt);console.info("%c TRACKING-NUMBER-CARD %c v4.5.0 ","color: white; background: #039be5; font-weight: bold; padding: 2px 4px; border-radius: 3px 0 0 3px;","color: #039be5; background: white; font-weight: bold; padding: 2px 4px; border-radius: 0 3px 3px 0;");let wt=class extends ot{constructor(){super(...arguments),this.showAddDialog=!1,this.isSubmitting=!1,this.addForm={tracking_number:"",link:"",carrier:"",origin:"",status:""},this.removingTracking={}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");const e={...t},i=e.sort_by;i&&"last_updated"!==i||(e.sort_by="first_seen"),this.config={show_summary:!0,show_carrier:!0,show_origin:!0,show_delivery_source:!0,show_order:!0,show_status:!0,show_estimated_delivery:!0,show_delivered:!0,show_dates:!0,show_email_date:!0,sort_by:"first_seen",sort_direction:"desc",...e}}getCardSize(){return 3}static getConfigElement(){return document.createElement("tracking-number-card-editor")}static getStubConfig(){return{type:"custom:tracking-number-card",entity:"",show_summary:!0,show_carrier:!0,show_origin:!0,show_delivery_source:!0,show_order:!0,show_status:!0,show_estimated_delivery:!0,show_delivered:!0,show_dates:!0,show_email_date:!0,sort_by:"first_seen",sort_direction:"desc"}}render(){if(!this.config||!this.hass)return I``;const t=this.hass.states[this.config.entity];if(!t)return this._renderError("Entity not found");const e=t.attributes,i=e.packages||[],s=this.config.sort_by,r=_t(i,"last_updated"===s?"first_seen":s??"first_seen",this.config.sort_direction??"desc"),a=this.config.max_items?r.slice(0,this.config.max_items):r;return I`
      <ha-card>
        ${this._renderHeader(e)}
        ${this.config.show_summary?this._renderSummary(e):""}
        <div class="card-content">
          ${a.length>0?this._renderPackageList(a):this._renderEmptyState()}
        </div>
        ${this._renderFooter(e)}
        ${this._renderAddDialog()}
      </ha-card>
    `}_renderHeader(t){const e=this.config?.title||t.friendly_name||"Tracking Numbers",i=t.count||0,s=t.icon||"mdi:package-variant-closed";return I`
      <div class="card-header">
        <div class="card-header-content">
          <ha-icon .icon=${s}></ha-icon>
          <h2 class="card-title">${e}</h2>
        </div>
          <div class="card-header-actions">
            <div class="card-count">${i}</div>
            <button
              class="add-button"
              title="Add tracking number"
              @click=${this._openAddDialog}
            >
              <ha-icon icon="mdi:plus"></ha-icon>
            </button>
          </div>
      </div>
    `}_renderSummary(t){if(!t.summary)return I``;const e=Object.entries(t.summary.by_carrier||{});return 0===e.length?I``:I`
      <div class="summary-stats">
        ${e.map(([t,e])=>I`
            <div class="stat-item">
              <ha-icon .icon=${yt(t)}></ha-icon>
              <span class="stat-label">${t}:</span>
              <span class="stat-value">${e}</span>
            </div>
          `)}
      </div>
    `}_renderPackageList(t){return I`
      <div class="package-list">
        ${t.map(t=>this._renderPackageItem(t))}
      </div>
    `}_renderPackageItem(t){const e="manual"===t.source||"manual_entry"===t.retailer_code,i=this.removingTracking[t.tracking_number],s=this._isOrderOnly(t);return I`
      <div class="package-item">
        <div class="package-header">
          <div class="package-tracking">
            <a
              href=${t.link}
              target="_blank"
              rel="noopener noreferrer"
              class="tracking-link"
              title=${s?"Open order":"Open tracking link"}
            >
              ${t.tracking_number}
              <ha-icon icon="mdi:open-in-new"></ha-icon>
            </a>
            <button
              class="copy-button"
              @click=${()=>this._handleCopy(t.tracking_number)}
              title=${s?"Copy order number":"Copy tracking number"}
            >
              <ha-icon icon="mdi:content-copy"></ha-icon>
            </button>
          </div>
          <div class="package-header-actions">
            ${e?I`<span class="manual-badge">Manual</span>`:""}
            <button
              class="remove-button"
              title="Remove tracking number"
              @click=${()=>this._handleRemove(t)}
              ?disabled=${i}
            >
              <ha-icon icon="mdi:trash-can-outline"></ha-icon>
            </button>
          </div>
        </div>
        ${this._renderPackageDetails(t)}
      </div>
    `}_isOrderOnly(t){return!!t.order_number&&t.order_number===t.tracking_number}_renderPackageDetails(t){const e=[];this._isOrderOnly(t)&&!1!==this.config?.show_carrier?e.push(I`
        <div class="package-detail">
          <ha-icon icon="mdi:package"></ha-icon>
          <span class="package-detail-label">Tracking:</span>
          <span class="package-detail-value">none</span>
        </div>
      `):!this._isOrderOnly(t)&&this.config?.show_carrier&&e.push(I`
        <div class="package-detail">
          <ha-icon .icon=${yt(t.carrier)}></ha-icon>
          <span class="package-detail-label">Carrier:</span>
          <span class="package-detail-value">${t.carrier}</span>
        </div>
      `),!1!==this.config?.show_order&&t.order_number&&t.order_number!==t.tracking_number&&e.push(I`
        <div class="package-detail">
          <ha-icon icon="mdi:receipt-text-outline"></ha-icon>
          <span class="package-detail-label">Order:</span>
          <span class="package-detail-value">
            ${t.order_link?I`<a
                  href=${t.order_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="order-link"
                  title="Open order"
                  >${t.order_number}<ha-icon icon="mdi:open-in-new"></ha-icon
                ></a>`:t.order_number}
          </span>
        </div>
      `);const i=!t.delivery_status&&!!t.delivered_date;if(!1!==this.config?.show_status&&(t.status||i)){const{className:s,icon:r}=function(t){switch((t??"").toLowerCase()){case"delivered":return{className:"status-delivered",icon:"mdi:check-circle"};case"out_for_delivery":return{className:"status-out-for-delivery",icon:"mdi:truck-delivery"};case"transit":case"pickup":return{className:"status-transit",icon:"mdi:truck-fast"};case"pending":case"inforeceived":return{className:"status-pending",icon:"mdi:clock-outline"};case"exception":case"undelivered":return{className:"status-exception",icon:"mdi:alert-circle"};case"notfound":case"expired":return{className:"status-unknown",icon:"mdi:help-circle"};default:return{className:"status-default",icon:"mdi:information-outline"}}}(i?"delivered":t.delivery_status);e.push(I`
        <div class="package-detail">
          <span class="status-chip ${s}">
            <ha-icon icon=${r}></ha-icon>
            <span>${i?"Delivered":t.status}</span>
          </span>
        </div>
      `)}if(!1!==this.config?.show_estimated_delivery&&t.estimated_delivery){const i=(t.estimated_delivery_source??"").toLowerCase(),s=!1!==this.config?.show_delivery_source&&("email"===i||"carrier"===i);e.push(I`
        <div class="package-detail">
          <ha-icon icon="mdi:calendar-clock"></ha-icon>
          <span class="package-detail-label">Est. delivery:</span>
          <span class="package-detail-value">
            ${vt(t.estimated_delivery)}
            ${s?I`<span class="delivery-source">from ${i}</span>`:""}
          </span>
        </div>
      `)}!1!==this.config?.show_delivered&&t.delivered_date&&e.push(I`
        <div class="package-detail">
          <ha-icon icon="mdi:calendar-check"></ha-icon>
          <span class="package-detail-label">Delivered:</span>
          <span class="package-detail-value">${vt(t.delivered_date)}</span>
        </div>
      `),!1!==this.config?.show_dates&&t.status_updated&&e.push(I`
        <div class="package-detail">
          <ha-icon icon="mdi:update"></ha-icon>
          <span class="package-detail-label">Updated:</span>
          <span class="package-detail-value">${gt(t.status_updated)}</span>
        </div>
      `);const s="manual"===t.source||"manual_entry"===t.retailer_code;return!1!==this.config?.show_email_date&&t.first_seen&&!s&&e.push(I`
        <div class="package-detail">
          <ha-icon icon="mdi:email-outline"></ha-icon>
          <span class="package-detail-label">Email:</span>
          <span class="package-detail-value">${function(t){const e=/(Z|[+-]\d{2}:?\d{2})$/i.test(t.trim()),i=new Date(e?t:`${t.trim()}Z`);if(!Number.isFinite(i.getTime()))return t;const s=new Date;return i.toLocaleDateString(void 0,{month:"short",day:"numeric",year:i.getFullYear()!==s.getFullYear()?"numeric":void 0})}(t.first_seen)}</span>
        </div>
      `),!1!==this.config?.show_origin&&t.origin&&"Unknown"!==t.origin&&e.push(I`
        <div class="package-detail">
          <ha-icon icon="mdi:store"></ha-icon>
          <span class="package-detail-label">Origin:</span>
          <span class="package-detail-value">${t.origin}</span>
        </div>
      `),0===e.length?I``:I`
      <div class="package-details">
        ${e}
      </div>
    `}_renderEmptyState(){return I`
      <div class="empty-state">
        <ha-icon icon="mdi:package-variant"></ha-icon>
        <div class="empty-state-title">No packages to track</div>
        <div class="empty-state-description">
          When you have packages to track, they will appear here.
        </div>
      </div>
    `}_renderFooter(t){return t.last_update?I`
      <div class="card-footer">
        <ha-icon icon="mdi:update"></ha-icon>
        <span>Last synced: ${gt(t.last_update)}</span>
      </div>
    `:I``}_renderError(t){return I`
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
    `}async _handleCopy(t){await async function(t){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(t),!0;{const e=document.createElement("textarea");e.value=t,e.style.position="fixed",e.style.left="-999999px",e.style.top="-999999px",document.body.appendChild(e),e.focus(),e.select();const i=document.execCommand("copy");return e.remove(),i}}catch(t){return console.error("Failed to copy text:",t),!1}}(t)&&this._notify(`Copied ${t} to clipboard`)}_renderAddDialog(){if(!this.showAddDialog)return I``;return I`
      <ha-dialog
        open
        heading="Add tracking number"
        @closed=${this._handleDialogClosed}
      >
        <div class="dialog-content" slot="content">
          <div class="dialog-fields">
            <div class="dialog-field">
              <label for="manual-tracking-number">
                Tracking number <span class="required-marker">*</span>
              </label>
              <input
                id="manual-tracking-number"
                name="tracking_number"
                class="dialog-input"
                .value=${this.addForm.tracking_number}
                placeholder="e.g. 1Z9999999999999999"
                required
                @input=${t=>this._handleFormInput(t,"tracking_number")}
              />
              <div class="field-helper">Required</div>
            </div>
            ${[{key:"link",label:"Tracking link",placeholder:"https://example.com/track"},{key:"carrier",label:"Carrier",placeholder:"UPS, USPS, FedEx…"},{key:"origin",label:"Origin",placeholder:"Retailer or sender"},{key:"status",label:"Status",placeholder:"Out for delivery"}].map(({key:t,label:e,placeholder:i})=>I`
                <div class="dialog-field">
                  <label for="manual-${t}">${e}</label>
                  <input
                    id="manual-${t}"
                    name=${t}
                    class="dialog-input"
                    .value=${this.addForm[t]}
                    placeholder=${i??""}
                    @input=${e=>this._handleFormInput(e,t)}
                  />
                  <div class="field-helper">Optional</div>
                </div>
              `)}
          </div>
          <div class="dialog-helper">
            * Required. Leave link empty to auto-generate one from the carrier.
          </div>
          ${this.addFormError?I`<div class="dialog-error">${this.addFormError}</div>`:""}
        </div>
        <mwc-button
          slot="secondaryAction"
          @click=${this._closeAddDialog}
          ?disabled=${this.isSubmitting}
        >
          Cancel
        </mwc-button>
        <mwc-button
          slot="primaryAction"
          @click=${this._submitManualEntry}
          ?disabled=${this.isSubmitting||!this.addForm.tracking_number.trim()}
          raised
        >
          ${this.isSubmitting?"Saving…":"Add"}
        </mwc-button>
      </ha-dialog>
    `}_handleFormInput(t,e){const i=t.target.value??"";this.addForm={...this.addForm,[e]:i}}_openAddDialog(){this.addForm={tracking_number:"",link:"",carrier:"",origin:"",status:""},this.addFormError=void 0,this.showAddDialog=!0,this.updateComplete.then(()=>{const t=this.renderRoot.querySelector("#manual-tracking-number");t?.focus?.()})}_closeAddDialog(){this.isSubmitting||(this.showAddDialog=!1)}_handleDialogClosed(){this.showAddDialog=!1}async _submitManualEntry(){if(!this.hass||!this.config)return;const t=this.addForm.tracking_number.trim(),e=this.renderRoot.querySelector("#manual-tracking-number");if(!t)return this.addFormError="Tracking number is required.",e?.setCustomValidity?.("Tracking number is required"),void e?.reportValidity?.();e?.setCustomValidity?.(""),e?.reportValidity?.(),this.isSubmitting=!0,this.addFormError=void 0;const i={entity_id:this.config.entity,tracking_number:t};["link","carrier","origin","status"].forEach(t=>{const e=this.addForm[t].trim();e&&(i[t]=e)});try{await this.hass.callService("tracking_numbers","add_manual_tracking_number",i),this._notify("Manual tracking number added"),this.showAddDialog=!1}catch(t){const e=t?.message||"Failed to add tracking number";this.addFormError=e,this._notify(e,!0)}finally{this.isSubmitting=!1}}_notify(t,e=!1){const i=new CustomEvent("hass-notification",{detail:{message:t,duration:2500,type:e?"error":"info"},bubbles:!0,composed:!0});this.dispatchEvent(i)}async _handleRemove(t){if(!this.hass||!this.config)return;const e=t.tracking_number;if(!this.removingTracking[e]){this.removingTracking={...this.removingTracking,[e]:!0};try{await this.hass.callService("tracking_numbers","remove_tracking_number",{entity_id:this.config.entity,tracking_number:e}),this._notify(`Removed ${e}`)}catch(t){const e=t?.message||"Failed to remove tracking number";this._notify(e,!0)}finally{const{[e]:t,...i}=this.removingTracking;this.removingTracking=i}}}};wt.styles=ut,t([ht({attribute:!1})],wt.prototype,"hass",void 0),t([pt()],wt.prototype,"config",void 0),t([pt()],wt.prototype,"showAddDialog",void 0),t([pt()],wt.prototype,"isSubmitting",void 0),t([pt()],wt.prototype,"addFormError",void 0),t([pt()],wt.prototype,"addForm",void 0),t([pt()],wt.prototype,"removingTracking",void 0),wt=t([ct("tracking-number-card")],wt),window.customCards=window.customCards||[],window.customCards.push({type:"tracking-number-card",name:"Tracking Number Card",description:"A modern card for displaying tracking numbers with clickable links",preview:!0,configurable:!0,documentationURL:"https://github.com/ljmerza/tracking-number-card"});export{wt as TrackingNumberCard};
//# sourceMappingURL=tracking-number-card.js.map
