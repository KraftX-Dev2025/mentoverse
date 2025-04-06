// Services API endpoint
import { db } from "../../../lib/db/client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const services = await db.get("services");
        return NextResponse.json(services);
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch services" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const service = await db.add("services", data);
        return NextResponse.json(service, { status: 201 });
    } catch {
        return NextResponse.json(
            { error: "Failed to create service" },
            { status: 500 }
        );
    }
}
