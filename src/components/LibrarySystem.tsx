// src/components/LibrarySystem.tsx
"use client";
import { useState, useEffect } from 'react';
import HistoryView from './HistoryView';

export default function LibrarySystem({ user, onLogout }: { user: any, onLogout: () => void }) {
  const [books, setBooks] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<any>('home');
  const [newBookTitle, setNewBookTitle] = useState("");

  const fetchBooks = async () => {
    const res = await fetch('/api/books');
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAction = async (bookId: number, type: 'borrow' | 'return') => {
    const endpoint = type === 'borrow' ? '/api/borrow' : '/api/return';
    const body = type === 'borrow' ? { bookId, userId: user.id } : { bookId };
    
    const res = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (res.ok) {
      alert(type === 'borrow' ? "ยืมสำเร็จ!" : "คืนสำเร็จ!");
      fetchBooks();
    }
  };

  // กรองหนังสือตาม Tab ที่เลือก
  const displayBooks = activeTab === 'return' 
    ? books.filter(b => b.isAvailable === 0) // ดูเฉพาะที่ถูกยืม (เพื่อจะคืน)
    : books;

  if (activeTab === 'history') {
    return <HistoryView onBack={() => setActiveTab('home')} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto shadow-2xl relative border-x border-gray-200">
      
      {/* 1. ส่วนหัวสีน้ำเงิน (เหมือนในรูป) */}
      <header className="bg-indigo-900 p-8 pt-12 rounded-b-[40px] text-white">
        <div className="flex justify-between items-start">
          <div>
            <p className="opacity-80 text-sm mb-1">สวัสดี, {user.username} 👋</p>
            <h1 className="text-3xl font-bold tracking-tight">รายการหนังสือทั้งหมด</h1>
          </div>
          <button onClick={onLogout} className="bg-white/20 px-4 py-2 rounded-2xl text-xs backdrop-blur-md">
            ออก
          </button>
        </div>
      </header>

      {/* 2. เนื้อหาตรงกลาง (Scrollable) */}
      <main className="flex-1 p-6 overflow-y-auto pb-32 space-y-4">
        
        {/* ส่วนแอดมิน (ถ้าเป็นแอดมินจะเห็นส่วนนี้) */}
        {user.role === 'ADMIN' && activeTab === 'home' && (
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 mb-6">
            <p className="text-xs font-bold text-indigo-900 mb-2">เพิ่มหนังสือใหม่ (Admin Only)</p>
            <div className="flex gap-2">
              <input 
                value={newBookTitle}
                onChange={(e) => setNewBookTitle(e.target.value)}
                placeholder="ชื่อหนังสือ..."
                className="flex-1 bg-slate-50 p-2 rounded-xl text-sm outline-none"
              />
              <button 
                onClick={async () => {
                  await fetch('/api/books', { method: 'POST', body: JSON.stringify({ title: newBookTitle }) });
                  setNewBookTitle("");
                  fetchBooks();
                }}
                className="bg-indigo-900 text-white px-4 rounded-xl text-xs"
              >เพิ่ม</button>
            </div>
          </div>
        )}

        {/* รายการการ์ดหนังสือ */}
        {displayBooks.map((book) => (
          <div key={book.id} className="bg-white p-6 rounded-[30px] shadow-md flex justify-between items-center mb-4">
            <div className="flex-1">
              {/* 1. ต้องมีบรรทัดนี้เพื่อให้ชื่อหนังสือแสดงผลเหมือนของเพื่อน */}
              <h3 className="text-indigo-900 font-bold text-lg mb-1">{book.title}</h3>
              {/* ------------------------------------------ */}
            <p className="text-slate-400 text-xs font-medium">รหัส #{book.id}</p>
          </div>
    
        <div className="flex flex-col items-end gap-3">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${book.isAvailable === 1 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {book.isAvailable === 1 ? '✅ ว่าง' : '❌ ถูกยืม'}
          </span>
      
          <button 
            onClick={() => handleAction(book.id, book.isAvailable === 1 ? 'borrow' : 'return')}
            className={`text-[11px] font-bold px-5 py-2 rounded-2xl shadow-sm transition-all ${
              book.isAvailable === 1 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            {book.isAvailable === 1 ? 'ยืมหนังสือ' : 'คืนหนังสือ'}
          </button>
        </div>
      </div>
  ))}
      </main>

      {/* 3. แถบเมนูด้านล่าง (Bottom Nav) */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-xl border-t border-slate-100 flex justify-around p-4 rounded-t-[30px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'home' ? 'text-indigo-900 scale-110' : 'text-slate-300'}`}>
          <span className="text-2xl">📖</span>
          <span className="text-[10px] font-bold">ยืมหนังสือ</span>
        </button>
        <button onClick={() => setActiveTab('return')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'return' ? 'text-indigo-900 scale-110' : 'text-slate-300'}`}>
          <span className="text-2xl">↩️</span>
          <span className="text-[10px] font-bold">คืนหนังสือ</span>
        </button>
        <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'history' ? 'text-indigo-900 scale-110' : 'text-slate-300'}`}>
          <span className="text-2xl">📋</span>
          <span className="text-[10px] font-bold">ประวัติ</span>
        </button>
      </nav>

    </div>
  );
}