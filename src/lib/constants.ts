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

export const AVATAR_COLORS = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
];

// Add this to your existing constants.ts file

export const ABOUT_US_PAGE_CONTENT = {
    hero: {
        title: "About Us",
        subtitle: "Learn about Mentoverse's mission, vision, and the team behind our mentorship platform."
    },
    story: {
        title: "Our Story",
        paragraphs: [
            "Mentoverse was born out of a simple observation: there's a significant gap between academic education and real-world industry requirements. This gap often leaves students and early-career professionals struggling to navigate their career paths effectively.",
            "Founded by Abhijeet, Aniruddh, and Ansh, Mentoverse started with a focus on providing mentorship in finance and CA domains, areas where personalized guidance can make a substantial difference.",
            "Today, we've expanded our vision to include various industries while maintaining our core expertise in finance, CA, and startup advisory. Our goal is to be with you throughout your educational and professional journey, providing the guidance you need when you need it most."
        ]
    },
    mission: {
        title: "Our Mission",
        paragraphs: [
            "To democratize access to quality mentorship and career guidance, enabling students and professionals to make informed decisions about their careers and achieve their full potential.",
            "We strive to bridge the gap between education and industry by connecting mentees with experienced professionals who can provide real-world insights and guidance."
        ]
    },
    vision: {
        title: "Our Vision",
        paragraphs: [
            "To create a world where every individual has access to the mentorship they need to navigate their career journey successfully. We envision Mentoverse as the go-to platform for career guidance across various industries.",
            "Our focus on niche areas like CA, finance, and startup advisory sets us apart, providing specialized guidance where it's most needed."
        ],
        subtitle: "With you, throughout your educational and professional life"
    },
    values: {
        title: "Our Values",
        subtitle: "The principles that guide our approach to mentorship and career guidance"
    },
    bridgingGap: {
        title: "Bridging the Gap Between Education and Industry",
        paragraphs: [
            "At Mentoverse, we believe that every student and professional deserves access to quality mentorship. Our platform connects you with industry experts who have walked the path you aspire to take.",
            "Whether you're a CA student, a finance professional, or a startup founder, we have mentors who can provide you with personalized guidance tailored to your specific needs."
        ]
    },
    team: {
        title: "Meet Our Team",
        subtitle: "The passionate individuals behind Mentoverse"
    },

    cta: {
        title: "Join Our Journey",
        content: "Whether you're looking for guidance or want to become a mentor, we'd love to have you be a part of Mentoverse."
    }
};

export const PARTNER_BRANDS = [
    "aditya_logo.png",
    "bain_logo.png",
    "bcg_logo.png",
    "deloitte_logo.png",
    "ey_logo.png",
    "genpact_logo.png",
    "itc_logo.png",
    "jp_logo.png",
    "kotak_logo.png",
    "kpmg_logo.png",
    "mahindra_logo.png",
    "pwc_logo.png"
];

