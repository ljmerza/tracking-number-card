import "@babel/polyfill/noConflict";

import { LitElement, html } from "lit-element";

import style from "./style";
import defaultConfig from "./defaults";

import TrackingNumberCardEditor from "./index-editor";
customElements.define("tracking-number-card-editor", TrackingNumberCardEditor);

const _TRACKING_NUMBER_CARD_URLS = {
  ups: "https://www.ups.com/track?loc=en_US&tracknum=",
  usps: "https://tools.usps.com/go/TrackConfirmAction?tLabels=",
  fedex: "https://www.fedex.com/apps/fedextrack/?tracknumbers=",
  dhl:
    "https://www.logistics.dhl/us-en/home/tracking/tracking-parcel.html?submit=1&tracking-id=",
  swiss_post: `https://www.swisspost.ch/track?formattedParcelCodes=`,
};

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
    if (!config.entities) throw new Error("Entities is required");
    if (config.entities && !Array.isArray(config.entities))
      throw new Error("entities must be a list");

    this.config = { ...defaultConfig, ...config };
  }

  /**
   * get the current size of the card
   * @return {Number}
   */
  getCardSize() {
    if (this.config) {
      const headerSize = this.config.showHeader && this.config.header ? 1 : 0;
      const trackingNumbers = this.getTrackingNumbers();
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
    const header = this.createHeader();
    const body = this.createBody();

    // if we want to hide and trackers is empty then hide card completely
    if (
      this.config.hideWhenEmpty &&
      this.trackingNumbers &&
      this.trackingNumbers.length === 0
    )
      return html``;

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

  createBody() {
    this.trackingNumbers = this.getTrackingNumbers();
    const trackingObjects = this.generateTrackingNumberLinks(
      this.trackingNumbers
    );

    const table = trackingObjects.map((tracker) => {
      // only show origin email if not from tracking company
      const linkText = tracker.trackingOrigin
        ? `${tracker.origin} (${tracker.trackingOrigin})`
        : `${tracker.origin}`;

      return html`
        <div class="track-row">
          <div class="track-row__number">${tracker.number}</div>
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
  getTrackingNumbers() {
    const entities = this.config.entities
      .map((entity) => this.hass.states[entity])
      .filter((entity) => {
        if (!entity) return false;
        if (!entity.attributes) return false;
        if (!entity.attributes.tracking_numbers) return false;

        return true;
      });

    const trackingNumbers = entities.reduce((acc, entity) => {
      const trackingOrigins = Object.keys(entity.attributes.tracking_numbers);

      trackingOrigins.forEach((trackingOrigin) => {
        entity.attributes.tracking_numbers[trackingOrigin].forEach((number) => {
          acc.push({ number, trackingOrigin });
        });
      });

      return acc;
    }, []);

    return [...new Set(trackingNumbers)];
  }

  generateTrackingNumberLinks(trackingNumbers) {
    return trackingNumbers.map((trackerNumber) => {
      let link = "";
      let origin = "";
      const number = trackerNumber.number;

      const isNumber = !isNaN(number);
      const length = isNumber && number.toString().length;
      let trackingOrigin = "";

      if (/^1Z/.test(number)) {
        link = `${_TRACKING_NUMBER_CARD_URLS.ups}${number}`;
        origin = "UPS";
      } else if (/CN$/.test(number)) {
        link = `${_TRACKING_NUMBER_CARD_URLS.usps}${number}`;
        origin = "USPS";
      } else {
        switch (trackerNumber.trackingOrigin) {
          case "ups":
            link = `${_TRACKING_NUMBER_CARD_URLS.ups}${number}`;
            origin = "UPS";
            break;

          case "fedex":
            link = `${_TRACKING_NUMBER_CARD_URLS.fedex}${number}`;
            origin = "FedEx";
            break;

          case "usps":
            link = `${_TRACKING_NUMBER_CARD_URLS.usps}${number}`;
            origin = "USPS";
            break;

          case "dhl":
            link = `${_TRACKING_NUMBER_CARD_URLS.dhl}${number}`;
            origin = "DHL";
            break;

          case "swiss_post":
            link = `${_TRACKING_NUMBER_CARD_URLS.swiss_post}${number}`;
            origin = "Swiss Post";
            break;

          default:
            trackingOrigin = trackerNumber.trackingOrigin.replace(/_/g, " ");

            if (isNumber && (length === 12 || length === 15 || length === 20)) {
              link = `${_TRACKING_NUMBER_CARD_URLS.fedex}${number}`;
              origin = "FedEx";
            } else if (isNumber && length === 22) {
              link = `${_TRACKING_NUMBER_CARD_URLS.usps}${number}`;
              origin = "USPS";
            } else if (length > 25) {
              link = `${_TRACKING_NUMBER_CARD_URLS.dhl}${number}`;
              origin = "DHL";
            }
            break;
        }
      }

      return {
        number,
        link,
        origin,
        trackingOrigin,
      };
    });
  }
}

customElements.define("tracking-number-card", TrackingNumberCard);
