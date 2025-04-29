"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Resource } from "@/lib/types";

export default function ResourcesPageClient() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState<string>("all");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");

    // All available categories
    const categories = [
        "Career Guidance",
        "CA Preparation",
        "Finance",
        "Interview Tips",
        "Resume Building",
        "LinkedIn Optimization",
        "Startup Guidance",
        "Industry Insights",
    ];

    // Fetch resources
    useEffect(() => {
        const fetchResources = async () => {
            try {
                // In a real implementation, you would fetch from your API
                // const response = await fetch('/api/resources');
                // const data = await response.json();

                // Using mock data for now
                const mockResources: Resource[] = [
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

                setResources(mockResources);
                setFilteredResources(mockResources);
                setLoading(false);
            } catch {
                setError("Failed to fetch resources. Please try again later.");
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    // Apply filters
    useEffect(() => {
        let result = [...resources];

        // Apply search term filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                (resource) =>
                    resource.title.toLowerCase().includes(term) ||
                    resource.description.toLowerCase().includes(term) ||
                    resource.category.toLowerCase().includes(term)
            );
        }

        // Apply type filter
        if (typeFilter !== "all") {
            result = result.filter((resource) => resource.type === typeFilter);
        }

        // Apply category filter
        if (categoryFilter !== "all") {
            result = result.filter(
                (resource) => resource.category === categoryFilter
            );
        }

        setFilteredResources(result);
    }, [searchTerm, typeFilter, categoryFilter, resources]);

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-primary text-white py-16">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Resources To Guide You
                        </h1>
                        <p className="text-xl opacity-90">
                            Access our curated collection of resources to help
                            you on your career journey
                        </p>
                    </div>
                </div>
            </section>

            {/* Resources Section */}
            <section className="py-16 bg-background">
                <div className="container">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-8 text-center">
                            Videos that&apos;ll help you build your dream career
                        </h2>

                        {/* Filters */}
                        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Search */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search resources..."
                                        className="form-control pl-10"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            className="w-5 h-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* Type Filter */}
                                <div>
                                    <select
                                        className="form-control"
                                        value={typeFilter}
                                        onChange={(e) =>
                                            setTypeFilter(e.target.value)
                                        }
                                    >
                                        <option value="all">All Types</option>
                                        <option value="video">Videos</option>
                                        <option value="document">
                                            Documents
                                        </option>
                                    </select>
                                </div>

                                {/* Category Filter */}
                                <div>
                                    <select
                                        className="form-control"
                                        value={categoryFilter}
                                        onChange={(e) =>
                                            setCategoryFilter(e.target.value)
                                        }
                                    >
                                        <option value="all">
                                            All Categories
                                        </option>
                                        {categories.map((category) => (
                                            <option
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Resources Grid */}
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
                                    Loading resources...
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
                        ) : filteredResources.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
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
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <p className="mt-4 text-text-secondary">
                                    No resources found matching your filters.
                                    Try adjusting your criteria.
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchTerm("");
                                        setTypeFilter("all");
                                        setCategoryFilter("all");
                                    }}
                                    className="mt-4 text-primary hover:underline text-sm font-medium"
                                >
                                    Reset all filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredResources.map((resource) => (
                                    <div
                                        key={resource.id}
                                        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                                    >
                                        <div className="h-48 relative bg-gray-100">
                                            {resource.type === "video" ? (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-16 h-16 rounded-full bg-primary bg-opacity-80 flex items-center justify-center">
                                                        <svg
                                                            className="w-8 h-8 text-white"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <Image
                                                        src={`/images/resources/video-${
                                                            (parseInt(
                                                                resource.id
                                                            ) %
                                                                4) +
                                                            1
                                                        }.jpg`}
                                                        alt={resource.title}
                                                        fill
                                                        className="object-cover z-0"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-16 h-16 rounded-full bg-secondary bg-opacity-80 flex items-center justify-center">
                                                        <svg
                                                            className="w-8 h-8 text-white"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <Image
                                                        src={`/images/resources/document-${
                                                            (parseInt(
                                                                resource.id
                                                            ) %
                                                                4) +
                                                            1
                                                        }.jpg`}
                                                        alt={resource.title}
                                                        fill
                                                        className="object-cover z-0"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <span
                                                    className={`text-xs uppercase font-semibold px-2 py-1 rounded-full ${
                                                        resource.type ===
                                                        "video"
                                                            ? "bg-primary bg-opacity-10 text-primary"
                                                            : "bg-secondary bg-opacity-10 text-secondary"
                                                    }`}
                                                >
                                                    {resource.type}
                                                </span>
                                                <span className="text-xs text-text-secondary">
                                                    {resource.category}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-semibold mb-2">
                                                {resource.title}
                                            </h3>
                                            <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                                                {resource.description}
                                            </p>
                                            <a
                                                href={resource.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`inline-flex items-center font-medium ${
                                                    resource.type === "video"
                                                        ? "text-primary hover:text-primary-dark"
                                                        : "text-secondary hover:text-secondary-dark"
                                                }`}
                                            >
                                                {resource.type === "video"
                                                    ? "Watch Video"
                                                    : "Download PDF"}
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
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Subscribe for Updates */}
                    <div className="mt-16 bg-white p-8 rounded-lg shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                            <div className="md:col-span-3">
                                <h3 className="text-2xl font-bold mb-2">
                                    Stay Updated
                                </h3>
                                <p className="text-text-secondary mb-4">
                                    Subscribe to our newsletter to get notified
                                    when we add new resources, webinars, and
                                    events.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                        type="email"
                                        placeholder="Your email address"
                                        className="form-control"
                                    />
                                    <button className="btn-primary whitespace-nowrap p-4 rounded-2xl shadow-lg shadow-white">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                            <div className="md:col-span-2 hidden md:block">
                                <Image
                                    src="/images/newsletter-illustration.svg"
                                    alt="Newsletter"
                                    width={300}
                                    height={200}
                                    className="mx-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Request Resources CTA */}
            <section className="py-16 bg-white">
                <div className="container">
                    <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                            Can&apos;t Find What You&apos;re Looking For?
                        </h2>
                        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white opacity-90">
                            Let us know what resources would help you in your
                            career journey, and we&apos;ll try our best to
                            create or source them for you.
                        </p>
                        <Link href="/contact-us" className="btn-secondary p-4 rounded-2xl shadow-lg shadow-white">
                            Request a Resource
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
