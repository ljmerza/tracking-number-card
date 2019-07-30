import { LitElement, html } from 'lit-element';
import style from './style-editor';
import defaultConfig from './defaults';


const fireEvent = (node, type, detail = {}, options = {}) => {
    const event = new Event(type, {
        bubbles: options.bubbles === undefined ? true : options.bubbles,
        cancelable: Boolean(options.cancelable),
        composed: options.composed === undefined ? true : options.composed,
    });

    event.detail = detail;
    node.dispatchEvent(event);
    return event;
};


export default class TrackingNumberCardEditor extends LitElement {
    static get styles() {
        return style;
    }

    static get properties() {
        return { hass: {}, _config: {} };
    }

    setConfig(config) {
        this._config = Object.assign({}, defaultConfig, config);
    }

    get entityOptions() {
        const entities = Object.keys(this.hass.states).filter(eid => /sensor\.email_/.test(eid));
        return entities.map(eid => ({ name: eid, checked: this._config.entities.includes(eid) }));
    }

    firstUpdated() {
        this._firstRendered = true;
    }

    render() {
        if (!this.hass) {
            return html``;
        }

        return html`
            <div class="card-config">
            
                <div class=overall-config'>
                    <paper-input label="Header (Optional)" .value="${this._config.header}" .configValue="${"header"}" @value-changed="${this._valueChanged}"></paper-input>


                    <div class='checkbox-options'>
                        <paper-checkbox 
                            @checked-changed="${this._valueChanged}" 
                            .checked=${this._config.showHeader} 
                            .configValue="${"showHeader"}"
                        >Show Header</paper-checkbox>

                        <paper-checkbox 
                            @checked-changed="${this._valueChanged}" 
                            .checked=${this._config.hideWhenEmpty} 
                            .configValue="${"hideWhenEmpty"}"
                        >Hide When Empty</paper-checkbox>
                    </div>
                </div>
            
                <div class='entities'>
                    <h3>Entities</h3>
                    ${this.entityOptions.map(entity => {
                        return html`<paper-checkbox @checked-changed="${this._valueChanged}" .checked=${entity.checked} .entityValue="${entity.name}">${entity.name}</paper-checkbox>`;
                    })}
                </div>
            </div>
    `;
    }

    _valueChanged(ev) {
        if (!this._config || !this.hass || !this._firstRendered) return;

        const { target: { configValue, value, entityValue }, detail: { value: checkedValue } } = ev;

        if (entityValue) {

            if (checkedValue) {
                const entities = Array.from(this._config.entities)
                entities.push(entityValue)
                this._config = Object.assign({}, this._config, { entities: entities });
            } else {
                const newEntities = this._config.entities.filter(entity => entity !== entityValue);
                this._config = Object.assign({}, this._config, { entities: newEntities });
            }

        } else if (checkedValue !== undefined || checkedValue !== null) {
            this._config = Object.assign({}, this._config, { [configValue]: checkedValue });

        } else {
            this._config = Object.assign({}, this._config, { [configValue]: value });
        }

        fireEvent(this, 'config-changed', { config: this._config });
    }
}

