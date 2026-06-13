import { Asset } from './types';
import { parseImportedTSV } from './importedData';

const IMPORTED_ENTERPRISE_ASSETS = parseImportedTSV();

export const INITIAL_CMDB_ASSETS: Asset[] = [
  ...IMPORTED_ENTERPRISE_ASSETS,
  // COBIT 1: Endpoint (PC & Laptop)
  {
    id: "CI-EQP-001",
    name: "ThinkPad L14 Gen 4 - Teller 01",
    category: "Endpoint (PC & Laptop)",
    serialNumber: "SN-L14-99021",
    assetTag: "TAG-END-2024-001",
    location: "Kantor Pusat",
    user: "Siti Rahma",
    criticality: "Medium",
    status: "Active",
    source: "CMDB",
    expiryDate: "2027-06-15",
    eolDate: "2029-12-31",
    notes: "Laptop untuk operasional teller utama",
    lastUpdated: "2026-05-10"
  },
  {
    id: "CI-EQP-002",
    name: "ThinkPad L14 Gen 4 - CS 02",
    category: "Endpoint (PC & Laptop)",
    serialNumber: "SN-L14-99022",
    assetTag: "TAG-END-2024-002",
    location: "Jambi",
    user: "Budi Santoso",
    criticality: "Medium",
    status: "Active",
    source: "CMDB",
    expiryDate: "2027-06-15",
    eolDate: "2029-12-31",
    notes: "Dipakai di Cabang Jambi",
    lastUpdated: "2026-05-10"
  },
  // Active in both, consistent (G ∧ C ∧ S)
  {
    id: "CI-EQP-003",
    name: "MacBook Pro 14 M3 - Specialist",
    category: "Endpoint (PC & Laptop)",
    serialNumber: "SN-MBP-88219",
    assetTag: "TAG-END-2024-003",
    location: "Kantor Pusat",
    user: "Dinianti Marselia",
    criticality: "High",
    status: "Active",
    source: "Both",
    expiryDate: "2028-11-20",
    eolDate: "2031-11-20",
    notes: "Laptop riset & analisis tata kelola TI",
    lastUpdated: "2026-06-01"
  },
  // Mismatch status: G ∧ C ∧ ¬S
  {
    id: "CI-EQP-004",
    name: "Latitude 3440 - Dev 03",
    category: "Endpoint (PC & Laptop)",
    serialNumber: "SN-LAT-33299",
    assetTag: "TAG-END-2024-004",
    location: "Mikro Palembang",
    user: "Rian Hidayat",
    criticality: "High",
    status: "Retired", // CMDB thinks it is retired, but Procurement has it Active!
    source: "Both",
    expiryDate: "2026-01-10",
    eolDate: "2028-01-10",
    notes: "Aset dalam proses migrasi atau salah status",
    lastUpdated: "2026-01-15"
  },
  // Ghost Asset candidate: ¬G ∧ C ∧ S (Registered in CMDB but physical proc has no trace!)
  {
    id: "CI-SRV-102",
    name: "Legacy Web Server IIS",
    category: "Server & Storage",
    serialNumber: "SN-SRV-99211",
    assetTag: "TAG-SRV-2021-090",
    location: "Medan",
    user: "System Admin Medan",
    criticality: "Critical",
    status: "Active",
    source: "CMDB", // Only in CMDB! Not in GA-Procurement list!
    expiryDate: "2025-12-31",
    eolDate: "2026-06-01", // EOL passed
    notes: "Dugaan Ghost Asset - server fisik tidak ditemukan saat audit fisik",
    lastUpdated: "2025-06-20"
  },
  // Server consistent (G ∧ C ∧ S)
  {
    id: "CI-SRV-101",
    name: "HPE ProLiant DL380 Gen11 - Core DB",
    category: "Server & Storage",
    serialNumber: "SN-HPE-11029",
    assetTag: "TAG-SRV-2024-015",
    location: "Kantor Pusat",
    user: "Database Team",
    criticality: "Critical",
    status: "Active",
    source: "Both",
    expiryDate: "2029-03-15",
    eolDate: "2031-03-15",
    notes: "Server database inti transaksi bank",
    lastUpdated: "2026-05-30"
  },
  // Network (Consistent)
  {
    id: "CI-NET-201",
    name: "Fortigate 100F Firewall",
    category: "Perangkat Jaringan & Keamanan",
    serialNumber: "SN-FTG-100F89",
    assetTag: "TAG-NET-2023-002",
    location: "Makassar",
    user: "NetSec Team",
    criticality: "Critical",
    status: "Active",
    source: "Both",
    expiryDate: "2027-12-31",
    eolDate: "2029-12-31",
    notes: "Gateway keamanan Makassar branch",
    lastUpdated: "2026-04-12"
  },
  // Software (Consistent)
  {
    id: "CI-SW-301",
    name: "CrowdStrike Falcon Endpoint Premium",
    category: "Perangkat Lunak Komputer",
    serialNumber: "LIC-CS-FALCON-99",
    assetTag: "TAG-LIC-2025-001",
    location: "Kantor Pusat",
    user: "Security Operation Center",
    criticality: "High",
    status: "Active",
    source: "Both",
    expiryDate: "2026-10-15", // Approaching expiration (Alert H-90!)
    eolDate: "2028-10-15",
    notes: "Lisensi keamanan antivirus endpoint bankwide",
    lastUpdated: "2026-05-01"
  },
  // Storage (Consistent)
  {
    id: "CI-STG-401",
    name: "Dell PowerVault ME5024 SAN Storage",
    category: "Storage",
    serialNumber: "SN-DELL-PV0032",
    assetTag: "TAG-STG-2024-550",
    location: "Palembang",
    user: "Storage Tech Team",
    criticality: "High",
    status: "Active",
    source: "Both",
    expiryDate: "2028-09-30",
    eolDate: "2031-09-30",
    notes: "Data backup storage Palembang branch",
    lastUpdated: "2026-03-24"
  },
  // Infrastructure Supporting (Consistent)
  {
    id: "CI-INF-501",
    name: "APC Smart-UPS SRT 10kVA",
    category: "Infrastruktur Pendukung TI",
    serialNumber: "SN-APC-UPS9912",
    assetTag: "TAG-INF-2023-112",
    location: "Jambi",
    user: "Facility Management",
    criticality: "High",
    status: "Active",
    source: "Both",
    expiryDate: "2027-11-12",
    eolDate: "2029-11-12",
    notes: "Backup daya kabinet server Jambi",
    lastUpdated: "2026-01-20"
  },
  // Retired Asset in CMDB but active in GA-Procurement (G ∧ C ∧ ¬S)
  {
    id: "CI-NET-202",
    name: "Cisco Catalyst Switch 2960",
    category: "Perangkat Jaringan & Keamanan",
    serialNumber: "SN-CISCO-SW442",
    assetTag: "TAG-NET-2019-332",
    location: "Palembang",
    user: "Network Admin",
    criticality: "Low",
    status: "Retired", // CMDB says retired, Procurement says Active is the truth!
    source: "Both",
    expiryDate: "2025-06-01",
    eolDate: "2026-06-11",
    notes: "Hardware EOL, harus update status sinkron",
    lastUpdated: "2026-02-14"
  }
];

