declare global {
  interface HTMLElementTagNameMap {
    'tracking-number-card': TrackingNumberCard;
    'tracking-number-card-editor': TrackingNumberCardEditor;
  }
}

export interface LovelaceCardConfig {
  type: string;
  [key: string]: any;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
  getCardSize?(): number;
}

export interface TrackingNumberCardConfig extends LovelaceCardConfig {
  entity: string;
  title?: string;
  show_summary?: boolean;
  show_carrier?: boolean;
  sort_by?: 'first_seen' | 'last_updated' | 'carrier' | 'tracking_number';
  sort_direction?: 'asc' | 'desc';
  max_items?: number;
}

export interface Package {
  tracking_number: string;
  carrier: string;
  origin: string;
  link: string;
  first_seen: string;
  last_updated: string;
  retailer_code: string;
  carrier_code: string;
}

export interface EntityAttributes {
  packages: Package[];
  summary: {
    by_carrier: Record<string, number>;
    by_retailer: Record<string, number>;
  };
  count: number;
  last_update: string;
  icon: string;
  friendly_name: string;
}

export interface HomeAssistant {
  states: {
    [entity_id: string]: {
      state: string;
      attributes: any;
      entity_id: string;
      last_changed: string;
      last_updated: string;
    };
  };
  callService: (domain: string, service: string, serviceData?: any) => Promise<void>;
  callWS: (msg: any) => Promise<any>;
  // Add other properties as needed
}

export interface TrackingNumberCard extends LovelaceCard {
  hass?: HomeAssistant;
  config?: TrackingNumberCardConfig;
  setConfig(config: TrackingNumberCardConfig): void;
}

export interface TrackingNumberCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  config?: TrackingNumberCardConfig;
  setConfig(config: TrackingNumberCardConfig): void;
}
