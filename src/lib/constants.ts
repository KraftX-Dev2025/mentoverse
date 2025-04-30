// Site constants
export const SITE_NAME = "Mentoverse";
export const SITE_DESCRIPTION = "Revolutionizing the awareness of people towards their next step in education, career and beyond.";
export const CONTACT_EMAIL = "contact@mentoverse.com";

export const SERVICES = [
    {
        id: "mock-interview",
        name: "1 on 1 Personal Mock Interview",
        icon: "🎯",
    },
    { id: "linkedin-review", name: "LinkedIn Profile Review", icon: "👔" },
    { id: "cv-resume-review", name: "CV Resume Review", icon: "📄" },
    { id: "group-discussion", name: "Group Discussion", icon: "👥" },
    { id: "career-guidance", name: "1 on 1 Career Guidance", icon: "🧭" },
    { id: "events-webinars", name: "Events & Webinars", icon: "🎤" },
];

export const BRAND_COLORS = {
    primary: "#8A4FFF", // Purple
    secondary: "#FD9850", // Orange
    accent: "#B864F1", // Light Purple
    background: "#F4F3EF", // Off White
    darkBackground: "#020058", // Navy Blue
    textPrimary: "#0A1A3B", // Dark Blue
    textSecondary: "#4A4A4A", // Dark Gray
};

// Mock user data
export const mockUser = {
    id: "user123",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 9876543210",
    image: "/images/users/profile.jpg",
    role: "user" as const,
    joinedOn: new Date("2023-10-15"),
};
