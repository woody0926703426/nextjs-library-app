// app/api/books/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db'; // เรียกใช้สะพานเชื่อมที่เราสร้างตะกี้

// ฟังก์ชันสำหรับดึงรายชื่อหนังสือทั้งหมด (ใช้โชว์หน้าแรก)
export async function GET() {
  try {
    const books = await prisma.book.findMany();
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ error: "ดึงข้อมูลหนังสือล้มเหลว" }, { status: 500 });
  }
}

// ฟังก์ชันสำหรับเพิ่มหนังสือใหม่ (ใช้ในส่วนของ Admin)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newBook = await prisma.book.create({
      data: {
        title: body.title,
        isAvailable: 1 // 1 คือว่างพร้อมยืม
      }
    });
    return NextResponse.json(newBook);
  } catch (error) {
    return NextResponse.json({ error: "เพิ่มหนังสือไม่สำเร็จ" }, { status: 500 });
  }
}