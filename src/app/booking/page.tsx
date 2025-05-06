import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import BookingPageClient from "../../components/BookingPageClient";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: `Book a Session | ${SITE_NAME} - Shaping Your Tomorrow`,
    description:
        "Book a mentoring session with our industry experts to advance your career.",
};

// Export the server component
export default function BookingPage() {
    return (
        <div>
            <Suspense
                fallback={
                    <div className="p-8 text-center">
                        Loading booking information...
                    </div>
                }
            >
                <BookingPageClient />
            </Suspense>
        </div>
    );
}
