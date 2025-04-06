"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mentor } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export default function MentorsPageClient() {
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [expertiseFilter, setExpertiseFilter] = useState<string[]>([]);
    const [ratingFilter, setRatingFilter] = useState<number | null>(null);
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
        min: 0,
        max: 10000,
    });

    // All available expertise areas
    const expertiseAreas = [
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

    // Fetch mentors
    useEffect(() => {
        const fetchMentors = async () => {
            try {
                // In a real implementation, you would fetch from your API
                // const response = await fetch('/api/mentors');
                // const data = await response.json();

                // Using mock data for now
                const mockMentors: Mentor[] = [
                    {
                        id: "1",
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
                        expertise: [
                            "Marketing",
                            "Career Guidance",
                            "LinkedIn Optimization",
                        ],
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
                        expertise: [
                            "Finance",
                            "Startups",
                            "Corporate Strategy",
                        ],
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
                        expertise: [
                            "Finance",
                            "Interview Preparation",
                            "Resume Building",
                        ],
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
                        expertise: [
                            "Startups",
                            "Finance",
                            "Corporate Strategy",
                        ],
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

                setMentors(mockMentors);
                setFilteredMentors(mockMentors);
                setLoading(false);
            } catch {
                setError("Failed to fetch mentors. Please try again later.");
                setLoading(false);
            }
        };

        fetchMentors();
    }, []);

    // Apply filters
    useEffect(() => {
        let result = [...mentors];

        // Apply search term filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                (mentor) =>
                    mentor.name.toLowerCase().includes(term) ||
                    mentor.title.toLowerCase().includes(term) ||
                    mentor.company.toLowerCase().includes(term) ||
                    mentor.expertise.some((exp) =>
                        exp.toLowerCase().includes(term)
                    )
            );
        }

        // Apply expertise filter
        if (expertiseFilter.length > 0) {
            result = result.filter((mentor) =>
                expertiseFilter.some((exp) => mentor.expertise.includes(exp))
            );
        }

        // Apply rating filter
        if (ratingFilter !== null) {
            result = result.filter((mentor) => mentor.rating >= ratingFilter);
        }

        // Apply price range filter
        result = result.filter(
            (mentor) =>
                mentor.hourlyRate >= priceRange.min &&
                mentor.hourlyRate <= priceRange.max
        );

        setFilteredMentors(result);
    }, [searchTerm, expertiseFilter, ratingFilter, priceRange, mentors]);

    const toggleExpertiseFilter = (expertise: string) => {
        if (expertiseFilter.includes(expertise)) {
            setExpertiseFilter(
                expertiseFilter.filter((exp) => exp !== expertise)
            );
        } else {
            setExpertiseFilter([...expertiseFilter, expertise]);
        }
    };

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-primary text-white py-16">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Our Mentors
                        </h1>
                        <p className="text-xl opacity-90">
                            Connect with industry experts who can guide you
                            towards your career goals
                        </p>
                    </div>
                </div>
            </section>

            {/* Mentors Listing Section */}
            <section className="py-16 bg-background">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Filters Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h2 className="text-xl font-bold mb-6">
                                    Filters
                                </h2>

                                {/* Search */}
                                <div className="mb-6">
                                    <label
                                        htmlFor="search"
                                        className="form-label"
                                    >
                                        Search
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="search"
                                            placeholder="Search mentors..."
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
                                </div>

                                {/* Expertise */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-3">
                                        Expertise
                                    </h3>
                                    <div className="space-y-2">
                                        {expertiseAreas.map((expertise) => (
                                            <div
                                                key={expertise}
                                                className="flex items-center"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id={`expertise-${expertise}`}
                                                    checked={expertiseFilter.includes(
                                                        expertise
                                                    )}
                                                    onChange={() =>
                                                        toggleExpertiseFilter(
                                                            expertise
                                                        )
                                                    }
                                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                                />
                                                <label
                                                    htmlFor={`expertise-${expertise}`}
                                                    className="ml-2 text-sm text-text-secondary"
                                                >
                                                    {expertise}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-3">
                                        Minimum Rating
                                    </h3>
                                    <div className="space-y-2">
                                        {[4, 4.5, 4.8].map((rating) => (
                                            <div
                                                key={rating}
                                                className="flex items-center"
                                            >
                                                <input
                                                    type="radio"
                                                    id={`rating-${rating}`}
                                                    name="rating"
                                                    checked={
                                                        ratingFilter === rating
                                                    }
                                                    onChange={() =>
                                                        setRatingFilter(rating)
                                                    }
                                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                />
                                                <label
                                                    htmlFor={`rating-${rating}`}
                                                    className="ml-2 text-sm text-text-secondary flex items-center"
                                                >
                                                    {rating}+{" "}
                                                    <span className="ml-1 text-secondary">
                                                        {"★".repeat(
                                                            Math.floor(rating)
                                                        )}
                                                        {rating % 1 === 0.5
                                                            ? "½"
                                                            : ""}
                                                    </span>
                                                </label>
                                            </div>
                                        ))}
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="rating-any"
                                                name="rating"
                                                checked={ratingFilter === null}
                                                onChange={() =>
                                                    setRatingFilter(null)
                                                }
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            />
                                            <label
                                                htmlFor="rating-any"
                                                className="ml-2 text-sm text-text-secondary"
                                            >
                                                Any rating
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-3">
                                        Price Range (per hour)
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                htmlFor="min-price"
                                                className="form-label text-xs"
                                            >
                                                Min (₹)
                                            </label>
                                            <input
                                                type="number"
                                                id="min-price"
                                                value={priceRange.min}
                                                onChange={(e) =>
                                                    setPriceRange({
                                                        ...priceRange,
                                                        min:
                                                            parseInt(
                                                                e.target.value
                                                            ) || 0,
                                                    })
                                                }
                                                className="form-control"
                                                min="0"
                                                step="100"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="max-price"
                                                className="form-label text-xs"
                                            >
                                                Max (₹)
                                            </label>
                                            <input
                                                type="number"
                                                id="max-price"
                                                value={priceRange.max}
                                                onChange={(e) =>
                                                    setPriceRange({
                                                        ...priceRange,
                                                        max:
                                                            parseInt(
                                                                e.target.value
                                                            ) || 10000,
                                                    })
                                                }
                                                className="form-control"
                                                min="0"
                                                step="100"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Reset Filters */}
                                <button
                                    onClick={() => {
                                        setSearchTerm("");
                                        setExpertiseFilter([]);
                                        setRatingFilter(null);
                                        setPriceRange({ min: 0, max: 10000 });
                                    }}
                                    className="text-primary hover:underline text-sm font-medium"
                                >
                                    Reset all filters
                                </button>
                            </div>
                        </div>

                        {/* Mentors Grid */}
                        <div className="lg:col-span-3">
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
                            ) : filteredMentors.length === 0 ? (
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
                                        No mentors found matching your filters.
                                        Try adjusting your criteria.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchTerm("");
                                            setExpertiseFilter([]);
                                            setRatingFilter(null);
                                            setPriceRange({
                                                min: 0,
                                                max: 10000,
                                            });
                                        }}
                                        className="mt-4 text-primary hover:underline text-sm font-medium"
                                    >
                                        Reset all filters
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <p className="text-text-secondary">
                                            Showing {filteredMentors.length} of{" "}
                                            {mentors.length} mentors
                                        </p>
                                        <div className="flex items-center">
                                            <label
                                                htmlFor="sort"
                                                className="text-sm mr-2"
                                            >
                                                Sort by:
                                            </label>
                                            <select
                                                id="sort"
                                                className="form-control py-1 text-sm"
                                                defaultValue="rating"
                                            >
                                                <option value="rating">
                                                    Rating: High to Low
                                                </option>
                                                <option value="price-low">
                                                    Price: Low to High
                                                </option>
                                                <option value="price-high">
                                                    Price: High to Low
                                                </option>
                                                <option value="name">
                                                    Name: A to Z
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {filteredMentors.map((mentor) => (
                                            <div
                                                key={mentor.id}
                                                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                                            >
                                                <div className="p-6">
                                                    <div className="flex items-center">
                                                        <div className="w-20 h-20 rounded-full overflow-hidden mr-4">
                                                            <Image
                                                                src={
                                                                    mentor.image
                                                                }
                                                                alt={
                                                                    mentor.name
                                                                }
                                                                width={80}
                                                                height={80}
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-xl font-semibold">
                                                                {mentor.name}
                                                            </h3>
                                                            <p className="text-primary">
                                                                {mentor.title}
                                                            </p>
                                                            <p className="text-sm text-text-secondary">
                                                                {mentor.company}
                                                            </p>
                                                            <div className="flex items-center mt-1">
                                                                <span className="text-secondary font-semibold">
                                                                    {
                                                                        mentor.rating
                                                                    }
                                                                </span>
                                                                <span className="ml-1 text-secondary">
                                                                    ★
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <p className="mt-4 text-text-secondary text-sm line-clamp-3">
                                                        {mentor.bio}
                                                    </p>

                                                    <div className="mt-4 flex flex-wrap gap-2">
                                                        {mentor.expertise.map(
                                                            (exp) => (
                                                                <span
                                                                    key={exp}
                                                                    className="text-xs bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-full"
                                                                >
                                                                    {exp}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>

                                                    <div className="mt-6 flex justify-between items-center">
                                                        <div>
                                                            <span className="font-bold text-lg">
                                                                {formatCurrency(
                                                                    mentor.hourlyRate
                                                                )}
                                                            </span>
                                                            <span className="text-text-secondary text-sm">
                                                                {" "}
                                                                / hour
                                                            </span>
                                                        </div>
                                                        <Link
                                                            href={`/booking?mentor=${mentor.id}`}
                                                            className="btn-primary text-sm py-2"
                                                        >
                                                            Book a Session
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Become a Mentor CTA */}
            <section className="py-16 bg-white">
                <div className="container">
                    <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-4">
                                    Become a Mentor
                                </h2>
                                <p className="mb-6 opacity-90">
                                    Are you an industry expert looking to share
                                    your knowledge and experience? Join our
                                    platform as a mentor and help shape the
                                    careers of aspiring professionals.
                                </p>
                                <ul className="space-y-2 mb-6">
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-secondary mt-1 mr-2"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span>
                                            Set your own hourly rate and
                                            availability
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-secondary mt-1 mr-2"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span>
                                            Connect with mentees who value your
                                            expertise
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-secondary mt-1 mr-2"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span>
                                            Build your personal brand and
                                            network
                                        </span>
                                    </li>
                                </ul>
                                <Link
                                    href="/contact-us"
                                    className="btn-secondary"
                                >
                                    Apply Now
                                </Link>
                            </div>
                            <div className="hidden md:block">
                                <Image
                                    src="/images/become-mentor.svg"
                                    alt="Become a Mentor"
                                    width={500}
                                    height={400}
                                    className="mx-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
