import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "You are not logged in" },
      { status: 401 }
    );
  }

  const notes = await prisma.note.findMany({
    where: { userId: session.user.id },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return NextResponse.json(notes);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "You are not logged in" },
      { status: 401 }
    );
  }

  const { title, description } = await request.json();
  const note = await prisma.note.create({
    data: {
      title,
      description,
      userId: session.user.id,
    },
  });

  return NextResponse.json(note);
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "You are not logged in" },
      { status: 401 }
    );
  }

  const { id, title, description } = await request.json();
  const note = await prisma.note.updateMany({
    where: { id, userId: session.user.id },
    data: { title, description },
  });

  return NextResponse.json(note);
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "You are not logged in" },
      { status: 401 }
    );
  }

  const { id } = await request.json();
  const note = await prisma.note.deleteMany({
    where: { id, userId: session.user.id },
  });

  return NextResponse.json(note);
}
