import React, { useState } from 'react';
import { 
  Printer, FileText, CheckCircle, Search, Filter, Plus, Calendar, ShieldCheck, Database, FileSpreadsheet,
  Download, Save, Trash, Briefcase, RefreshCw
} from 'lucide-react';
import { Asset } from '../types';

interface SavedReport {
  id: string;
  no: string;
  date: string;
  filterCategory: string;
  filterLocation: string;
  filterStatus: string;
  filterSearch: string;
  totalAssets: number;
  activeAssets: number;
  inStockAssets: number;
  notes: string;
  savedAt: string;
}

interface ReportViewProps {
  cmdbAssets: Asset[];
  procurementAssets: Asset[];
  onAddAsset: (newAsset: Asset, source: 'CMDB' | 'GA-Procurement') => void;
}

export default function ReportView({ cmdbAssets, procurementAssets, onAddAsset }: ReportViewProps) {
  // Input form states for the inline fast asset creator
  const [assetId, setAssetId] = useState(`CI-EQP-${Math.floor(100 + Math.random() * 900)}`);
  const [assetName, setAssetName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Asset['category']>('Endpoint (PC & Laptop)');
  const [serialNumber, setSerialNumber] = useState('');
  const [location, setLocation] = useState<Asset['location']>('Kantor Pusat');
  const [user, setUser] = useState('');
  const [criticality, setCriticality] = useState<Asset['criticality']>('Medium');
  const [status, setStatus] = useState<Asset['status']>('Active');
  const [targetDb, setTargetDb] = useState<'CMDB' | 'GA-Procurement'>('CMDB');
  const [addSuccess, setAddSuccess] = useState(false);

  // Filter states
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterLocation, setFilterLocation] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterSearch, setFilterSearch] = useState('');
  
  // Custom metadata about report
  const reportDate = "2026-06-11";
  const reportNo = "REP/CMDB/XI/2026";

  // Archival States
  const [savedReports, setSavedReports] = useState<SavedReport[]>(() => {
    try {
      const stored = localStorage.getItem('corecmdb_saved_reports');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  
  const [archiveNotes, setArchiveNotes] = useState('');
  const [showArchiveSuccess, setShowArchiveSuccess] = useState(false);

  // Handle asset registration
  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetName || !serialNumber) {
      alert("Harap isi Nama Aset dan Nomor Seri terlebih dahulu.");
      return;
    }

    const newAsset: Asset = {
      id: assetId,
      name: assetName,
      category: selectedCategory,
      serialNumber: serialNumber,
      assetTag: `TAG-${selectedCategory.slice(0,3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      location,
      user: user || 'Belum Diidentifikasi',
      criticality,
      status,
      source: targetDb,
      expiryDate: "2028-12-31",
      eolDate: "2031-12-31",
      notes: "Diinput melalui form Laporan & Cetak",
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    onAddAsset(newAsset, targetDb);
    
    // reset form
    setAssetName('');
    setSerialNumber('');
    setUser('');
    setAssetId(`CI-EQP-${Math.floor(100 + Math.random() * 900)}`);
    setAddSuccess(true);
    setTimeout(() => setAddSuccess(false), 3000);
  };

  // Combine data for aggregated report
  const allMergedAssets = Array.from(new Map([...cmdbAssets, ...procurementAssets].map(item => [item.id, item])).values());

  // Apply filters
  const filteredAssets = allMergedAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(filterSearch.toLowerCase()) || 
                          asset.id.toLowerCase().includes(filterSearch.toLowerCase()) ||
                          asset.serialNumber.toLowerCase().includes(filterSearch.toLowerCase()) ||
                          asset.user.toLowerCase().includes(filterSearch.toLowerCase());
    const matchesCategory = filterCategory === 'All' || asset.category === filterCategory;
    const matchesLocation = filterLocation === 'All' || asset.location === filterLocation;
    const matchesStatus = filterStatus === 'All' || asset.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesLocation && matchesStatus;
  });

  // Calculate high-level stats for report header
  const totalAssetsNum = filteredAssets.length;
  const activeAssetsNum = filteredAssets.filter(a => a.status === 'Active').length;
  const retiredAssetsNum = filteredAssets.filter(a => a.status === 'Retired').length;
  const disposedAssetsNum = filteredAssets.filter(a => a.status === 'Disposed').length;
  const inStockAssetsNum = filteredAssets.filter(a => a.status === 'InStock').length;

  const handlePrint = () => {
    window.print();
  };

  // Export CSV
  const handleExportCSV = () => {
    if (filteredAssets.length === 0) {
      alert("Tidak ada data untuk diekspor.");
      return;
    }
    
    const headers = ["CI-ID", "Nama Aset", "Kategori", "Lokasi", "Pengguna", "Status", "No Seri", "Asset Tag", "Tanggal Berakhir Kontrak", "Catatan"];
    const rows = filteredAssets.map(asset => [
      asset.id,
      `"${asset.name.replace(/"/g, '""')}"`,
      `"${asset.category.replace(/"/g, '""')}"`,
      `"${asset.location.replace(/"/g, '""')}"`,
      `"${asset.user.replace(/"/g, '""')}"`,
      asset.status,
      `"${asset.serialNumber.replace(/"/g, '""')}"`,
      `"${asset.assetTag.replace(/"/g, '""')}"`,
      asset.expiryDate,
      `"${(asset.notes || '').replace(/"/g, '""')}"`
    ]);
    
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Laporan_Aset_${reportNo.replace(/\//g, '_')}_${reportDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export JSON
  const handleExportJSON = () => {
    if (filteredAssets.length === 0) {
      alert("Tidak ada data untuk diekspor.");
      return;
    }
    
    const jsonContent = JSON.stringify({
      reportNo,
      reportDate,
      filterCategory,
      filterLocation,
      filterStatus,
      filterSearch,
      totalUnits: filteredAssets.length,
      exportedAt: new Date().toISOString(),
      assets: filteredAssets
    }, null, 2);
    
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Laporan_Aset_${reportNo.replace(/\//g, '_')}_${reportDate}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Archive to local history
  const handleSaveToArchive = (e: React.FormEvent) => {
    e.preventDefault();
    const newArchive: SavedReport = {
      id: `ARC-${Math.floor(1000 + Math.random() * 9000)}`,
      no: reportNo,
      date: reportDate,
      filterCategory,
      filterLocation,
      filterStatus,
      filterSearch,
      totalAssets: filteredAssets.length,
      activeAssets: activeAssetsNum,
      inStockAssets: inStockAssetsNum,
      notes: archiveNotes || `Laporan terfilter per ${new Date().toLocaleDateString('id-ID')}`,
      savedAt: new Date().toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    
    const updated = [newArchive, ...savedReports];
    setSavedReports(updated);
    localStorage.setItem('corecmdb_saved_reports', JSON.stringify(updated));
    setArchiveNotes('');
    setShowArchiveSuccess(true);
    setTimeout(() => setShowArchiveSuccess(false), 3000);
  };

  // Delete saved archive
  const handleDeleteArchive = (id: string) => {
    const updated = savedReports.filter(r => r.id !== id);
    setSavedReports(updated);
    localStorage.setItem('corecmdb_saved_reports', JSON.stringify(updated));
  };

  // Load archived report filters
  const handleLoadArchive = (arch: SavedReport) => {
    setFilterCategory(arch.filterCategory);
    setFilterLocation(arch.filterLocation);
    setFilterStatus(arch.filterStatus);
    setFilterSearch(arch.filterSearch || '');
  };

  return (
    <div className="space-y-6 animate-fade-in printable-wrapper">
      
      {/* 1. INPUT FORM SEGMENT (Screen only) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 no-print">
        
        {/* Left Form Panel: Direct Asset Input */}
        <div className="bg-white border border-slate-100 shadow-sm p-6 rounded-2xl space-y-4 xl:col-span-1">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-50">
            <Plus className="w-5 h-5 text-teal-600" />
            <h3 className="font-extrabold text-slate-905 text-sm">Input &amp; Registrasi Aset Langsung</h3>
          </div>
          
          <form onSubmit={handleOnSubmit} className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-500 block">Database Target</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => { setTargetDb('CMDB'); if (!assetId.startsWith('CI-')) setAssetId(`CI-EQP-${Math.floor(100+Math.random()*900)}`); }}
                  className={`py-2 px-3 text-center rounded-lg font-bold border transition-all ${
                    targetDb === 'CMDB' ? 'bg-teal-50 border-teal-500 text-teal-700' : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  CMDB (Teknis)
                </button>
                <button
                  type="button"
                  onClick={() => { setTargetDb('GA-Procurement'); if (!assetId.startsWith('PR-')) setAssetId(`PR-EQP-${Math.floor(100+Math.random()*900)}`); }}
                  className={`py-2 px-3 text-center rounded-lg font-bold border transition-all ${
                    targetDb === 'GA-Procurement' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  GA-Procurement (Fisik)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="font-bold text-slate-500 block">ID Aset / CI Tag *</label>
                <input 
                  type="text"
                  value={assetId}
                  onChange={(e) => setAssetId(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-teal-500 font-mono font-bold"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-500 block">Nomor Seri *</label>
                <input 
                  type="text"
                  placeholder="Contoh: SN-XYZ8821"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-teal-500 font-mono"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-500 block">Nama Lengkap Aset *</label>
              <input 
                type="text"
                placeholder="Contoh: Huawei Firewall, MacBook Teller"
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-teal-500 font-semibold"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="font-bold text-slate-500 block">Kategori</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-teal-500"
                >
                  <option value="Endpoint (PC & Laptop)">PC &amp; Laptop</option>
                  <option value="Server & Storage">Server &amp; Storage</option>
                  <option value="Perangkat Lunak Komputer">Software</option>
                  <option value="Perangkat Jaringan & Keamanan">Network Security</option>
                  <option value="Storage">Data Storage</option>
                  <option value="Infrastruktur Pendukung TI">Infrastrukur Pendukung</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-500 block">Lokasi Cabang</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value as any)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-teal-500"
                >
                  <option value="Kantor Pusat">Kantor Pusat</option>
                  <option value="Jambi">Jambi</option>
                  <option value="Mikro Palembang">Mikro Palembang</option>
                  <option value="Medan">Medan</option>
                  <option value="Palembang">Palembang</option>
                  <option value="Makassar">Makassar</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="font-bold text-slate-500 block">Kritikalitas</label>
                <select
                  value={criticality}
                  onChange={(e) => setCriticality(e.target.value as any)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-teal-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-500 block">Status Siklus Hidup</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-teal-500"
                >
                  <option value="Active">Active</option>
                  <option value="Disposed">Disposed</option>
                  <option value="Retired">Retired</option>
                  <option value="InStock">InStock</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-500 block">Pengguna Utama / PIC</label>
              <input 
                type="text"
                placeholder="Contoh: Ahmad Subagja"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-teal-500"
              />
            </div>

            {addSuccess && (
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-2.5 text-teal-800 text-xs text-center font-bold">
                Kombinasi Sukses Ditambahkan ke {targetDb}!
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all mt-4"
              id="btn-inline-submit-report"
            >
              <Plus className="w-4 h-4" />
              Masukkan Aset ke Daftar
            </button>
          </form>
        </div>

        {/* Right Info Panel: Filter controls */}
        <div className="bg-white border border-slate-100 shadow-sm p-6 rounded-2xl space-y-4 xl:col-span-2 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-50">
              <Filter className="w-5 h-5 text-indigo-600" />
              <h3 className="font-extrabold text-slate-800 text-sm">Filter Parameter Laporan</h3>
            </div>

            <p className="text-xs text-slate-400">
              Gunakan parameter di bawah untuk memfilter isi tabel laporan di bawah sebelum melakukan pencetakan fisik atau ekspor ke PDF.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-650 block">Filter Kategori</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-teal-500"
                >
                  <option value="All">Semua Kategori</option>
                  <option value="Endpoint (PC & Laptop)">Endpoint (PC & Laptop)</option>
                  <option value="Server & Storage">Server & Storage</option>
                  <option value="Perangkat Lunak Komputer">Perangkat Lunak</option>
                  <option value="Perangkat Jaringan & Keamanan">Keamanan & Jaringan</option>
                  <option value="Storage">Penyimpanan</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-650 block">Filter Cabang / Lokasi</label>
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-teal-500"
                >
                  <option value="All">Semua Wilayah</option>
                  <option value="Kantor Pusat">Kantor Pusat</option>
                  <option value="Jambi">Jambi</option>
                  <option value="Mikro Palembang">Mikro Palembang</option>
                  <option value="Medan">Medan</option>
                  <option value="Palembang">Palembang</option>
                  <option value="Makassar">Makassar</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-650 block">Filter Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-teal-500"
                >
                  <option value="All">Semua Status</option>
                  <option value="Active">Active</option>
                  <option value="Disposed">Disposed</option>
                  <option value="Retired">Retired</option>
                  <option value="InStock">InStock</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-650 block">Search</label>
                <input
                  type="text"
                  placeholder="Cari kata kunci..."
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-teal-500"
                />
              </div>
            </div>
          </div>

          {/* ADVANCED EXPORT, SAVE, AND LOCAL ARCHIVAL CONTROL PANEL */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            
            {/* Left Panel: Direct Data Exporters & Printers */}
            <div className="bg-indigo-50/40 border border-indigo-100 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-indigo-100/50">
                <Printer className="w-5 h-5 text-indigo-700" />
                <h4 className="font-extrabold text-slate-800 text-sm">Opsi Cetak &amp; Ekspor Hasil Laporan</h4>
              </div>
              
              <p className="text-slate-500 text-xs leading-normal">
                Sistem menyediakan format laporan standardisasi audit industri. Anda dapat mengekspor data yang terfilter di bawah langsung ke komputer Anda ataupun mencetak dokumen fisik.
              </p>

              <div className="bg-amber-50 border border-amber-200 text-amber-900 p-2.5 rounded-lg text-[11px] leading-relaxed">
                💡 <strong>Rekomendasi Cetak:</strong> Untuk format dokumen (A4) yang optimal, silakan buka aplikasi ini pada tab baru, lalu pilih opsi cetak atau simpan sebagai dokumen PDF melalui menu peramban Anda.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                <button
                  onClick={handlePrint}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-4 py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-650/15 transition-all"
                  id="btn-print-action"
                >
                  <Printer className="w-4 h-4 shrink-0" />
                  Unduh Laporan (PDF)
                </button>
                
                <button
                  onClick={handleExportCSV}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-4 py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-650/15 transition-all"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  Ekspor Spreadsheet (CSV)
                </button>

                <button
                  onClick={handleExportJSON}
                  className="bg-slate-700 hover:bg-slate-600 text-white font-extrabold text-xs px-4 py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-all"
                >
                  <Database className="w-4 h-4 shrink-0" />
                  Backup JSON
                </button>
              </div>
            </div>

            {/* Right Panel: Save & Archive Filtered Report State */}
            <div className="bg-white border border-slate-200 shadow-md rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Save className="w-5 h-5 text-teal-600" />
                <h4 className="font-extrabold text-slate-800 text-sm">Simpan Laporan Ke Arsip Lokal Aplikasi</h4>
              </div>

              <p className="text-slate-500 text-xs leading-normal">
                Gunakan fitur ini untuk menyimpan konfigurasi filter, parameter pencarian, serta jumlah unit saat ini ke dalam riwayat sistem. Membantu pelacakan data tanpa mengubah master database.
              </p>

              <form onSubmit={handleSaveToArchive} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Laporan Akhir Bulan Jambi Q2..."
                    value={archiveNotes}
                    onChange={(e) => setArchiveNotes(e.target.value)}
                    className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-teal-500"
                  />
                  <button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1 shadow-sm transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Simpan
                  </button>
                </div>
                {showArchiveSuccess && (
                  <p className="text-[11px] text-teal-600 font-bold flex items-center gap-1 animate-pulse">
                    ✓ Laporan sukses disimpan ke riwayat arsip di browser Anda!
                  </p>
                )}
              </form>

              {/* Saved archives list */}
              <div className="space-y-2 mt-3 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Riwayat Arsip Laporan:</span>
                
                {savedReports.length > 0 ? (
                  <div className="max-h-24 overflow-y-auto space-y-1.5 pr-1">
                    {savedReports.map((arch) => (
                      <div key={arch.id} className="flex justify-between items-center p-2 bg-slate-50 hover:bg-slate-100/85 border border-slate-100 rounded-lg text-[11px] transition-all">
                        <div className="space-y-0.5 truncate flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-850 truncate">{arch.notes}</span>
                            <span className="text-[9px] font-mono text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded font-black shrink-0">{arch.totalAssets} Unit</span>
                          </div>
                          <p className="text-[9px] text-slate-400">Status: {arch.filterStatus} • Cabang: {arch.filterLocation} • Tanggal: {arch.savedAt}</p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <button
                            onClick={() => handleLoadArchive(arch)}
                            title="Terapkan Filter Terarsip"
                            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-750 p-1 rounded transition-colors"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteArchive(arch.id)}
                            title="Hapus Arsip"
                            className="bg-rose-50 hover:bg-rose-100 text-rose-700 p-1 rounded transition-colors"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-4 text-center text-slate-400 italic text-[11px] bg-slate-50 rounded-lg border border-dashed border-slate-200">
                    Belum ada riwayat laporan tersimpan.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>

       {/* 2. REPORT PAGE (PREVIEW & PRINTABLE AREA) */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8 max-w-4xl mx-auto space-y-6 printable-region">
        
        {/* Printable Header - Corporate/Enterprise Invoice/Report style */}
        <div className="flex flex-col md:flex-row md:items-start justify-between border-b-2 border-slate-900 pb-5 gap-6">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight text-indigo-900">
              LAPORAN KONSISTENSI DATA &amp; INVENTARISASI TI
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Mendukung pengelolaan aset TI secara terpusat melalui inventarisasi aset, pengendalian lisensi, dan pemantauan siklus hidup aset.
            </p>
          </div>
          
          <div className="text-left md:text-right text-xs space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100 font-mono shrink-0">
            <p className="font-bold text-slate-800">No. Surat: <span className="text-slate-500 font-normal">{reportNo}</span></p>
            <p className="font-bold text-slate-800">Tanggal: <span className="text-slate-500 font-normal">{reportDate}</span></p>
            <p className="font-bold text-slate-800">Jenis Laporan: <span className="text-slate-500 font-normal">Konsolidasi Data Aset</span></p>
          </div>
        </div>

        {/* Executive Summary paragraph */}
        <div className="space-y-2 text-xs leading-relaxed text-slate-700">
          <h4 className="font-bold text-slate-905 flex items-center gap-1.5 uppercase text-[11px] tracking-wider border-b border-slate-100 pb-1 text-slate-500">
            <FileText className="w-4 h-4 text-indigo-500" />
            Ringkasan Eksekutif Keadaan Inventaris TI
          </h4>
          <p>
            Laporan konsolidasi ini memuat ringkasan data inventarisasi perangkat keras, lisensi perangkat lunak, serta perangkat pendukung infrastruktur TI korporat. Data ini disinkronkan secara berkala dan disiapkan khusus untuk keperluan audit internal, optimalisasi sumber daya operasional, audit anggaran, serta pengawasan kepatuhan lisensi aktif.
          </p>
        </div>

        {/* Small aggregated metric badges within report */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Terfilter</span>
            <p className="text-lg font-black text-slate-850 mt-1">{totalAssetsNum} Unit</p>
          </div>
          <div className="p-3 bg-teal-50/40 rounded-xl border border-teal-100/50">
            <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider block">Status Active</span>
            <p className="text-lg font-black text-teal-800 mt-1">{activeAssetsNum} Unit</p>
          </div>
          <div className="p-3 bg-rose-50/40 rounded-xl border border-rose-100/50">
            <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">Status Disposed</span>
            <p className="text-lg font-black text-rose-800 mt-1">{disposedAssetsNum} Unit</p>
          </div>
          <div className="p-3 bg-amber-50/40 rounded-xl border border-amber-100/50">
            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">Status Retired</span>
            <p className="text-lg font-black text-amber-800 mt-1">{retiredAssetsNum} Unit</p>
          </div>
          <div className="p-3 bg-indigo-50/40 rounded-xl border border-indigo-100/50">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">Status InStock</span>
            <p className="text-lg font-black text-indigo-800 mt-1">{inStockAssetsNum} Unit</p>
          </div>
        </div>

        {/* Table Content */}
        <div className="space-y-2">
          <h4 className="font-bold text-slate-905 flex items-center gap-1.5 uppercase text-[11px] tracking-wider border-b border-slate-100 pb-1 text-slate-500">
            <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
            Tabel Rincian Konfigurasi Item Terdaftar (CI)
          </h4>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-300">
                  <th className="py-2.5 px-3 font-mono">CI-ID</th>
                  <th className="py-2.5 px-3">Nama Alat / Aset</th>
                  <th className="py-2.5 px-3">Kategori</th>
                  <th className="py-2.5 px-3">Lokasi</th>
                  <th className="py-2.5 px-3">Pengguna</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 font-mono">No Seri</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredAssets.length > 0 ? (
                  filteredAssets.map(asset => (
                    <tr key={asset.id} className="hover:bg-slate-50/35 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{asset.id}</td>
                      <td className="py-2.5 px-3 text-slate-800">{asset.name}</td>
                      <td className="py-2.5 px-3 text-slate-500">{asset.category}</td>
                      <td className="py-2.5 px-3">{asset.location}</td>
                      <td className="py-2.5 px-3 text-slate-600">{asset.user}</td>
                      <td className="py-2.5 px-3">
                        <span className={`text-[10px] font-black ${
                          asset.status === 'Active' ? 'text-teal-700' :
                          asset.status === 'Retired' ? 'text-amber-700' :
                          asset.status === 'Disposed' ? 'text-rose-700' :
                          asset.status === 'InStock' ? 'text-indigo-700' :
                          'text-slate-500'
                        }`}>
                          {asset.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-xs text-slate-500">{asset.serialNumber}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-slate-400 italic">
                      Tidak ada data yang memenuhi kriteria filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Paper signature / Verification Box */}
        <div className="pt-8 border-t border-dashed border-slate-200 grid grid-cols-2 text-xs gap-12">
          <div></div>
          
          <div className="self-end">
            <div className="grid grid-cols-2 gap-8 text-center">
              <div className="space-y-12">
                <p className="text-slate-500 font-bold">Disiapkan Oleh,</p>
                <div className="space-y-1">
                  <div className="h-6 border-b border-slate-300 w-32 mx-auto"></div>
                  <p className="text-slate-550 font-bold text-[10px] pt-2">Dept Head IT System Support</p>
                </div>
              </div>
              <div className="space-y-12">
                <p className="text-slate-500 font-bold">Disetujui Oleh,</p>
                <div className="space-y-1">
                  <div className="h-6 border-b border-slate-300 w-32 mx-auto"></div>
                  <p className="text-slate-550 font-bold text-[10px] pt-2">Head of Infrastructure &amp; Security</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
