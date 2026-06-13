export interface Asset {
  id: string; // Unique configuration item ID or Purchase tag
  name: string;
  category: string;
  serialNumber: string;
  assetTag: string; // Service tag
  location: string;
  user: string; // Pengguna / Penanggung Jawab
  criticality: string;
  status: string;
  source: string;
  expiryDate: string; // Contract expiry / Service term
  eolDate: string; // End of Life / End of Support
  notes?: string;
  lastUpdated: string;
}

export interface MetricCard {
  label: string;
  baseline: string | number;
  current: string | number;
  improvement: string;
  type: 'up' | 'down';
}

export interface AnomalyItem {
  itemId: string;
  name: string;
  type: string;
  description: string;
  reconciliationAction: string;
}

export interface AuditResponse {
  auditSummary: string;
  anomaliesFound: AnomalyItem[];
}
