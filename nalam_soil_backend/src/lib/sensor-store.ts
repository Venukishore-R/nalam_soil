export interface SensorRecord {
  id: number;
  timestamp: string;
  nitrogen: number;
  phosphorous: number;
  potassium: number;
}

const sensorDataStore: SensorRecord[] = [];

export function addSensorRecord(data: Omit<SensorRecord, "id" | "timestamp">) {
  const record: SensorRecord = {
    id: sensorDataStore.length + 1,
    timestamp: new Date().toISOString(),
    ...data,
  };

  sensorDataStore.push(record);
  return record;
}

export function getLatestSensorRecord(): SensorRecord | null {
  if (sensorDataStore.length === 0) {
    return null;
  }
  return sensorDataStore[sensorDataStore.length - 1];
}

export function getSensorHistory(): SensorRecord[] {
  return sensorDataStore;
}
