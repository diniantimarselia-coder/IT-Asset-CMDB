import React, { useState } from 'react';
import { 
  Database, Layers, LayoutDashboard, HardDrive, CheckCircle, 
  AlertCircle, BookOpen, User, HelpCircle, GraduationCap,
  Lock, Key, RefreshCw, X, LogOut, Shield
} from 'lucide-react';
import { Asset } from './types';
import { INITIAL_CMDB_ASSETS, INITIAL_PROCUREMENT_ASSETS } from './data';
import DashboardView from './components/DashboardView';
import InventoryView from './components/InventoryView';
import ReportView from './components/ReportView';
import LoginView from './components/LoginView';
import UserManagementView from './components/UserManagementView';
import { Printer } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  
  // User authentication session state (persisted across reloads for high engineering compliance)
  const [loggedInNim, setLoggedInNim] = useState<string | null>(() => {
    return localStorage.getItem('corecmdb_logged_in_nim');
  });

  const handleLoginSuccess = (nim: string) => {
    setLoggedInNim(nim);
    localStorage.setItem('corecmdb_logged_in_nim', nim);
  };

  const handleLogout = () => {
    setLoggedInNim(null);
    localStorage.removeItem('corecmdb_logged_in_nim');
  };

  // Managing local storage persistence for License state (defaults to active/true)
  const [licenseActive, setLicenseActive] = useState<boolean>(() => {
    const saved = localStorage.getItem('corecmdb_license_active');
    return saved !== 'false';
  });
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState<boolean>(false);

  const toggleLicense = () => {
    const nextState = !licenseActive;
    setLicenseActive(nextState);
    localStorage.setItem('corecmdb_license_active', String(nextState));
  };

  // Manage CMDB and Procurement datasets as independent local state
  const [cmdbAssets, setCmdbAssets] = useState<Asset[]>(INITIAL_CMDB_ASSETS);
  const [procurementAssets, setProcurementAssets] = useState<Asset[]>(INITIAL_PROCUREMENT_ASSETS);

  // Asset action handlers
  const handleAddAsset = (newAsset: Asset, source: 'CMDB' | 'GA-Procurement') => {
    if (source === 'CMDB') {
      setCmdbAssets(prev => [...prev, newAsset]);
    } else {
      setProcurementAssets(prev => [...prev, newAsset]);
    }
  };

  const handleUpdateAsset = (updatedAsset: Asset, source: 'CMDB' | 'GA-Procurement') => {
    if (source === 'CMDB') {
      setCmdbAssets(prev => prev.map(item => item.id === updatedAsset.id ? updatedAsset : item));
    } else {
      setProcurementAssets(prev => prev.map(item => item.id === updatedAsset.id ? updatedAsset : item));
    }
  };

  const handleDeleteAsset = (id: string, source: 'CMDB' | 'GA-Procurement') => {
    if (source === 'CMDB') {
      setCmdbAssets(prev => prev.filter(item => item.id !== id));
    } else {
      setProcurementAssets(prev => prev.filter(item => item.id !== id));
    }
  };

  if (!loggedInNim) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* License Expired Global Banner notice */}
      {!licenseActive && (
        <div className="bg-rose-600 text-white text-xs py-2.5 px-6 flex items-center justify-between gap-3 animate-in fade-in duration-200 no-print">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <AlertCircle className="w-4 h-4 shrink-0 text-white animate-pulse" />
            <span>
              <strong>PERINGATAN LISENSI:</strong> Lisensi Enterprise (<span className="font-mono bg-rose-700 px-1 py-0.5 rounded text-[10px]">SaaS-9082</span>) telah berakhir. Akses ke <strong>Laporan &amp; Cetak</strong> ditangguhkan sementara.
            </span>
          </div>
          <button 
            onClick={toggleLicense}
            className="hidden sm:inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white font-extrabold px-3 py-1 rounded-lg text-[10px] uppercase tracking-wider transition-all active:scale-95"
          >
            <RefreshCw className="w-3 h-3" />
            Perpanjang Instan
          </button>
        </div>
      )}

      {/* Top Professional Header Bar */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-xs px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-teal-600 to-indigo-700 text-white rounded-xl shadow-md">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-slate-900 text-base leading-tight">CoreCMDB</h1>
              <span className="bg-gradient-to-r from-teal-600 to-indigo-600 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">PRO Enterprise</span>
            </div>
            <p className="text-[10px] text-slate-450 font-bold tracking-wide">Enterprise IT Asset Lifecycle &amp; CMDB Management</p>
          </div>
        </div>

        {/* Top Segmented Navigation Menu */}
        <nav className="hidden md:flex bg-slate-100 p-1 rounded-xl border border-slate-200/50">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentView === 'dashboard' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-500 hover:text-slate-700'
            }`}
            id="nav-dashboard"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Dashboard
          </button>
          
          <button 
            onClick={() => setCurrentView('inventory')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentView === 'inventory' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-500 hover:text-slate-700'
            }`}
            id="nav-inventory"
          >
            <Layers className="w-3.5 h-3.5" />
            Repositori Aset
          </button>

          <button 
            onClick={() => setCurrentView('reports')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentView === 'reports' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-500 hover:text-slate-700'
            }`}
            id="nav-reports"
          >
            <Printer className="w-3.5 h-3.5" />
            Laporan &amp; Cetak
          </button>

          <button 
            onClick={() => setCurrentView('users')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentView === 'users' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-500 hover:text-slate-700'
            }`}
            id="nav-users"
          >
            <Shield className="w-3.5 h-3.5" />
            User ID &amp; Akses
          </button>
        </nav>

        <div className="flex items-center gap-3">
          {/* Professional Licence status check (Interactive click to manage) */}
          <button 
            onClick={() => setIsLicenseModalOpen(true)}
            className={`hidden sm:flex items-center gap-2 border border-slate-200 p-1.5 px-3 rounded-xl max-w-xs transition-all hover:scale-[1.01] active:scale-[0.99] select-none text-left shadow-xs ${
              licenseActive 
                ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100/70' 
                : 'bg-rose-50 text-rose-800 hover:bg-rose-100/70'
            }`}
            id="btn-license-indicator"
            title="Klik untuk melihat / mengelola lisensi enterprise"
          >
            <div className={`p-1 text-white rounded-lg shrink-0 ${licenseActive ? 'bg-emerald-500' : 'bg-rose-500'}`}>
              {licenseActive ? (
                <CheckCircle className="w-3.5 h-3.5 animate-pulse" />
              ) : (
                <Lock className="w-3.5 h-3.5 animate-bounce" />
              )}
            </div>
            <div className="text-[10px] leading-tight">
              <p className="font-extrabold text-right">
                {licenseActive ? 'Lisensi Aktif' : 'Lisensi Habis'}
              </p>
              <p className="text-slate-400 text-right font-mono text-[9px]">
                {licenseActive ? 'SaaS-0982-Active' : 'SaaS-0982-Expired'}
              </p>
            </div>
          </button>

          {/* User Account / NIM info with secure Logout action */}
          <div className="flex items-center gap-2.5 bg-slate-100 p-1.5 px-3.5 rounded-xl border border-slate-200/60 shadow-xs">
            <div className="p-1 px-1.5 bg-indigo-600 text-white rounded-lg flex items-center justify-center shrink-0">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="text-[10px] leading-tight">
              <p className="text-slate-450 text-slate-400 font-bold uppercase tracking-wider text-[8px]">Operator NIM</p>
              <p className="font-mono font-black text-slate-800">{loggedInNim}</p>
            </div>
            <div className="h-5 w-px bg-slate-300 mx-1"></div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all active:scale-95 cursor-pointer"
              title="Keluar dari Aplikasi secara Aman"
              id="btn-secure-logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Top Navigation segment */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-2.5 flex justify-around text-[11px] font-bold">
        <button 
          onClick={() => setCurrentView('dashboard')}
          className={`flex flex-col items-center gap-1 ${currentView === 'dashboard' ? 'text-teal-600' : 'text-slate-400'}`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </button>
        <button 
          onClick={() => setCurrentView('inventory')}
          className={`flex flex-col items-center gap-1 ${currentView === 'inventory' ? 'text-teal-600' : 'text-slate-400'}`}
        >
          <Layers className="w-4 h-4" />
          Repositori
        </button>
        <button 
          onClick={() => setCurrentView('reports')}
          className={`flex flex-col items-center gap-1 ${currentView === 'reports' ? 'text-teal-600' : 'text-slate-400'}`}
        >
          <Printer className="w-4 h-4" />
          Cetak Laporan
        </button>
        <button 
          onClick={() => setCurrentView('users')}
          className={`flex flex-col items-center gap-1 ${currentView === 'users' ? 'text-teal-600' : 'text-slate-400'}`}
        >
          <Shield className="w-4 h-4" />
          User ID
        </button>
      </div>

      {/* Main Render Area wrapper */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 pb-20">
        
        {currentView === 'dashboard' && (
          <DashboardView 
            cmdbAssets={cmdbAssets}
            procurementAssets={procurementAssets}
            onNavigate={(view) => setCurrentView(view)}
          />
        )}

        {currentView === 'inventory' && (
          <InventoryView 
            cmdbAssets={cmdbAssets}
            procurementAssets={procurementAssets}
            onAddAsset={handleAddAsset}
            onUpdateAsset={handleUpdateAsset}
            onDeleteAsset={handleDeleteAsset}
          />
        )}

        {currentView === 'reports' && (
          <div className="space-y-4">
            {!licenseActive && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs leading-relaxed animate-in fade-in duration-300 no-print">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                    <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 animate-pulse" />
                  </div>
                  <div>
                    <p className="font-extrabold text-[13px] text-amber-900 mb-0.5">MASA TENGGANG AKTIF (Lisensi SaaS-9082 Berakhir)</p>
                    <p className="text-slate-600">Aplikasi tetap beroperasi penuh demi mencegah gangguan bisnis. Modul pelaporan, ekspor CSV, dan cetak dokumen dapat diakses melalui masa tenggang otomatis (Grace Period). Harap segera perpanjang lisensi untuk mematuhi regulasi internal.</p>
                  </div>
                </div>
                <button 
                  onClick={toggleLicense}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-extrabold px-4 py-2 rounded-xl text-[11px] uppercase tracking-wider whitespace-nowrap shadow-xs active:scale-95 transition-all"
                >
                  Perpanjang Lisensi
                </button>
              </div>
            )}
            <ReportView 
              cmdbAssets={cmdbAssets}
              procurementAssets={procurementAssets}
              onAddAsset={handleAddAsset}
            />
          </div>
        )}

        {currentView === 'users' && (
          <UserManagementView />
        )}

      </main>



      {/* License Management Modal */}
      {isLicenseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-sm w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-850 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Key className="w-5 h-5 text-teal-400 animate-pulse" />
                <div>
                  <h3 className="font-extrabold text-sm tracking-wide">Enterprise License Key</h3>
                  <p className="text-[10px] text-slate-400 font-mono">ID: SaaS-9082</p>
                </div>
              </div>
              <button 
                onClick={() => setIsLicenseModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Status Indicator Group */}
              <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
                <div className="mt-0.5">
                  {licenseActive ? (
                    <span className="flex h-3.5 w-3.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-450 bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                    </span>
                  ) : (
                    <span className="flex h-3.5 w-3.5 rounded-full bg-rose-500"></span>
                  )}
                </div>
                <div className="flex-1 text-xs">
                  <p className="font-bold text-slate-700">Status Lisensi Saat Ini</p>
                  <p className={`text-xs font-extrabold mt-0.5 ${licenseActive ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {licenseActive ? 'Aktif (Professional Enterprise)' : 'Masa Berlaku Habis (Ditangguhkan)'}
                  </p>
                </div>
              </div>

              {/* Technical Details */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-400 font-medium">Registrasi Seri:</span>
                  <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700 text-[10px]">
                    {licenseActive ? 'SaaS-9082-Active-2026' : 'SaaS-9082-Expired-2026'}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-400 font-medium">Pemegang Lisensi:</span>
                  <span className="font-bold text-slate-700">PT Enterprise Indonesia (HQ)</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-400 font-medium">Masa Kedaluwarsa:</span>
                  <span className="font-semibold text-slate-700">11 Juni 2026 (Hari ini)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Akses Layanan:</span>
                  <span className={`font-semibold ${licenseActive ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {licenseActive ? 'Penuh (Full Access)' : 'Laporan & Ekspor Dikunci'}
                  </span>
                </div>
              </div>

              {/* Informative Guidance */}
              <p className="text-[10px] text-slate-400 leading-relaxed text-justify">
                Lisensi ini di-trigger secara otomatis oleh sistem pencatatan aset multi-tenant. Jika lisensi tidak diperpanjang (SaaS-9082-Expired), modul audit kepatuhan, ekspor CSV, dan pencetakan laporan A4 akan dinonaktifkan demi mematuhi regulasi audit korporat.
              </p>

              {/* Action Button */}
              <div className="pt-2">
                {licenseActive ? (
                  <button
                    onClick={toggleLicense}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-slate-950/10"
                  >
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    Simulasikan Lisensi Kedaluwarsa
                  </button>
                ) : (
                  <button
                    onClick={toggleLicense}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/25"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Perbarui Lisensi Sekarang (Satu Klik)
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
