// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // ค้นหา User ในฐานข้อมูล
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    // ตรวจสอบว่ามี User และ Password ตรงกันไหม (แบบง่าย)
    if (user && user.password === password) {
      return NextResponse.json({
        id: user.id,
        username: user.username,
        role: user.role // ส่ง Role กลับไปด้วยว่าเป็น USER หรือ ADMIN
      });
    }

    return NextResponse.json({ error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์" }, { status: 500 });
  }
}