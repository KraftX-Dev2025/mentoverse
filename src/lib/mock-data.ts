// src/lib/mock-data.ts
import { Mentor, Service, Booking, Resource, User } from "./types";

// Mock Mentors
export const MOCK_MENTORS: Mentor[] = [
    {
        id: "1",
        name: "Rajiv Mehta",
        title: "Senior Finance Manager",
        company: "Mahindra Group",
        expertise: ["Finance", "Career Guidance", "Corporate Strategy"],
        bio: "15+ years of experience in corporate finance with expertise in financial planning and analysis.",
        image: "/images/mentors/mentor1.jpg",
        hourlyRate: 1500,
        rating: 4.9,
    },
    {
        id: "2",
        name: "Priya Sharma",
        title: "Chartered Accountant",
        company: "KPMG",
        expertise: ["CA", "Accounting", "Startups"],
        bio: "Certified CA with experience in auditing and financial consulting for startups and established businesses.",
        image: "/images/mentors/mentor2.jpg",
        hourlyRate: 1200,
        rating: 4.8,
    },
    {
        id: "3",
        name: "Akash Gupta",
        title: "Marketing Director",
        company: "Aditya Birla Group",
        expertise: ["Marketing", "Career Guidance", "LinkedIn Optimization"],
        bio: "Passionate about digital marketing and helping professionals build their personal brand.",
        image: "/images/mentors/mentor3.jpg",
        hourlyRate: 1000,
        rating: 4.7,
    },
    {
        id: "4",
        name: "Sneha Patel",
        title: "Investment Banker",
        company: "Kotak Investment Banking",
        expertise: ["Finance", "Startups", "Corporate Strategy"],
        bio: "Worked on numerous M&A deals and helped startups raise capital.",
        image: "/images/mentors/mentor4.jpg",
        hourlyRate: 2000,
        rating: 4.9,
    },
    {
        id: "5",
        name: "Vikram Singh",
        title: "Senior Analyst",
        company: "JP Morgan",
        expertise: ["Finance", "Interview Preparation", "Resume Building"],
        bio: "Helping finance professionals navigate their career path and prepare for interviews.",
        image: "/images/mentors/mentor5.jpg",
        hourlyRate: 1800,
        rating: 4.6,
    },
    {
        id: "6",
        name: "Neha Reddy",
        title: "HR Manager",
        company: "TCS",
        expertise: [
            "Career Guidance",
            "Interview Preparation",
            "Resume Building",
        ],
        bio: "Passionate about helping candidates present their best selves to potential employers.",
        image: "/images/mentors/mentor6.jpg",
        hourlyRate: 950,
        rating: 4.8,
    },
    {
        id: "7",
        name: "Sanjay Kapoor",
        title: "Startup Advisor",
        company: "Independent Consultant",
        expertise: ["Startups", "Finance", "Corporate Strategy"],
        bio: "Helped over 50 startups with their financial strategy and fundraising efforts.",
        image: "/images/mentors/mentor7.jpg",
        hourlyRate: 1600,
        rating: 4.9,
    },
    {
        id: "8",
        name: "Ananya Desai",
        title: "LinkedIn Specialist",
        company: "LinkedIn Certified",
        expertise: [
            "LinkedIn Optimization",
            "Resume Building",
            "Career Guidance",
        ],
        bio: "Specializes in helping professionals optimize their LinkedIn profile for maximum visibility.",
        image: "/images/mentors/mentor8.jpg",
        hourlyRate: 900,
        rating: 4.7,
    },
];

// Mock Services
export const MOCK_SERVICES: Service[] = [
    {
        id: "mock-interview",
        name: "1 on 1 Personal Mock Interview",
        description:
            "Practice with industry experts and get real-time feedback to improve your interview skills.",
        price: 1500,
        icon: "🎯",
        benefits: [
            "Practice with experienced interviewers",
            "Get honest, constructive feedback",
            "Learn industry-specific techniques",
            "Identify improvement areas",
        ],
    },
    {
        id: "linkedin-review",
        name: "LinkedIn Profile Review",
        description:
            "Get your LinkedIn profile optimized by professionals to attract better opportunities.",
        price: 1200,
        icon: "👔",
        benefits: [
            "Stand out to recruiters",
            "Learn LinkedIn algorithm optimization",
            "Improve your profile's searchability",
            "Get a comprehensive report",
        ],
    },
    {
        id: "cv-resume-review",
        name: "CV Resume Review",
        description:
            "Professional review of your CV/resume to stand out among other candidates.",
        price: 1200,
        icon: "📄",
        benefits: [
            "Get professional assessment",
            "Highlight achievements and skills",
            "Make your resume ATS-friendly",
            "Increase interview callback rate",
        ],
    },
    {
        id: "group-discussion",
        name: "Group Discussion",
        description:
            "Learn the art of group discussions with like-minded peers and expert guidance.",
        price: 800,
        icon: "👥",
        benefits: [
            "Practice in a realistic environment",
            "Learn effective communication",
            "Develop leadership skills",
            "Network with peers",
        ],
    },
    {
        id: "career-guidance",
        name: "1 on 1 Career Guidance",
        description:
            "Personalized career planning and guidance from industry professionals.",
        price: 1800,
        icon: "🧭",
        benefits: [
            "Get clarity on career path",
            "Develop a personalized roadmap",
            "Learn about industry trends",
            "Identify skill gaps",
        ],
    },
    {
        id: "events-webinars",
        name: "Events & Webinars",
        description:
            "Stay updated with the latest industry trends through our events and webinars.",
        price: 500,
        icon: "🎤",
        benefits: [
            "Learn from industry leaders",
            "Stay updated with trends",
            "Network with professionals",
            "Access recordings",
        ],
    },
];

