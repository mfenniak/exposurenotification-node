const noble = require('@abandonware/noble');

const covidAlertServiceUuid = 'FD6F';

function startCentral(logger) {
  noble.on('warning', (msg) => {
    logger.info(`nobel warning: ${msg}`);
  });

  noble.on('stateChange', async (nobelState) => {
    logger.info('event stateChange', nobelState);
    if (nobelState === 'poweredOn') {
      logger.info('action startScanningAsync');
      await noble.startScanningAsync([covidAlertServiceUuid], true); // true -> allow duplicates
    }
  });

  const seenRpis = new Map();
    
  noble.on('discover', async (peripheral) => {
    const localLog = logger.child({ peripheral: peripheral.id });
    localLog.debug(`event discover peripheral, id=${peripheral.id}, address=${peripheral.address}, addressType=${peripheral.addressType}, connectable=${peripheral.connectable}, advertisement=${JSON.stringify(peripheral.advertisement)}`);
    const serviceData = peripheral.advertisement ? peripheral.advertisement.serviceData : undefined;
    if (!serviceData) {
      localLog.error(`no service data for peripheral`);
      return;
    }
    const enPayload = serviceData.find(sd => sd && sd.uuid.toLowerCase() == covidAlertServiceUuid.toLowerCase());
    if (!enPayload) {
      localLog.error(`no Exposure Notification service data for peripheral`);
      return;
    }

    const enPayloadData = enPayload.data;
    if (enPayloadData.length !== 20) {
      localLog.error(`unexpected enPayloadData length; ${enPayloadData.length}`);
      return;
    }

    // 16 bytes of rolling proximity identifier
    // 4 bytes of associated encrypted metadata; 1 byte version, 1 byte transmit power level, two bytes reserved
    const rpi = enPayloadData.slice(0, 16).toString('hex');
    let newRpi = "";
    if (!seenRpis.has(rpi)) {
      newRpi = "NEW ";
    }
    const version = enPayloadData[16];
    const txPower = enPayloadData[17] << 24 >> 24; // convert unsigned node.js byte to a signed int value; assumes int32

    localLog.info(`${newRpi}advertisement v=${version.toString(2)}, txPower=${txPower}, rssi=${peripheral.rssi}, rpi=${rpi.toString('hex')}`);
    seenRpis.set(rpi, new Date());
  });

  function timedLogging() {
    let count = 0, countRecent = 0;
    const recent = new Date().getTime() - (15 * 60 * 1000);
    for (const [rpi, date] of seenRpis) {
      count += 1;
      if (date.getTime() > recent) {
        countRecent += 1;
      }
    }
    logger.info(`have seen ${count} unique RPIs, ${countRecent} in the past 15 minutes`);
    setTimeout(timedLogging, 30000);
  }
  timedLogging();
}

module.exports = { startCentral };
