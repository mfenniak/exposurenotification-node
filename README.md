# exposurenotification-nodejs

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

Expected behavior: Every time it reads from a peripheral, it should outputs data like this:

```
2020-11-17T20:02:04.538Z central/2621c1...8bc8c8 advertisement v=10110, txPower=-66, rssi=-58, rpi=74114a...dce50c
2020-11-17T20:02:04.819Z central/2621c1...8bc8c8 advertisement v=10110, txPower=-66, rssi=-58, rpi=74114a...dce50c
2020-11-17T20:02:04.820Z central/2621c1...8bc8c8 advertisement v=10110, txPower=-66, rssi=-57, rpi=74114a...dce50c
2020-11-17T20:02:06.331Z central/97a92c...312a2b advertisement v=10110100, txPower=90, rssi=-88, rpi=732648...4bdc3c
2020-11-17T20:02:06.607Z central/97a92c...312a2b advertisement v=10110100, txPower=90, rssi=-88, rpi=732648...4bdc3c
2020-11-17T20:02:06.940Z central/51565f...c16cdc advertisement v=10100, txPower=-120, rssi=-92, rpi=d09059...10604f
2020-11-17T20:02:07.838Z central/1dd65d...6f2093 advertisement v=11, txPower=73, rssi=-42, rpi=6c2477...42c2fd
2020-11-17T20:02:08.121Z central/1dd65d...6f2093 advertisement v=11, txPower=73, rssi=-42, rpi=6c2477...42c2fd
2020-11-17T20:02:10.523Z central/2621c1...8bc8c8 advertisement v=10110, txPower=-66, rssi=-57, rpi=74114a...dce50c
2020-11-17T20:02:10.524Z central/2621c1...8bc8c8 advertisement v=10110, txPower=-66, rssi=-57, rpi=74114a...dce50c
2020-11-17T20:02:10.813Z central/2621c1...8bc8c8 advertisement v=10110, txPower=-66, rssi=-57, rpi=74114a...dce50c
2020-11-17T20:02:10.814Z central/2621c1...8bc8c8 advertisement v=10110, txPower=-66, rssi=-57, rpi=74114a...dce50c
2020-11-17T20:02:11.110Z central/2621c1...8bc8c8 advertisement v=10110, txPower=-66, rssi=-57, rpi=74114a...dce50c
2020-11-17T20:02:11.111Z central/2621c1...8bc8c8 advertisement v=10110, txPower=-66, rssi=-57, rpi=74114a...dce50c
2020-11-17T20:02:11.115Z central/1dd65d...6f2093 advertisement v=11, txPower=73, rssi=-42, rpi=6c2477...42c2fd
2020-11-17T20:02:13.813Z central/97a92c...312a2b advertisement v=10110100, txPower=90, rssi=-88, rpi=732648...4bdc3c
2020-11-17T20:02:14.111Z central/1dd65d...6f2093 advertisement v=11, txPower=73, rssi=-45, rpi=6c2477...42c2fd
```

Each "advertisement" line indicates that the app received an advertisement from a peripheral, containing:

- a version byte, v=..., displayed in binary
- a transmit power reading of in txPower; this is the measured radiated transmit power of Bluetooth Advertisement packets, and is used to improve distance approximation. The range of this field shall be -127 to +127 dBm
- a received signal strength indicator labeled as rssi
- and a rolling proximity code, which is a 16 byte code that the device would store for later checks against an exposure key database

## License

This code is released under the terms of the GNU GPL.

## Contributions

This is rough test code.  I'd welcome contributions to make it cooler.
