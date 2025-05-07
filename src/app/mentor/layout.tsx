import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
    title: `Mentor Portal | ${SITE_NAME}`,
    description: "Access your mentor dashboard, manage courses, and track your mentees.",
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