export const EXPERTISE_AREAS = [
    "Finance",
    "Accounting",
    "CA",
    "Marketing",
    "Startups",
    "Career Guidance",
    "Interview Preparation",
    "Resume Building",
    "LinkedIn Optimization",
    "Corporate Strategy",
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

// Legal links
export const LEGAL_LINKS = [
    { href: "/terms", label: "Terms of Use" },
    { href: "/privacy", label: "Privacy Policy" },
];

// Social media links
export const SOCIAL_LINKS = [
    {
        name: "Facebook",
        href: "https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2Fmentoverse",
        iconName: "Facebook",
    },
    {
        name: "Twitter",
        href: "https://twitter.com/mentoverse?s=11",
        iconName: "Twitter",
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/mentoverse/",
        iconName: "Linkedin",
    },
    {
        name: "YouTube",
        href: "https://www.youtube.com/c/ThreeofAKindCA",
        iconName: "Youtube",
    },
    {
        name: "Instagram",
        href: "https://instagram.com/mentoverse_?utm_medium=copy_link",
        iconName: "Instagram",
    },
];

// Contact information
export const CONTACT_INFO = [
    {
        id: "email",
        value: "contact@mentoverse.com",
        href: "mailto:contact@mentoverse.com",
        iconName: "Mail",
    },
    {
        id: "phone-1",
        value: "+91 8080899428",
        href: null,
        iconName: "Phone",
    },
    {
        id: "phone-2",
        value: "+91 9940018446",
        href: null,
        iconName: "Phone",
    },
];

export const NAV_LINKS = [
    // { href: "/", label: "Home", icon: "Home" },
    { href: "/about-us", label: "About", icon: "Info" },
    { href: "/mentors", label: "Mentors", icon: "Users" },
    { href: "/services", label: "Services", hasDropdown: true, icon: "Briefcase" },
    { href: "/resources", label: "Resources", icon: "BookOpen" },
    { href: "/contact-us", label: "Contact", icon: "MessageSquare" },
];

export const stats = [
    { number: "5+", label: "Events" },
    { number: "20+", label: "Mentors" },
    { number: "3,000+", label: "Community" },
    { number: "50,000+", label: "Reach" },
];

export const testimonials = [
    {
        name: "Rahul Singh",
        role: "CA Student",
        image: "/placeholder.webp",
        text: "The one-on-one sessions with my mentor helped me clear my CA finals. The guidance was practical and exactly what I needed.",
        rating: 5,
    },
    {
        name: "Priya Sharma",
        role: "Finance Professional",
        image: "/placeholder.webp",
        text: "My LinkedIn profile review session was eye-opening. I'm getting 3x more profile views and better connection requests now.",
        rating: 5,
    },
    {
        name: "Amit Patel",
        role: "Startup Founder",
        image: "/placeholder.webp",
        text: "The financial compliance guidance I received helped me navigate the complex regulatory landscape for my startup.",
        rating: 5,
    },
    {
        name: "Neha Desai",
        role: "Marketing Manager",
        image: "/placeholder.webp",
        text: "I was struggling with interview preparation until I connected with a mentor through Mentoverse. Their guidance was invaluable.",
        rating: 5,
    },
];


// About page values
export const VALUES = [
    {
        iconName: "Zap",
        title: "Trust & Integrity",
        description: "We build relationships based on trust and maintain the highest standards of integrity in all our interactions.",
    },
    {
        iconName: "Users",
        title: "Community",
        description: "We foster a supportive community where mentors and mentees can connect, learn, and grow together.",
    },
    {
        iconName: "Lightbulb",
        title: "Innovation",
        description: "We continuously seek innovative ways to improve our platform and provide better mentorship experiences.",
    },
    {
        iconName: "SlidersHorizontal",
        title: "Personalization",
        description: "We believe in tailored guidance that addresses the unique needs and goals of each individual.",
    },
];

// About page metadata
export const ABOUT_METADATA = {
    title: `About Us | ${SITE_NAME} - Shaping Your Tomorrow`,
    description: "Learn about Mentoverse's mission, vision, and the team behind our mentorship platform.",
};

// Team members data
export const TEAM_MEMBERS = [
    {
        name: "Abhijeet Mutha",
        role: "Co-Founder",
        imageSrc: "/abhijeet_mutha.webp",
        bio: "Investment Banker | Co - Founder | CA (AIR 21, AIR 14) | Ex- J.P. Morgan | KPMG | National Athlete | All views are personal",
        socialLinks: [
            {
                name: "LinkedIn",
                href: "https://www.linkedin.com/in/abhijeet-mutha",
                iconName: "Linkedin",
            },
            {
                name: "Calendly",
                href: "https://calendly.com/anirudhramesh/30min",
                iconName: "CalendarClock",
            },
            {
                name: "Razorpay",
                href: "https://pages.razorpay.com/pl_IvDppElicuMMnF/view",
                iconName: "CreditCard",
            },
        ],
    },
    {
        name: "Anirudh Ramesh",
        role: "Co-Founder",
        imageSrc: "/aniruddh.webp",
        bio: "Bain & Company | Jobtech Alliance | Co-founder: Mentoverse, Mudiyum Foundation",
        socialLinks: [
            {
                name: "LinkedIn",
                href: "https://www.linkedin.com/in/anirudhramesh17/",
                iconName: "Linkedin",
            },
            {
                name: "Calendly",
                href: "https://calendly.com/anirudhramesh/30min",
                iconName: "CalendarClock",
            },
            {
                name: "Razorpay",
                href: "https://pages.razorpay.com/pl_IvDppElicuMMnF/view",
                iconName: "CreditCard",
            },
        ],
    },
    {
        name: "Aayush Agarwal",
        role: "Co-Founder",
        imageSrc: "/aayush.webp",
        bio: "Senior Associate (Investments) at Temasek | CA (AIR 8, 2) | CFA (All levels) | B.Com Gold Medalist - St. Xavier's College",
        socialLinks: [
            {
                name: "LinkedIn",
                href: "https://www.linkedin.com/in/aayush-agarwal-ca/",
                iconName: "Linkedin",
            },
            {
                name: "Calendly",
                href: "https://calendly.com/anirudhramesh/30min",
                iconName: "CalendarClock",
            },
        ],
    },
];

export const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
];