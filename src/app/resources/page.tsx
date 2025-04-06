import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import ResourcesPageClient from "./ResourcesPageClient";

export const metadata: Metadata = {
    title: `Resources | ${SITE_NAME} - Shaping Your Tomorrow`,
    description:
        "Access our collection of videos, PDFs, and other resources to help you in your career journey.",
};

// Export the server component
export default function ResourcesPage() {
    return (
        <div>
            <ResourcesPageClient />
        </div>
    );
}
