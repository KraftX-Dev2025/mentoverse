import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import ContactUsClient from "./ContactUsClient";

export const metadata: Metadata = {
    title: `Contact Us | ${SITE_NAME} - Shaping Your Tomorrow`,
    description:
        "Get in touch with the Mentoverse team for any queries or support.",
};

// Export the server component
export default function ContactUs() {
    return (
        <div>
            <ContactUsClient />
        </div>
    );
}
