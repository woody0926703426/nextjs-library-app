// app/api/return/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { bookId } = await request.json();

    // 1. อัปเดตสถานะหนังสือให้กลับมาว่าง (1)
    // 2. อัปเดตตาราง Borrow เพื่อบันทึกวันที่คืน (returnDate)
    await prisma.$transaction([
      prisma.book.update({
        where: { id: bookId },
        data: { isAvailable: 1 }
      }),
      prisma.borrow.updateMany({
        where: { 
          bookId: bookId,
          returnDate: null // หา Record ที่ยังไม่ได้คืน
        },
        data: {
          returnDate: new Date()
        }
      })
    ]);

    return NextResponse.json({ message: "Success" });
  } catch (error) {
    return NextResponse.json({ error: "Return failed" }, { status: 500 });
  }
}