export const INITIAL_PROCUREMENT_ASSETS: Asset[] = [
  ...IMPORTED_ENTERPRISE_ASSETS,
  // ThinkPad L14 Gen 4 - Teller 01 (Consistent with CMDB)
  {
    id: "CI-EQP-001",
    name: "ThinkPad L14 Gen 4 - Teller 01",
    category: "Endpoint (PC & Laptop)",
    serialNumber: "SN-L14-99021",
    assetTag: "TAG-END-2024-001",
    location: "Kantor Pusat",
    user: "Siti Rahma",
    criticality: "Medium",
    status: "Active",
    source: "GA-Procurement",
    expiryDate: "2027-06-15",
    eolDate: "2029-12-31",
    notes: "Laptop teller utama",
    lastUpdated: "2024-06-15"
  },
  // ThinkPad L14 Gen 4 - CS 02 (Consistent with CMDB)
  {
    id: "CI-EQP-002",
    name: "ThinkPad L14 Gen 4 - CS 02",
    category: "Endpoint (PC & Laptop)",
    serialNumber: "SN-L14-99022",
    assetTag: "TAG-END-2024-002",
    location: "Jambi",
    user: "Budi Santoso",
    criticality: "Medium",
    status: "Active",
    source: "GA-Procurement",
    expiryDate: "2027-06-15",
    eolDate: "2029-12-31",
    lastUpdated: "2024-06-15"
  },
  // MacBook Pro 14 M3 - Specialist (Consistent with CMDB)
  {
    id: "CI-EQP-003",
    name: "MacBook Pro 14 M3 - Specialist",
    category: "Endpoint (PC & Laptop)",
    serialNumber: "SN-MBP-88219",
    assetTag: "TAG-END-2024-003",
    location: "Kantor Pusat",
    user: "Dinianti Marselia",
    criticality: "High",
    status: "Active",
    source: "GA-Procurement",
    expiryDate: "2028-11-20",
    eolDate: "2031-11-20",
    lastUpdated: "2024-11-20"
  },
  // Latitude 3440 - Dev 03 (Mismatch status G ∧ C ∧ ¬S. CMDB says retired, procurement says Active)
  {
    id: "CI-EQP-004",
    name: "Latitude 3440 - Dev 03",
    category: "Endpoint (PC & Laptop)",
    serialNumber: "SN-LAT-33299",
    assetTag: "TAG-END-2024-004",
    location: "Mikro Palembang",
    user: "Rian Hidayat",
    criticality: "High",
    status: "Active", // Proc says it's physically active!
    source: "GA-Procurement",
    expiryDate: "2026-01-10",
    eolDate: "2028-01-10",
    lastUpdated: "2024-01-10"
  },
  // New Procurement asset NOT yet in CMDB: G ∧ ¬C
  {
    id: "PR-EQP-009",
    name: "iPad Air 6 Gen - Mobile CS",
    category: "Endpoint (PC & Laptop)",
    serialNumber: "SN-IPAD-77622",
    assetTag: "TAG-END-2026-011",
    location: "Kantor Pusat",
    user: "Lia Amalia",
    criticality: "Low",
    status: "Active",
    source: "GA-Procurement", // Only in GA Procurement, needs configuration item created!
    expiryDate: "2029-02-10",
    eolDate: "2032-02-10",
    notes: "Tablet CS Mobile pengadaan terbaru Mei 2026",
    lastUpdated: "2026-05-15"
  },
  // Core DB Server (Consistent)
  {
    id: "CI-SRV-101",
    name: "HPE ProLiant DL380 Gen11 - Core DB",
    category: "Server & Storage",
    serialNumber: "SN-HPE-11029",
    assetTag: "TAG-SRV-2024-015",
    location: "Kantor Pusat",
    user: "Database Team",
    criticality: "Critical",
    status: "Active",
    source: "GA-Procurement",
    expiryDate: "2029-03-15",
    eolDate: "2031-03-15",
    lastUpdated: "2024-03-15"
  },
  // Fortigate (Consistent)
  {
    id: "CI-NET-201",
    name: "Fortigate 100F Firewall",
    category: "Perangkat Jaringan & Keamanan",
    serialNumber: "SN-FTG-100F89",
    assetTag: "TAG-NET-2023-002",
    location: "Makassar",
    user: "NetSec Team",
    criticality: "Critical",
    status: "Active",
    source: "GA-Procurement",
    expiryDate: "2027-12-31",
    eolDate: "2029-12-31",
    lastUpdated: "2023-12-31"
  },
  // Cisco Catalyst Switch (Proc status active, CMDB status retired - G ∧ C ∧ ¬S)
  {
    id: "CI-NET-202",
    name: "Cisco Catalyst Switch 2960",
    category: "Perangkat Jaringan & Keamanan",
    serialNumber: "SN-CISCO-SW442",
    assetTag: "TAG-NET-2019-332",
    location: "Palembang",
    user: "Network Admin",
    criticality: "Low",
    status: "Active", // Proc matches Active
    source: "GA-Procurement",
    expiryDate: "2025-06-01",
    eolDate: "2026-06-11",
    lastUpdated: "2019-06-01"
  },
  // Crowdstrike (Consistent)
  {
    id: "CI-SW-301",
    name: "CrowdStrike Falcon Endpoint Premium",
    category: "Perangkat Lunak Komputer",
    serialNumber: "LIC-CS-FALCON-99",
    assetTag: "TAG-LIC-2025-001",
    location: "Kantor Pusat",
    user: "Security Operation Center",
    criticality: "High",
    status: "Active",
    source: "GA-Procurement",
    expiryDate: "2026-10-15",
    eolDate: "2028-10-15",
    lastUpdated: "2025-10-15"
  },
  // Dell SAN (Consistent)
  {
    id: "CI-STG-401",
    name: "Dell PowerVault ME5024 SAN Storage",
    category: "Storage",
    serialNumber: "SN-DELL-PV0032",
    assetTag: "TAG-STG-2024-550",
    location: "Palembang",
    user: "Storage Tech Team",
    criticality: "High",
    status: "Active",
    source: "GA-Procurement",
    expiryDate: "2028-09-30",
    eolDate: "2031-09-30",
    lastUpdated: "2024-09-30"
  },
  // APC UPS (Consistent)
  {
    id: "CI-INF-501",
    name: "APC Smart-UPS SRT 10kVA",
    category: "Infrastruktur Pendukung TI",
    serialNumber: "SN-APC-UPS9912",
    assetTag: "TAG-INF-2023-112",
    location: "Jambi",
    user: "Facility Management",
    criticality: "High",
    status: "Active",
    source: "GA-Procurement",
    expiryDate: "2027-11-12",
    eolDate: "2029-11-12",
    lastUpdated: "2023-11-12"
  }
];

