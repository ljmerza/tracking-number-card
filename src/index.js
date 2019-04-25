import { LitElement, html } from 'lit-element';
import style from './style';
import defaultConfig from './defaults';


import TrackingNumberCardEditor from './index-editor';
customElements.define('tracking-number-card-editor', TrackingNumberCardEditor);


class TrackingNumberCard extends LitElement {
  static get properties() {
    return {
      hass: Object,
      config: Object,
    };
  }

  static async getConfigElement() {
    return document.createElement("tracking-number-card-editor");
  }

  setConfig(config) {

    if (!config.entities) throw new Error('Entities is required');
    if (config.entities && !Array.isArray(config.entities)) throw new Error('entities must be a list');

    this.config = { ...defaultConfig, ...config };
  }

  /**
 * get the current size of the card
 * @return {Number}
 */
  getCardSize() {
    return 1;
  }

  static get styles() {
    return style;
  }

  /**
   * generates the card HTML
   * @return {TemplateResult}
   */
  render() {

    return html`
      <ha-card>
        ${this.createHeader()}
        ${this.createBody()}
      </ha-card>
    `;
  }

  /**
   * create card header
   * @return {TemplateResult}
   */
  createHeader() {
    if (this.config.showHeader === false) return html``;

    return html`
      <div class='track-header'>
        ${this.config.header}
      </div>
    `;
  }

  createBody() {
    const trackingNumbers = this.getTrackingNumbers();
    const trackingObjects = this.generateTrackingNumberLinks(trackingNumbers)

    const table = trackingObjects.map(tracker => {

      // only show origin email if not from tracking company
      let linkText = `${tracker.origin}`;
      if (tracker.origin.toLowerCase() !== tracker.trackingOrigin.toLowerCase()){
        tracker.trackingOrigin = tracker.trackingOrigin.replace(/_/g, ' ');
        linkText = `${tracker.origin} (${tracker.trackingOrigin})`;
      }

      return html`
        <div class='track-row'>
          <div class='track-row__number'>${tracker.number}</div>
          <div class='track-row__link'>
            <a href='${tracker.link}' target='_blank' rel="nofollow noreferrer noopener">${linkText}</a>
          </div>
        </div>
      `;
    });

    return html`
      <div class='track-body'>
        ${table}
      </div>
    `;
  }

  /**
   * gets a list of unique tracking numbers
   * @return {string[]}
   */
  getTrackingNumbers() {
    const entities = this.config.entities
      .map(entity => this.hass.states[entity])
      .filter(entity => {
        if (!entity) return false;
        if (!entity.attributes) return false;
        if (!entity.attributes.tracking_numbers) return false;

        return true;
      });

    const trackingNumbers = entities.reduce((acc, entity) => {
      const trackingOrigins = Object.keys(entity.attributes.tracking_numbers);

      trackingOrigins.forEach(trackingOrigin => {
        entity.attributes.tracking_numbers[trackingOrigin].forEach(number => {
          acc.push({number, trackingOrigin});
        });
      });

      return acc;
    }, []);

    return [...new Set(trackingNumbers)];
  }

  generateTrackingNumberLinks(trackingNumbers) {
    return trackingNumbers.map(trackerNumber => {
      let link = '';
      let origin = '';
      const number = trackerNumber.number;

      if (/^1Z/.test(number)) {
        link = `https://www.ups.com/track?loc=en_US&tracknum=${number}`;
        origin = 'UPS';

      } else if (!isNaN(number) && (number.toString().length === 12 || number.toString().length === 15)){
        link = `https://www.fedex.com/apps/fedextrack/?tracknumbers=${number}`;
        origin = 'FedEx';

      } else if (!isNaN(number) && number.toString().length === 22) {
        link = `https://tools.usps.com/go/TrackConfirmAction?tLabels=${number}`;
        origin = 'USPS';

      } else if (/CN$/.test(number)) {
        link = `https://tools.usps.com/go/TrackConfirmAction?tLabels=${number}`;
        origin = 'USPS';
      }

      return { number, link, origin, trackingOrigin: trackerNumber.trackingOrigin};
    });
  }

}

customElements.define('tracking-number-card', TrackingNumberCard);