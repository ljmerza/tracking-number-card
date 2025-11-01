import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './styles';
import {
  TrackingNumberCardConfig,
  HomeAssistant,
  Package,
  EntityAttributes
} from './types';
import {
  formatRelativeTime,
  formatDateTime,
  sortPackages,
  copyToClipboard,
  getCarrierIcon
} from './utils';
import './editor';
import { version } from '../package.json';

console.info(
  `%c TRACKING-NUMBER-CARD %c v${version} `,
  'color: white; background: #039be5; font-weight: bold; padding: 2px 4px; border-radius: 3px 0 0 3px;',
  'color: #039be5; background: white; font-weight: bold; padding: 2px 4px; border-radius: 0 3px 3px 0;'
);

@customElement('tracking-number-card')
export class TrackingNumberCard extends LitElement {
  public static override styles = styles;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: TrackingNumberCardConfig;
  @state() private showAddDialog = false;
  @state() private isSubmitting = false;
  @state() private addFormError?: string;
  @state() private addForm = {
    tracking_number: '',
    link: '',
    carrier: '',
    origin: '',
    status: ''
  };
  @state() private removingTracking: Record<string, boolean> = {};

  public setConfig(config: TrackingNumberCardConfig): void {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }

    const normalizedConfig = { ...config };
    const sortByValue = normalizedConfig.sort_by as string | undefined;
    if (!sortByValue || sortByValue === 'last_updated') {
      normalizedConfig.sort_by = 'first_seen';
    }

