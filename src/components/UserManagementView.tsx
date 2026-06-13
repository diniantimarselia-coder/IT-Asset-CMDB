import React, { useState, useEffect } from 'react';
import { 
  Users, UserPlus, Shield, UserCheck, Trash2, CheckCircle2, 
  XSquare, Inbox, Search, Key, ShieldCheck, Mail, Calendar, 
  Info, ShieldAlert, Lock, UserX, ToggleLeft, ToggleRight
} from 'lucide-react';

interface AccessRequest {
  nim: string;
  name: string;
  email: string;
  reason: string;
  timestamp: string;
}

interface UserAccount {
  nim: string;
  passwordHash: string;
  securityQuestion: string;
  securityAnswer: string;
  name?: string;
  email?: string;
  status?: 'active' | 'suspended';
}

export default function UserManagementView() {
  const [activeTab, setActiveTab] = useState<'requests' | 'create' | 'registry'>('requests');
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [usersRegistry, setUsersRegistry] = useState<UserAccount[]>([]);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // Corporate Registration form state (Hidden security questions)
  const [inputNim, setInputNim] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('Password@123');
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');

  // Password Reset modal / state
  const [resetTargetUser, setResetTargetUser] = useState<UserAccount | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [resetModalSuccess, setResetModalSuccess] = useState('');
  const [resetModalError, setResetModalError] = useState('');

  // Notifications or toast alerts
  const [alertMessage, setAlertMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Load pending access requests
    const savedRequests = localStorage.getItem('corecmdb_access_requests');
    if (savedRequests) {
      try {
        setRequests(JSON.parse(savedRequests));
      } catch (e) {
        setRequests([]);
      }
    } else {
      setRequests([]);
    }

    // Load active registered users
    const savedUsers = localStorage.getItem('corecmdb_user_registry');
    if (savedUsers) {
      try {
        setUsersRegistry(JSON.parse(savedUsers));
      } catch (e) {
        setUsersRegistry([]);
      }
    }
  };

  const triggerAlert = (type: 'success' | 'error', text: string) => {
    setAlertMessage({ type, text });
    setTimeout(() => {
      setAlertMessage(null);
    }, 4000);
  };

  // Reject / Remove request
  const handleRejectRequest = (nim: string) => {
    const updated = requests.filter(r => r.nim !== nim);
    localStorage.setValue ? localStorage.setItem('corecmdb_access_requests', JSON.stringify(updated)) : localStorage.setItem('corecmdb_access_requests', JSON.stringify(updated));
    setRequests(updated);
    triggerAlert('success', `Permohonan Akses dari NIM ${nim} berhasil ditolak.`);
  };

  // Approve and automatically create User ID (with name & email captured)
  const handleApproveRequest = (request: AccessRequest) => {
    // 1. Get current registry
    const stored = localStorage.getItem('corecmdb_user_registry');
    let currentUsers: UserAccount[] = [];
    if (stored) {
      try {
        currentUsers = JSON.parse(stored);
      } catch (e) {
        currentUsers = [];
      }
    }

    const exists = currentUsers.some(u => u.nim === request.nim);
    if (exists) {
      triggerAlert('error', `Gagal menyetujui: NIM ${request.nim} sudah terdaftar dalam sistem.`);
      return;
    }

    // 2. Add as active account with requested credentials & standard backward-compatible security fields
    const newAccount: UserAccount = {
      nim: request.nim,
      passwordHash: 'Password@123', // Default approved credentials
      securityQuestion: 'Kota kelahiran Ibu kandung?', // Backward-compat placeholder
      securityAnswer: 'jakarta',                      // Backward-compat placeholder
      name: request.name,
      email: request.email,
      status: 'active'
    };

    const updatedUsers = [...currentUsers, newAccount];
    localStorage.setItem('corecmdb_user_registry', JSON.stringify(updatedUsers));
    setUsersRegistry(updatedUsers);

    // 3. Remove request from pending list
    const updatedRequests = requests.filter(r => r.nim !== request.nim);
    localStorage.setItem('corecmdb_access_requests', JSON.stringify(updatedRequests));
    setRequests(updatedRequests);

    triggerAlert('success', `User ID berhasil dibuat untuk NIM ${request.nim}! Akun aktif dengan nama ${request.name} dan kata sandi otomatis 'Password@123'.`);
  };

  // Corporate Registration of User ID by Team IT Admin
  const handleManualCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccess('');
    setFormError('');

    if (!inputNim || !inputName || !inputEmail || !inputPassword) {
      setFormError('Semua kolom bertanda bintang wajib diisi.');
      return;
    }

    if (inputNim.length < 4) {
      setFormError('ID / NIM harus diisi dengan benar (minimal 4 digit).');
      return;
    }

    if (inputPassword.length < 8) {
      setFormError('Kata sandi harus minimal 8 karakter demi standar keamanan.');
      return;
    }

    // Load registry
    const stored = localStorage.getItem('corecmdb_user_registry');
    let currentUsers: UserAccount[] = [];
    if (stored) {
      try {
        currentUsers = JSON.parse(stored);
      } catch (e) {
        currentUsers = [];
      }
    }

    if (currentUsers.some(u => u.nim === inputNim)) {
      setFormError(`Gagal registrasi: NIM ${inputNim} sudah terdaftar dalam sistem.`);
      return;
    }

    const newUser: UserAccount = {
      nim: inputNim,
      passwordHash: inputPassword,
      securityQuestion: 'Kota kelahiran Ibu kandung?', // Backward-compat placeholder
      securityAnswer: 'jakarta',                      // Backward-compat placeholder
      name: inputName,
      email: inputEmail,
      status: 'active'
    };

    const updated = [...currentUsers, newUser];
    localStorage.setItem('corecmdb_user_registry', JSON.stringify(updated));
    setUsersRegistry(updated);

    setFormSuccess(`Akun Operator ${inputName} (NIM: ${inputNim}) berhasil didaftarkan.`);
    setInputNim('');
    setInputName('');
    setInputEmail('');
    setInputPassword('Password@123');
    loadData();
    triggerAlert('success', `Akun NIM ${newUser.nim} sekarang aktif.`);
  };

  // Toggle Suspend Status (If User Resigns or Temporarily Suspended)
  const handleToggleUserStatus = (selectedNim: string) => {
    if (selectedNim === '2503015022') {
      triggerAlert('error', 'Akun master administrator default (2503015022) tidak boleh dinonaktifkan demi keselamatan operasional.');
      return;
    }

    const updated = usersRegistry.map(u => {
      if (u.nim === selectedNim) {
        const newStatus = u.status === 'suspended' ? 'active' : 'suspended';
        triggerAlert('success', `Status Akun ${u.nim} berhasil diubah menjadi: ${newStatus === 'active' ? 'AKTIF' : 'NONAKTIF'}`);
        return { ...u, status: newStatus as 'active' | 'suspended' };
      }
      return u;
    });

    localStorage.setItem('corecmdb_user_registry', JSON.stringify(updated));
    setUsersRegistry(updated);
  };

  // Delete User ID from Registry permanently
  const handleDeleteUser = (nim: string) => {
    if (nim === '2503015022') {
      triggerAlert('error', 'Akun master administrator default (2503015022) tidak boleh dihapus demi keamanan demo.');
      return;
    }

    if (confirm(`Apakah Anda yakin ingin menghapus akun NIM ${nim} dari sistem secara permanen? Pengguna ini tidak akan bisa login kembali.`)) {
      const updated = usersRegistry.filter(u => u.nim !== nim);
      localStorage.setItem('corecmdb_user_registry', JSON.stringify(updated));
      setUsersRegistry(updated);
      triggerAlert('success', `Akun NIM ${nim} berhasil dihapus permanen dari sistem.`);
    }
  };

  // Administrative Reset Password for specific user
  const handleAdminResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetModalError('');
    setResetModalSuccess('');

    if (!resetTargetUser) return;

    if (newPassword.length < 8) {
      setResetModalError('Kata sandi baru harus minimal 8 karakter demi standar keamanan.');
      return;
    }

    const updated = usersRegistry.map(u => {
      if (u.nim === resetTargetUser.nim) {
        return { ...u, passwordHash: newPassword };
      }
      return u;
    });

    localStorage.setItem('corecmdb_user_registry', JSON.stringify(updated));
    setUsersRegistry(updated);

    setResetModalSuccess(`Kata sandi untuk NIM ${resetTargetUser.nim} berhasil diperbarui.`);
    setNewPassword('');
    triggerAlert('success', `Sandi akun ${resetTargetUser.nim} berhasil disetel ulang oleh Admin.`);
    setTimeout(() => {
      setResetTargetUser(null);
      setResetModalSuccess('');
    }, 1500);
  };

  // Filtered users for search bar
  const filteredUsers = usersRegistry.filter(user => 
    user.nim.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* View Header Info */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-teal-650/30 text-teal-400 rounded-xl border border-teal-500/20">
            <Shield className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">Pusat Registrasi &amp; Manajemen Akun Pengguna</h2>
            <p className="text-xs text-slate-400 mt-0.5">Kelola verifikasi pengajuan, reset kata sandi, nonaktifkan akun operator yang sudah tidak bertugas, dan daftarkan hak akses operator baru di dalam sistem internal CoreCMDB.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="bg-slate-850 px-4 py-2 rounded-xl text-center border border-slate-800">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Antrean Permohonan</p>
            <p className="text-lg font-black text-indigo-400 font-mono">{requests.length}</p>
          </div>
          <div className="bg-slate-850 px-4 py-2 rounded-xl text-center border border-slate-800">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Operator Aktif</p>
            <p className="text-lg font-black text-emerald-400 font-mono">
              {usersRegistry.filter(u => (u.status || 'active') === 'active').length}
            </p>
          </div>
        </div>
      </div>

      {/* Floating Alert Messages */}
      {alertMessage && (
        <div className={`p-4 rounded-xl text-xs flex items-center gap-3 shadow-lg border animate-in slide-in-from-top-4 duration-300 ${
          alertMessage.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          <CheckCircle2 className={`w-5 h-5 shrink-0 ${alertMessage.type === 'success' ? 'text-emerald-500' : 'text-rose-500'}`} />
          <span className="font-semibold leading-relaxed">{alertMessage.text}</span>
        </div>
      )}

      {/* Primary Tab Navigation */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-5 py-3 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'requests' 
              ? 'border-teal-600 text-teal-600' 
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-350'
          }`}
          id="tab-requests"
        >
          <Inbox className="w-3.5 h-3.5" />
          Permohonan Akses Masuk
          {requests.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-teal-600 text-white rounded-full animate-bounce">
              {requests.length}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab('create');
            setFormSuccess('');
            setFormError('');
          }}
          className={`px-5 py-3 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'create' 
              ? 'border-teal-600 text-teal-600' 
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-350'
          }`}
          id="tab-create-user"
        >
          <UserPlus className="w-3.5 h-3.5" />
          Registrasi Akun Baru
        </button>

        <button
          onClick={() => setActiveTab('registry')}
          className={`px-5 py-3 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'registry' 
              ? 'border-teal-600 text-teal-600' 
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-350'
          }`}
          id="tab-database-user"
        >
          <Users className="w-3.5 h-3.5" />
          Katalog Akun Staf &amp; Operator
        </button>
      </div>

      {/* Tab Panels Contents */}
      
      {/* TAB 1: PENDING REQUESTS ACCESS */}
      {activeTab === 'requests' && (
        <div className="bg-white rounded-2xl border border-slate-205/60 p-6 space-y-4 shadow-xs">
          <div>
            <h3 className="text-sm font-extrabold text-slate-800">Verifikasi Berkas Pengajuan Akses Akun</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Daftar permohonan pendaftaran manual yang diajukan mahasiswa/operator eksternal dari halaman awal sistem.</p>
          </div>

          {requests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 text-slate-400 space-y-3">
              <div className="p-3.5 bg-slate-100 rounded-full text-slate-400">
                <Inbox className="w-7 h-7" />
              </div>
              <div className="text-center">
                <p className="font-extrabold text-xs text-slate-600">Tidak Ada Permohonan Tertunda</p>
                <p className="text-[11px] text-slate-400 mt-1 max-w-sm">Kotak masuk bersih. Belum ada pengajuan registrasi dari luar saat ini.</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-150 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-150">
                    <th className="p-3.5 font-bold">NIM / ID</th>
                    <th className="p-3.5 font-bold">Nama Lengkap</th>
                    <th className="p-3.5 font-bold">Email</th>
                    <th className="p-3.5 font-bold">Tujuan Akses</th>
                    <th className="p-3.5 font-bold">Diajukan Pada</th>
                    <th className="p-3.5 font-bold text-center">Tindakan Otoritas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {requests.map((req, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-teal-700 bg-teal-50/20 max-w-[120px] truncate">{req.nim}</td>
                      <td className="p-3.5 font-bold text-slate-800 text-xs">{req.name}</td>
                      <td className="p-3.5 font-medium text-slate-600 flex items-center gap-1.5 min-w-[180px]">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {req.email}
                      </td>
                      <td className="p-3.5 text-slate-600 truncate max-w-[200px]" title={req.reason}>{req.reason}</td>
                      <td className="p-3.5 text-slate-450 font-mono text-[10px] min-w-[120px]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{new Date(req.timestamp).toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleApproveRequest(req)}
                            className="bg-teal-650 hover:bg-teal-700 bg-teal-600 text-white font-bold p-1.5 px-3 rounded-lg flex items-center gap-1 transition-all active:scale-95 cursor-pointer text-[10px]"
                            title="Aktifkan & Buat User ID"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            Setujui
                          </button>
                          <button
                            onClick={() => handleRejectRequest(req.nim)}
                            className="bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 hover:border-rose-200 font-bold p-1.5 px-2.5 rounded-lg flex items-center gap-1 transition-all active:scale-95 cursor-pointer text-[10px]"
                            title="Tolak Pengajuan"
                          >
                            <XSquare className="w-3.5 h-3.5" />
                            Tolak
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Guidelines info card */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 flex gap-3 text-xs leading-relaxed text-blue-800">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold text-blue-900 mb-0.5 font-sans">Sistem Kredensial Otomatis</p>
              <p className="text-slate-600 text-[11px]">Ketika Anda menyetujui permohonan akses, sistem mendaftarkan kredensial akun menggunakan kata sandi sementara bawaan yaitu: <code className="bg-blue-100 px-1 py-0.5 rounded text-blue-700 font-bold font-mono">Password@123</code>. Pengguna disarankan untuk memperbarui kata sandi mandiri di halaman profil.</p>
            </div>
          </div>
        </div>
      )}


      {/* TAB 2: MANUAL USER ID CREATION (CORPORATE IDENTITY SYSTEM, NO SECURITY QUESTIONS SHOWN AT CREATION) */}
      {activeTab === 'create' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-205/60 p-6 space-y-4 shadow-xs">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800">Registrasi Operator / Staf Baru</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Daftarkan akun staf penilai, asisten lab, atau operator sistem dengan melengkapi data profil korporat terpusat.</p>
            </div>

            {formError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-bold flex items-center gap-2.5">
                <XSquare className="w-4 h-4 text-rose-500" />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{formSuccess}</span>
              </div>
            )}

            <form onSubmit={handleManualCreateUser} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* ID / NIM */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">ID Pengguna / NIM Karyawan*</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 12102143"
                    value={inputNim}
                    onChange={(e) => setInputNim(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-mono focus:outline-none focus:border-teal-600 focus:bg-white transition-all text-slate-800"
                  />
                </div>

                {/* Nama Lengkap */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nama Lengkap*</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Dini Marselia"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-teal-600 focus:bg-white transition-all text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Alamat Email*</label>
                  <input
                    type="email"
                    required
                    placeholder="Contoh: operator@uhamka.ac.id"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-teal-600 focus:bg-white transition-all text-slate-800"
                  />
                </div>

                {/* Password default */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Kata Sandi*</label>
                    <span className="text-[9px] text-teal-600 font-extrabold">Min. 8 Karakter</span>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <Key className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan kata sandi awal"
                      value={inputPassword}
                      onChange={(e) => setInputPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs font-mono focus:outline-none focus:border-teal-600 focus:bg-white transition-all text-slate-800"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs py-2.5 px-6 rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  Daftarkan &amp; Aktifkan Akun
                </button>
              </div>
            </form>
          </div>

          {/* Quick tips */}
          <div className="space-y-4">
            <div className="bg-slate-900 text-slate-300 rounded-2xl p-5 border border-slate-850 space-y-3.5">
              <p className="font-extrabold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Standar Sekuritas Korporat
              </p>
              <div className="space-y-2.5 text-xs leading-relaxed text-slate-400">
                <p>1. <strong>Identitas Terpusat</strong>: Akun yang terdaftar langsung memiliki status <strong>Aktif</strong> tanpa memerlukan persetujuan manual.</p>
                <p>2. <strong>Kata Sandi Sementara</strong>: Pengguna wajib mengganti kata sandi sementara ini pada saat pertama kali melakukan login demi menjaga privasi.</p>
                <p>3. <strong>Anti-Spam Keamanan</strong>: Sistem kami menggunakan enkripsi tepercaya, menggantikan mekanisme pertanyaan keamanan default kuno yang tidak sesuai standar korporat modern.</p>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* TAB 3: CURRENT ACTIVE USERS REGISTRY & ADMINISTRATIVE OPERATIONS (EDIT PASSWORD, SUSPEND, RESIGN) */}
      {activeTab === 'registry' && (
        <div className="bg-white rounded-2xl border border-slate-205/60 p-6 space-y-4 shadow-xs">
          
          {/* Top catalog control actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800">Direktori Kredensial Staf &amp; Operator</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Kelola seluruh kredensial akun yang terdaftar. Administrator TI dapat mengubah kata sandi, menonaktifkan akun operator yang sudah tidak bertugas, dan menghapus registrasi.</p>
            </div>

            {/* Filter Search */}
            <div className="relative w-full sm:w-64">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                <Search className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                placeholder="Cari NIM atau Nama..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-1.5 pl-9 pr-3 text-xs focus:outline-none focus:border-teal-600 focus:bg-white transition-all text-slate-850"
              />
            </div>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <p className="font-extrabold text-xs">Pencarian Tidak Ditemukan</p>
              <p className="text-[11px] text-slate-400 mt-1">Akun dengan kriteria "{searchTerm}" tidak terdaftar dalam database pengguna.</p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-150 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-150">
                    <th className="p-3.5 font-bold">No.</th>
                    <th className="p-3.5 font-bold">NIM / ID</th>
                    <th className="p-3.5 font-bold">Nama Lengkap</th>
                    <th className="p-3.5 font-bold">Email</th>
                    <th className="p-3.5 font-bold">Status Otorisasi</th>
                    <th className="p-3.5 font-bold text-center">Aksi / Pengelolaan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((user, idx) => {
                    const isSuspended = user.status === 'suspended';
                    return (
                      <tr key={idx} className={`transition-colors ${isSuspended ? 'bg-rose-50/20 text-slate-500' : 'hover:bg-slate-50/70'}`}>
                        <td className="p-3.5 font-mono text-slate-400 text-[10px]">{idx + 1}</td>
                        <td className="p-3.5 font-mono font-black text-slate-800 text-xs">{user.nim}</td>
                        <td className="p-3.5 font-bold text-slate-800">
                          {user.name || (user.nim === '2503015022' ? 'System Administrator Default' : 'Staf Operator Lab')}
                        </td>
                        <td className="p-3.5 text-slate-500 font-medium">
                          {user.email || (user.nim === '2503015022' ? 'dinianti.marselia@uhamka.ac.id' : `${user.nim}@uhamka.ac.id`)}
                        </td>
                        <td className="p-3.5">
                          {isSuspended ? (
                            <span className="bg-rose-100 text-rose-800 border border-rose-200 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping"></span>
                              NONAKTIF
                            </span>
                          ) : (
                            <span className="bg-emerald-50 text-emerald-800 border border-emerald-150 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                              AKTIF
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <div className="flex items-center justify-center gap-2">
                            {/* Edit Password Button */}
                            <button
                              onClick={() => {
                                setResetTargetUser(user);
                                setResetModalError('');
                                setResetModalSuccess('');
                              }}
                              className="bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-teal-700 font-bold p-1.5 px-2.5 rounded-lg flex items-center gap-1 transition-all active:scale-95 cursor-pointer text-[10px]"
                              title="Ubah & Reset Password Anggota ini"
                            >
                              <Key className="w-3.5 h-3.5" />
                              Ubah Password
                            </button>

                            {/* Nonaktifkan / Aktifkan Toggle Button */}
                            {user.nim !== '2503015022' && (
                              <button
                                onClick={() => handleToggleUserStatus(user.nim)}
                                className={`font-bold p-1.5 px-2.5 rounded-lg flex items-center gap-1 transition-all active:scale-95 cursor-pointer text-[10px] border ${
                                  isSuspended 
                                    ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800' 
                                    : 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800'
                                }`}
                                title={isSuspended ? "Aktifkan kembali akun ini" : "Nonaktifkan akun ini"}
                              >
                                <UserX className="w-3.5 h-3.5" />
                                {isSuspended ? 'Aktifkan Akun' : 'Nonaktifkan Akun'}
                              </button>
                            )}

                            {/* Delete Permanently Button */}
                            {user.nim !== '2503015022' && (
                              <button
                                onClick={() => handleDeleteUser(user.nim)}
                                className="bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-500 hover:text-rose-600 p-1.5 rounded-lg transition-all active:scale-95 cursor-pointer"
                                title="Hapus Akun Permanen Dari Sistem"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* SECURE ADMIN PASSWORD RESET MODAL */}
      {resetTargetUser && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">Setel Ulang Password</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Ubah kata sandi untuk akun NIM: {resetTargetUser.nim}</p>
                </div>
              </div>
              <button 
                onClick={() => setResetTargetUser(null)} 
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <XSquare className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
              <p><strong>Nama Anggota:</strong> {resetTargetUser.name || 'Operator Lab'}</p>
              <p><strong>Email:</strong> {resetTargetUser.email || (resetTargetUser.nim === '2503015022' ? 'dinianti.marselia@uhamka.ac.id' : `${resetTargetUser.nim}@uhamka.ac.id`)}</p>
            </div>

            {resetModalError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-bold">
                {resetModalError}
              </div>
            )}

            {resetModalSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold">
                {resetModalSuccess}
              </div>
            )}

            <form onSubmit={handleAdminResetPasswordSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Masukkan Kata Sandi Baru*</label>
                <input
                  type="text"
                  required
                  placeholder="Password baru (Min. 8 karakter)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-mono focus:outline-none focus:border-teal-600 focus:bg-white transition-all text-slate-850"
                  autoFocus
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setResetTargetUser(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-extrabold text-xs py-2 px-4 rounded-xl transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-teal-650 hover:bg-teal-700 bg-teal-600 text-white font-extrabold text-xs py-2 px-5 rounded-xl flex items-center gap-1 transition-all cursor-pointer"
                >
                  Simpan Sandi Baru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
