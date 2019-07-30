# Tracking Number Card for Home Assistant
Shows any shipping tracking numbers in your emails

<img src='https://raw.githubusercontent.com/ljmerza/tracking-number-card/master/card.png' />

## Installation through [HACS](https://github.com/custom-components/hacs)
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
entities:
  - sensor.email_ljmerzagmailcom
```

## Options:
---
| Name | Type | Requirement | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:tracking-number-card`
| header | string | **Optional** | `Tracking Numbers` Header of card
| showHeader | boolean | **Optional** | `true` Hide header
| hideWhenEmpty  | boolean | **Optional** | `false` Hide card when no tracking numbers found

---

Enjoy my card? Help me out for a couple of :beers: or a :coffee:!

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/JMISm06AD)
