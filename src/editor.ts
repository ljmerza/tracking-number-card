import { LitElement, html, TemplateResult, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TrackingNumberCardConfig, HomeAssistant } from './types';

@customElement('tracking-number-card-editor')
export class TrackingNumberCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public config?: TrackingNumberCardConfig;

  static override styles = css`
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
  `;

  public setConfig(config: TrackingNumberCardConfig): void {
    this.config = config;
  }

  protected override render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html``;
    }

    const trackingEntities = this._getTrackingNumberEntities();

    return html`
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
              .label=${'Entity'}
              .value=${this.config.entity || ''}
              .items=${trackingEntities.map((entity) => ({
                value: entity.entity_id,
                label: `${entity.friendly_name} (${entity.entity_id})`,
              }))}
              @value-changed=${(ev: CustomEvent) => {
                const value = ev.detail.value;
                if (value) {
                  this._comboBoxValueChanged(value, 'entity');
                }
              }}
            ></ha-combo-box>
            ${trackingEntities.length === 0
              ? html`
                  <div class="no-entities">
                    No sensor entities ending with "_tracking_numbers" found.
                    Please ensure you have a tracking number integration configured.
                  </div>
                `
              : ''}
          </div>

          <div class="option">
            <div class="option-label">Title (Optional)</div>
            <div class="option-description">
              Custom title for the card. Leave empty to use entity friendly name
            </div>
            <ha-textfield
              .label=${'Title'}
              .value=${this.config.title || ''}
              placeholder="Tracking Numbers"
              @input=${(e: Event) => this._valueChanged(e, 'title')}
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
              .checked=${this.config.show_summary !== false}
              @change=${(e: Event) => this._switchChanged(e, 'show_summary')}
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
              .checked=${this.config.show_carrier !== false}
              @change=${(e: Event) => this._switchChanged(e, 'show_carrier')}
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
              .label=${'Sort By'}
              .value=${this.config.sort_by || 'last_updated'}
              @selected=${(ev: CustomEvent) => {
                this._selectChanged(ev.detail.value, 'sort_by');
              }}
              @closed=${(e: Event) => e.stopPropagation()}
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
              .label=${'Sort Direction'}
              .value=${this.config.sort_direction || 'desc'}
              @selected=${(ev: CustomEvent) => {
                this._selectChanged(ev.detail.value, 'sort_direction');
              }}
              @closed=${(e: Event) => e.stopPropagation()}
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
              .label=${'Maximum Items'}
              .value=${this.config.max_items || ''}
              placeholder="Unlimited"
              type="number"
              min="1"
              @input=${(e: Event) => this._valueChanged(e, 'max_items')}
            ></ha-textfield>
          </div>
        </div>
      </div>
    `;
  }

  private _getTrackingNumberEntities(): Array<{ entity_id: string; friendly_name: string }> {
    if (!this.hass) {
      return [];
    }

    return Object.keys(this.hass.states)
      .filter((entityId) => {
        // Filter for sensor entities ending with "_tracking_numbers"
        return (
          entityId.startsWith('sensor.') &&
          entityId.endsWith('_tracking_numbers')
        );
      })
      .map((entityId) => {
        const state = this.hass!.states[entityId];
        return {
          entity_id: entityId,
          friendly_name: state.attributes.friendly_name || entityId,
        };
      })
      .sort((a, b) => a.friendly_name.localeCompare(b.friendly_name));
  }

  private _comboBoxValueChanged(value: string, configValue: string): void {
    if (!this.config || !this.hass) {
      return;
    }

    if (this.config[configValue] === value) {
      return;
    }

    const newConfig = {
      ...this.config,
      [configValue]: value,
    };

    this.config = newConfig;

    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _selectChanged(value: string, configValue: string): void {
    if (!this.config || !this.hass) {
      return;
    }

    if (this.config[configValue] === value) {
      return;
    }

    const newConfig = {
      ...this.config,
      [configValue]: value,
    };

    this.config = newConfig;

    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _valueChanged(ev: Event, configValue: string): void {
    if (!this.config || !this.hass) {
      return;
    }

    const target = ev.target as HTMLInputElement | HTMLSelectElement;

    let value: any;
    if (target.value === '' || target.value === undefined) {
      value = undefined;
    } else if (configValue === 'max_items') {
      value = target.value ? parseInt(target.value, 10) : undefined;
    } else {
      value = target.value;
    }

    if (this.config[configValue] === value) {
      return;
    }

    const newConfig = { ...this.config };
    if (value === undefined || value === '') {
      delete newConfig[configValue];
    } else {
      newConfig[configValue] = value;
    }

    this.config = newConfig;

    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _switchChanged(ev: Event, configValue: string): void {
    if (!this.config || !this.hass) {
      return;
    }

    const target = ev.target as any; // ha-switch element
    const value = target.checked;

    if (this.config[configValue] === value) {
      return;
    }

    const newConfig = {
      ...this.config,
      [configValue]: value,
    };

    this.config = newConfig;

    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}
