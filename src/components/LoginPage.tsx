// src/components/LoginPage.tsx
"use client";
import { useState } from 'react';
import LibrarySystem from './LibrarySystem';

export default function LoginPage({ selectedRole, onBack }: { selectedRole: string, onBack: () => void }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (res.ok) {
      // ตรวจสอบว่า Role ที่ Login ตรงกับที่เลือกมาจากหน้าแรกไหม
      if (data.role !== selectedRole) {
        alert(`บัญชีนี้ไม่มีสิทธิ์เข้าใช้งานในส่วนของ ${selectedRole}`);
        return;
      }
      setUser(data);
      setIsLoggedIn(true);
    } else {
      alert(data.error);
    }
  };

  if (isLoggedIn) return <LibrarySystem user={user} onLogout={() => setIsLoggedIn(false)} />;

  const is_admin = selectedRole === "ADMIN";

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border border-slate-100">
        <button onClick={onBack} className="text-slate-400 hover:text-slate-600 mb-6 text-sm flex items-center gap-1">
          ← ย้อนกลับ
        </button>
        
        <div className="text-center mb-8">
          <div className={`inline-block p-4 rounded-2xl mb-4 ${is_admin ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600'}`}>
            {is_admin ? '🔑' : '👤'}
          </div>
          <h1 className={`text-3xl font-bold ${is_admin ? 'text-indigo-600' : 'text-blue-600'}`}>
            {is_admin ? 'Admin Login' : 'User Login'}
          </h1>
        </div>

        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Username" 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-opacity-50 outline-none transition-all"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-opacity-50 outline-none transition-all"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            onClick={handleLogin}
            className={`w-full p-4 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-95 ${
              is_admin ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'
            }`}
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    </main>
  );
}