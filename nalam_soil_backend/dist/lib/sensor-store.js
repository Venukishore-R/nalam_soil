"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSensorRecord = addSensorRecord;
exports.getLatestSensorRecord = getLatestSensorRecord;
exports.getSensorHistory = getSensorHistory;
const sensorDataStore = [];
function addSensorRecord(data) {
    const record = {
        id: sensorDataStore.length + 1,
        timestamp: new Date().toISOString(),
        ...data,
    };
    sensorDataStore.push(record);
    return record;
}
function getLatestSensorRecord() {
    if (sensorDataStore.length === 0) {
        return null;
    }
    return sensorDataStore[sensorDataStore.length - 1];
}
function getSensorHistory() {
    return sensorDataStore;
}
