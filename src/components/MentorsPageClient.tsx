"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mentor } from "@/lib/types";
import { EXPERTISE_AREAS } from "@/lib/constants";
import { Search, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

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
    const expertiseAreas = EXPERTISE_AREAS;
    const avatarColors = [
        "bg-red-500", "bg-green-500", "bg-blue-500",
        "bg-yellow-500", "bg-pink-500", "bg-purple-500",
        "bg-orange-500", "bg-teal-500", "bg-indigo-500"
    ];

    function getColorForMentor(id: string) {
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = id.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % avatarColors.length;
        return avatarColors[index];
    }

    // Fetch mentors from Firebase
    useEffect(() => {
        const fetchMentors = async () => {
            try {
                setLoading(true);

                // Reference to the mentors collection
                const mentorsRef = collection(db, 'mentor', 'mentorData', 'mentorDetails');
                const q = query(mentorsRef);
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    console.log('No mentors found in the database');
                    setMentors([]);
                    setFilteredMentors([]);
                    setLoading(false);
                    return;
                }

                // Process the documents
                const mentorsData: Mentor[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();

                    // Map Firebase document to Mentor type
                    const mentor: Mentor = {
                        id: doc.id,
                        name: data.name || 'Unknown Name',
                        title: data.title || 'Mentor',
                        company: data.company || 'Company',
                        expertise: data.expertise || [],
                        bio: data.bio || 'No bio available',
                        image: data.profileImageUrl || '',
                        hourlyRate: data.hourlyRate || 1000,
                        rating: 4.5,
                        calendlyUrl: data.calendlyUrl,
                        experience: data.experience || 'No experience provided'
                    };

                    mentorsData.push(mentor);
                });

                console.log(`Found ${mentorsData.length} mentors in Firebase`);
                setMentors(mentorsData);
                setFilteredMentors(mentorsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching mentors from Firebase:', error);
                setError("Failed to load mentors. Please try again later.");
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

    // Generate slug from mentor name
    const getMentorSlug = (name: string): string => {
        return name.toLowerCase().replace(/\s+/g, '-');
    };

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-primary text-white py-4 rounded-b-xl">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white ">
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
                            <div className="bg-white p-6 rounded-xl shadow-sm">
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
                                            <Search className="w-5 h-5 text-gray-400" />
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
                            ) : filteredMentors.length === 0 ? (
                                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                    <Search className="h-12 w-12 text-gray-400 mx-auto" />
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
                                                className="form-control py-1 text-sm rounded-xl"
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
                                        {filteredMentors.map((mentor) => {
                                            const colorClass = getColorForMentor(mentor.id);
                                            const mentorSlug = getMentorSlug(mentor.name);

                                            return (
                                                <div
                                                    key={mentor.id}
                                                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                                                >
                                                    <div className="p-6">
                                                        <div className="flex items-start space-x-4">
                                                            {mentor.image ? (
                                                                <div className="w-12 h-12 rounded-full overflow-hidden relative flex-shrink-0">
                                                                    <Image
                                                                        src={mentor.image}
                                                                        alt={mentor.name}
                                                                        width={48}
                                                                        height={48}
                                                                        className="object-cover"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-semibold flex-shrink-0 ${colorClass}`}
                                                                >
                                                                    {mentor.name.charAt(0).toUpperCase()}
                                                                </div>
                                                            )}
                                                            <div className="flex flex-col">
                                                                <Link href={`/mentors/${mentorSlug}`} className="text-lg font-semibold leading-tight hover:text-primary transition-colors">
                                                                    {mentor.name}
                                                                </Link>
                                                                <p className="text-primary text-sm">{mentor.title}</p>
                                                                <p className="text-sm text-text-secondary font-bold">{mentor.company}</p>
                                                                <div className="flex items-center mt-1">
                                                                    <span className="text-secondary font-semibold">{mentor.rating}</span>
                                                                    <span className="ml-1 text-secondary">★</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <p className="mt-4 text-text-secondary text-sm line-clamp-3">{mentor.bio}</p>

                                                        <div className="mt-4 flex flex-wrap gap-2">
                                                            {mentor.expertise.slice(0, 3).map((exp) => (
                                                                <span
                                                                    key={exp}
                                                                    className="text-sm text-black bg-gray-100 px-2 py-1 rounded"
                                                                >
                                                                    {exp}
                                                                </span>
                                                            ))}
                                                            {mentor.expertise.length > 3 && (
                                                                <span className="text-sm text-black bg-gray-100 px-2 py-1 rounded">
                                                                    +{mentor.expertise.length - 3} more
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div className="mt-6 flex items-center justify-between">
                                                            <Link
                                                                href={`/mentors/${mentorSlug}`}
                                                                className="text-primary font-medium hover:underline"
                                                            >
                                                                View Profile
                                                            </Link>
                                                            <Link
                                                                href={`/booking?mentor=${mentor.id}`}
                                                                className="btn-primary text-sm px-2 py-2 rounded-xl shadow-lg shadow-white"
                                                            >
                                                                Book a Session
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
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
                                <h2 className="text-3xl text-white font-bold mb-4">
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
                                        <CheckCircle className="w-5 h-5 text-secondary mt-1 mr-2" />
                                        <span>
                                            Set your own hourly rate and
                                            availability
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-5 h-5 text-secondary mt-1 mr-2" />
                                        <span>
                                            Connect with mentees who value your
                                            expertise
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-5 h-5 text-secondary mt-1 mr-2" />
                                        <span>
                                            Build your personal brand and
                                            network
                                        </span>
                                    </li>
                                </ul>
                                <Link
                                    href="/admin/d745d8b8845b8b51a9a12d7e6007f1508f2760bedb4cc41f8882ae99ffbf79e6"
                                    className="btn-secondary p-3 shadow-lg shadow-white rounded-xl "
                                >
                                    Apply Now
                                </Link>
                            </div>
                            <div className="hidden md:block">
                                <Image
                                    src="/mentor.jpeg"
                                    alt="Become a Mentor"
                                    width={500}
                                    height={400}
                                    className="mx-auto rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}