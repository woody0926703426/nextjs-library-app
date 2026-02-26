# 📚 Library Management System (Next.js + Prisma)

โปรเจกต์ระบบจัดการห้องสมุดดิจิทัลที่ออกแบบมาเพื่อใช้งานบนอุปกรณ์เคลื่อนที่ (Mobile-First Design) รองรับการยืม-คืนหนังสือ และการจัดการข้อมูลสำหรับผู้ดูแลระบบ

## ✨ คุณสมบัติของระบบ (Features)
- **📱 Mobile UI Design**: หน้าตาแอปพลิเคชันทันสมัย ใช้งานง่ายเหมือน Mobile App จริง
- **🔐 Role-based Access**: แยกสิทธิ์การเข้าใช้งานระหว่าง User (ยืม/คืน) และ Admin (เพิ่มหนังสือ/จัดการระบบ)
- **📖 Book Inventory**: แสดงรายการหนังสือพร้อมสถานะ 실시간 (Real-time)
- **🔄 Borrow & Return System**: ระบบยืมและคืนหนังสือที่เชื่อมต่อกับฐานข้อมูล SQLite
- **📜 Transaction History**: หน้าแสดงประวัติการยืม-คืนหนังสือทั้งหมด
- **🌐 Network Access**: รองรับการรันผ่านวง LAN เพื่อใช้งานบนมือถือจริง (iPhone/Android)

## 🛠 เทคโนโลยีที่ใช้ (Tech Stack)
- **Frontend**: Next.js 15 (App Router), Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite
- **ORM**: Prisma

## 🚀 วิธีการติดตั้งและรันโปรเจกต์ (Installation)

1. **ดาวน์โหลดโปรเจกต์และติดตั้ง Library:**
   ```bash
   npm install
2. **ตั้งค่าฐานข้อมูล  (Prisma):**
   ```bash
   npx prisma db push
3. **รันโปรเจกต์ใน Terminal :**
   ```bash
   npm run dev
4. ** เข้าใช้งานผ่าน http://localhost:3000:**

👤 บัญชีทดสอบ (Test Accounts)
Username,Password,Role
admin,1234,ADMIN
user01,1234,USER
