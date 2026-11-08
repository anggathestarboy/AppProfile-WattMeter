export type ChargingState = 'charging' | 'discharging' | 'full' | 'idle';

export interface BatteryPreset {
  id: string;
  name: string;
  description: string;
  percentage: number;
  wattage: number; // positive = charging, negative = discharging
  voltageMv: number;
  currentMa: number;
  temperatureC: number;
  healthPercent: number;
  cycles: number;
  protocol: string;
  state: ChargingState;
  estimatedMinutes: number;
}

export interface MetricCardData {
  title: string;
  value: string;
  unit?: string;
  subtext: string;
  badge?: string;
  detail: string;
}
