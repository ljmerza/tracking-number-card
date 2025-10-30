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

  public setConfig(config: TrackingNumberCardConfig): void {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }

    this.config = {
      show_summary: true,
      show_carrier: true,
      sort_by: 'last_updated',
      sort_direction: 'desc',
      ...config
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
      sort_by: 'last_updated',
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
    const sortedPackages = sortPackages(
      packages,
      this.config.sort_by,
      this.config.sort_direction
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
        <div class="card-count">${count}</div>
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
      // Show a toast notification if available
      const event = new CustomEvent('hass-notification', {
        detail: {
          message: `Copied ${trackingNumber} to clipboard`,
          duration: 2000
        },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
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
