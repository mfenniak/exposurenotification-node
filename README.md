# exposurenotification-node

This is a node.js console application that reads data from nearby devices participating in the Apple/Google Exposure Notification Bluetooth protocol.

## Running

```
npm install
node index.js
```

Developed and tested on macOS.  The BLE libraries used say they support other OSes, but I haven't confirmed any.

## Central Mode

To use: run app; this is the only supported mode.

How it works:

- Scans for peripheral devices that are advertising the Exposure Notification BLE service.
- When it finds one, it lightly decodes the data provided and logs it to the screen.

Expected behavior: Every time it reads from a peripheral, it should output a message line such as "2020-11-17T19:33:39.619Z central/788...984 advertisement v=10111110, txPower=29, rssi=-59, rpi=00e...5d2".  This indicates that the app received an advertistement, from the peripheral with identified by the code 788...984, containing:

- a version byte, v=...
- a transmit power reading of in txPower; this is the measured radiated transmit power of Bluetooth Advertisement packets, and is used to improve distance approximation. The range of this field shall be -127 to +127 dBm.
- a received signal strength indicator labeled as rssi; this is measured in dBm
- and a rolling proximity code 00e...5d2, which is the code that the device would store for later checks against an exposure key database

## License

This code is released under the terms of the GNU GPL.

## Contributions

This is rough test code.  I'd welcome contributions to make it cooler.
