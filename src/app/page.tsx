// app/page.tsx
"use client";
import { useState } from 'react';
import LoginPage from '@/components/LoginPage'; // เดี๋ยวเราจะย้ายโค้ด Login ไปที่นี่

export default function PortalPage() {
  const [roleSelection, setRoleSelection] = useState<"USER" | "ADMIN" | null>(null);

  // ถ้าเลือกบทบาทแล้ว ให้แสดงหน้า Login ของบทบาทนั้น
  if (roleSelection) {
    return <LoginPage selectedRole={roleSelection} onBack={() => setRoleSelection(null)} />;
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-slate-800 mb-2">LIBRARY SYSTEM</h1>
        <p className="text-slate-500">กรุณาเลือกประเภทการเข้าใช้งาน</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* กล่องผู้ใช้งานทั่วไป */}
        <div 
          onClick={() => setRoleSelection("USER")}
          className="group cursor-pointer bg-white p-10 rounded-3xl shadow-sm border-2 border-transparent hover:border-blue-500 hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 text-center"
        >
          <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">👤</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">ผู้ใช้งานทั่วไป</h2>
          <p className="text-slate-500 text-sm">ยืม-คืนหนังสือ และดูประวัติส่วนตัว</p>
        </div>

        {/* กล่องผู้ดูแลระบบ */}
        <div 
          onClick={() => setRoleSelection("ADMIN")}
          className="group cursor-pointer bg-white p-10 rounded-3xl shadow-sm border-2 border-transparent hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300 text-center"
        >
          <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">🔑</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">ผู้ดูแลระบบ</h2>
          <p className="text-slate-500 text-sm">จัดการหนังสือ และตรวจสอบระบบ</p>
        </div>
      </div>
      
      <p className="mt-12 text-slate-400 text-xs">©Library Management System Project by  นายชัยวุฒิ จามะรีย์  ปวส.2/19 เลขที่3</p>
    </main>
  );
}