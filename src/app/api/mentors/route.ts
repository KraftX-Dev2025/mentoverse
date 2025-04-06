// Mentors API endpoint
import { db } from "../../../lib/db/client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const mentors = await db.get("mentors");
        return NextResponse.json(mentors);
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch mentors" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const mentor = await db.add("mentors", data);
        return NextResponse.json(mentor, { status: 201 });
    } catch {
        return NextResponse.json(
            { error: "Failed to create mentor" },
            { status: 500 }
        );
    }
}
