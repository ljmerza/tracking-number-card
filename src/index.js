import "@babel/polyfill/noConflict";

import { LitElement, html } from "lit-element";

import style from "./style";
import defaultConfig from "./defaults";


class TrackingNumberCard extends LitElement {
  static get properties() {
    return {
      hass: Object,
      config: Object,
    };
  }

  setConfig(config) {
    if (!config.entity) throw Error('entity required.');
    this.config = { ...defaultConfig, ...config };
  }

  /**
   * get the current size of the card
   * @return {Number}
   */
  getCardSize() {
    if (this.config) {
      const headerSize = this.config.showHeader && this.config.header ? 1 : 0;
      const trackingNumbers = this.formatTrackingNumbers();
      const bodySize = (trackingNumbers && trackingNumbers.length) || 0;
      return headerSize + bodySize;
    }

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
    const trackingNumbers = this.formatTrackingNumbers();

    // if we want to hide and trackers is empty then hide card completely
    if (this.config.hideWhenEmpty && trackingNumbers.length === 0) {
      return html``;
    }

    const header = this.createHeader();
    const body = this.createBody(trackingNumbers);

    return html` <ha-card> ${header} ${body} </ha-card> `;
  }

  /**
   * create card header
   * @return {TemplateResult}
   */
  createHeader() {
    if (this.config.showHeader === false) return html``;

    return html` <div class="track-header">${this.config.header}</div> `;
  }

  createBody(trackingNumbers) {
    const shownTrackingNumbers = [];

    const table = trackingNumbers.map((tracker) => {
      // dont duplicate tracking numbers
      if(shownTrackingNumbers.includes(tracker.tracking_number)) {
        return html``;
      } else {
        shownTrackingNumbers.push(tracker.tracking_number);
      }

      let origin = '';
      if(tracker.origin) {
        origin = tracker.origin.toLowerCase().replace(/\.com/g, '');
      }

      let carrier = '';
      if(tracker.carrier) {
        carrier = tracker.carrier.toLowerCase().replace(/\.com/g, '');

        // get correct capitalization
        const carrierMap = {
          ups: 'UPS',
          usps: 'USPS',
          fedex: 'FedEx',
          dhl: 'DHL',
        }

        if(carrierMap[carrier]) carrier = carrierMap[carrier]
      }

      const showOrigin = origin !== carrier;
      const linkText = showOrigin ? `${origin} (${carrier})` : carrier;

      return html`
        <div class="track-row">
          <div class="track-row__number">${tracker.tracking_number}</div>
          <div class="track-row__link">
            <a
              href="${tracker.link}"
              target="_blank"
              rel="nofollow noreferrer noopener"
              >${linkText}</a
            >
          </div>
        </div>
      `;
    });

    return html` <div class="track-body">${table}</div> `;
  }

  /**
   * gets a list of unique tracking numbers
   * @return {string[]}
   */
  formatTrackingNumbers() {
    if(!this.hass.states[this.config.entity]) throw Error('entity not found.');
    const entityTrackingNumbers = this.hass.states[this.config.entity].attributes.tracking_numbers;
    if(!entityTrackingNumbers)  throw Error('invalid entity.');

    const trackingNumbers = Object.keys(entityTrackingNumbers).reduce((acc, curr) => {
      const parserTrackingNumbers = entityTrackingNumbers[curr];

      if(parserTrackingNumbers.length) {
        acc.push(...parserTrackingNumbers);
      }

      return acc
    }, []);

    return [...new Set(trackingNumbers)];
  }
}

customElements.define("tracking-number-card", TrackingNumberCard);
