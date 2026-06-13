import React, { useState } from 'react';
import { 
  Search, Plus, Filter, Database, Edit, Trash, Eye, X, CheckSquare, RefreshCw, AlertCircle
} from 'lucide-react';
import { Asset } from '../types';

interface InventoryViewProps {
  cmdbAssets: Asset[];
  procurementAssets: Asset[];
  onAddAsset: (asset: Asset, source: 'CMDB' | 'GA-Procurement') => void;
  onUpdateAsset: (asset: Asset, source: 'CMDB' | 'GA-Procurement') => void;
  onDeleteAsset: (id: string, source: 'CMDB' | 'GA-Procurement') => void;
}

const CATEGORIES = [
  'Endpoint (PC & Laptop)',
  'Server & Storage',
  'Perangkat Lunak Komputer',
  'Perangkat Jaringan & Keamanan',
  'Storage',
  'Infrastruktur Pendukung TI',
  'Aset TI Pihak Ketiga'
] as const;

export default function InventoryView({ 
  cmdbAssets, 
  procurementAssets, 
  onAddAsset, 
  onUpdateAsset, 
  onDeleteAsset 
}: InventoryViewProps) {
  
  const [activeTab, setActiveTab] = useState<'CMDB' | 'Procurement'>('CMDB');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  
  // Detailed View states
  const [detailedAsset, setDetailedAsset] = useState<Asset | null>(null);

  // Form states
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<Asset['category']>('Endpoint (PC & Laptop)');
  const [formSerialNumber, setFormSerialNumber] = useState('');
  const [formAssetTag, setFormAssetTag] = useState('');
  const [formLocation, setFormLocation] = useState<Asset['location']>('Kantor Pusat');
  const [formUser, setFormUser] = useState('');
  const [formCriticality, setFormCriticality] = useState<Asset['criticality']>('Medium');
  const [formStatus, setFormStatus] = useState<Asset['status']>('Active');
  const [formExpiryDate, setFormExpiryDate] = useState('');
  const [formEolDate, setFormEolDate] = useState('');
  const [formNotes, setFormNotes] = useState('');

  // Handle opening form
  const openAddModal = () => {
    setEditingAsset(null);
    setFormId(`CI-${Math.floor(100 + Math.random() * 900)}`);
    setFormName('');
    setFormCategory('Endpoint (PC & Laptop)');
    setFormSerialNumber('');
    setFormAssetTag('');
    setFormLocation('Kantor Pusat');
    setFormUser('');
    setFormCriticality('Medium');
    setFormStatus('Active');
    setFormExpiryDate('2028-12-31');
    setFormEolDate('2031-12-31');
    setFormNotes('');
    setIsModalOpen(true);
  };

  const openEditModal = (asset: Asset) => {
    setEditingAsset(asset);
    setFormId(asset.id);
    setFormName(asset.name);
    setFormCategory(asset.category);
    setFormSerialNumber(asset.serialNumber);
    setFormAssetTag(asset.assetTag);
    setFormLocation(asset.location);
    setFormUser(asset.user);
    setFormCriticality(asset.criticality);
    setFormStatus(asset.status);
    setFormExpiryDate(asset.expiryDate);
    setFormEolDate(asset.eolDate);
    setFormNotes(asset.notes || '');
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formId || !formName || !formSerialNumber) {
      alert("Harap isi bidang wajib: ID, Nama, dan Serial Number.");
      return;
    }

    const newAsset: Asset = {
      id: formId,
      name: formName,
      category: formCategory,
      serialNumber: formSerialNumber,
      assetTag: formAssetTag || `TAG-NEW-${Date.now()}`,
      location: formLocation,
      user: formUser || "Unassigned",
      criticality: formCriticality,
      status: formStatus,
      source: activeTab === 'CMDB' ? 'CMDB' : 'GA-Procurement',
      expiryDate: formExpiryDate,
      eolDate: formEolDate,
      notes: formNotes,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    if (editingAsset) {
      onUpdateAsset(newAsset, activeTab);
    } else {
      onAddAsset(newAsset, activeTab);
    }
    setIsModalOpen(false);
  };

  const currentDataset = activeTab === 'CMDB' ? cmdbAssets : procurementAssets;

  // Filter Data
  const filteredAssets = currentDataset.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          asset.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.user.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800">Repositori Inventaris Aset</h2>
          <p className="text-xs text-slate-400">Kelola dan telisik metadata konfigurasi CMDB dan fisik General Affair (GA)</p>
        </div>

        {/* Add Asset Button */}
        <button 
          onClick={openAddModal}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-4 py-2.5 rounded-xl flex items-center gap-2"
          id="btn-add-asset"
        >
          <Plus className="w-4 h-4" />
          Registrasi Aset Baru ({activeTab})
        </button>
      </div>

      {/* Dataset Tabs selector */}
      <div className="border-b border-slate-100 flex gap-6">
        <button 
          onClick={() => { setActiveTab('CMDB'); setSearchQuery(''); setSelectedCategory('All'); }}
          className={`pb-3 font-semibold text-sm transition-all relative flex items-center gap-2 ${
            activeTab === 'CMDB' ? 'text-teal-600 scale-102 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
          id="tab-select-cmdb"
        >
          <Database className="w-4 h-4" />
          Basis Data CMDB (Teknis)
          <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {cmdbAssets.length} Aset
          </span>
          {activeTab === 'CMDB' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 rounded-full"></span>}
        </button>

        <button 
          onClick={() => { setActiveTab('Procurement'); setSearchQuery(''); setSelectedCategory('All'); }}
          className={`pb-3 font-semibold text-sm transition-all relative flex items-center gap-2 ${
            activeTab === 'Procurement' ? 'text-emerald-600 scale-102 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
          id="tab-select-procurement"
        >
          <CheckSquare className="w-4 h-4" />
          Daftar GA-Procurement (Fisik)
          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {procurementAssets.length} Pengadaan
          </span>
          {activeTab === 'Procurement' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"></span>}
        </button>
      </div>

      {/* Filter and Search Actions Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari nama, ID, serial number atau pengguna..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-teal-500"
            id="src-search-input"
          />
        </div>

        {/* Category selector */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs appearance-none focus:bg-white focus:outline-teal-500"
            id="src-category-filter"
          >
            <option value="All">Semua Kategori ({CATEGORIES.length})</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Informative Label */}
        <div className="bg-indigo-50 border border-indigo-100/50 rounded-xl px-4 py-2 flex items-center gap-2 text-indigo-700 text-[11px] font-semibold">
          <AlertCircle className="w-4 h-4 shrink-0 text-indigo-500" />
          <span>
            {activeTab === 'CMDB' 
              ? 'Data CMDB adalah kebenaran parameter teknis, IP Address, dan Logical Item.' 
              : 'Data GA-Procurement adalah kebenaran fisik pembelian, label, dan disposisi.'}
          </span>
        </div>
      </div>

      {/* Asset Grid Table */}
      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-4.5 px-6">ID / No Seri</th>
                <th className="py-4.5 px-6">Nama Aset</th>
                <th className="py-4.5 px-6">Kategori</th>
                <th className="py-4.5 px-6">Lokasi / Pengguna</th>
                <th className="py-4.5 px-6">Status</th>
                <th className="py-4.5 px-6">Kritikalitas</th>
                <th className="py-4.5 px-6 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 space-y-1">
                      <div className="font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded inline-block">
                        {asset.id}
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono">SN: {asset.serialNumber}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-800">{asset.name}</div>
                      <p className="text-[10px] text-slate-400">Tag: {asset.assetTag}</p>
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-500">{asset.category}</td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-slate-800 block">{asset.location}</span>
                      <span className="text-[10px] text-slate-400 block">Pengguna: {asset.user}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-0.5 rounded-full inline-block text-[10px] font-bold ${
                        asset.status === 'Active' ? 'bg-teal-50 text-teal-700 border border-teal-200' :
                        asset.status === 'Retired' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        asset.status === 'Disposed' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        asset.status === 'InStock' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                        'bg-slate-50 text-slate-600 border border-slate-200'
                      }`}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        asset.criticality === 'Critical' ? 'bg-rose-100 text-rose-800' :
                        asset.criticality === 'High' ? 'bg-orange-100 text-orange-850' :
                        asset.criticality === 'Medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-sky-100 text-sky-800'
                      }`}>
                        {asset.criticality}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2.5">
                        <button 
                          onClick={() => setDetailedAsset(asset)}
                          title="Lihat Metadata Lengkap"
                          className="p-1 px-2 border border-slate-200 hover:border-slate-300 rounded text-slate-500 bg-white hover:bg-slate-50 text-[10px] font-semibold flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Metadata
                        </button>
                        <button 
                          onClick={() => openEditModal(asset)}
                          title="Ubah Aset"
                          className="p-1.5 border border-slate-200 hover:border-slate-300 rounded text-amber-600 bg-white hover:bg-amber-50/50"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm(`Yakin ingin menghapus ${asset.name}?`)) {
                              onDeleteAsset(asset.id, activeTab);
                            }
                          }}
                          title="Hapus Aset"
                          className="p-1.5 border border-rose-100 hover:border-rose-200 rounded text-rose-600 bg-white hover:bg-rose-50"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400 bg-slate-50/20 border-dashed border-2 border-slate-100">
                    Tidak ada aset yang cocok dengan filter pencarian ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* METADATA VIEW MODAL */}
      {detailedAsset && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-[10px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded font-black uppercase">Core CMDB Metadata CI</span>
                <h3 className="text-lg font-extrabold text-slate-800 mt-1">{detailedAsset.name}</h3>
              </div>
              <button 
                onClick={() => setDetailedAsset(null)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 p-3 bg-slate-50 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Configuration Item (CI) ID</span>
                <p className="font-mono font-bold text-slate-900">{detailedAsset.id}</p>
              </div>
              <div className="space-y-1 p-3 bg-slate-50 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Serial Number</span>
                <p className="font-mono font-bold text-slate-900">{detailedAsset.serialNumber}</p>
              </div>
              <div className="space-y-1 p-3 bg-slate-50 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Service Asset Tag</span>
                <p className="font-mono font-bold text-slate-900">{detailedAsset.assetTag}</p>
              </div>
              <div className="space-y-1 p-3 bg-slate-50 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Kategori Aset TI</span>
                <p className="font-semibold text-slate-900">{detailedAsset.category}</p>
              </div>
              <div className="space-y-1 p-3 bg-slate-50 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Cabang / Lokasi Fisik</span>
                <p className="font-semibold text-slate-900">{detailedAsset.location}</p>
              </div>
              <div className="space-y-1 p-3 bg-slate-50 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Kritikalitas</span>
                <p className="font-semibold text-slate-950 font-mono">{detailedAsset.criticality}</p>
              </div>
              <div className="space-y-1 p-3 bg-slate-50 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Pengguna Aktif</span>
                <p className="font-semibold text-slate-900">{detailedAsset.user}</p>
              </div>
              <div className="space-y-1 p-3 bg-slate-50 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Status Hubungan</span>
                <p className="font-semibold text-slate-900">{detailedAsset.status}</p>
              </div>
              <div className="space-y-1 p-3 bg-amber-50/50 rounded-lg col-span-2">
                <span className="text-[10px] text-amber-700 uppercase font-bold">Expiry Kontrak (SLA Alert H-90)</span>
                <p className="font-medium text-amber-900 font-mono">{detailedAsset.expiryDate || "N/A"}</p>
              </div>
              <div className="space-y-1 p-3 bg-slate-50 rounded-lg col-span-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold">End of Life Support (EOL)</span>
                <p className="font-medium text-slate-900 font-mono">{detailedAsset.eolDate || "N/A"}</p>
              </div>
              {detailedAsset.notes && (
                <div className="col-span-2 space-y-1 p-3 bg-teal-50/30 rounded-lg">
                  <span className="text-[10px] text-teal-800 uppercase font-bold">Notes Tambahan</span>
                  <p className="text-slate-700">{detailedAsset.notes}</p>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end text-xs text-slate-400 font-mono">
              Terakhir diperbarui: {detailedAsset.lastUpdated}
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT FORM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <form 
            onSubmit={handleFormSubmit}
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 max-h-[90vh] overflow-y-auto"
            id="asset-detail-form"
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-50">
              <h3 className="text-base font-extrabold text-slate-900">
                {editingAsset ? `Ubah Data Aset - ${editingAsset.id}` : `Registrasi Aset Baru di ${activeTab}`}
              </h3>
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 col-span-1">
                <label className="font-bold text-slate-600">ID Konfigurasi / CI No *</label>
                <input 
                  type="text" 
                  value={formId} 
                  onChange={(e) => setFormId(e.target.value)}
                  disabled={!!editingAsset}
                  placeholder="Contoh: CI-EQP-005"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:outline-teal-500 font-black"
                />
              </div>

              <div className="space-y-1 col-span-1">
                <label className="font-bold text-slate-600">No Seri (Serial Number) *</label>
                <input 
                  type="text" 
                  value={formSerialNumber} 
                  onChange={(e) => setFormSerialNumber(e.target.value)}
                  placeholder="Masukkan nomor seri fisik"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:outline-teal-500"
                />
              </div>

              <div className="space-y-1 col-span-2">
                <label className="font-bold text-slate-600">Nama Lengkap Aset *</label>
                <input 
                  type="text" 
                  value={formName} 
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Contoh: Intel Server Core DB, ThinkPad CS"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-teal-500 font-semibold"
                />
              </div>

              <div className="space-y-1 col-span-1">
                <label className="font-bold text-slate-600">Kategori Aset TI</label>
                <select 
                  value={formCategory} 
                  onChange={(e) => setFormCategory(e.target.value as any)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-teal-500"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1 col-span-1">
                <label className="font-bold text-slate-600">Asset Tag</label>
                <input 
                  type="text" 
                  value={formAssetTag} 
                  onChange={(e) => setFormAssetTag(e.target.value)}
                  placeholder="Contoh: TAG-2026-99"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-teal-500"
                />
              </div>

              <div className="space-y-1 col-span-1">
                <label className="font-bold text-slate-600">Lokasi / Cabang</label>
                <select 
                  value={formLocation} 
                  onChange={(e) => setFormLocation(e.target.value as any)}
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

              <div className="space-y-1 col-span-1">
                <label className="font-bold text-slate-600">Status Siklus Hidup</label>
                <select 
                  value={formStatus} 
                  onChange={(e) => setFormStatus(e.target.value as any)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-teal-500"
                >
                  <option value="Active">Active</option>
                  <option value="Disposed">Disposed</option>
                  <option value="Retired">Retired</option>
                  <option value="InStock">InStock</option>
                </select>
              </div>

              <div className="space-y-1 col-span-1">
                <label className="font-bold text-slate-600">Pengguna / Penangungjawab</label>
                <input 
                  type="text" 
                  value={formUser} 
                  onChange={(e) => setFormUser(e.target.value)}
                  placeholder="Nama staf atau tim"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-teal-500"
                />
              </div>

              <div className="space-y-1 col-span-1">
                <label className="font-bold text-slate-600">Tingkat Kritikalitas</label>
                <select 
                  value={formCriticality} 
                  onChange={(e) => setFormCriticality(e.target.value as any)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-teal-500 animate-fade-in"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div className="space-y-1 col-span-1">
                <label className="font-bold text-slate-600">Batas Kontrak H-90</label>
                <input 
                  type="date" 
                  value={formExpiryDate} 
                  onChange={(e) => setFormExpiryDate(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-teal-500"
                />
              </div>

              <div className="space-y-1 col-span-1">
                <label className="font-bold text-slate-600">Batas Akhir Dukungan (EOL)</label>
                <input 
                  type="date" 
                  value={formEolDate} 
                  onChange={(e) => setFormEolDate(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-teal-500"
                />
              </div>

              <div className="space-y-1 col-span-2">
                <label className="font-bold text-slate-600">Keterangan / Notes</label>
                <textarea 
                  value={formNotes} 
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Deskripsi spesifikasi teknis tambahan, vendor, atau riwayat"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-teal-500 h-16 resize-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-50 flex justify-end gap-3">
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl"
              >
                Batal
              </button>
              <button 
                type="submit"
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl"
              >
                Simpan Konfigurasi
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
