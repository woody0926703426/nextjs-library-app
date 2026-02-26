// app/api/borrow/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { bookId, userId } = await request.json();

    // 1. ตรวจสอบว่าหนังสือยังว่างอยู่ไหม
    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book || book.isAvailable === 0) {
      return NextResponse.json({ error: "หนังสือนอนี้ไม่พร้อมให้ยืม" }, { status: 400 });
    }

    // 2. ใช้ Transaction เพื่ออัปเดต 2 ตารางพร้อมกัน
    await prisma.$transaction([
      // อัปเดตหนังสือให้เป็น "ไม่ว่าง" (0)
      prisma.book.update({
        where: { id: bookId },
        data: { isAvailable: 0 }
      }),
      // บันทึกประวัติการยืม
      prisma.borrow.create({
        data: {
          userId: userId,
          bookId: bookId,
        }
      })
    ]);

    return NextResponse.json({ message: "Success" });
  } catch (error) {
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในการยืม" }, { status: 500 });
  }
}