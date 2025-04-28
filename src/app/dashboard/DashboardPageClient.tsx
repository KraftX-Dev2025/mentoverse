"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Booking, Mentor } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

// Mock user data
const mockUser = {
    id: "user123",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 9876543210",
    image: "/images/users/profile.jpg",
    role: "user" as const,
    joinedOn: new Date("2023-10-15"),
};

// Define types for various state objects
interface Transaction {
    id: string;
    date: Date;
    description: string;
    amount: number;
    status: string;
}

interface MentorEarning {
    id: string;
    date: Date;
    description: string;
    amount: number;
    status: string;
}

interface MentorStats {
    totalSessions: number;
    completedSessions: number;
    upcomingSessions: number;
    averageRating: number;
    totalEarnings: number;
    pendingPayments: number;
}

export default function DashboardPageClient() {
    const [activeTab, setActiveTab] = useState("upcoming");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // User role (for this example, we'll assume the user can also be a mentor)
    // In a real app, this would come from authentication
    const [userRole] = useState<"user" | "mentor" | "both">("both");

    // Data states
    const [upcomingSessions, setUpcomingSessions] = useState<Booking[]>([]);
    const [pastSessions, setPastSessions] = useState<Booking[]>([]);
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [mentorStats, setMentorStats] = useState<MentorStats | null>(null);

    // Mentor tab states (for users who are also mentors)
    const [activeMentorTab, setActiveMentorTab] = useState("upcoming");
    const [mentorUpcomingSessions] = useState<Booking[]>([]);
    const [mentorPastSessions] = useState<Booking[]>([]);
    const [mentorEarnings, setMentorEarnings] = useState<MentorEarning[]>([]);

    // Fetch dashboard data
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // In a real app, you would fetch this data from your API
                // const response = await fetch('/api/dashboard');
                // const data = await response.json();

                // Using mock data for demonstration
                const mockUpcomingSessions: Booking[] = [
                    {
                        id: "booking1",
                        userId: "user123",
                        mentorId: "mentor1",
                        serviceId: "mock-interview",
                        date: new Date(
                            new Date().setDate(new Date().getDate() + 2)
                        ),
                        status: "confirmed",
                        amount: 1500,
                    },
                    {
                        id: "booking2",
                        userId: "user123",
                        mentorId: "mentor2",
                        serviceId: "career-guidance",
                        date: new Date(
                            new Date().setDate(new Date().getDate() + 5)
                        ),
                        status: "confirmed",
                        amount: 1800,
                    },
                ];

                const mockPastSessions: Booking[] = [
                    {
                        id: "booking3",
                        userId: "user123",
                        mentorId: "mentor3",
                        serviceId: "linkedin-review",
                        date: new Date(
                            new Date().setDate(new Date().getDate() - 10)
                        ),
                        status: "completed",
                        amount: 1200,
                    },
                    {
                        id: "booking4",
                        userId: "user123",
                        mentorId: "mentor4",
                        serviceId: "cv-resume-review",
                        date: new Date(
                            new Date().setDate(new Date().getDate() - 15)
                        ),
                        status: "completed",
                        amount: 1200,
                    },
                ];

                const mockMentors: Mentor[] = [
                    {
                        id: "mentor1",
                        name: "Rajiv Mehta",
                        title: "Senior Finance Manager",
                        company: "Mahindra Group",
                        expertise: [
                            "Finance",
                            "Career Guidance",
                            "Corporate Strategy",
                        ],
                        bio: "15+ years of experience in corporate finance with expertise in financial planning and analysis.",
                        image: "/images/mentors/mentor1.jpg",
                        hourlyRate: 1500,
                        rating: 4.9,
                    },
                    {
                        id: "mentor2",
                        name: "Priya Sharma",
                        title: "Chartered Accountant",
                        company: "KPMG",
                        expertise: ["CA", "Accounting", "Startups"],
                        bio: "Certified CA with experience in auditing and financial consulting for startups and established businesses.",
                        image: "/images/mentors/mentor2.jpg",
                        hourlyRate: 1200,
                        rating: 4.8,
                    },
                ];

                const mockTransactions: Transaction[] = [
                    {
                        id: "trans1",
                        date: new Date(
                            new Date().setDate(new Date().getDate() - 2)
                        ),
                        description: "Mock Interview with Rajiv Mehta",
                        amount: -1500,
                        status: "completed",
                    },
                    {
                        id: "trans2",
                        date: new Date(
                            new Date().setDate(new Date().getDate() - 10)
                        ),
                        description: "LinkedIn Review with Akash Gupta",
                        amount: -1200,
                        status: "completed",
                    },
                ];

                const mockMentorEarnings: MentorEarning[] = [
                    {
                        id: "earning1",
                        date: new Date(
                            new Date().setDate(new Date().getDate() - 5)
                        ),
                        description: "Resume Review for Vikram Singh",
                        amount: 1080, // After platform fee
                        status: "paid",
                    },
                    {
                        id: "earning2",
                        date: new Date(
                            new Date().setDate(new Date().getDate() - 12)
                        ),
                        description: "Career Guidance for Sanya Kapoor",
                        amount: 1080, // After platform fee
                        status: "paid",
                    },
                    {
                        id: "earning3",
                        date: new Date(
                            new Date().setDate(new Date().getDate() + 7)
                        ), // Future payment date
                        description: "Mock Interview for Neha Desai",
                        amount: 1080, // After platform fee
                        status: "pending",
                    },
                ];

                const mockMentorStats: MentorStats = {
                    totalSessions: 26,
                    completedSessions: 24,
                    upcomingSessions: 2,
                    averageRating: 4.8,
                    totalEarnings: 28800,
                    pendingPayments: 3600,
                };

                // Set the fetched data
                setUpcomingSessions(mockUpcomingSessions);
                setPastSessions(mockPastSessions);
                setMentors(mockMentors);
                setTransactions(mockTransactions);

                // Set mentor data if user is also a mentor
                if (userRole === "mentor" || userRole === "both") {
                    setMentorEarnings(mockMentorEarnings);
                    setMentorStats(mockMentorStats);
                }

                setLoading(false);
            } catch (error) {
                setError(
                    "Failed to load dashboard data. Please try again later."
                );
                setLoading(false);
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, [userRole]);

    // Function to get mentor name by ID
    const getMentorName = (mentorId: string): string => {
        const mentor = mentors.find((m) => m.id === mentorId);
        return mentor ? mentor.name : "Unknown Mentor";
    };

    // Function to get service name by ID
    const getServiceName = (serviceId: string): string => {
        const services: { [key: string]: string } = {
            "mock-interview": "Mock Interview",
            "linkedin-review": "LinkedIn Profile Review",
            "cv-resume-review": "CV/Resume Review",
            "group-discussion": "Group Discussion",
            "career-guidance": "Career Guidance",
            "events-webinars": "Events & Webinars",
        };

        return services[serviceId] || "Unknown Service";
    };

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-primary text-white py-12">
                <div className="container">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                Dashboard
                            </h1>
                            <p className="opacity-90">
                                Welcome back, {mockUser.name}
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <Link href="/booking" className="btn-secondary p-3 rounded-2xl shadow-lg shadow-white">
                                Book a New Session
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Dashboard Section */}
            <section className="py-12 bg-background">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                                {/* User Profile */}
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center">
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                                            <Image
                                                src={mockUser.image}
                                                alt={mockUser.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">
                                                {mockUser.name}
                                            </h3>
                                            <p className="text-text-secondary text-sm">
                                                {mockUser.email}
                                            </p>
                                            <div className="mt-2">
                                                <span className="text-xs bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-full">
                                                    {userRole === "both"
                                                        ? "User & Mentor"
                                                        : userRole === "mentor"
                                                            ? "Mentor"
                                                            : "User"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="mt-4 w-full text-sm text-primary border border-primary rounded-md py-1 hover:bg-primary hover:bg-opacity-5 transition-colors">
                                        Edit Profile
                                    </button>
                                </div>

                                {/* Navigation */}
                                <nav>
                                    <ul>
                                        <li>
                                            <button
                                                className={`flex items-center w-full px-6 py-3 hover:bg-primary hover:bg-opacity-5 transition-colors ${activeTab === "upcoming" ||
                                                    activeTab === "past"
                                                    ? "text-primary font-medium"
                                                    : "text-text-secondary"
                                                    }`}
                                                onClick={() =>
                                                    setActiveTab("upcoming")
                                                }
                                            >
                                                <svg
                                                    className="w-5 h-5 mr-3"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                Sessions
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className={`flex items-center w-full px-6 py-3 hover:bg-primary hover:bg-opacity-5 transition-colors ${activeTab === "mentors"
                                                    ? "text-primary font-medium"
                                                    : "text-text-secondary"
                                                    }`}
                                                onClick={() =>
                                                    setActiveTab("mentors")
                                                }
                                            >
                                                <svg
                                                    className="w-5 h-5 mr-3"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                    />
                                                </svg>
                                                My Mentors
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className={`flex items-center w-full px-6 py-3 hover:bg-primary hover:bg-opacity-5 transition-colors ${activeTab === "transactions"
                                                    ? "text-primary font-medium"
                                                    : "text-text-secondary"
                                                    }`}
                                                onClick={() =>
                                                    setActiveTab("transactions")
                                                }
                                            >
                                                <svg
                                                    className="w-5 h-5 mr-3"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                                    />
                                                </svg>
                                                Transactions
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className={`flex items-center w-full px-6 py-3 hover:bg-primary hover:bg-opacity-5 transition-colors ${activeTab === "resources"
                                                    ? "text-primary font-medium"
                                                    : "text-text-secondary"
                                                    }`}
                                                onClick={() =>
                                                    setActiveTab("resources")
                                                }
                                            >
                                                <svg
                                                    className="w-5 h-5 mr-3"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                    />
                                                </svg>
                                                Resources
                                            </button>
                                        </li>
                                        {(userRole === "mentor" ||
                                            userRole === "both") && (
                                                <li>
                                                    <button
                                                        className={`flex items-center w-full px-6 py-3 hover:bg-primary hover:bg-opacity-5 transition-colors ${activeTab ===
                                                            "mentor-dashboard"
                                                            ? "text-primary font-medium"
                                                            : "text-text-secondary"
                                                            }`}
                                                        onClick={() =>
                                                            setActiveTab(
                                                                "mentor-dashboard"
                                                            )
                                                        }
                                                    >
                                                        <svg
                                                            className="w-5 h-5 mr-3"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                                            />
                                                        </svg>
                                                        Mentor Dashboard
                                                    </button>
                                                </li>
                                            )}
                                    </ul>
                                </nav>
                            </div>

                            {/* Help & Support */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="font-semibold mb-4">
                                    Need Help?
                                </h3>
                                <p className="text-sm text-text-secondary mb-4">
                                    If you have any questions or need
                                    assistance, our support team is here to
                                    help.
                                </p>
                                <Link
                                    href="/contact-us"
                                    className="text-primary text-sm font-medium flex items-center"
                                >
                                    <svg
                                        className="w-4 h-4 mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    Contact Support
                                </Link>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            {/* User Sessions */}
                            {(activeTab === "upcoming" ||
                                activeTab === "past") && (
                                    <div className="bg-white rounded-lg shadow-sm p-6">
                                        {/* Tabs */}
                                        <div className="flex border-b border-gray-200 mb-6">
                                            <button
                                                className={`pb-3 mr-6 font-medium ${activeTab === "upcoming"
                                                    ? "text-primary border-b-2 border-primary"
                                                    : "text-text-secondary"
                                                    }`}
                                                onClick={() =>
                                                    setActiveTab("upcoming")
                                                }
                                            >
                                                Upcoming Sessions
                                            </button>
                                            <button
                                                className={`pb-3 font-medium ${activeTab === "past"
                                                    ? "text-primary border-b-2 border-primary"
                                                    : "text-text-secondary"
                                                    }`}
                                                onClick={() => setActiveTab("past")}
                                            >
                                                Past Sessions
                                            </button>
                                        </div>

                                        {/* Session Content */}
                                        {loading ? (
                                            <div className="text-center py-12">
                                                <svg
                                                    className="animate-spin h-8 w-8 text-primary mx-auto"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                <p className="mt-4 text-text-secondary">
                                                    Loading sessions...
                                                </p>
                                            </div>
                                        ) : error ? (
                                            <div className="text-center py-12">
                                                <svg
                                                    className="h-12 w-12 text-red-500 mx-auto"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                <p className="mt-4 text-text-secondary">
                                                    {error}
                                                </p>
                                            </div>
                                        ) : activeTab === "upcoming" ? (
                                            upcomingSessions.length === 0 ? (
                                                <div className="text-center py-12">
                                                    <svg
                                                        className="h-12 w-12 text-gray-400 mx-auto"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    <p className="mt-4 text-text-secondary">
                                                        You don&apos;t have any
                                                        upcoming sessions.
                                                    </p>
                                                    <Link
                                                        href="/booking"
                                                        className="mt-4 btn-primary inline-block p-4 rounded-2xl shadow-lg shadow-white"
                                                    >
                                                        Book a Session
                                                    </Link>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    {upcomingSessions.map(
                                                        (session) => (
                                                            <div
                                                                key={session.id}
                                                                className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors"
                                                            >
                                                                <div className="flex flex-col md:flex-row md:items-center justify-between">
                                                                    <div className="mb-3 md:mb-0">
                                                                        <h3 className="font-semibold">
                                                                            {getServiceName(
                                                                                session.serviceId
                                                                            )}{" "}
                                                                            with{" "}
                                                                            {getMentorName(
                                                                                session.mentorId
                                                                            )}
                                                                        </h3>
                                                                        <p className="text-text-secondary">
                                                                            {session.date.toLocaleDateString(
                                                                                "en-US",
                                                                                {
                                                                                    weekday:
                                                                                        "short",
                                                                                    day: "numeric",
                                                                                    month: "short",
                                                                                    year: "numeric",
                                                                                }
                                                                            )}{" "}
                                                                            at{" "}
                                                                            {session.date.toLocaleTimeString(
                                                                                "en-US",
                                                                                {
                                                                                    hour: "numeric",
                                                                                    minute: "numeric",
                                                                                    hour12: true,
                                                                                }
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        <button className="text-primary border border-primary rounded-md px-3 py-1 text-sm hover:bg-primary hover:bg-opacity-5 transition-colors">
                                                                            Reschedule
                                                                        </button>
                                                                        <button className="text-red-500 border border-red-500 rounded-md px-3 py-1 text-sm hover:bg-red-500 hover:bg-opacity-5 transition-colors">
                                                                            Cancel
                                                                        </button>
                                                                        <Link
                                                                            href="#"
                                                                            className="bg-primary text-white rounded-md px-3 py-1 text-sm hover:bg-opacity-90 transition-colors"
                                                                        >
                                                                            Join
                                                                            Session
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )
                                        ) : // Past Sessions
                                            pastSessions.length === 0 ? (
                                                <div className="text-center py-12">
                                                    <svg
                                                        className="h-12 w-12 text-gray-400 mx-auto"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                    <p className="mt-4 text-text-secondary">
                                                        You haven&apos;t attended any
                                                        sessions yet.
                                                    </p>
                                                    <Link
                                                        href="/booking"
                                                        className="mt-4 btn-primary inline-block"
                                                    >
                                                        Book Your First Session
                                                    </Link>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    {pastSessions.map((session) => (
                                                        <div
                                                            key={session.id}
                                                            className="border border-gray-200 rounded-lg p-4"
                                                        >
                                                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                                                <div className="mb-3 md:mb-0">
                                                                    <h3 className="font-semibold">
                                                                        {getServiceName(
                                                                            session.serviceId
                                                                        )}{" "}
                                                                        with{" "}
                                                                        {getMentorName(
                                                                            session.mentorId
                                                                        )}
                                                                    </h3>
                                                                    <p className="text-text-secondary">
                                                                        {session.date.toLocaleDateString(
                                                                            "en-US",
                                                                            {
                                                                                weekday:
                                                                                    "short",
                                                                                day: "numeric",
                                                                                month: "short",
                                                                                year: "numeric",
                                                                            }
                                                                        )}{" "}
                                                                        at{" "}
                                                                        {session.date.toLocaleTimeString(
                                                                            "en-US",
                                                                            {
                                                                                hour: "numeric",
                                                                                minute: "numeric",
                                                                                hour12: true,
                                                                            }
                                                                        )}
                                                                    </p>
                                                                </div>
                                                                <div className="flex flex-wrap gap-2">
                                                                    <button className="text-primary border border-primary rounded-md px-3 py-1 text-sm hover:bg-primary hover:bg-opacity-5 transition-colors">
                                                                        Leave Feedback
                                                                    </button>
                                                                    <button className="bg-primary text-white rounded-md px-3 py-1 text-sm hover:bg-opacity-90 transition-colors">
                                                                        Book Again
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                    </div>
                                )}

                            {/* My Mentors */}
                            {activeTab === "mentors" && (
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h2 className="text-2xl font-bold mb-6">
                                        My Mentors
                                    </h2>

                                    {loading ? (
                                        <div className="text-center py-12">
                                            <svg
                                                className="animate-spin h-8 w-8 text-primary mx-auto"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            <p className="mt-4 text-text-secondary">
                                                Loading mentors...
                                            </p>
                                        </div>
                                    ) : error ? (
                                        <div className="text-center py-12">
                                            <svg
                                                className="h-12 w-12 text-red-500 mx-auto"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            <p className="mt-4 text-text-secondary">
                                                {error}
                                            </p>
                                        </div>
                                    ) : mentors.length === 0 ? (
                                        <div className="text-center py-12">
                                            <svg
                                                className="h-12 w-12 text-gray-400 mx-auto"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                />
                                            </svg>
                                            <p className="mt-4 text-text-secondary">
                                                You haven&apos;t booked any
                                                mentors yet.
                                            </p>
                                            <Link
                                                href="/mentors"
                                                className="mt-4 btn-primary inline-block"
                                            >
                                                Find a Mentor
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {mentors.map((mentor) => (
                                                <div
                                                    key={mentor.id}
                                                    className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors"
                                                >
                                                    <div className="flex items-start">
                                                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4 shrink-0">
                                                            <Image
                                                                src={
                                                                    mentor.image
                                                                }
                                                                alt={
                                                                    mentor.name
                                                                }
                                                                width={64}
                                                                height={64}
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold">
                                                                {mentor.name}
                                                            </h3>
                                                            <p className="text-primary text-sm">
                                                                {mentor.title}
                                                            </p>
                                                            <p className="text-text-secondary text-sm">
                                                                {mentor.company}
                                                            </p>
                                                            <div className="flex items-center mt-1 mb-3">
                                                                <span className="text-secondary font-semibold mr-1">
                                                                    {
                                                                        mentor.rating
                                                                    }
                                                                </span>
                                                                <span className="text-secondary">
                                                                    ★
                                                                </span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2">
                                                                <Link
                                                                    href={`/booking?mentor=${mentor.id}`}
                                                                    className="bg-primary text-white rounded-md px-3 py-1 text-sm hover:bg-opacity-90 transition-colors"
                                                                >
                                                                    Book Again
                                                                </Link>
                                                                <button className="text-primary border border-primary rounded-md px-3 py-1 text-sm hover:bg-primary hover:bg-opacity-5 transition-colors">
                                                                    View Profile
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Transactions */}
                            {activeTab === "transactions" && (
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h2 className="text-2xl font-bold mb-6">
                                        My Transactions
                                    </h2>

                                    {loading ? (
                                        <div className="text-center py-12">
                                            <svg
                                                className="animate-spin h-8 w-8 text-primary mx-auto"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            <p className="mt-4 text-text-secondary">
                                                Loading transactions...
                                            </p>
                                        </div>
                                    ) : error ? (
                                        <div className="text-center py-12">
                                            <svg
                                                className="h-12 w-12 text-red-500 mx-auto"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            <p className="mt-4 text-text-secondary">
                                                {error}
                                            </p>
                                        </div>
                                    ) : transactions.length === 0 ? (
                                        <div className="text-center py-12">
                                            <svg
                                                className="h-12 w-12 text-gray-400 mx-auto"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                                />
                                            </svg>
                                            <p className="mt-4 text-text-secondary">
                                                You don&apos;t have any
                                                transactions yet.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="bg-gray-50">
                                                        <th className="px-4 py-2 text-left">
                                                            Date
                                                        </th>
                                                        <th className="px-4 py-2 text-left">
                                                            Description
                                                        </th>
                                                        <th className="px-4 py-2 text-right">
                                                            Amount
                                                        </th>
                                                        <th className="px-4 py-2 text-center">
                                                            Status
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {transactions.map(
                                                        (transaction) => (
                                                            <tr
                                                                key={
                                                                    transaction.id
                                                                }
                                                                className="border-t border-gray-100"
                                                            >
                                                                <td className="px-4 py-3 text-text-secondary">
                                                                    {transaction.date.toLocaleDateString(
                                                                        "en-US",
                                                                        {
                                                                            day: "numeric",
                                                                            month: "short",
                                                                            year: "numeric",
                                                                        }
                                                                    )}
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    {
                                                                        transaction.description
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-3 text-right font-medium">
                                                                    {formatCurrency(
                                                                        transaction.amount
                                                                    )}
                                                                </td>
                                                                <td className="px-4 py-3 text-center">
                                                                    <span
                                                                        className={`inline-block px-2 py-1 text-xs rounded-full ${transaction.status ===
                                                                            "completed"
                                                                            ? "bg-green-100 text-green-800"
                                                                            : transaction.status ===
                                                                                "pending"
                                                                                ? "bg-yellow-100 text-yellow-800"
                                                                                : "bg-gray-100 text-gray-800"
                                                                            }`}
                                                                    >
                                                                        {
                                                                            transaction.status
                                                                        }
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Resources */}
                            {activeTab === "resources" && (
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h2 className="text-2xl font-bold mb-6">
                                        Recommended Resources
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Resource Cards */}
                                        {[
                                            {
                                                id: "1",
                                                title: "How to Crack CA Final Exams",
                                                type: "video",
                                                category: "CA Preparation",
                                                imageUrl:
                                                    "/images/resources/video-1.jpg",
                                            },
                                            {
                                                id: "2",
                                                title: "Resume Template for Finance Professionals",
                                                type: "document",
                                                category: "Resume Building",
                                                imageUrl:
                                                    "/images/resources/document-1.jpg",
                                            },
                                            {
                                                id: "3",
                                                title: "Mastering LinkedIn for Career Growth",
                                                type: "video",
                                                category:
                                                    "LinkedIn Optimization",
                                                imageUrl:
                                                    "/images/resources/video-2.jpg",
                                            },
                                            {
                                                id: "4",
                                                title: "Financial Compliance Guide for Startups",
                                                type: "document",
                                                category: "Startup Guidance",
                                                imageUrl:
                                                    "/images/resources/document-2.jpg",
                                            },
                                        ].map((resource) => (
                                            <div
                                                key={resource.id}
                                                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all"
                                            >
                                                <div className="h-40 relative">
                                                    <Image
                                                        src={resource.imageUrl}
                                                        alt={resource.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div
                                                        className={`absolute top-2 left-2 text-xs font-medium px-2 py-1 rounded-full ${resource.type ===
                                                            "video"
                                                            ? "bg-primary text-white"
                                                            : "bg-secondary text-white"
                                                            }`}
                                                    >
                                                        {resource.type}
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <div className="text-xs text-text-secondary mb-1">
                                                        {resource.category}
                                                    </div>
                                                    <h3 className="font-semibold mb-2">
                                                        {resource.title}
                                                    </h3>
                                                    <Link
                                                        href="/resources"
                                                        className={`text-sm font-medium flex items-center ${resource.type ===
                                                            "video"
                                                            ? "text-primary"
                                                            : "text-secondary"
                                                            }`}
                                                    >
                                                        {resource.type ===
                                                            "video"
                                                            ? "Watch Video"
                                                            : "View Document"}
                                                        <svg
                                                            className="w-4 h-4 ml-1"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                            />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 text-center">
                                        <Link
                                            href="/resources"
                                            className="btn-primary"
                                        >
                                            View All Resources
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* Mentor Dashboard */}
                            {activeTab === "mentor-dashboard" && (
                                <div>
                                    {/* Mentor Stats */}
                                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                        <h2 className="text-2xl font-bold mb-6">
                                            Mentor Dashboard
                                        </h2>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            <div className="bg-primary bg-opacity-5 p-4 rounded-lg">
                                                <div className="text-primary text-sm font-medium mb-1">
                                                    Total Sessions
                                                </div>
                                                <div className="text-3xl font-bold">
                                                    {mentorStats?.totalSessions ||
                                                        0}
                                                </div>
                                            </div>
                                            <div className="bg-green-50 p-4 rounded-lg">
                                                <div className="text-green-600 text-sm font-medium mb-1">
                                                    Rating
                                                </div>
                                                <div className="text-3xl font-bold flex items-center">
                                                    {mentorStats?.averageRating ||
                                                        0}
                                                    <span className="text-secondary ml-1">
                                                        ★
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="bg-secondary bg-opacity-5 p-4 rounded-lg">
                                                <div className="text-secondary text-sm font-medium mb-1">
                                                    Earnings
                                                </div>
                                                <div className="text-3xl font-bold">
                                                    {formatCurrency(
                                                        mentorStats?.totalEarnings ||
                                                        0
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mentor Sessions */}
                                    <div className="bg-white rounded-lg shadow-sm p-6">
                                        {/* Tabs */}
                                        <div className="flex border-b border-gray-200 mb-6">
                                            <button
                                                className={`pb-3 mr-6 font-medium ${activeMentorTab ===
                                                    "upcoming"
                                                    ? "text-primary border-b-2 border-primary"
                                                    : "text-text-secondary"
                                                    }`}
                                                onClick={() =>
                                                    setActiveMentorTab(
                                                        "upcoming"
                                                    )
                                                }
                                            >
                                                Upcoming Sessions
                                            </button>
                                            <button
                                                className={`pb-3 mr-6 font-medium ${activeMentorTab === "past"
                                                    ? "text-primary border-b-2 border-primary"
                                                    : "text-text-secondary"
                                                    }`}
                                                onClick={() =>
                                                    setActiveMentorTab("past")
                                                }
                                            >
                                                Past Sessions
                                            </button>
                                            <button
                                                className={`pb-3 font-medium ${activeMentorTab ===
                                                    "earnings"
                                                    ? "text-primary border-b-2 border-primary"
                                                    : "text-text-secondary"
                                                    }`}
                                                onClick={() =>
                                                    setActiveMentorTab(
                                                        "earnings"
                                                    )
                                                }
                                            >
                                                Earnings
                                            </button>
                                        </div>

                                        {/* Mentor Session Content */}
                                        {activeMentorTab === "upcoming" ? (
                                            mentorUpcomingSessions.length ===
                                                0 ? (
                                                <div className="text-center py-12">
                                                    <svg
                                                        className="h-12 w-12 text-gray-400 mx-auto"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    <p className="mt-4 text-text-secondary">
                                                        You don&apos;t have any
                                                        upcoming mentoring
                                                        sessions.
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    {mentorUpcomingSessions.map(
                                                        (session) => (
                                                            <div
                                                                key={session.id}
                                                                className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors"
                                                            >
                                                                <div className="flex flex-col md:flex-row md:items-center justify-between">
                                                                    <div className="mb-3 md:mb-0">
                                                                        <h3 className="font-semibold">
                                                                            {getServiceName(
                                                                                session.serviceId
                                                                            )}{" "}
                                                                            with{" "}
                                                                            {
                                                                                session.userId
                                                                            }
                                                                        </h3>
                                                                        <p className="text-text-secondary">
                                                                            {session.date.toLocaleDateString(
                                                                                "en-US",
                                                                                {
                                                                                    weekday:
                                                                                        "short",
                                                                                    day: "numeric",
                                                                                    month: "short",
                                                                                    year: "numeric",
                                                                                }
                                                                            )}{" "}
                                                                            at{" "}
                                                                            {session.date.toLocaleTimeString(
                                                                                "en-US",
                                                                                {
                                                                                    hour: "numeric",
                                                                                    minute: "numeric",
                                                                                    hour12: true,
                                                                                }
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        <button className="text-primary border border-primary rounded-md px-3 py-1 text-sm hover:bg-primary hover:bg-opacity-5 transition-colors">
                                                                            Reschedule
                                                                        </button>
                                                                        <Link
                                                                            href="#"
                                                                            className="bg-primary text-white rounded-md px-3 py-1 text-sm hover:bg-opacity-90 transition-colors"
                                                                        >
                                                                            Host
                                                                            Session
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )
                                        ) : activeMentorTab === "past" ? (
                                            mentorPastSessions.length === 0 ? (
                                                <div className="text-center py-12">
                                                    <svg
                                                        className="h-12 w-12 text-gray-400 mx-auto"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                    <p className="mt-4 text-text-secondary">
                                                        You haven&apos;t
                                                        conducted any mentoring
                                                        sessions yet.
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    {mentorPastSessions.map(
                                                        (session) => (
                                                            <div
                                                                key={session.id}
                                                                className="border border-gray-200 rounded-lg p-4"
                                                            >
                                                                <div className="flex flex-col md:flex-row md:items-center justify-between">
                                                                    <div className="mb-3 md:mb-0">
                                                                        <h3 className="font-semibold">
                                                                            {getServiceName(
                                                                                session.serviceId
                                                                            )}{" "}
                                                                            with{" "}
                                                                            {
                                                                                session.userId
                                                                            }
                                                                        </h3>
                                                                        <p className="text-text-secondary">
                                                                            {session.date.toLocaleDateString(
                                                                                "en-US",
                                                                                {
                                                                                    weekday:
                                                                                        "short",
                                                                                    day: "numeric",
                                                                                    month: "short",
                                                                                    year: "numeric",
                                                                                }
                                                                            )}{" "}
                                                                            at{" "}
                                                                            {session.date.toLocaleTimeString(
                                                                                "en-US",
                                                                                {
                                                                                    hour: "numeric",
                                                                                    minute: "numeric",
                                                                                    hour12: true,
                                                                                }
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        <button className="text-primary border border-primary rounded-md px-3 py-1 text-sm hover:bg-primary hover:bg-opacity-5 transition-colors">
                                                                            View
                                                                            Notes
                                                                        </button>
                                                                        <button className="bg-primary text-white rounded-md px-3 py-1 text-sm hover:bg-opacity-90 transition-colors">
                                                                            Send
                                                                            Follow-up
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )
                                        ) : (
                                            // Earnings Tab
                                            <div>
                                                <div className="flex justify-between items-center mb-6">
                                                    <div>
                                                        <div className="text-text-secondary">
                                                            Available for
                                                            withdrawal
                                                        </div>
                                                        <div className="text-2xl font-bold text-primary">
                                                            {formatCurrency(
                                                                mentorStats?.pendingPayments ||
                                                                0
                                                            )}
                                                        </div>
                                                    </div>
                                                    <button className="btn-primary">
                                                        Withdraw Funds
                                                    </button>
                                                </div>

                                                <div className="overflow-x-auto">
                                                    <table className="w-full">
                                                        <thead>
                                                            <tr className="bg-gray-50">
                                                                <th className="px-4 py-2 text-left">
                                                                    Date
                                                                </th>
                                                                <th className="px-4 py-2 text-left">
                                                                    Description
                                                                </th>
                                                                <th className="px-4 py-2 text-right">
                                                                    Amount
                                                                </th>
                                                                <th className="px-4 py-2 text-center">
                                                                    Status
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {mentorEarnings.map(
                                                                (earning) => (
                                                                    <tr
                                                                        key={
                                                                            earning.id
                                                                        }
                                                                        className="border-t border-gray-100"
                                                                    >
                                                                        <td className="px-4 py-3 text-text-secondary">
                                                                            {earning.date.toLocaleDateString(
                                                                                "en-US",
                                                                                {
                                                                                    day: "numeric",
                                                                                    month: "short",
                                                                                    year: "numeric",
                                                                                }
                                                                            )}
                                                                        </td>
                                                                        <td className="px-4 py-3">
                                                                            {
                                                                                earning.description
                                                                            }
                                                                        </td>
                                                                        <td className="px-4 py-3 text-right font-medium text-green-600">
                                                                            {formatCurrency(
                                                                                earning.amount
                                                                            )}
                                                                        </td>
                                                                        <td className="px-4 py-3 text-center">
                                                                            <span
                                                                                className={`inline-block px-2 py-1 text-xs rounded-full ${earning.status ===
                                                                                    "paid"
                                                                                    ? "bg-green-100 text-green-800"
                                                                                    : "bg-yellow-100 text-yellow-800"
                                                                                    }`}
                                                                            >
                                                                                {
                                                                                    earning.status
                                                                                }
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
