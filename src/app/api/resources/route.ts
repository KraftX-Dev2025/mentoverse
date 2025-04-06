// Resources API endpoint
import { db } from "../../../lib/db/client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const resources = await db.get("resources");
        return NextResponse.json(resources);
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch resources" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const resource = await db.add("resources", data);
        return NextResponse.json(resource, { status: 201 });
    } catch {
        return NextResponse.json(
            { error: "Failed to create resource" },
            { status: 500 }
        );
    }
}
