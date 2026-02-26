import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic'; // ป้องกันการค้างของข้อมูลเก่า

export async function GET() {
  try {
    const history = await prisma.borrow.findMany({
      include: {
        user: true,
        book: true
      },
      orderBy: { borrowDate: 'desc' } // เอาอันล่าสุดขึ้นก่อน
    });
    return NextResponse.json(history);
  } catch (error) {
    return NextResponse.json({ error: "ไม่สามารถดึงประวัติได้" }, { status: 500 });
  }
}