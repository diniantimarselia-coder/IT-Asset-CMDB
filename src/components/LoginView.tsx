import React, { useState, useEffect } from 'react';
import { 
  Database, Lock, Key, ShieldCheck, Eye, EyeOff, 
  Check, X, ArrowLeft, Send, HelpCircle, CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (userId: string) => void;
}

// User schema for simulated account registration & retrieval
interface UserAccount {
  nim: string;
  passwordHash: string;
  securityQuestion: string;
  securityAnswer: string;
  name?: string;
  email?: string;
  status?: 'active' | 'suspended';
}

export default function LoginView({ onLoginSuccess }: LoginViewProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot' | 'reset-password' | 'request'>('signin');
  
  // Request Access state
  const [reqNim, setReqNim] = useState('');
  const [reqName, setReqName] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [reqReason, setReqReason] = useState('Keperluan pendataan aset lab komputer');
  const [reqSuccess, setReqSuccess] = useState('');
  const [reqError, setReqError] = useState('');
  
  // Sign In state
  const [signInNim, setSignInNim] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [signInError, setSignInError] = useState('');

  // Sign Up state
  const [signUpNim, setSignUpNim] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [signUpSecurityQuestion, setSignUpSecurityQuestion] = useState('Nama hewan peliharaan pertama Anda?');
  const [signUpSecurityAnswer, setSignUpSecurityAnswer] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState('');

  // Forgot Password & Reset state
  const [forgotNim, setForgotNim] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotOtpSent, setForgotOtpSent] = useState(false);
  const [simulatedOtpCode, setSimulatedOtpCode] = useState('');
  const [userEnteredOtp, setUserEnteredOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  
  // Actual password reset state
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  // Shared users registry inside localStorage
  const [users, setUsers] = useState<UserAccount[]>([]);

  // Seed default account at first load if none exist
  useEffect(() => {
    const stored = localStorage.getItem('corecmdb_user_registry');
    let parsedUsers: UserAccount[] = [];
    
    if (stored) {
      try {
        parsedUsers = JSON.parse(stored);
      } catch (e) {
        parsedUsers = [];
      }
    }

    // Migrate old user 1234567890 to 2503015022
    let wasMigrated = false;
    parsedUsers = parsedUsers.map(u => {
      if (u.nim === '1234567890') {
        wasMigrated = true;
        return {
          ...u,
          nim: '2503015022',
          name: 'System Administrator Default',
          email: 'dinianti.marselia@uhamka.ac.id'
        };
      }
      return u;
    });

    const hasNewDefault = parsedUsers.some(u => u.nim === '2503015022');
    if (!hasNewDefault) {
      const defaultUser: UserAccount = {
        nim: '2503015022',
        passwordHash: 'Password@123',
        securityQuestion: 'Kota kelahiran Ibu kandung?',
        securityAnswer: 'jakarta',
        name: 'System Administrator Default',
        email: 'dinianti.marselia@uhamka.ac.id',
        status: 'active'
      };
      parsedUsers.push(defaultUser);
      wasMigrated = true;
    }

    if (wasMigrated) {
      localStorage.setItem('corecmdb_user_registry', JSON.stringify(parsedUsers));
    }
    
    setUsers(parsedUsers);
  }, []);

  // Sync Registry to LocalStorage
  const saveUserRegistry = (updatedRegistry: UserAccount[]) => {
    localStorage.setItem('corecmdb_user_registry', JSON.stringify(updatedRegistry));
    setUsers(updatedRegistry);
  };

  // Helper validators
  const isValidNim = (nim: string): boolean => {
    return nim.length >= 4;
  };

  // Strength check validator
  const checkPasswordStrength = (password: string) => {
    return {
      minLength: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasDigit: /[0-9]/.test(password),
      hasSpecial: /[@$!%*?&(){}[\]#^+=_\-|\\~`<>;:,"'.]/.test(password),
    };
  };

  const isPasswordStrong = (password: string): boolean => {
    const checks = checkPasswordStrength(password);
    return Object.values(checks).every(Boolean);
  };

  // Handler for Sign In
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError('');

    if (!isValidNim(signInNim)) {
      setSignInError('Format NIM tidak valid.');
      return;
    }

    const foundUser = users.find(u => u.nim === signInNim);
    if (!foundUser) {
      setSignInError('NIM belum terdaftar dalam database CoreCMDB.');
      return;
    }

    if (foundUser.status === 'suspended') {
      setSignInError('Akun ini telah dinonaktifkan (Status: Resigned / Suspended). Hubungi Administrator TI untuk aktivasi kembali.');
      return;
    }

    if (foundUser.passwordHash !== signInPassword) {
      setSignInError('Password salah. Pastikan kombinasi huruf besar, kecil, angka, dan simbol sesuai.');
      return;
    }

    // Trigger parent callback
    onLoginSuccess(signInNim);
  };

  // Handler for Requesting Access
  const handleRequestAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReqSuccess('');
    setReqError('');

    if (!reqNim || !reqName || !reqEmail) {
      setReqError('Semua kolom bertanda bintang (*) wajib diisi.');
      return;
    }

    if (reqNim.length < 4) {
      setReqError('NIM harus diisi dengan benar (minimal 4 karakter).');
      return;
    }

    // Save to simulate queue
    const savedRequests = localStorage.getItem('corecmdb_access_requests');
    let requestsList = [];
    if (savedRequests) {
      try {
        requestsList = JSON.parse(savedRequests);
      } catch (err) {
        requestsList = [];
      }
    }

    const isAlreadyRequested = requestsList.some((r: any) => r.nim === reqNim);
    if (isAlreadyRequested) {
      setReqError('Permohonan pembuatan akun untuk NIM ini sudah ada dalam sistem dan sedang ditinjau.');
      return;
    }

    const newRequest = {
      nim: reqNim,
      name: reqName,
      email: reqEmail,
      reason: reqReason,
      timestamp: new Date().toISOString()
    };

    requestsList.push(newRequest);
    localStorage.setItem('corecmdb_access_requests', JSON.stringify(requestsList));

    setReqSuccess('Permohonan pembuatan akun Anda berhasil dikirim ke Admin TI! Antrean permohonan Anda sedang diproses.');
    setReqNim('');
    setReqName('');
    setReqEmail('');
    setReqReason('Keperluan pendataan aset lab komputer');
  };

  // Handler for Registering (Sign Up)
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError('');
    setSignUpSuccess('');

    if (!isValidNim(signUpNim)) {
      setSignUpError('NIM harus berupa tepat 10 digit angka.');
      return;
    }

    // Check availability
    const isTaken = users.some(u => u.nim === signUpNim);
    if (isTaken) {
      setSignUpError('NIM ini sudah terdaftar. Silakan login atau gunakan fitur Lupa Password.');
      return;
    }

    if (!isPasswordStrong(signUpPassword)) {
      setSignUpError('Kriteria password kuat belum sepenuhnya terpenuhi.');
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      setSignUpError('Konfirmasi password tidak cocok.');
      return;
    }

    if (!signUpSecurityAnswer.trim()) {
      setSignUpError('Harap berikan jawaban keamanan untuk melakukan pemulihan akun nantinya.');
      return;
    }

    const newUser: UserAccount = {
      nim: signUpNim,
      passwordHash: signUpPassword,
      securityQuestion: signUpSecurityQuestion,
      securityAnswer: signUpSecurityAnswer.trim().toLowerCase()
    };

    const newRegistry = [...users, newUser];
    saveUserRegistry(newRegistry);

    setSignUpSuccess(`NIM ${signUpNim} berhasil didaftarkan! Anda sekarang bisa masuk.`);
    // Reset state values
    setSignUpNim('');
    setSignUpPassword('');
    setSignUpConfirmPassword('');
    setSignUpSecurityAnswer('');
    
    // Smooth redirect
    setTimeout(() => {
      setMode('signin');
      setSignInNim(newUser.nim);
      setSignUpSuccess('');
    }, 2000);
  };

  // Handler for Lupa Password (Retrieve account & send OTP)
  const handleForgotNimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');

    if (!isValidNim(forgotNim)) {
      setForgotError('NIM yang dimasukkan harus berupa 10 digit angka.');
      return;
    }

    const userObj = users.find(u => u.nim === forgotNim);
    if (!userObj) {
      setForgotError('NIM ini tidak ditemukan dalam registri database.');
      return;
    }

    // Simulated SMS/Email notification OTP generator
    const otpValue = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedOtpCode(otpValue);
    setForgotOtpSent(true);
    setUserEnteredOtp('');
    setOtpError('');
  };

  // Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');

    if (userEnteredOtp === simulatedOtpCode || userEnteredOtp === '112233') { // Backdoor reset Code code
      setOtpVerified(true);
      setMode('reset-password');
    } else {
      setOtpError('Akses Ditolak: Kode verifikasi OTP salah atau sudah kedaluwarsa.');
    }
  };

  // Perform Final Reset Passwords
  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess('');

    if (!isPasswordStrong(newPassword)) {
      setResetError('Password baru harus memenuhi seluruh standar regulasi keamanan (Strong Password).');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setResetError('Konfirmasi password baru tidak sesuai.');
      return;
    }

    // Find and update password
    const updatedUsers = users.map(u => {
      if (u.nim === forgotNim) {
        return { ...u, passwordHash: newPassword };
      }
      return u;
    });

    saveUserRegistry(updatedUsers);
    setResetSuccess('Kata sandi berhasil disimpan! Mengalihkan ke halaman masuk...');
    setNewPassword('');
    setConfirmNewPassword('');

    setTimeout(() => {
      setMode('signin');
      setSignInNim(forgotNim);
      setForgotNim('');
      setForgotOtpSent(false);
      setSimulatedOtpCode('');
      setOtpVerified(false);
      setResetSuccess('');
    }, 2500);
  };

  const strength = checkPasswordStrength(mode === 'signup' ? signUpPassword : newPassword);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Decorative cyber backdrop circles */}
      <div className="absolute top-1/4 -left-36 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-36 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

      {/* Login Card Grid */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800/80 rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Card Branding Header */}
        <div className="bg-gradient-to-r from-slate-950 to-slate-900 p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-teal-500 to-indigo-600 rounded-xl text-white">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-white font-extrabold text-base tracking-tight text-left">CoreCMDB</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider text-left">Enterprise Assets Registry</p>
            </div>
          </div>
          <div className="p-1 px-2.5 bg-slate-800/60 rounded-full border border-slate-700/50 flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-emerald-450 text-emerald-400" />
            <span className="text-[9px] font-bold text-slate-300 tracking-wider">SECURE SHIELD</span>
          </div>
        </div>

        {/* Dynamic Inner Simulated Notification (simulating SMS / Mail Service Gateway) */}
        {forgotOtpSent && mode === 'forgot' && !otpVerified && (
          <div className="bg-teal-900/40 border-y border-teal-800 p-4 animate-in slide-in-from-top-4 duration-300">
            <div className="flex gap-2.5">
              <div className="p-1 bg-teal-700 text-white rounded-lg self-start shrink-0">
                <Send className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs text-teal-200">
                <p className="font-extrabold text-teal-300 uppercase tracking-wider mb-0.5 text-[9px]">Sandi Sekali Pakai (OTP)</p>
                <p className="mb-2 leading-relaxed">Kode OTP pemulihan kata sandi dikirim untuk NIM <strong className="text-white">{forgotNim}</strong>.</p>
                <div className="flex items-center justify-between bg-slate-950/70 p-2 px-3.5 rounded-lg border border-teal-800/60 font-mono mt-1 text-sm">
                  <span className="text-slate-400 text-xs">KODE OTP:</span>
                  <span className="text-teal-400 font-black tracking-widest text-base select-all">{simulatedOtpCode}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="p-6 md:p-8">

          {/* Mode SIGN IN */}
          {mode === 'signin' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Masuk ke Sistem</h2>
                <p className="text-[11px] text-slate-400 font-medium mt-1 leading-relaxed">Masukkan NIM dan kata sandi Anda untuk mengakses sistem manajemen aset.</p>
              </div>

              {signInError && (
                <div className="p-3 bg-rose-950/50 border border-rose-900 rounded-xl text-xs text-rose-200 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{signInError}</span>
                </div>
              )}

              <form onSubmit={handleSignIn} className="space-y-4">
                {/* NIM Field */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">NIM*</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input 
                      type="text" 
                      required
                      placeholder="Contoh: 2503015022"
                      value={signInNim}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, ''); // numerical filter
                        if (val.length <= 15) {
                          setSignInNim(val);
                        }
                      }}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono tracking-wider focus:outline-none focus:border-indigo-600 transition-colors"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Kata Sandi</label>
                    <button 
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] text-indigo-400 font-extrabold hover:text-indigo-300 transition-colors"
                    >
                      Lupa Kata Sandi?
                    </button>
                  </div>
                  
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                      <Key className="w-4 h-4" />
                    </span>
                    <input 
                      type={showSignInPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2.5 pl-10 pr-10 text-xs focus:outline-none focus:border-indigo-600 transition-colors"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowSignInPassword(!showSignInPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-350"
                    >
                      {showSignInPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Sign In */}
                <button 
                  type="submit"
                  disabled={signInNim.length < 4}
                  className={`w-full font-bold text-xs py-2.5 rounded-xl text-white transition-all flex items-center justify-center gap-1.5 shadow-md ${
                    signInNim.length >= 4 
                      ? 'bg-gradient-to-r from-teal-500 to-indigo-600 hover:scale-[1.01] active:scale-[0.99] border-t border-white/10' 
                      : 'bg-slate-850 text-slate-500 cursor-not-allowed border border-slate-800'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  Masuk ke Portal Aset
                </button>
              </form>

              {/* Info notice about authorized access and admin registrations instead of public signup */}
              <div className="pt-4 border-t border-slate-800/80 text-center space-y-2">
                <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                  Pendaftaran akun baru dikelola terpusat oleh Administrator TI.
                </p>
                <p className="text-[11px] text-slate-400">
                  Belum memiliki akses?{' '}
                  <button 
                    type="button"
                    onClick={() => {
                      setMode('request');
                      setReqNim('');
                      setReqName('');
                      setReqEmail('');
                      setReqSuccess('');
                      setReqError('');
                    }}
                    className="text-teal-400 font-extrabold hover:text-teal-300 transition-colors underline decoration-dotted"
                  >
                    Ajukan Permohonan Akses
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Mode SIGN UP (Daftar NIM Baru) */}
          {mode === 'signup' && (
            <div className="space-y-6">
              <div>
                <button 
                  onClick={() => setMode('signin')}
                  className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors mb-2 font-bold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Kembali ke Login
                </button>
                <h2 className="text-xl font-bold text-white tracking-tight">Daftarkan NIM Baru</h2>
                <p className="text-[11px] text-slate-405 text-slate-450 leading-relaxed mt-1">Buat registrasi akses CMDB Anda dengan melakukan verifikasi standar keamanan institusi.</p>
              </div>

              {signUpError && (
                <div className="p-3 bg-rose-950/50 border border-rose-900 rounded-xl text-xs text-rose-200 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{signUpError}</span>
                </div>
              )}

              {signUpSuccess && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-900 rounded-xl text-xs text-emerald-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-450 text-emerald-450 text-emerald-400 mt-0.5 shrink-0 animate-bounce" />
                  <span className="leading-relaxed">{signUpSuccess}</span>
                </div>
              )}

              <form onSubmit={handleSignUp} className="space-y-4">
                {/* Registrasi NIM */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[11px] font-bold text-slate-404 text-slate-400 uppercase tracking-widest">NIM Pendaftar*</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input 
                      type="text" 
                      required
                      placeholder="Masukkan NIM Anda"
                      value={signUpNim}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, ''); // numeric filter
                        if (val.length <= 10) {
                          setSignUpNim(val);
                        }
                      }}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2.5 pl-10 pr-12 text-xs font-mono tracking-wider focus:outline-none focus:border-indigo-650 focus:border-indigo-600 transition-colors"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${signUpNim.length === 10 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-400'}`}>
                        {signUpNim.length}/10 digit
                      </span>
                    </span>
                  </div>
                </div>

                {/* Password Strength Requirement Grid */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[11px] font-bold text-slate-404 text-slate-400 uppercase tracking-widest">Buat Password Kuat*</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                      <Key className="w-4 h-4" />
                    </span>
                    <input 
                      type={showSignUpPassword ? 'text' : 'password'}
                      required
                      placeholder="Gunakan minimal 8 huruf/karakter kombinasi"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2.5 pl-10 pr-10 text-xs focus:outline-none focus:border-indigo-600 transition-colors"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-350"
                    >
                      {showSignUpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* REALTIME Password Rules Checklist UI */}
                  {signUpPassword.length > 0 && (
                    <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-xl mt-2 space-y-1.5 text-[10px]">
                      <p className="font-extrabold text-slate-405 text-slate-500 uppercase tracking-wider mb-1">Audit Indikasi Keamanan Sandi:</p>
                      
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                        <div className="flex items-center gap-1.5">
                          {strength.minLength ? <Check className="w-3 h-3 text-emerald-450 text-emerald-450 text-emerald-400" /> : <X className="w-3 h-3 text-slate-650" />}
                          <span className={strength.minLength ? 'text-emerald-400 font-medium' : 'text-slate-550'}>Min 8 Karakter</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {strength.hasUpper ? <Check className="w-3 h-3 text-emerald-450 text-emerald-400" /> : <X className="w-3 h-3 text-slate-650" />}
                          <span className={strength.hasUpper ? 'text-emerald-400 font-medium' : 'text-slate-550'}>Huruf Kapital (A-Z)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {strength.hasLower ? <Check className="w-3 h-3 text-emerald-450 text-emerald-450 text-emerald-400" /> : <X className="w-3 h-3 text-slate-650" />}
                          <span className={strength.hasLower ? 'text-emerald-400 font-medium' : 'text-slate-550'}>Huruf Kecil (a-z)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {strength.hasDigit ? <Check className="w-3 h-3 text-emerald-450 text-emerald-450 text-emerald-400" /> : <X className="w-3 h-3 text-slate-650" />}
                          <span className={strength.hasDigit ? 'text-emerald-400 font-medium' : 'text-slate-550'}>Angka Berangka (0-9)</span>
                        </div>
                        <div className="flex items-center gap-1.5 col-span-2">
                          {strength.hasSpecial ? <Check className="w-3 h-3 text-emerald-450 text-emerald-450 text-emerald-400" /> : <X className="w-3 h-3 text-slate-650" />}
                          <span className={strength.hasSpecial ? 'text-emerald-400 font-medium' : 'text-slate-550'}>Simbol Khusus (&amp;, @, #, $, %, dll)</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Konfirmasi Password */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Konfirmasi Password Baru*</label>
                  <input 
                    type="password" 
                    required
                    placeholder="Ketik ulang password anda"
                    value={signUpConfirmPassword}
                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-indigo-600 transition-colors"
                  />
                  {signUpConfirmPassword.length > 0 && signUpPassword !== signUpConfirmPassword && (
                    <p className="text-[10px] text-rose-450 text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Password konfirmasi tidak sesuai.
                    </p>
                  )}
                </div>

                {/* Pertanyaan Keamanan untuk Reset Password */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-404 text-slate-400 uppercase tracking-widest">Pertanyaan Keamanan (Reset)*</label>
                    <span className="p-0.5 text-[10px] text-teal-400 font-semibold cursor-help" title="Digunakan sebagai opsi tambahan untuk merestore akun">Mengapa ini ditambahkan?</span>
                  </div>
                  <select
                    value={signUpSecurityQuestion}
                    onChange={(e) => setSignUpSecurityQuestion(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-indigo-600 transition-colors"
                  >
                    <option>Nama hewan peliharaan pertama Anda?</option>
                    <option>Nama sekolah dasar (SD) tempat Anda belajar?</option>
                    <option>Nama kota kelahiran ibu kandung Anda?</option>
                    <option>Siapa pahlawan rujukan pertama Anda?</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[11px] font-bold text-slate-404 text-slate-400 uppercase tracking-widest">Jawaban Pertanyaan*</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Berikan satu kata kunci jawaban anda"
                    value={signUpSecurityAnswer}
                    onChange={(e) => setSignUpSecurityAnswer(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-indigo-600 transition-colors"
                  />
                </div>

                {/* Submit Register */}
                <button 
                  type="submit"
                  disabled={
                    signUpNim.length !== 10 || 
                    !isPasswordStrong(signUpPassword) || 
                    signUpPassword !== signUpConfirmPassword ||
                    !signUpSecurityAnswer.trim()
                  }
                  className={`w-full font-bold text-xs py-2.5 rounded-xl text-white transition-all flex items-center justify-center gap-1.5 ${
                    signUpNim.length === 10 && 
                    isPasswordStrong(signUpPassword) && 
                    signUpPassword === signUpConfirmPassword &&
                    signUpSecurityAnswer.trim()
                      ? 'bg-gradient-to-r from-teal-500 to-indigo-600 hover:scale-[1.01] active:scale-[0.99] border-t border-white/10' 
                      : 'bg-slate-850 text-slate-500 cursor-not-allowed border border-slate-800'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  Selesaikan Pendaftaran NIM
                </button>
              </form>
            </div>
          )}

          {/* Mode FORGOT PASSWORD (Minta Pengiriman OTP) */}
          {mode === 'forgot' && !otpVerified && (
            <div className="space-y-6">
              <div>
                <button 
                  onClick={() => {
                    setForgotOtpSent(false);
                    setMode('signin');
                  }}
                  className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors mb-2 font-bold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
                <h2 className="text-xl font-bold text-white tracking-tight">Cari NIM &amp; Kirim OTP</h2>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Masukkan NIM Anda untuk menguji coba simulasi verifikasi OTP Instan.</p>
              </div>

              {forgotError && (
                <div className="p-3 bg-rose-950/50 border border-rose-900 rounded-xl text-xs text-rose-200 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{forgotError}</span>
                </div>
              )}

              {!forgotOtpSent ? (
                // Step 1: Input NIM terdaftar
                <form onSubmit={handleForgotNimSubmit} className="space-y-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">NIM Anda*</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                        <Lock className="w-4 h-4" />
                      </span>
                      <input 
                        type="text" 
                        required
                        placeholder="Ketik NIM yang mau di-reset"
                        value={forgotNim}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          if (val.length <= 15) {
                            setForgotNim(val);
                          }
                        }}
                        className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono tracking-wider focus:outline-none focus:border-indigo-600 transition-colors"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={forgotNim.length < 4}
                    className={`w-full font-bold text-xs py-2.5 rounded-xl text-white transition-all flex items-center justify-center gap-1.5 shadow-md ${
                      forgotNim.length >= 4 
                        ? 'bg-gradient-to-r from-teal-500 to-indigo-600 hover:scale-[1.01] active:scale-[0.99] border-t border-white/10' 
                        : 'bg-slate-850 text-slate-500 cursor-not-allowed border border-slate-800'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    Kirim Kode OTP
                  </button>
                </form>
              ) : (
                // Step 2: Input OTP SMS yang digenerasikan
                <div className="space-y-4">
                  <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs space-y-1.5 text-slate-450 text-slate-400">
                    <p className="font-extrabold text-slate-300">Konfirmasi Pemulihan Akun</p>
                    <p>Gunakan kode OTP berikut untuk melanjutkan pengaturan ulang kata sandi Anda.</p>
                  </div>

                  {otpError && (
                    <div className="p-2.5 bg-rose-950/50 border border-rose-900 rounded-lg text-[11px] text-rose-250 text-rose-300">
                      {otpError}
                    </div>
                  )}

                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[11px] font-bold text-slate-404 text-slate-400 uppercase tracking-widest">Masukkan 6 Digit Kode OTP*</label>
                      <input 
                        type="text" 
                        required
                        maxLength={6}
                        placeholder="Ketik kode di atas atau kode master '112233'"
                        value={userEnteredOtp}
                        onChange={(e) => setUserEnteredOtp(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-slate-950 border border-slate-850 border-slate-800 text-center tracking-[0.5em] text-cyan-400 font-extrabold rounded-xl py-3 text-base focus:outline-none focus:border-cyan-600 transition-colors"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={userEnteredOtp.length !== 6}
                      className={`w-full font-bold text-xs py-2.5 rounded-xl text-white transition-all flex items-center justify-center gap-1.5 shadow-md ${
                        userEnteredOtp.length === 6 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:scale-[1.01] active:scale-[0.99] border-t border-white/10' 
                          : 'bg-slate-850 text-slate-500 cursor-not-allowed border border-slate-800'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      Lanjutkan Reset Password
                    </button>
                    
                    <button 
                      type="button"
                      onClick={() => {
                        const otpValue = Math.floor(100000 + Math.random() * 900000).toString();
                        setSimulatedOtpCode(otpValue);
                        setOtpError('');
                        setUserEnteredOtp('');
                      }}
                      className="w-full text-center text-xs text-slate-500 hover:text-slate-400 transition-colors underline decoration-dotted font-medium"
                    >
                      Kirim Ulang OTP Baru
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* Mode RESET PASSWORD (Setelah Berhasil Verifikasi OTP) */}
          {mode === 'reset-password' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Atur Ulang Kata Sandi</h2>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Verifikasi Berhasil! Silakan buat kata sandi baru untuk NIM <strong className="text-white">{forgotNim}</strong>.</p>
              </div>

              {resetError && (
                <div className="p-3 bg-rose-950/50 border border-rose-900 rounded-xl text-xs text-rose-200 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{resetError}</span>
                </div>
              )}

              {resetSuccess && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-900 rounded-xl text-xs text-emerald-200 flex items-start gap-2.5 animate-pulse">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{resetSuccess}</span>
                </div>
              )}

              <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                
                {/* Input Password Baru */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Kata Sandi Baru*</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                      <Key className="w-4 h-4" />
                    </span>
                    <input 
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      placeholder="Minimal 8 karakter kombinasi syarat kuat"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2.5 pl-10 pr-10 text-xs focus:outline-none focus:border-indigo-650 focus:border-indigo-600 transition-colors"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-350"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* REALTIME Password Rules Checklist UI */}
                  {newPassword.length > 0 && (
                    <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-xl mt-2 space-y-1.5 text-[10px]">
                      <p className="font-extrabold text-slate-500 uppercase tracking-wider mb-1">Kriteria Kata Sandi:</p>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                        <div className="flex items-center gap-1.5">
                          {strength.minLength ? <Check className="w-3 h-3 text-emerald-400" /> : <X className="w-3 h-3 text-slate-650" />}
                          <span className={strength.minLength ? 'text-emerald-400 font-medium' : 'text-slate-500'}>Min 8 Karakter</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {strength.hasUpper ? <Check className="w-3 h-3 text-emerald-400" /> : <X className="w-3 h-3 text-slate-650" />}
                          <span className={strength.hasUpper ? 'text-emerald-400 font-medium' : 'text-slate-500'}>Huruf Kapital (A-Z)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {strength.hasLower ? <Check className="w-3 h-3 text-emerald-400" /> : <X className="w-3 h-3 text-slate-650" />}
                          <span className={strength.hasLower ? 'text-emerald-400 font-medium' : 'text-slate-500'}>Huruf Kecil (a-z)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {strength.hasDigit ? <Check className="w-3 h-3 text-emerald-400" /> : <X className="w-3 h-3 text-slate-650" />}
                          <span className={strength.hasDigit ? 'text-emerald-400 font-medium' : 'text-slate-500'}>Angka (0-9)</span>
                        </div>
                        <div className="flex items-center gap-1.5 col-span-2">
                          {strength.hasSpecial ? <Check className="w-3 h-3 text-emerald-450 text-emerald-450 text-emerald-400" /> : <X className="w-3 h-3 text-slate-650" />}
                          <span className={strength.hasSpecial ? 'text-emerald-400 font-medium' : 'text-slate-500'}>Karakter Spesial (&amp;, @, #, $, %, dll)</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Konfirmasi Password Baru */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[11px] font-bold text-slate-404 text-slate-400 uppercase tracking-widest">Konfirmasi Kata Sandi Baru*</label>
                  <input 
                    type="password" 
                    required
                    placeholder="Ketik persis sandi baru"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-indigo-650 focus:border-indigo-600 transition-colors"
                  />
                  {confirmNewPassword.length > 0 && newPassword !== confirmNewPassword && (
                    <p className="text-[10px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Password konfirmasi tidak sesuai.
                    </p>
                  )}
                </div>

                <button 
                  type="submit"
                  disabled={!isPasswordStrong(newPassword) || newPassword !== confirmNewPassword}
                  className={`w-full font-bold text-xs py-2.5 rounded-xl text-white transition-all flex items-center justify-center gap-1.5 shadow-md ${
                    isPasswordStrong(newPassword) && newPassword === confirmNewPassword
                      ? 'bg-gradient-to-r from-teal-500 to-indigo-600 hover:scale-[1.01] active:scale-[0.99] border-t border-white/10' 
                      : 'bg-slate-850 text-slate-500 cursor-not-allowed border border-slate-800'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Simpan Password Kuat Baru
                </button>
              </form>
            </div>
          )}

          {/* Mode REQUEST ACCESS */}
          {mode === 'request' && (
            <div className="space-y-6">
              <div>
                <button 
                  onClick={() => setMode('signin')}
                  className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors mb-2 font-bold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
                <h2 className="text-xl font-bold text-white tracking-tight">Ajukan Permohonan Akses</h2>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Isi formulir pendaftaran di bawah ini untuk diverifikasi secara manual oleh Tim IT Administrator.</p>
              </div>

              {reqError && (
                <div className="p-3 bg-rose-950/50 border border-rose-900 rounded-xl text-xs text-rose-200 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{reqError}</span>
                </div>
              )}

              {reqSuccess && (
                <div className="p-4 bg-emerald-950/60 border border-emerald-900 rounded-xl text-xs text-emerald-200 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0 animate-bounce" />
                    <span className="leading-relaxed font-bold">{reqSuccess}</span>
                  </div>
                  <p className="text-[10px] text-slate-400">Tim IT Administrator akan menghubungi Anda setelah data NIM dicocokkan dengan data kepegawaian/kemahasiswaan resmi.</p>
                  <button
                    onClick={() => setMode('signin')}
                    className="mt-2 w-full text-center text-xs text-teal-400 hover:text-teal-300 font-bold underline transition-colors"
                  >
                    Kembali ke Halaman Masuk
                  </button>
                </div>
              )}

              {!reqSuccess && (
                <form onSubmit={handleRequestAccessSubmit} className="space-y-4">
                  {/* NIM */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">NIM Anda*</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Masukkan NIM Anda"
                      value={reqNim}
                      onChange={(e) => setReqNim(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-indigo-600 transition-colors font-mono"
                    />
                  </div>

                  {/* Nama Lengkap */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Nama Lengkap*</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Masukkan Nama Lengkap Sesuai KTP/Kartu"
                      value={reqName}
                      onChange={(e) => setReqName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-indigo-600 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Email*</label>
                    <input 
                      type="email" 
                      required
                      placeholder="nama@perusahaan.com"
                      value={reqEmail}
                      onChange={(e) => setReqEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-indigo-600 transition-colors"
                    />
                  </div>

                  {/* Alasan Akses */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Alasan Pengajuan Akses*</label>
                    <select
                      value={reqReason}
                      onChange={(e) => setReqReason(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-indigo-600 transition-colors"
                    >
                      <option value="Keperluan pendataan aset lab komputer">Keperluan pendataan aset lab komputer</option>
                      <option value="Staff TI / Operator baru">Staff TI / Operator baru</option>
                      <option value="Audit Keamanan dan Kepatuhan Aset">Audit Keamanan dan Kepatuhan Aset</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full font-bold text-xs py-2.5 rounded-xl text-white transition-all flex items-center justify-center gap-1.5 shadow-md bg-gradient-to-r from-teal-500 to-indigo-600 hover:scale-[1.01] active:scale-[0.99] border-t border-white/10"
                  >
                    <Send className="w-4 h-4" />
                    Kirim Permohonan Akses
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

        {/* Footer info/creds */}
        <div className="bg-slate-950/80 p-4 border-t border-slate-850/60 text-center text-[10px] text-slate-600 select-none">
          <p>© 2026 CoreCMDB Enterprise. Authorized access only.</p>
          <p className="mt-0.5">Sistem Manajemen Kelayakan Aset Korporasi &amp; Kepatuhan Tata Kelola TI.</p>
        </div>

      </div>
    </div>
  );
}
