// Bookings API endpoint
import { db } from "../../../lib/db/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const bookings = await db.get("bookings");
        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch bookings" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const booking = await db.add("bookings", data);
        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create booking" },
            { status: 500 }
        );
    }
}
