import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LabelList 
} from 'recharts';
import { 
  Shield, CheckCircle, AlertTriangle, FileText, TrendingUp, Info, Clock, Award, Printer,
  ArrowUpRight, DollarSign, Target, ChevronRight, Activity, BookOpen, Layers, Sparkles, Calendar
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  OPERATING_SYSTEMA_DATA, VENDOR_VOLUME_DATA, ASSETS_BY_SITE_DATA, DECOMMISSIONING_DATA 
} from '../data';
import { Asset } from '../types';

interface DashboardViewProps {
  cmdbAssets: Asset[];
  procurementAssets: Asset[];
  onNavigate: (view: string) => void;
}

export default function DashboardView({ cmdbAssets, procurementAssets, onNavigate }: DashboardViewProps) {
  // --- DYNAMIC EXECUTIVE METRICS CALCULATIONS ---
  const totalCmdb = cmdbAssets.length;
  const totalProcurement = procurementAssets.length;
  
  // Expiration alerts within 90 days (H-90 Alert)
  const today = new Date("2026-06-11"); // Context date
  const h90Limit = new Date();
  h90Limit.setDate(today.getDate() + 90);
  
  const expiringAssets = cmdbAssets.filter(asset => {
    if (!asset.expiryDate) return false;
    const exp = new Date(asset.expiryDate);
    return exp > today && exp <= h90Limit;
  });

  // Calculate dynamic mismatches between databases
  const ghostAssets = cmdbAssets.filter(c => {
    // Registered in CMDB but not found in Procurement, or source is CMDB only
    return c.source === 'CMDB' || !procurementAssets.some(p => p.id === c.id);
  });
  
  const unregisteredAssets = procurementAssets.filter(p => {
    // In procurement but not CMDB
    return !cmdbAssets.some(c => c.id === p.id);
  });

  const statusMismatches = cmdbAssets.filter(c => {
    const matchedProc = procurementAssets.find(p => p.id === c.id);
    return matchedProc && matchedProc.status !== c.status;
  });

  // Dynamically calculate assets per branch location
  const siteCounts: { [key: string]: { name: string; IT_Assets: number; Components: number } } = {};
  
  cmdbAssets.forEach(asset => {
    let loc = asset.location || 'Kantor Pusat';
    // Clean up name format to keep it concise and beautiful on graphs
    if (loc.startsWith('KC ')) {
      loc = loc.substring(3).trim();
    } else if (loc.startsWith('KF ')) {
      loc = loc.substring(3).trim();
    }
    
    if (!siteCounts[loc]) {
      siteCounts[loc] = { name: loc, IT_Assets: 0, Components: 0 };
    }
    
    const catLower = (asset.category || '').toLowerCase();
    if (
      catLower.includes('endpoint') || 
      catLower.includes('pc') || 
      catLower.includes('server') || 
      catLower.includes('jaringan') || 
      catLower.includes('keamanan') || 
      catLower.includes('router') || 
      catLower.includes('switch') || 
      catLower.includes('nvr')
    ) {
      siteCounts[loc].IT_Assets++;
    } else {
      siteCounts[loc].Components++;
    }
  });

  // Convert map to sorted list by total volume and select top 9 most populated sites for maximum visual charm
  const dynamicAssetsBySite = Object.values(siteCounts)
    .sort((a, b) => (b.IT_Assets + b.Components) - (a.IT_Assets + a.Components))
    .slice(0, 9);

  // Dynamic Audit Accuracy Score (Commercial Selling Point)
  const totalChecked = Math.max(1, cmdbAssets.length + procurementAssets.length);
  const totalIssues = ghostAssets.length + unregisteredAssets.length + statusMismatches.length;
  const calculatedAccuracy = 100 - Math.round((totalIssues / totalChecked) * 100);
  const cmdbAccuracy = Math.max(50, Math.min(100, calculatedAccuracy));

  // Determine health color and rating
  let accuracyRating = "Excellent Configuration";
  let accuracyColor = "text-teal-600 bg-teal-50 border-teal-200";
  if (cmdbAccuracy < 70) {
    accuracyRating = "Critical Divergence";
    accuracyColor = "text-rose-600 bg-rose-50 border-rose-200";
  } else if (cmdbAccuracy < 90) {
    accuracyRating = "Moderate Convergence";
    accuracyColor = "text-amber-600 bg-amber-50 border-amber-200";
  }

  const COLORS = ['#14b8a6', '#6366f1', '#f59e0b', '#f43f5e', '#8b5cf6', '#ec4899'];

  return (
    <div className="space-y-8">
      {/* 1. ULTIMATE HIGH-VALUE SAAS HERO HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-2xl p-6 md:p-8 text-white border border-indigo-500/20 shadow-2xl overflow-hidden"
      >
        {/* Glow decoration */}
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-teal-500/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">IT Asset Lifecycle Platform</span>
            </div>
            
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Platform Manajemen Siklus Hidup <br className="hidden md:block"/>
              Aset &amp; Kepatuhan TI Enterprise
            </h1>
            
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Mengelola aset TI perusahaan secara terpusat melalui inventarisasi aset, pengelolaan lisensi, dan monitoring siklus hidup aset
            </p>
          </div>

          <div className="flex flex-row lg:flex-col gap-3 shrink-0">
            <button 
              onClick={() => onNavigate('inventory')}
              className="px-5 py-3 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 shadow-md transition-all flex items-center justify-center gap-2 flex-1"
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              Kelola Aset IT
            </button>
            <button 
              onClick={() => onNavigate('reports')}
              className="px-5 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white shadow-xl transition-all flex items-center justify-center gap-2 flex-1"
            >
              <Printer className="w-4 h-4" />
              Cetak Laporan
            </button>
          </div>
        </div>

        {/* Embedded quick metrics ticker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">Standar Kepatuhan</span>
            <span className="font-bold text-teal-400 flex items-center gap-1 text-sm">
              <Shield className="w-3.5 h-3.5" /> Audit &amp; ISO Compliant
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Metrik Real-time</span>
            <span className="font-bold text-indigo-300 flex items-center gap-1 text-sm">
              <Activity className="w-3.5 h-3.5 animate-pulse" /> Dashboard Komprehensif
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Optimasi Anggaran</span>
            <span className="font-bold text-amber-400 flex items-center gap-1 text-sm">
              <TrendingUp className="w-3.5 h-3.5" /> Efisiensi Pengeluaran TI
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Sistem Integrasi</span>
            <span className="font-bold text-slate-200 flex items-center gap-1 text-sm">
              <FileText className="w-3.5 h-3.5" /> Laporan Ekspor Lengkap
            </span>
          </div>
        </div>
      </motion.div>


      {/* 2. DYNAMIC REALTIME METRICS BLOCK */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {/* Metric 1: CMDB Audit Score (C-Level Priority Metric) */}
        <div className="bg-white border border-slate-100 shadow-xl rounded-2xl p-5 hover:shadow-2xl hover:border-indigo-100 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-indigo-500/10 group-hover:scale-110 transition-transform">
            <Target className="w-16 h-16" />
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">CMDB Audit Accuracy Score</span>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">SLA Target &gt;90%</span>
            </div>
            
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-3xl font-black text-slate-900 tracking-tight">{cmdbAccuracy}%</span>
              <span className="text-xs text-slate-400">akurasi sistem</span>
            </div>

            <div className={`mt-2 p-1.5 px-3 border rounded-lg inline-flex items-center gap-1.5 text-[11px] font-bold ${accuracyColor}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
              {accuracyRating}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
            <span>Formula: (100 - Deviasi/Total)</span>
            <span className="text-slate-400 font-mono">Dynamic Live Calculation</span>
          </div>
        </div>

        {/* Metric 2: Live Ghost Assets Counter */}
        <div className="bg-white border border-slate-100 shadow-xl rounded-2xl p-5 hover:shadow-2xl hover:border-rose-100 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-rose-500/10 group-hover:scale-110 transition-transform">
            <AlertTriangle className="w-16 h-16" />
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Ghost Assets (Aset Ghaib)</span>
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">Risk of Waste</span>
            </div>
            
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-3xl font-black text-rose-600 tracking-tight">{ghostAssets.length}</span>
              <span className="text-xs text-slate-400">perangkat terdaftar tanpa fisik</span>
            </div>

            <p className="text-xs text-slate-400 mt-2">
              Aset terdaftar di CMDB IT Audit namun tidak ditemukan pada pelacakan fisik GA-Procurement.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 text-xs text-rose-600 font-bold flex justify-between items-center">
            <span>Prioritas: Eliminasi Segera</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Metric 3: Live Drifting Status Lifecycle */}
        <div className="bg-white border border-slate-100 shadow-xl rounded-2xl p-5 hover:shadow-2xl hover:border-amber-100 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-amber-500/10 group-hover:scale-110 transition-transform">
            <Activity className="w-16 h-16" />
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Status Cycle Drift</span>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">Mismatch Status</span>
            </div>
            
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-3xl font-black text-amber-600 tracking-tight">{statusMismatches.length}</span>
              <span className="text-xs text-slate-400">perangkat tidak selaras</span>
            </div>

            <p className="text-xs text-slate-400 mt-2">
              Berstatus aktif fisik di procurement namun tercatat pensiun (Retired) di CMDB internal TI.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 text-xs text-amber-700 font-bold flex justify-between items-center">
            <span>Membutuhkan Sinkronisasi</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Metric 4: Live Unregistered Assets Counter */}
        <div className="bg-white border border-slate-100 shadow-xl rounded-2xl p-5 hover:shadow-2xl hover:border-emerald-100 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-teal-500/10 group-hover:scale-110 transition-transform">
            <FileText className="w-16 h-16" />
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Aset Belum Terdaftar</span>
              <span className="text-[10px] font-bold text-teal-605 bg-teal-50 px-2.5 py-0.5 rounded-full">Shadow IT</span>
            </div>
            
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-3xl font-black text-teal-600 tracking-tight">{unregisteredAssets.length}</span>
              <span className="text-xs text-slate-400">perangkat baru di luar sistem</span>
            </div>

            <p className="text-xs text-slate-400 mt-2">
              Aset fisik dilaporkan oleh unit Procurement namun belum dimasukkan ke Master Data CMDB.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 text-xs text-teal-600 font-bold flex justify-between items-center">
            <span>Daftarkan sebagai CI Baru</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </motion.div>





      {/* 4. CLINICAL ACTIONABLE DISCREPANCIES ENGINE & RECOMMENDATION LIST */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-white border border-slate-100 shadow-xl rounded-2xl p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-rose-50 text-rose-700 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-rose-200">ITAM Discrepancy Control</span>
              <h3 className="font-extrabold text-slate-800 text-base">Pusat Resolusi Inkonsistensi Data (Drifting Analysis)</h3>
            </div>
            <p className="text-xs text-slate-400">
              Analisis cerdas di bawah mengekstrak perbedaan krusial antara database CMDB internal dengan fisik lapangan GA-Procurement secara otomatis.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-xs bg-slate-50 p-1.5 rounded-xl border border-slate-200/50 self-start">
            <span className="text-slate-500 px-2.5 py-1 font-semibold">Total Deviasi Terbaca:</span>
            <span className="bg-slate-900 text-white font-mono font-bold px-2 py-0.5 rounded">{totalIssues} Temuan Audit</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          
          {/* Column 1: Aset Tanpa Fisik (Ghost Assets) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-rose-50">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2 text-rose-700">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                1. Ghost Assets ({ghostAssets.length})
              </h4>
              <span className="text-[10px] bg-rose-50 hover:bg-rose-100 text-rose-700 p-1 rounded-md font-bold cursor-help" title="Aset terdaftar di CMDB IT Audit namun tidak ditemukan pada GA-Procurement.">Info Teknis</span>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {ghostAssets.length > 0 ? (
                ghostAssets.map(asset => (
                  <div key={asset.id} className="p-3 bg-rose-50/30 border border-rose-100 rounded-xl space-y-2 hover:bg-rose-50/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono font-extrabold text-rose-700 bg-white border border-rose-200 px-2 py-0.5 rounded-md">{asset.id}</span>
                      <span className="text-[9px] font-bold uppercase tracking-wide text-slate-400">{asset.location}</span>
                    </div>
                    <h5 className="font-bold text-slate-800 text-xs">{asset.name}</h5>
                    <p className="text-[11px] text-slate-500 leading-normal">{asset.notes || 'Ghost asset mencurigakan. Perangkat keras tidak ditemukan ketika proses inventarisasi fisik.'}</p>
                    <div className="pt-2 border-t border-rose-100 text-[10px] flex justify-between items-center text-slate-400">
                      <span>Catatan Vendor: {asset.serialNumber || 'Legacy Record'}</span>
                      <button onClick={() => onNavigate('inventory')} className="text-indigo-600 font-bold hover:underline">Hapus Aset →</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-slate-400 text-xs bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  Bersih! Tidak ada data Ghost Asset.
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Mismatch Status Siklus Hidup */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-amber-50">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2 text-amber-600">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                2. Status Cycle Mismatches ({statusMismatches.length})
              </h4>
              <span className="text-[10px] bg-amber-50 hover:bg-amber-100 text-amber-700 p-1 rounded-md font-bold cursor-help" title="Perbedaan status siklus hidup. Biasanya berstatus Retired di CMDB, tetapi status fisiknya masih aktif mengonsumsi daya/SLA di Procurement.">Info Teknis</span>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {statusMismatches.length > 0 ? (
                statusMismatches.map(asset => {
                  const procAsset = procurementAssets.find(p => p.id === asset.id);
                  return (
                    <div key={asset.id} className="p-3 bg-amber-50/20 border border-amber-100 rounded-xl space-y-2 hover:bg-amber-50/40 transition-colors">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono font-extrabold text-amber-700 bg-white border border-amber-200 px-2 py-0.5 rounded-md">{asset.id}</span>
                        <span className="text-[9px] font-bold uppercase tracking-wide text-slate-400">{asset.location}</span>
                      </div>
                      <h5 className="font-bold text-slate-800 text-xs">{asset.name}</h5>
                      
                      <div className="grid grid-cols-2 gap-2 text-center text-[10px] py-1 bg-white border border-slate-100 rounded-lg">
                        <div className="border-r border-slate-100 p-1">
                          <span className="text-slate-400 block text-[9px]">Status CMDB</span>
                          <span className="font-extrabold text-amber-700">{asset.status}</span>
                        </div>
                        <div className="p-1">
                          <span className="text-slate-400 block text-[9px]">Status Procurement</span>
                          <span className="font-extrabold text-teal-600">{procAsset?.status || 'Active'}</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500 leading-normal">Potensi inefisiensi biaya operasional lisensi software serta sewa ruang rak.</p>
                      <div className="pt-2 border-t border-amber-100 text-[10px] flex justify-between items-center">
                        <span className="text-slate-400">{asset.category}</span>
                        <button onClick={() => onNavigate('inventory')} className="text-indigo-600 font-bold hover:underline">Selesaikan Drift →</button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center text-slate-400 text-xs bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  Tidak terdeteksi ketidakselarasan status di sistem.
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Aset Belum Terdaftar di CMDB */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-teal-50">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2 text-teal-600">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                3. Shadow IT / Unregistered ({unregisteredAssets.length})
              </h4>
              <span className="text-[10px] bg-teal-50 hover:bg-teal-100 text-teal-700 p-1 rounded-md font-bold cursor-help" title="Barang fisik dibeli atau dilaporkan oleh Procurement namun belum terdaftar di CMDB internal TI perusahaan.">Info Teknis</span>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {unregisteredAssets.length > 0 ? (
                unregisteredAssets.map(asset => (
                  <div key={asset.id} className="p-3 bg-teal-50/20 border border-teal-100 rounded-xl space-y-2 hover:bg-teal-50/40 transition-colors">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono font-extrabold text-teal-700 bg-white border border-teal-200 px-2 py-0.5 rounded-md">{asset.id}</span>
                      <span className="text-[9px] font-bold uppercase tracking-wide text-zinc-400">{asset.location}</span>
                    </div>
                    <h5 className="font-bold text-slate-800 text-xs">{asset.name}</h5>
                    <p className="text-[11px] text-slate-500 leading-normal">
                      Aset pengadaan operasional {asset.notes || 'baru yang diterbitkan oleh departemen keuangan/pengadaan fisik'}. Belum dipetakan ke target struktur service.
                    </p>
                    <div className="pt-2 border-t border-teal-150 text-[10px] flex justify-between items-center text-slate-400">
                      <span>Kategori: {asset.category}</span>
                      <button onClick={() => onNavigate('inventory')} className="text-indigo-600 font-bold hover:underline">Registrasikan CMDB →</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-slate-400 text-xs bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  Seluruh aset fisik procurement sukses terdaftar di CMDB!
                </div>
              )}
            </div>
          </div>

        </div>
      </motion.div>


      {/* 5. GORGEOUS BENTO GRID CHARTS - PRESET TO BE HIGH-STAKE AND COMMERCIAL EXCLUSIVE */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Chart A: Assets by Site (Jumlah Aset Per Kantor Cabang) */}
        <div className="bg-white p-5 border border-slate-100 shadow-xl rounded-2xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-extrabold text-slate-800 text-base">A. Assets by Site</h3>
              <span className="text-[10px] text-indigo-600 font-black uppercase bg-indigo-50 px-2.5 py-1 rounded-full tracking-wider">Multi-Branch Distribution</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">Volume aset keras (IT Assets), komponen pendukung, dan non-TI di seluruh jaringan cabang utama.</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dynamicAssetsBySite} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                  itemStyle={{ fontSize: '11px', color: '#94a3b8' }}
                  labelStyle={{ fontWeight: 'bold', fontSize: '12px', color: '#fff', marginBottom: '4px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="IT_Assets" name="IT Hardware Assets" fill="#14b8a6" radius={[6, 6, 0, 0]}>
                  <LabelList dataKey="IT_Assets" position="top" formatter={(val: any) => `${val} Unit`} style={{ fill: '#334155', fontSize: 10, fontWeight: 'bold' }} />
                </Bar>
                <Bar dataKey="Components" name="Components &amp; Accessories" fill="#6366f1" radius={[6, 6, 0, 0]}>
                  <LabelList dataKey="Components" position="top" formatter={(val: any) => `${val} Unit`} style={{ fill: '#334155', fontSize: 10, fontWeight: 'bold' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart B: Workstations by Operating System */}
        <div className="bg-white p-5 border border-slate-100 shadow-xl rounded-2xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-extrabold text-slate-800 text-base">B. Workstations by Operating System (OS Composition)</h3>
              <span className="text-[10px] text-teal-650 font-black uppercase bg-teal-50 px-2.5 py-1 rounded-full tracking-wider">Endpoint Standard</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">Pemetaan profil varian sistem operasi yang beroperasi pada workstation karyawan bankwide.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative h-56 w-full md:w-1/2 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={OPERATING_SYSTEMA_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {OPERATING_SYSTEMA_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} Unit`, 'Volume OS']} 
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Elegant centered total count indicator */}
              <div className="absolute text-center pointer-events-none">
                <div className="text-2xl font-black text-slate-800 leading-none">
                  {OPERATING_SYSTEMA_DATA.reduce((sum, item) => sum + item.value, 0)}
                </div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">
                  Total Unit
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 space-y-2 text-xs">
              {OPERATING_SYSTEMA_DATA.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                    <span className="font-bold text-slate-700">{item.name}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded text-[11px]">{item.value} Unit</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart C: Software Vendors by Volume */}
        <div className="bg-white p-5 border border-slate-100 shadow-xl rounded-2xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-extrabold text-slate-800 text-base">C. Software Vendors by Volume &amp; License</h3>
              <span className="text-[10px] text-amber-600 font-black uppercase bg-amber-50 px-2.5 py-1 rounded-full tracking-wider">Vendor Compliance</span>
            </div>
            <p className="text-xs text-slate-400 mb-4 font-semibold text-slate-450">Sistem memonitor kelebihan sewa seat perangkat lunak komersial.</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={VENDOR_VOLUME_DATA} layout="vertical" margin={{ top: 5, right: 40, left: 30, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }}
                />
                <Bar dataKey="value" name="Volume Lisensi Terpakai" radius={[0, 6, 6, 0]}>
                  {VENDOR_VOLUME_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                  <LabelList dataKey="value" position="right" formatter={(val: any) => `${val} Unit`} style={{ fill: '#475569', fontSize: 10, fontWeight: 'bold' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart E: Asset Decommissioning (Lifecycle Final Stage) */}
        <div className="bg-white p-5 border border-slate-100 shadow-xl rounded-2xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-extrabold text-slate-800 text-base">D. Asset Decommissioning (Disposal Lifecycle)</h3>
              <span className="text-[10px] text-rose-600 font-black uppercase bg-rose-50 px-2.5 py-1 rounded-full tracking-wider">Asset Disposals</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">Total unit aset usang yang telah dinonaktifkan atau dihapuskan dengan aman.</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DECOMMISSIONING_DATA} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }}
                />
                <Bar dataKey="value" name="Retired / Disposed Units" radius={[6, 6, 0, 0]}>
                  {DECOMMISSIONING_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                  <LabelList dataKey="value" position="top" formatter={(val: any) => `${val} Unit`} style={{ fill: '#334155', fontSize: 10, fontWeight: 'bold' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>


      {/* 6. ADVANCED SLA ALERT MODULE WITH FILTER */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="bg-gradient-to-br from-amber-50 to-amber-100/55 border border-amber-200/80 rounded-2xl p-6 shadow-md"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500 text-white rounded-xl shadow-md shrink-0">
              <Calendar className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-amber-950 text-base">Pusat Peringatan &amp; Pembaruan Kontrak (SLA ALERT H-90)</h3>
              <p className="text-amber-800 text-xs mt-0.5">Sistem memindai lisensi software utama, jaminan hardware data center, serta sertifikasi SSL yang mendekati masa expired dalam 90 hari.</p>
            </div>
          </div>
          <span className="text-xs font-black text-amber-850 bg-amber-200/80 px-4 py-1.5 rounded-full border border-amber-300 shrink-0">
            {expiringAssets.length} Prioritas Mendesak
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {expiringAssets.length > 0 ? (
            expiringAssets.map((asset) => (
              <div key={asset.id} className="bg-white border border-amber-200/60 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[9px] text-amber-800 bg-amber-50 border border-amber-200 font-extrabold px-2 py-0.5 rounded">{asset.id}</span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{asset.location}</span>
                  </div>
                  
                  <h4 className="font-extrabold text-slate-800 text-xs leading-snug">{asset.name}</h4>
                  <span className="inline-block text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">{asset.category}</span>
                  
                  <p className="text-[11px] text-slate-400 italic">"{asset.notes || 'Kontrak subscription aktif memerlukan evaluasi pengadaan cabang.'}"</p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[11px]">
                  <div className="flex items-center gap-1 text-rose-600 font-extrabold">
                    <Clock className="w-3.5 h-3.5 animate-pulse" />
                    Hingga: {asset.expiryDate}
                  </div>
                  <span className="font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 text-[10px]">Kontak Vendor</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-slate-400 text-sm bg-white rounded-xl border border-dashed border-slate-200">
              Selamat! Tidak ada sistem, lisensi, atau perangkat keras yang terancam melanggar kepatuhan waktu dalam 90 hari ke depan.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
