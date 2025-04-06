// Mentors API endpoint
import { db } from "../../../lib/db/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const mentors = await db.get("mentors");
        return NextResponse.json(mentors);
    } catch (error) {
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
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create mentor" },
            { status: 500 }
        );
    }
}
