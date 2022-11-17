# Tracking Number Card for Home Assistant
Shows any shipping tracking numbers in your emails

<img src='https://raw.githubusercontent.com/ljmerza/tracking-number-card/master/card.png' />

[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE.md)
![Project Maintenance][maintenance-shield]
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/hacs/integration)

## Installation through [HACS](https://github.com/hacs/integration)
---
You will need the [Email Sensor](https://github.com/ljmerza/ha-email-sensor) installed.
Add the following to resources in your lovelace config:

```yaml
resources:
  - url: /community_plugin/tracking-number-card/tracking-number-card.js
    type: js
```

## Configurations:
---
```yaml
type: custom:tracking-number-card
entity: sensor.email_ljmerzagmailcom
```

## Options:
---
| Name | Type | Requirement | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:tracking-number-card`
| entity | string | **Required** | Entity of the email sensor
| header | string | **Optional** | `Tracking Numbers` Header of card
| showHeader | boolean | **Optional** | `true` Hide header
| hideWhenEmpty  | boolean | **Optional** | `false` Hide card when no tracking numbers found

---

Enjoy my card? Help me out for a couple of :beers: or a :coffee:!

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/JMISm06AD)


[commits-shield]: https://img.shields.io/github/commit-activity/y/ljmerza/tracking-number-card.svg?style=for-the-badge
[commits]: https://github.com/ljmerza/tracking-number-card/commits/master
[license-shield]: https://img.shields.io/github/license/ljmerza/tracking-number-card.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/badge/maintainer-Leonardo%20Merza%20%40ljmerza-blue.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/ljmerza/tracking-number-card.svg?style=for-the-badge
[releases]: https://github.com/ljmerza/tracking-number-card/releases