// Historical metrics reported in paper 
export const AUDIT_METRICS = [
  {
    label: "Akurasi CMDB (%)",
    baseline: "69%",
    current: "90%",
    improvement: "+21% peningkatan",
    type: "up"
  },
  {
    label: "Duplikasi CI",
    baseline: 180,
    current: 32,
    improvement: "-82% reduksi duplikasi",
    type: "down"
  },
  {
    label: "Aset Gaib (Ghost Assets)",
    baseline: 54,
    current: 11,
    improvement: "-79% pembersihan",
    type: "down"
  },
  {
    label: "Waktu Rekonsiliasi",
    baseline: "14 hari",
    current: "4 hari",
    improvement: "71% lebih cepat (SLA)",
    type: "up"
  },
  {
    label: "Temuan Audit Utama",
    baseline: "High Risk",
    current: "Small Desk",
    improvement: "Kepatuhan COBIT Terpenuhi",
    type: "up"
  }
];

// Static Data for Visual Charts (Representing the exact figures in the journal)
export const OPERATING_SYSTEMA_DATA = [
  { name: "Windows 11", value: 571 },
  { name: "Windows 10 Pro", value: 122 },
  { name: "Chrome OS", value: 18 },
  { name: "macOS", value: 2 }
];

export const VENDOR_VOLUME_DATA = [
  { name: "Microsoft Corp.", value: 1917, fill: "#10b981" },
  { name: "Trellix", value: 1377, fill: "#3b82f6" },
  { name: "Zoho Corp.", value: 834, fill: "#f59e0b" },
  { name: "CrowdStrike", value: 780, fill: "#ef4444" },
  { name: "Cloudflare, Inc.", value: 546, fill: "#ec4899" }
];

export const ASSETS_BY_SITE_DATA = [
  { name: "Kantor Pusat", IT_Assets: 782, Components: 50, Non_IT_Assets: 15 },
  { name: "Jambi", IT_Assets: 17, Components: 14, Non_IT_Assets: 2 },
  { name: "Mikro Palembang", IT_Assets: 22, Components: 11, Non_IT_Assets: 1 },
  { name: "Medan", IT_Assets: 21, Components: 25, Non_IT_Assets: 2 },
  { name: "Palembang", IT_Assets: 525, Components: 42, Non_IT_Assets: 14 },
  { name: "Makassar", IT_Assets: 27, Components: 20, Non_IT_Assets: 3 }
];

export const DECOMMISSIONING_DATA = [
  { name: "Server", value: 15, fill: "#10b981" },
  { name: "Switch", value: 8, fill: "#3b82f6" },
  { name: "Router", value: 6, fill: "#f59e0b" },
  { name: "Firewall", value: 5, fill: "#ef4444" },
  { name: "Workstation", value: 4, fill: "#8b5cf6" },
  { name: "SSL License", value: 1, fill: "#ec4899" }
];