    this.config = {
      show_summary: true,
      show_carrier: true,
      show_origin: true,
      sort_by: 'first_seen',
      sort_direction: 'desc',
      ...normalizedConfig
    };
  }

  public getCardSize(): number {
    return 3;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('tracking-number-card-editor');
  }

  public static getStubConfig(): TrackingNumberCardConfig {
    return {
      type: 'custom:tracking-number-card',
      entity: '',
      show_summary: true,
      show_carrier: true,
      show_origin: true,
      sort_by: 'first_seen',
      sort_direction: 'desc'
    };
  }

  protected override render(): TemplateResult {
    if (!this.config || !this.hass) {
      return html``;
    }

    const entityState = this.hass.states[this.config.entity];
    if (!entityState) {
      return this._renderError('Entity not found');
    }

    const attributes = entityState.attributes as EntityAttributes;
    const packages = attributes.packages || [];
    const rawSortBy = this.config.sort_by as string | undefined;
    const sortBy = rawSortBy === 'last_updated'
      ? 'first_seen'
      : rawSortBy ?? 'first_seen';
    const sortDirection = this.config.sort_direction ?? 'desc';
    const sortedPackages = sortPackages(
      packages,
      sortBy,
      sortDirection
    );

    const displayPackages = this.config.max_items
      ? sortedPackages.slice(0, this.config.max_items)
      : sortedPackages;

    return html`
      <ha-card>
        ${this._renderHeader(attributes)}
        ${this.config.show_summary ? this._renderSummary(attributes) : ''}
        <div class="card-content">
          ${displayPackages.length > 0
            ? this._renderPackageList(displayPackages)
            : this._renderEmptyState()}
        </div>
        ${this._renderFooter(attributes)}
        ${this._renderAddDialog()}
      </ha-card>
    `;
  }

  private _renderHeader(attributes: EntityAttributes): TemplateResult {
    const title = this.config?.title || attributes.friendly_name || 'Tracking Numbers';
    const count = attributes.count || 0;
    const icon = attributes.icon || 'mdi:package-variant-closed';

    return html`
      <div class="card-header">
        <div class="card-header-content">
          <ha-icon .icon=${icon}></ha-icon>
          <h2 class="card-title">${title}</h2>
        </div>
          <div class="card-header-actions">
            <div class="card-count">${count}</div>
            <button
              class="add-button"
              title="Add tracking number"
              @click=${this._openAddDialog}
            >
              <ha-icon icon="mdi:plus"></ha-icon>
            </button>
          </div>
      </div>
    `;
  }

  private _renderSummary(attributes: EntityAttributes): TemplateResult {
    if (!attributes.summary) {
      return html``;
    }

    const carrierEntries = Object.entries(attributes.summary.by_carrier || {});
    if (carrierEntries.length === 0) {
      return html``;
    }

    return html`
      <div class="summary-stats">
        ${carrierEntries.map(
          ([carrier, count]) => html`
            <div class="stat-item">
              <ha-icon .icon=${getCarrierIcon(carrier)}></ha-icon>
              <span class="stat-label">${carrier}:</span>
              <span class="stat-value">${count}</span>
            </div>
          `
        )}
      </div>
    `;
  }

  private _renderPackageList(packages: Package[]): TemplateResult {
    return html`
      <div class="package-list">
        ${packages.map((pkg) => this._renderPackageItem(pkg))}
      </div>
    `;
  }

  private _renderPackageItem(pkg: Package): TemplateResult {
    const isManual = pkg.source === 'manual' || pkg.retailer_code === 'manual_entry';
    const isRemoving = this.removingTracking[pkg.tracking_number];

    return html`
      <div class="package-item">
        <div class="package-header">
          <div class="package-tracking">
            <a
              href=${pkg.link}
              target="_blank"
              rel="noopener noreferrer"
              class="tracking-link"
              title="Open tracking link"
            >
              ${pkg.tracking_number}
              <ha-icon icon="mdi:open-in-new"></ha-icon>
            </a>
            <button
              class="copy-button"
              @click=${() => this._handleCopy(pkg.tracking_number)}
              title="Copy tracking number"
            >
              <ha-icon icon="mdi:content-copy"></ha-icon>
            </button>
          </div>
          <div class="package-header-actions">
            ${isManual ? html`<span class="manual-badge">Manual</span>` : ''}
            <button
              class="remove-button"
              title="Remove tracking number"
              @click=${() => this._handleRemove(pkg)}
              ?disabled=${isRemoving}
            >
              <ha-icon icon="mdi:trash-can-outline"></ha-icon>
            </button>
          </div>
        </div>
        ${this._renderPackageDetails(pkg)}
      </div>
    `;
  }

  private _renderPackageDetails(pkg: Package): TemplateResult {
    const details: TemplateResult[] = [];

    if (this.config?.show_carrier) {
      details.push(html`
        <div class="package-detail">
          <ha-icon .icon=${getCarrierIcon(pkg.carrier)}></ha-icon>
          <span class="package-detail-label">Carrier:</span>
          <span class="package-detail-value">${pkg.carrier}</span>
        </div>
      `);
    }

    if (pkg.status) {
      details.push(html`
        <div class="package-detail">
          <ha-icon icon="mdi:information-outline"></ha-icon>
          <span class="package-detail-label">Status:</span>
          <span class="package-detail-value">${pkg.status}</span>
        </div>
      `);
    }

    if (this.config?.show_origin !== false && pkg.origin && pkg.origin !== 'Unknown') {
      details.push(html`
        <div class="package-detail">
          <ha-icon icon="mdi:store"></ha-icon>
          <span class="package-detail-label">Origin:</span>
          <span class="package-detail-value">${pkg.origin}</span>
        </div>
      `);
    }

    if (details.length === 0) {
      return html``;
    }

    return html`
      <div class="package-details">
        ${details}
      </div>
    `;
  }

  private _renderEmptyState(): TemplateResult {
    return html`
      <div class="empty-state">
        <ha-icon icon="mdi:package-variant"></ha-icon>
        <div class="empty-state-title">No packages to track</div>
        <div class="empty-state-description">
          When you have packages to track, they will appear here.
        </div>
      </div>
    `;
  }

  private _renderFooter(attributes: EntityAttributes): TemplateResult {
    if (!attributes.last_update) {
      return html``;
    }

    return html`
      <div class="card-footer">
        <ha-icon icon="mdi:update"></ha-icon>
        <span>Last synced: ${formatRelativeTime(attributes.last_update)}</span>
      </div>
    `;
  }

  private _renderError(message: string): TemplateResult {
    return html`
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
            <div class="empty-state-title">${message}</div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private async _handleCopy(trackingNumber: string): Promise<void> {
    const success = await copyToClipboard(trackingNumber);
    if (success) {
      this._notify(`Copied ${trackingNumber} to clipboard`);
    }
  }

  private _renderAddDialog(): TemplateResult {
    if (!this.showAddDialog) {
      return html``;
    }

    const optionalFields: Array<{
      key: 'link' | 'carrier' | 'origin' | 'status';
      label: string;
      placeholder?: string;
    }> = [
      { key: 'link', label: 'Tracking link', placeholder: 'https://example.com/track' },
      { key: 'carrier', label: 'Carrier', placeholder: 'UPS, USPS, FedEx…' },
      { key: 'origin', label: 'Origin', placeholder: 'Retailer or sender' },
      { key: 'status', label: 'Status', placeholder: 'Out for delivery' }
    ];

    return html`
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
                @input=${(ev: Event) => this._handleFormInput(ev, 'tracking_number')}
              />
              <div class="field-helper">Required</div>
            </div>
            ${optionalFields.map(
              ({ key, label, placeholder }) => html`
                <div class="dialog-field">
                  <label for="manual-${key}">${label}</label>
                  <input
                    id="manual-${key}"
                    name=${key}
                    class="dialog-input"
                    .value=${this.addForm[key]}
                    placeholder=${placeholder ?? ''}
                    @input=${(ev: Event) => this._handleFormInput(ev, key)}
                  />
                  <div class="field-helper">Optional</div>
                </div>
              `
            )}
          </div>
          <div class="dialog-helper">
            * Required. Leave link empty to auto-generate one from the carrier.
          </div>
          ${this.addFormError
            ? html`<div class="dialog-error">${this.addFormError}</div>`
            : ''}
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
          ?disabled=${
            this.isSubmitting || !this.addForm.tracking_number.trim()
          }
          raised
        >
          ${this.isSubmitting ? 'Saving…' : 'Add'}
        </mwc-button>
      </ha-dialog>
    `;
  }

  private _handleFormInput(event: Event, field: 'tracking_number' | 'link' | 'carrier' | 'origin' | 'status'): void {
    const target = event.target as HTMLInputElement;
    const value = target.value ?? '';
    this.addForm = {
      ...this.addForm,
      [field]: value
    };
  }

  private _openAddDialog(): void {
    this.addForm = {
      tracking_number: '',
      link: '',
      carrier: '',
      origin: '',
      status: ''
    };
    this.addFormError = undefined;
    this.showAddDialog = true;

    this.updateComplete.then(() => {
      const field = this.renderRoot.querySelector<HTMLInputElement>('#manual-tracking-number');
      field?.focus?.();
    });
  }

  private _closeAddDialog(): void {
    if (this.isSubmitting) {
      return;
    }
    this.showAddDialog = false;
  }

  private _handleDialogClosed(): void {
    this.showAddDialog = false;
  }

  private async _submitManualEntry(): Promise<void> {
    if (!this.hass || !this.config) {
      return;
    }

    const trackingNumber = this.addForm.tracking_number.trim();
    const trackingField = this.renderRoot.querySelector<HTMLInputElement>('#manual-tracking-number');

    if (!trackingNumber) {
      this.addFormError = 'Tracking number is required.';
      trackingField?.setCustomValidity?.('Tracking number is required');
      trackingField?.reportValidity?.();
      return;
    }

    trackingField?.setCustomValidity?.('');
    trackingField?.reportValidity?.();

    this.isSubmitting = true;
    this.addFormError = undefined;

    const payload: Record<string, string> = {
      entity_id: this.config.entity,
      tracking_number: trackingNumber
    };

    const optionalFields: Array<'link' | 'carrier' | 'origin' | 'status'> = ['link', 'carrier', 'origin', 'status'];
    optionalFields.forEach((field) => {
      const value = this.addForm[field].trim();
      if (value) {
        payload[field] = value;
      }
    });

    try {
      await this.hass.callService('tracking_numbers', 'add_manual_tracking_number', payload);
      this._notify('Manual tracking number added');
      this.showAddDialog = false;
    } catch (error) {
      const message = (error as Error)?.message || 'Failed to add tracking number';
      this.addFormError = message;
      this._notify(message, true);
    } finally {
      this.isSubmitting = false;
    }
  }

  private _notify(message: string, isError = false): void {
    const event = new CustomEvent('hass-notification', {
      detail: {
        message,
        duration: 2500,
        type: isError ? 'error' : 'info'
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  private async _handleRemove(pkg: Package): Promise<void> {
    if (!this.hass || !this.config) {
      return;
    }

    const trackingNumber = pkg.tracking_number;
    if (this.removingTracking[trackingNumber]) {
      return;
    }
    this.removingTracking = {
      ...this.removingTracking,
      [trackingNumber]: true
    };

    try {
      await this.hass.callService('tracking_numbers', 'remove_tracking_number', {
        entity_id: this.config.entity,
        tracking_number: trackingNumber
      });
      this._notify(`Removed ${trackingNumber}`);
    } catch (error) {
      const message = (error as Error)?.message || 'Failed to remove tracking number';
      this._notify(message, true);
    } finally {
      const { [trackingNumber]: _, ...rest } = this.removingTracking;
      this.removingTracking = rest;
    }
  }
}

// Register the card with Home Assistant
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'tracking-number-card',
  name: 'Tracking Number Card',
  description: 'A modern card for displaying tracking numbers with clickable links',
  preview: true,
  configurable: true,
  documentationURL: 'https://github.com/ljmerza/tracking-number-card'
});