// Mock User
export const MOCK_USER: User = {
    id: "user123",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    image: "/images/users/profile.jpg",
    role: "user",
};

// Mock Bookings
export const MOCK_BOOKINGS: Booking[] = [
    {
        id: "booking1",
        userId: "user123",
        mentorId: "1",
        serviceId: "mock-interview",
        date: new Date(new Date().setDate(new Date().getDate() + 2)),
        status: "confirmed",
        amount: 1500,
    },
    {
        id: "booking2",
        userId: "user123",
        mentorId: "2",
        serviceId: "career-guidance",
        date: new Date(new Date().setDate(new Date().getDate() + 5)),
        status: "confirmed",
        amount: 1800,
    },
    {
        id: "booking3",
        userId: "user123",
        mentorId: "3",
        serviceId: "linkedin-review",
        date: new Date(new Date().setDate(new Date().getDate() - 10)),
        status: "completed",
        amount: 1200,
    },
    {
        id: "booking4",
        userId: "user123",
        mentorId: "4",
        serviceId: "cv-resume-review",
        date: new Date(new Date().setDate(new Date().getDate() - 15)),
        status: "completed",
        amount: 1200,
    },
];

// Mock Resources
export const MOCK_RESOURCES: Resource[] = [
    {
        id: "1",
        title: "How to Crack CA Final Exams",
        type: "video",
        url: "https://www.youtube.com/watch?v=example1",
        description:
            "Expert tips and strategies for CA Final preparation from top rankers.",
        category: "CA Preparation",
    },
    {
        id: "2",
        title: "Resume Template for Finance Professionals",
        type: "document",
        url: "/documents/finance-resume-template.pdf",
        description:
            "A professionally designed resume template tailored for finance industry roles.",
        category: "Resume Building",
    },
    {
        id: "3",
        title: "Mastering LinkedIn for Career Growth",
        type: "video",
        url: "https://www.youtube.com/watch?v=example2",
        description:
            "Learn how to optimize your LinkedIn profile to attract recruiters and opportunities.",
        category: "LinkedIn Optimization",
    },
    {
        id: "4",
        title: "Financial Compliance Guide for Startups",
        type: "document",
        url: "/documents/startup-finance-guide.pdf",
        description:
            "Essential financial compliance guidelines for early-stage startups in India.",
        category: "Startup Guidance",
    },
    {
        id: "5",
        title: "Mock Interview Session: Investment Banking",
        type: "video",
        url: "https://www.youtube.com/watch?v=example3",
        description:
            "Watch a real mock interview session for an investment banking role with expert feedback.",
        category: "Interview Tips",
    },
    {
        id: "6",
        title: "Career Paths in Finance: Comprehensive Guide",
        type: "document",
        url: "/documents/finance-career-paths.pdf",
        description:
            "Explore various career paths in the finance industry with required qualifications and growth prospects.",
        category: "Career Guidance",
    },
    {
        id: "7",
        title: "AI in Finance: Future Trends",
        type: "video",
        url: "https://www.youtube.com/watch?v=example4",
        description:
            "Industry experts discuss how AI is transforming the finance sector and future job prospects.",
        category: "Industry Insights",
    },
    {
        id: "8",
        title: "LinkedIn Profile Checklist",
        type: "document",
        url: "/documents/linkedin-checklist.pdf",
        description:
            "A comprehensive checklist to ensure your LinkedIn profile stands out to recruiters.",
        category: "LinkedIn Optimization",
    },
];

// All available expertise areas for filtering
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

// Resource categories for filtering
export const RESOURCE_CATEGORIES = [
    "Career Guidance",
    "CA Preparation",
    "Finance",
    "Interview Tips",
    "Resume Building",
    "LinkedIn Optimization",
    "Startup Guidance",
    "Industry Insights",
];

// Time slots for booking
export const TIME_SLOTS = [
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

// Helper function to get mentor by ID
export const getMentorById = (id: string): Mentor | undefined => {
    return MOCK_MENTORS.find((mentor) => mentor.id === id);
};

// Helper function to get service by ID
export const getServiceById = (id: string): Service | undefined => {
    return MOCK_SERVICES.find((service) => service.id === id);
};

// Helper function to get bookings for a user
export const getBookingsByUserId = (userId: string): Booking[] => {
    return MOCK_BOOKINGS.filter((booking) => booking.userId === userId);
};

// Helper function to get upcoming bookings for a user
export const getUpcomingBookingsByUserId = (userId: string): Booking[] => {
    const today = new Date();
    return MOCK_BOOKINGS.filter(
        (booking) => booking.userId === userId && booking.date > today
    );
};

// Helper function to get past bookings for a user
export const getPastBookingsByUserId = (userId: string): Booking[] => {
    const today = new Date();
    return MOCK_BOOKINGS.filter(
        (booking) => booking.userId === userId && booking.date <= today
    );
};
