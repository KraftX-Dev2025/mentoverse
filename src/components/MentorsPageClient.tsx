"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mentor } from "@/lib/types";
import { EXPERTISE_AREAS } from "@/lib/constants";
import { Search, Loader, AlertCircle, CheckCircle, X, Upload, Filter, ChevronDown } from 'lucide-react';
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

    // Mobile filter state
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        fullName: "",
        contactNumber: "",
        linkedinUrl: "",
        professionalExperience: "",
        profileImage: null as File | null
    });

    // Form validation states
    const [formErrors, setFormErrors] = useState({
        fullName: "",
        contactNumber: "",
        linkedinUrl: "",
        professionalExperience: ""
    });

    // Profile image preview
    const [imagePreview, setImagePreview] = useState<string | null>(null);

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

    // Modal handlers
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Reset form data and errors
        setFormData({
            fullName: "",
            contactNumber: "",
            linkedinUrl: "",
            professionalExperience: "",
            profileImage: null
        });
        setFormErrors({
            fullName: "",
            contactNumber: "",
            linkedinUrl: "",
            professionalExperience: ""
        });
        setImagePreview(null);
    };

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error for this field when user starts typing
        if (formErrors[name as keyof typeof formErrors]) {
            setFormErrors({
                ...formErrors,
                [name]: ""
            });
        }
    };

    // Handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData({
                ...formData,
                profileImage: file
            });

            // Create preview URL for the image
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Toggle filter visibility for mobile
    const toggleFilters = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    // Close filter panel
    const closeFilters = () => {
        setIsFilterOpen(false);
    };

    // Apply filters and close dropdown on mobile
    const applyFilters = () => {
        // Ensure filters are applied (they should be already via useEffect)
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
        setIsFilterOpen(false);
    };

    // Reset filters
    const resetFilters = () => {
        setSearchTerm("");
        setExpertiseFilter([]);
        setRatingFilter(null);
        setPriceRange({ min: 0, max: 10000 });
    };

    // Validate form
    const validateForm = () => {
        let valid = true;
        const newErrors = {
            fullName: "",
            contactNumber: "",
            linkedinUrl: "",
            professionalExperience: ""
        };

        // Validate full name
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
            valid = false;
        }

        // Validate contact number
        if (!formData.contactNumber.trim()) {
            newErrors.contactNumber = "Contact number is required";
            valid = false;
        } else if (!/^\d{10,15}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
            newErrors.contactNumber = "Please enter a valid phone number";
            valid = false;
        }

        // Validate LinkedIn URL
        if (!formData.linkedinUrl.trim()) {
            newErrors.linkedinUrl = "LinkedIn URL is required";
            valid = false;
        } else if (!formData.linkedinUrl.includes("linkedin.com")) {
            newErrors.linkedinUrl = "Please enter a valid LinkedIn URL";
            valid = false;
        }

        // Validate professional experience
        if (!formData.professionalExperience.trim()) {
            newErrors.professionalExperience = "Professional experience is required";
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            const message = `*Mentor Application*\n\n*Full Name:* ${formData.fullName}\n\n*Contact Number:* ${formData.contactNumber}\n\n*LinkedIn URL:* ${formData.linkedinUrl}\n\n*Professional Experience:* ${formData.professionalExperience}\n\n${formData.profileImage ? "*Profile Image:* Will be shared separately" : ""}`;

            const encodedMessage = encodeURIComponent(message);

            window.open(`https://wa.me/918080899428?text=${encodedMessage}`, '_blank');

            closeModal();
        }
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
            <section className="py-4 bg-background">
                <div className="container relative">
                    {/* Filter Button - Mobile Only */}
                    <div className="lg:hidden flex justify-end mb-4 mt-2">
                        <button
                            onClick={toggleFilters}
                            className="flex items-center justify-center bg-primary text-white px-4 py-2 rounded-lg shadow-sm"
                            aria-label="Toggle filters"
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            <span className="font-medium text-sm">Filters</span>
                        </button>
                    </div>

                    {/* Slide-in Filter Panel for Mobile */}
                    <div
                        className={`lg:hidden fixed top-0 right-0 h-screen w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'
                            } overflow-y-auto pt-16`}
                    >
                        <div className="absolute top-2 right-2">
                            <button
                                onClick={closeFilters}
                                className="p-2 text-gray-500 hover:text-gray-800"
                                aria-label="Close filters"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-4">
                            <h2 className="text-lg font-bold mb-4">Filters</h2>

                            {/* Search */}
                            <div className="mb-6">
                                <label htmlFor="mobile-search" className="form-label">Search</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="mobile-search"
                                        placeholder="Search mentors..."
                                        className="form-control pl-10 w-full"
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            // Manually trigger filtering for more responsive experience
                                            const term = e.target.value.toLowerCase();
                                            let result = [...mentors];

                                            if (term) {
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

                                            // Apply other filters
                                            if (expertiseFilter.length > 0) {
                                                result = result.filter((mentor) =>
                                                    expertiseFilter.some((exp) => mentor.expertise.includes(exp))
                                                );
                                            }

                                            if (ratingFilter !== null) {
                                                result = result.filter((mentor) => mentor.rating >= ratingFilter);
                                            }

                                            result = result.filter(
                                                (mentor) =>
                                                    mentor.hourlyRate >= priceRange.min &&
                                                    mentor.hourlyRate <= priceRange.max
                                            );

                                            setFilteredMentors(result);
                                        }}
                                    />
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Search className="w-5 h-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Expertise */}
                            <div className="mb-6">
                                <h3 className="text-md font-semibold mb-3">Expertise</h3>
                                <div className="space-y-2">
                                    {expertiseAreas.map((expertise) => (
                                        <div key={expertise} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`mobile-expertise-${expertise}`}
                                                checked={expertiseFilter.includes(expertise)}
                                                onChange={() => {
                                                    // Update expertise filter
                                                    let newExpertiseFilter;
                                                    if (expertiseFilter.includes(expertise)) {
                                                        newExpertiseFilter = expertiseFilter.filter((exp) => exp !== expertise);
                                                    } else {
                                                        newExpertiseFilter = [...expertiseFilter, expertise];
                                                    }

                                                    // Set the updated filter
                                                    setExpertiseFilter(newExpertiseFilter);

                                                    // Manually apply filters immediately
                                                    let result = [...mentors];

                                                    // Apply search filter
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

                                                    // Apply expertise filter with the updated value
                                                    if (newExpertiseFilter.length > 0) {
                                                        result = result.filter((mentor) =>
                                                            newExpertiseFilter.some((exp) => mentor.expertise.includes(exp))
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
                                                }}
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                            />
                                            <label
                                                htmlFor={`mobile-expertise-${expertise}`}
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
                                <h3 className="text-md font-semibold mb-3">Minimum Rating</h3>
                                <div className="space-y-2">
                                    {[4, 4.5, 4.8].map((rating) => (
                                        <div key={rating} className="flex items-center">
                                            <input
                                                type="radio"
                                                id={`mobile-rating-${rating}`}
                                                name="mobile-rating"
                                                checked={ratingFilter === rating}
                                                onChange={() => {
                                                    setRatingFilter(rating);
                                                    // Manually apply filter change immediately
                                                    let result = [...mentors];

                                                    // Apply search filter
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

                                                    // Apply rating filter with new value
                                                    result = result.filter((mentor) => mentor.rating >= rating);

                                                    // Apply price range filter
                                                    result = result.filter(
                                                        (mentor) =>
                                                            mentor.hourlyRate >= priceRange.min &&
                                                            mentor.hourlyRate <= priceRange.max
                                                    );

                                                    setFilteredMentors(result);
                                                }}
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            />
                                            <label
                                                htmlFor={`mobile-rating-${rating}`}
                                                className="ml-2 text-sm text-text-secondary flex items-center"
                                            >
                                                {rating}+{" "}
                                                <span className="ml-1 text-secondary">
                                                    {"★".repeat(Math.floor(rating))}
                                                    {rating % 1 === 0.5 ? "½" : ""}
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="mobile-rating-any"
                                            name="mobile-rating"
                                            checked={ratingFilter === null}
                                            onChange={() => {
                                                setRatingFilter(null);
                                                // Manually apply filter change immediately
                                                let result = [...mentors];

                                                // Apply search filter
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

                                                // No rating filter needed as it's set to null

                                                // Apply price range filter
                                                result = result.filter(
                                                    (mentor) =>
                                                        mentor.hourlyRate >= priceRange.min &&
                                                        mentor.hourlyRate <= priceRange.max
                                                );

                                                setFilteredMentors(result);
                                            }}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        />
                                        <label
                                            htmlFor="mobile-rating-any"
                                            className="ml-2 text-sm text-text-secondary"
                                        >
                                            Any rating
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col space-y-2 mt-8">
                                <button
                                    onClick={applyFilters}
                                    className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                                >
                                    Apply Filters
                                </button>
                                <button
                                    onClick={() => {
                                        resetFilters();
                                        // Ensure filtered mentors are reset
                                        setFilteredMentors([...mentors]);
                                    }}
                                    className="w-full text-primary hover:underline text-sm font-medium mt-2"
                                >
                                    Reset all filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Overlay for mobile filter panel */}
                    {isFilterOpen && (
                        <div
                            className="lg:hidden fixed inset-0 bg-transparent bg-opacity-10 z-30"
                            onClick={closeFilters}
                        ></div>
                    )}


                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Desktop Filters Sidebar - Always visible on desktop */}
                        <div className="hidden lg:block lg:col-span-1">
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
                                    onClick={resetFilters}
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
                                        onClick={resetFilters}
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
                                                                <div className="w-24 h-24 rounded-full overflow-hidden relative flex-shrink-0 border-2 border-primary">
                                                                    <Image
                                                                        src={mentor.image}
                                                                        alt={mentor.name}
                                                                        width={72}
                                                                        height={72}
                                                                        className="object-fill w-full h-full"
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

                                                        <p className="mt-4 text-text-secondary text-sm line-clamp-3">{mentor.experience}</p>

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

                                                        <div className="mt-6 flex items-center justify-center">
                                                            <Link
                                                                href="https://pages.razorpay.com/pl_IvDppElicuMMnF/view"
                                                                className="btn-primary text-sm px-3 py-3 rounded-lg"
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
                            <div className="">
                                <Image
                                    src="/mentor.jpeg"
                                    alt="Become a Mentor"
                                    width={500}
                                    height={400}
                                    className="mx-auto rounded-xl"
                                />
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <h2 className="text-3xl text-white font-bold mb-4">
                                    Become a Mentor
                                </h2>
                                <p className="mb-6 opacity-90">
                                    Are you an industry expert looking to share
                                    your knowledge and experience? Join our
                                    platform as a mentor and help shape the
                                    careers of aspiring professionals.
                                </p>
                                <ul className="space-y-2 mb-6 flex flex-col">
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
                                <button
                                    onClick={openModal}
                                    className="btn-secondary p-3 rounded-xl w-2/3"
                                >
                                    Apply Now
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Become a Mentor</h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                    aria-label="Close modal"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* Full Name */}
                                <div className="mb-4">
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${formErrors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary-200'
                                            }`}
                                        placeholder="John Doe"
                                    />
                                    {formErrors.fullName && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.fullName}</p>
                                    )}
                                </div>

                                {/* Contact Number */}
                                <div className="mb-4">
                                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="contactNumber"
                                        name="contactNumber"
                                        value={formData.contactNumber}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${formErrors.contactNumber ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary-200'
                                            }`}
                                        placeholder="+91 9876543210"
                                    />
                                    {formErrors.contactNumber && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.contactNumber}</p>
                                    )}
                                </div>

                                {/* LinkedIn URL */}
                                <div className="mb-4">
                                    <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-1">
                                        LinkedIn URL *
                                    </label>
                                    <input
                                        type="url"
                                        id="linkedinUrl"
                                        name="linkedinUrl"
                                        value={formData.linkedinUrl}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${formErrors.linkedinUrl ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary-200'
                                            }`}
                                        placeholder="https://linkedin.com/in/johndoe"
                                    />
                                    {formErrors.linkedinUrl && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.linkedinUrl}</p>
                                    )}
                                </div>

                                {/* Professional Experience */}
                                <div className="mb-4">
                                    <label htmlFor="professionalExperience" className="block text-sm font-medium text-gray-700 mb-1">
                                        Professional Experience *
                                    </label>
                                    <textarea
                                        id="professionalExperience"
                                        name="professionalExperience"
                                        value={formData.professionalExperience}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${formErrors.professionalExperience ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary-200'
                                            }`}
                                        placeholder="Briefly describe your professional background and experience..."
                                    />
                                    {formErrors.professionalExperience && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.professionalExperience}</p>
                                    )}
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 mr-3 hover:bg-gray-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                                    >
                                        Submit Application
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}