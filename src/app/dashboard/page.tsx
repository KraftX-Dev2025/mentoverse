import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import DashboardPageClient from "./DashboardPageClient";

export const metadata: Metadata = {
    title: `Dashboard | ${SITE_NAME} - Shaping Your Tomorrow`,
    description:
        "Your personal dashboard to manage sessions, view transactions, and track your progress.",
};

// Export the server component
export default function DashboardPage() {
    return (
        <div>
            <DashboardPageClient />
        </div>
    );
}
