import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import MentorsPageClient from "../../components/MentorsPageClient";
// Define metadata
export const metadata: Metadata = {
    title: `Our Mentors | ${SITE_NAME} - Shaping Your Tomorrow`,
    description:
        "Connect with our expert mentors from various industries for personalized guidance and career advice.",
};

export default function MentorsPage() {
    return (
        <div>
            <MentorsPageClient />
        </div>
    );
}
