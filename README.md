# Tracking Number Card for Home Assistant


![](./Capture.PNG)

---

[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE.md)

![Project Maintenance][maintenance-shield]
[![GitHub Activity][commits-shield]][commits]


## Track Updates

This custom card can be tracked with the help of [custom-updater](https://github.com/custom-components/custom_updater).

In your configuration.yaml

```yaml
custom_updater:
  card_urls:
    - https://raw.githubusercontent.com/ljmerza/tracking-number-card/master/custom_updater.json
```

## Usage
You will need the [Email Sensor](https://github.com/ljmerza/ha-email-sensor) installed.

## Options

| Name | Type | Requirement | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:tracking-number-card`
| header | string | **Optional** | `Tracking Numbers` Header of card
| showHeader | boolean | **Optional** | `true` Hide header
| hideWhenEmpty  | boolean | **Optional** | `false` Hide card when no tracking numbers found

## Configuration
Download `tracking-number-card.js` from the [latest release](https://github.com/ljmerza/tracking-number-card/releases/latest) and upload it your /www folder of your Home Assistant config directory.

In your ui-lovelace.yaml

```yaml
resources:
  - url: /local/tracking-number-card.js?track=true
    type: js
```

Add the custom card to views:

```yaml
views:
  - type: custom:tracking-number-card
    entities:
      - sensor.email_ljmerzagmailcom
```

---

Enjoy my card? Help me out for a couple of :beers: or a :coffee:!

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/JMISm06AD)


[commits-shield]: https://img.shields.io/github/commit-activity/y/ljmerza/tracking-number-card.svg?style=for-the-badge
[commits]: https://github.com/ljmerza/tracking-number-card/commits/master
[license-shield]: https://img.shields.io/github/license/ljmerza/tracking-number-card.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/badge/maintainer-Leonardo%20Merza%20%40ljmerza-blue.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/ljmerza/tracking-number-card.svg?style=for-the-badge
[releases]: https://github.com/ljmerza/tracking-number-card/releases
