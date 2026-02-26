// src/components/HistoryView.tsx
"use client";
import { useState, useEffect } from 'react';

export default function HistoryView({ onBack }: { onBack: () => void }) {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/history')
      .then(res => res.json())
      .then(data => setHistory(data));
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        {/* เปลี่ยนปุ่มกลับให้เรียกฟังก์ชัน onBack */}
        <button onClick={onBack} className="text-blue-600 font-bold">← กลับไปหน้าระบบยืม</button>
        <h1 className="text-2xl font-bold">ประวัติการยืม-คืน</h1>
      </div>

      <div className="border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3">วันที่</th>
              <th className="p-3">ผู้ยืม</th>
              <th className="p-3">หนังสือ</th>
              <th className="p-3 text-center">สถานะ</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {history.map((item) => (
              <tr key={item.id}>
                <td className="p-3 text-sm">{new Date(item.borrowDate).toLocaleDateString()}</td>
                <td className="p-3 text-sm font-medium">{item.user.username}</td>
                <td className="p-3 text-sm">{item.book.title}</td>
                <td className="p-3 text-center">
                   {item.returnDate ? 
                    <span className="text-green-600 text-xs">คืนแล้ว</span> : 
                    <span className="text-orange-600 text-xs">ยังไม่คืน</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}