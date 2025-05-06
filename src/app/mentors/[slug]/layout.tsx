import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
    title: `Mentor Profile | ${SITE_NAME} - Shaping Your Tomorrow`,
    description: "Connect with our expert mentors for personalized guidance and career advice.",
};

export default function MentorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            {children}
        </div>
    );
}