"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Booking, Mentor } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Transaction, MentorStats, MentorEarning } from "@/lib/types";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { MOCK_MENTOR_EARNINGS, MOCK_MENTORS, MOCK_PAST_SESSIONS, MOCK_TRANSACTIONS, MOCK_Upcoming_Sessions, MockMentorStats, RESOURCE_CADRS } from "@/lib/mock-data";
import { Calendar, Users, CreditCard, BookOpen, BarChart, Mail, Clock, AlertCircle, ArrowRight, Loader } from 'lucide-react';

export default function DashboardPageClient({ userData }: { userData: any }) {
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
    const router = useRouter();
    // Fetch dashboard data
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const mockUpcomingSessions: Booking[] = MOCK_Upcoming_Sessions;
                const mockPastSessions: Booking[] = MOCK_PAST_SESSIONS;
                const mockMentors: Mentor[] = MOCK_MENTORS;
                const mockTransactions: Transaction[] = MOCK_TRANSACTIONS;
                const mockMentorEarnings: MentorEarning[] = MOCK_MENTOR_EARNINGS;
                const mockMentorStats: MentorStats = MockMentorStats;
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

    // Function to handle logout
    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("User logged out");
        try {
            await signOut(auth);
            router.push("/login");
        } catch (error: any) {
            console.error("Error logging out:", error);
        }
    }


    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-primary text-white py-4 rounded-b-2xl">
                <div className="container">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                                Dashboard
                            </h1>
                            <p className="opacity-90">
                                Welcome back, {userData?.name}
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <Link href="/mentors">
                                Book a New Session
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Dashboard Section */}
            < section className="py-12 bg-background" >
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                                {/* User Profile */}
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center">
                                        <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mr-4">
                                            {userData?.name?.charAt(0).toUpperCase() || "?"}
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-lg">
                                                {userData?.name}
                                            </h3>
                                            <p className="text-text-secondary text-sm">
                                                {userData?.email}
                                            </p>
                                            <div className="mt-2">
                                                <span className="text-xs bg-primary bg-opacity-10 text-white px-3 py-2 rounded-lg">
                                                    {userData?.role?.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="mt-4 w-full text-sm text-black border border-red-500 rounded-md py-1 hover:bg-red-500 hover:bg-opacity-5 transition-colors" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div>

                                {/* Navigation */}
                                <nav>
                                    <ul>
                                        <li>
                                            <button
                                                className={`flex items-center w-full px-6 py-3 hover:bg-purple-300 hover:bg-opacity-5 transition-colors ${activeTab === "upcoming" ||
                                                    activeTab === "past"
                                                    ? "text-black font-medium"
                                                    : "text-text-secondary"
                                                    }`}
                                                onClick={() =>
                                                    setActiveTab("upcoming")
                                                }
                                            >
                                                <Calendar className="w-5 h-5 mr-3" />
                                                Sessions
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className={`flex items-center w-full px-6 py-3 hover:bg-purple-300 hover:bg-opacity-5 transition-colors ${activeTab === "mentors"
                                                    ? "text-primary font-medium"
                                                    : "text-text-secondary"
                                                    }`}
                                                onClick={() =>
                                                    setActiveTab("mentors")
                                                }
                                            >
                                                <Users className="w-5 h-5 mr-3" />
                                                My Mentors
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className={`flex items-center w-full px-6 py-3 hover:bg-purple-300 hover:bg-opacity-5 transition-colors ${activeTab === "transactions"
                                                    ? "text-primary font-medium"
                                                    : "text-text-secondary"
                                                    }`}
                                                onClick={() =>
                                                    setActiveTab("transactions")
                                                }
                                            >
                                                <CreditCard className="w-5 h-5 mr-3" />
                                                Transactions
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className={`flex items-center w-full px-6 py-3 hover:bg-purple-300 hover:bg-opacity-5 transition-colors ${activeTab === "resources"
                                                    ? "text-primary font-medium"
                                                    : "text-text-secondary"
                                                    }`}
                                                onClick={() =>
                                                    setActiveTab("resources")
                                                }
                                            >
                                                <BookOpen className="w-5 h-5 mr-3" />
                                                Resources
                                            </button>
                                        </li>
                                        {/* {(userRole === "mentor" ||
                                            userRole === "both") && (
                                                <li>
                                                    <button
                                                        className={`flex items-center w-full px-6 py-3 hover:bg-purple-300 hover:bg-opacity-5 transition-colors ${activeTab ===
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
                                                        <BarChart className="w-5 h-5 mr-3" />
                                                        Mentor Dashboard
                                                    </button>
                                                </li>
                                            )} */}
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
                                    <Mail className="w-4 h-4 mr-1" />
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
                                                <Loader className="animate-spin h-8 w-8 text-primary mx-auto" />
                                                <p className="mt-4 text-text-secondary">
                                                    Loading sessions...
                                                </p>
                                            </div>
                                        ) : error ? (
                                            <div className="text-center py-12">
                                                <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
                                                <p className="mt-4 text-text-secondary">
                                                    {error}
                                                </p>
                                            </div>
                                        ) : activeTab === "upcoming" ? (
                                            upcomingSessions.length === 0 ? (
                                                <div className="text-center py-12">
                                                    <Calendar className="h-12 w-12 text-gray-400 mx-auto" />
                                                    <p className="mt-4 text-text-secondary">
                                                        You don&apos;t have any
                                                        upcoming sessions.
                                                    </p>
                                                    <Link
                                                        href="https://pages.razorpay.com/pl_IvDppElicuMMnF/view"
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
                                                                        <button className="text-black border border-primary rounded-md px-3 py-1 text-sm hover:bg-purple-300 hover:bg-opacity-5 transition-colors">
                                                                            Reschedule
                                                                        </button>
                                                                        <button className="text-black border border-red-500 rounded-md px-3 py-1 text-sm hover:bg-red-500 hover:bg-opacity-5 transition-colors">
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
                                        ) :
                                            // Past Sessions
                                            pastSessions.length === 0 ? (
                                                <div className="text-center py-12">
                                                    <Clock className="h-12 w-12 text-gray-400 mx-auto" />
                                                    <p className="mt-4 text-text-secondary">
                                                        You haven&apos;t attended any
                                                        sessions yet.
                                                    </p>
                                                    <Link
                                                        href="/mentors"
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
                                                                    <button className="text-black border border-primary rounded-md px-3 py-1 text-sm hover:bg-purple-300 hover:bg-opacity-5 transition-colors">
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
                                            <Loader className="animate-spin h-8 w-8 text-primary mx-auto" />
                                            <p className="mt-4 text-text-secondary">
                                                Loading mentors...
                                            </p>
                                        </div>
                                    ) : error ? (
                                        <div className="text-center py-12">
                                            <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
                                            <p className="mt-4 text-text-secondary">
                                                {error}
                                            </p>
                                        </div>
                                    ) : mentors.length === 0 ? (
                                        <div className="text-center py-12">
                                            <Users className="h-12 w-12 text-gray-400 mx-auto" />
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
                                                        <div
                                                            className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-semibold bg-secondary ml-2 mr-1 `}
                                                        >
                                                            {mentor.name.charAt(0).toUpperCase()}
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
                                                                <button className="text-black border border-primary rounded-md px-3 py-1 text-sm hover:bg-purple-300 hover:bg-opacity-5 transition-colors">
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
                                            <Loader className="animate-spin h-8 w-8 text-primary mx-auto" />
                                            <p className="mt-4 text-text-secondary">
                                                Loading transactions...
                                            </p>
                                        </div>
                                    ) : error ? (
                                        <div className="text-center py-12">
                                            <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
                                            <p className="mt-4 text-text-secondary">
                                                {error}
                                            </p>
                                        </div>
                                    ) : transactions.length === 0 ? (
                                        <div className="text-center py-12">
                                            <CreditCard className="h-12 w-12 text-gray-400 mx-auto" />
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
                                        {RESOURCE_CADRS.map((resource) => (
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
                                                        <ArrowRight className="w-4 h-4 ml-1" />
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
                                            <div className="bg-purple-300 bg-opacity-5 p-4 rounded-lg">
                                                <div className="text-black text-sm font-medium mb-1">
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
                                                <div className="text-black text-sm font-medium mb-1">
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
                                                    <Calendar className="h-12 w-12 text-gray-400 mx-auto" />
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
                                                                        <button className="text-primary border border-primary rounded-md px-3 py-1 text-sm hover:bg-purple-300 hover:bg-opacity-5 transition-colors">
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
                                                    <Clock className="h-12 w-12 text-gray-400 mx-auto" />
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
                                                                        <button className="text-primary border border-primary rounded-md px-3 py-1 text-sm hover:bg-purple-300 hover:bg-opacity-5 transition-colors">
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
                                                    <button className="btn-primary px-4 py-2 text-sm font-medium rounded-xl">
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
            </section >
        </>
    );
}
