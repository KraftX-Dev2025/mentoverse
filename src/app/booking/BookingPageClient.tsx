"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mentor, Service } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const timeSlots = [
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

export default function BookingPageClient() {
    const searchParams = useSearchParams();

    // Get service or mentor from URL params
    const preSelectedServiceId = searchParams.get("service");
    const preSelectedMentorId = searchParams.get("mentor");

    // State for booking process
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState<Service | null>(
        null
    );
    const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(
        null
    );
    const [availableDates, setAvailableDates] = useState<Date[]>([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

    // State for data loading
    const [services, setServices] = useState<Service[]>([]);
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [loading, setLoading] = useState({
        services: true,
        mentors: true,
        availability: false,
    });
    const [error, setError] = useState<string | null>(null);

    // User data for form
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    // Payment data
    const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | null>(
        null
    );

    // Loading indicator for submit button
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form validation
    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        phone: "",
    });

    // Success status
    const [, setBookingSuccess] = useState(false);
    const [bookingReference, setBookingReference] = useState("");

    // Load services and mentors
    useEffect(() => {
        const fetchData = async () => {
            // Fetch services
            try {
                // In a real implementation, you would fetch from your API
                // const servicesResponse = await fetch('/api/services');
                // const servicesData = await servicesResponse.json();

                // Using mock data for now
                const mockServices: Service[] = [
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

                setServices(mockServices);
                setLoading((prev) => ({ ...prev, services: false }));

                // If a service ID is in the URL, pre-select it
                if (preSelectedServiceId) {
                    const service =
                        mockServices.find(
                            (s) => s.id === preSelectedServiceId
                        ) || null;
                    if (service) {
                        setSelectedService(service);
                        setStep(2); // Move to mentor selection
                    }
                }
            } catch {
                setError("Failed to load services. Please try again later.");
                setLoading((prev) => ({ ...prev, services: false }));
            }

            // Fetch mentors
            try {
                // In a real implementation, you would fetch from your API
                // const mentorsResponse = await fetch('/api/mentors');
                // const mentorsData = await mentorsResponse.json();

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
                ];

                setMentors(mockMentors);
                setLoading((prev) => ({ ...prev, mentors: false }));

                // If a mentor ID is in the URL, pre-select it
                if (preSelectedMentorId) {
                    const mentor =
                        mockMentors.find((m) => m.id === preSelectedMentorId) ||
                        null;
                    if (mentor) {
                        setSelectedMentor(mentor);
                        if (preSelectedServiceId) {
                            setStep(3); // Move to date/time selection if both service and mentor are pre-selected
                        } else {
                            setStep(1); // Stay on service selection if only mentor is pre-selected
                        }
                    }
                }
            } catch {
                setError("Failed to load mentors. Please try again later.");
                setLoading((prev) => ({ ...prev, mentors: false }));
            }
        };

        fetchData();
    }, [preSelectedServiceId, preSelectedMentorId]);

    // Load available dates when mentor is selected
    useEffect(() => {
        if (selectedMentor && step === 3) {
            setLoading((prev) => ({ ...prev, availability: true }));

            // In a real implementation, you would fetch availability from your API
            // const fetchAvailability = async () => {
            //   const response = await fetch(`/api/mentors/${selectedMentor.id}/availability`);
            //   const data = await response.json();
            //   setAvailableDates(data.dates);
            // };

            // Mock data for available dates (next 14 days with some random dates excluded)
            const mockAvailability = () => {
                const dates: Date[] = [];
                const today = new Date();

                for (let i = 1; i <= 14; i++) {
                    // Add date if it's not a random exclusion (simulate some unavailable days)
                    if (Math.random() > 0.3) {
                        const date = new Date(today);
                        date.setDate(today.getDate() + i);
                        dates.push(date);
                    }
                }

                return dates;
            };

            // Simulate API delay
            setTimeout(() => {
                setAvailableDates(mockAvailability());
                setLoading((prev) => ({ ...prev, availability: false }));
            }, 800);
        }
    }, [selectedMentor, step]);

    // Load available time slots when date is selected
    useEffect(() => {
        if (selectedDate) {
            // In a real implementation, you would fetch time slots for the specific date
            // const fetchTimeSlots = async () => {
            //   const response = await fetch(`/api/mentors/${selectedMentor.id}/availability?date=${selectedDate}`);
            //   const data = await response.json();
            //   setAvailableTimeSlots(data.timeSlots);
            // };

            // Mock data for available time slots (random selection of the predefined time slots)
            const mockTimeSlots = () => {
                return timeSlots.filter(() => Math.random() > 0.3);
            };

            setAvailableTimeSlots(mockTimeSlots());
        }
    }, [selectedDate, selectedMentor]);

    // Handle service selection
    const handleServiceSelect = (service: Service) => {
        setSelectedService(service);
        setStep(2); // Move to mentor selection
    };

    // Handle mentor selection
    const handleMentorSelect = (mentor: Mentor) => {
        setSelectedMentor(mentor);
        setStep(3); // Move to date/time selection
    };

    // Handle date selection
    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setSelectedTimeSlot(null); // Reset time slot when date changes
    };

    // Handle time slot selection
    const handleTimeSlotSelect = (timeSlot: string) => {
        setSelectedTimeSlot(timeSlot);
    };

    // Handle user data form changes
    const handleUserDataChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));

        // Clear validation error when field is changed
        if (formErrors[name as keyof typeof formErrors]) {
            setFormErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    // Navigate to next step
    const goToNextStep = () => {
        // Only proceed to next step if current step is valid
        if (step === 3 && (!selectedDate || !selectedTimeSlot)) return;
        if (step === 4 && !validateUserData()) return;

        window.scrollTo(0, 0); // Scroll to top when changing steps
        setStep(step + 1);
    };

    // Navigate to previous step
    const goToPreviousStep = () => {
        window.scrollTo(0, 0); // Scroll to top when changing steps
        setStep(step - 1);
    };

    // Validate user data form
    const validateUserData = () => {
        const errors = {
            name: "",
            email: "",
            phone: "",
        };

        let isValid = true;

        if (!userData.name.trim()) {
            errors.name = "Name is required";
            isValid = false;
        }

        if (!userData.email.trim()) {
            errors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
            errors.email = "Please enter a valid email";
            isValid = false;
        }

        if (!userData.phone.trim()) {
            errors.phone = "Phone number is required";
            isValid = false;
        } else if (!/^\d{10}$/.test(userData.phone.replace(/[\s()-]/g, ""))) {
            errors.phone = "Please enter a valid 10-digit phone number";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    // Handle submission
    const handleSubmit = async () => {
        if (!paymentMethod) return;

        setIsSubmitting(true);

        // Simulate API call to book session
        try {
            // In a real implementation, you would send booking data to your API
            // const response = await fetch('/api/bookings', {
            //   method: 'POST',
            //   body: JSON.stringify({
            //     serviceId: selectedService?.id,
            //     mentorId: selectedMentor?.id,
            //     date: selectedDate,
            //     timeSlot: selectedTimeSlot,
            //     userData,
            //     paymentMethod
            //   })
            // });
            // const data = await response.json();

            // Simulate API delay and response
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Generate a mock booking reference
            const mockReference = `MV-${Math.floor(
                100000 + Math.random() * 900000
            )}`;
            setBookingReference(mockReference);
            setBookingSuccess(true);
            setStep(6); // Move to success step
        } catch {
            setError(
                "Failed to complete your booking. Please try again later."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-primary text-white py-12">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            Book Your Mentoring Session
                        </h1>
                        <p className="text-lg opacity-90">
                            {step === 6
                                ? "Your booking has been confirmed!"
                                : "Follow the steps below to book a session with one of our expert mentors"}
                        </p>
                    </div>
                </div>
            </section>

            {/* Booking Process Section */}
            <section className="py-12 bg-background">
                <div className="container">
                    {/* Booking Steps */}
                    {step < 6 && (
                        <div className="mb-12">
                            <div className="flex justify-between items-center relative">
                                {/* Progress Bar */}
                                <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-gray-200 z-0">
                                    <div
                                        className="h-full bg-primary transition-all duration-300"
                                        style={{ width: `${(step - 1) * 25}%` }}
                                    ></div>
                                </div>

                                {/* Step Indicators */}
                                {[1, 2, 3, 4, 5].map((stepNumber) => (
                                    <div
                                        key={stepNumber}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${step >= stepNumber
                                            ? "bg-primary text-white"
                                            : "bg-white text-text-secondary border border-gray-300"
                                            }`}
                                    >
                                        {stepNumber}
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between mt-2 text-sm text-text-secondary">
                                <div className="text-center w-36 -ml-14">
                                    Choose Service
                                </div>
                                <div className="text-center w-36 -ml-14">
                                    Select Mentor
                                </div>
                                <div className="text-center w-36 -ml-14">
                                    Pick Date & Time
                                </div>
                                <div className="text-center w-36 -ml-14">
                                    Your Details
                                </div>
                                <div className="text-center w-36 -ml-14">
                                    Payment
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Step 1: Choose Service */}
                            {step === 1 && (
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <h2 className="text-2xl font-bold mb-6">
                                        Choose a Service
                                    </h2>

                                    {loading.services ? (
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
                                                Loading services...
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
                                    ) : (
                                        <div className="space-y-4">
                                            {services.map((service) => (
                                                <div
                                                    key={service.id}
                                                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${selectedService?.id ===
                                                        service.id
                                                        ? "border-primary bg-primary bg-opacity-5"
                                                        : "border-gray-200 hover:border-primary"
                                                        }`}
                                                    onClick={() =>
                                                        handleServiceSelect(
                                                            service
                                                        )
                                                    }
                                                >
                                                    <div className="flex items-start">
                                                        <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center text-xl text-primary mr-4 shrink-0">
                                                            {service.icon}
                                                        </div>
                                                        <div>
                                                            <div className="flex justify-between">
                                                                <h3 className="text-lg font-semibold">
                                                                    {
                                                                        service.name
                                                                    }
                                                                </h3>
                                                                <div className="font-bold">
                                                                    {formatCurrency(
                                                                        service.price
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <p className="text-text-secondary text-sm mt-1">
                                                                {
                                                                    service.description
                                                                }
                                                            </p>

                                                            <div className="mt-3 grid grid-cols-2 gap-2">
                                                                {service.benefits.map(
                                                                    (
                                                                        benefit,
                                                                        index
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="flex items-center text-xs text-text-secondary"
                                                                        >
                                                                            <svg
                                                                                className="w-4 h-4 text-primary mr-1 shrink-0"
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
                                                                                {
                                                                                    benefit
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-8 flex justify-end">
                                        <button
                                            className="btn-primary px-2 py-2 rounded-xl"
                                            disabled={!selectedService}
                                            onClick={() => goToNextStep()}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Select Mentor */}
                            {step === 2 && (
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <h2 className="text-2xl font-bold mb-6">
                                        Select a Mentor
                                    </h2>

                                    {loading.mentors ? (
                                        <div className="text-center py-12">
                                            <svg
                                                className="animate-spin h-8 w-8 text-black mx-auto"
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
                                    ) : (
                                        <div className="space-y-4">
                                            {mentors.map((mentor) => (
                                                <div
                                                    key={mentor.id}
                                                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${selectedMentor?.id ===
                                                        mentor.id
                                                        ? "border-primary border-2 bg-white bg-opacity-5"
                                                        : "border-gray-200 hover:border-primary"
                                                        }`}
                                                    onClick={() =>
                                                        handleMentorSelect(
                                                            mentor
                                                        )
                                                    }
                                                >
                                                    <div className="flex items-center">
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
                                                        <div className="flex-1">
                                                            <div className="flex justify-between">
                                                                <div>
                                                                    <h3 className="text-lg font-semibold">
                                                                        {
                                                                            mentor.name
                                                                        }
                                                                    </h3>
                                                                    <p className="text-primary text-sm">
                                                                        {
                                                                            mentor.title
                                                                        }
                                                                    </p>
                                                                    <p className="text-text-secondary text-sm">
                                                                        {
                                                                            mentor.company
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className="font-bold">
                                                                        {formatCurrency(
                                                                            mentor.hourlyRate
                                                                        )}
                                                                    </div>
                                                                    <div className="flex items-center justify-end mt-1">
                                                                        <span className="text-secondary font-semibold mr-1">
                                                                            {
                                                                                mentor.rating
                                                                            }
                                                                        </span>
                                                                        <span className="text-secondary">
                                                                            ★
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <p className="text-text-secondary text-sm mt-2 line-clamp-2">
                                                                {mentor.bio}
                                                            </p>

                                                            <div className="mt-3 flex flex-wrap gap-2">
                                                                {mentor.expertise.map(
                                                                    (exp) => (
                                                                        <span
                                                                            key={
                                                                                exp
                                                                            }
                                                                            className="text-xs bg-primary bg-opacity-10 text-white px-2 py-2 rounded-full"
                                                                        >
                                                                            {
                                                                                exp
                                                                            }
                                                                        </span>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-8 flex justify-between">
                                        <button
                                            className=" border-primary text-primary"
                                            onClick={() => goToPreviousStep()}
                                        >
                                            Back
                                        </button>
                                        <button
                                            className="btn-primary px-2 py-2 rounded-xl"
                                            disabled={!selectedMentor}
                                            onClick={() => goToNextStep()}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Pick Date & Time */}
                            {step === 3 && (
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <h2 className="text-2xl font-bold mb-6">
                                        Select Date & Time
                                    </h2>

                                    {loading.availability ? (
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
                                                Loading availability...
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Date Selection */}
                                            <div className="mb-8">
                                                <h3 className="text-lg font-semibold mb-4">
                                                    Select Date
                                                </h3>
                                                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                                                    {availableDates.map(
                                                        (date, index) => (
                                                            <div
                                                                key={index}
                                                                className={`p-2 border rounded-lg text-center cursor-pointer transition-all duration-200 ${selectedDate &&
                                                                    selectedDate.toDateString() ===
                                                                    date.toDateString()
                                                                    ? "border-primary bg-primary bg-opacity-5"
                                                                    : "border-gray-200 hover:border-primary"
                                                                    }`}
                                                                onClick={() =>
                                                                    handleDateSelect(
                                                                        date
                                                                    )
                                                                }
                                                            >
                                                                <div className="text-sm font-medium">
                                                                    {
                                                                        days[
                                                                        date.getDay()
                                                                        ]
                                                                    }
                                                                </div>
                                                                <div className="text-lg font-semibold">
                                                                    {date.getDate()}
                                                                </div>
                                                                <div className="text-xs text-text-secondary">
                                                                    {date.toLocaleDateString(
                                                                        "en-US",
                                                                        {
                                                                            month: "short",
                                                                        }
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            {/* Time Slot Selection */}
                                            {selectedDate && (
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-4">
                                                        Select Time
                                                    </h3>

                                                    {availableTimeSlots.length ===
                                                        0 ? (
                                                        <p className="text-text-secondary">
                                                            No time slots
                                                            available for the
                                                            selected date.
                                                            Please choose
                                                            another date.
                                                        </p>
                                                    ) : (
                                                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                                            {availableTimeSlots.map(
                                                                (
                                                                    timeSlot,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className={`p-2 border rounded-lg text-center cursor-pointer transition-all duration-200 ${selectedTimeSlot ===
                                                                            timeSlot
                                                                            ? "border-primary bg-primary bg-opacity-5"
                                                                            : "border-gray-200 hover:border-primary"
                                                                            }`}
                                                                        onClick={() =>
                                                                            handleTimeSlotSelect(
                                                                                timeSlot
                                                                            )
                                                                        }
                                                                    >
                                                                        <div className="text-sm font-medium">
                                                                            {
                                                                                timeSlot
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}

                                    <div className="mt-8 flex justify-between">
                                        <button
                                            className="border-primary rounded-xl px-4 py-2 text-black"
                                            onClick={() => goToPreviousStep()}
                                        >
                                            Back
                                        </button>
                                        <button
                                            className="btn-primary px-2 py-2 rounded-xl"
                                            disabled={
                                                !selectedDate ||
                                                !selectedTimeSlot
                                            }
                                            onClick={() => goToNextStep()}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Your Details */}
                            {step === 4 && (
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <h2 className="text-2xl font-bold mb-6">
                                        Your Details
                                    </h2>

                                    <div className="space-y-4">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="form-label"
                                            >
                                                Full Name*
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={userData.name}
                                                onChange={handleUserDataChange}
                                                className={`form-control ${formErrors.name
                                                    ? "border-red-500"
                                                    : ""
                                                    }`}
                                                placeholder="Enter your full name"
                                                required
                                            />
                                            {formErrors.name && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {formErrors.name}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="form-label"
                                            >
                                                Email Address*
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={userData.email}
                                                onChange={handleUserDataChange}
                                                className={`form-control ${formErrors.email
                                                    ? "border-red-500"
                                                    : ""
                                                    }`}
                                                placeholder="Enter your email address"
                                                required
                                            />
                                            {formErrors.email && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {formErrors.email}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="phone"
                                                className="form-label"
                                            >
                                                Phone Number*
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={userData.phone}
                                                onChange={handleUserDataChange}
                                                className={`form-control ${formErrors.phone
                                                    ? "border-red-500"
                                                    : ""
                                                    }`}
                                                placeholder="Enter your phone number"
                                                required
                                            />
                                            {formErrors.phone && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {formErrors.phone}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="message"
                                                className="form-label"
                                            >
                                                Message to Mentor (Optional)
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={userData.message}
                                                onChange={handleUserDataChange}
                                                className="form-control"
                                                placeholder="Share any specific topics or questions you'd like to discuss"
                                                rows={4}
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex justify-between">
                                        <button
                                            className="border-primary border-2 rounded-xl px-4 py-2 text-black"
                                            onClick={() => goToPreviousStep()}
                                        >
                                            Back
                                        </button>
                                        <button
                                            className="btn-primary px-2 py-2 rounded-xl"
                                            onClick={() => {
                                                if (validateUserData()) {
                                                    goToNextStep();
                                                }
                                            }}
                                        >
                                            Continue to Payment
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 5: Payment */}
                            {step === 5 && (
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <h2 className="text-2xl font-bold mb-6">
                                        Payment
                                    </h2>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3">
                                                Select Payment Method
                                            </h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div
                                                    className={`border rounded-lg p-4 flex items-center cursor-pointer transition-all duration-200 ${paymentMethod === "card"
                                                        ? "border-primary bg-primary bg-opacity-5"
                                                        : "border-gray-200 hover:border-primary"
                                                        }`}
                                                    onClick={() =>
                                                        setPaymentMethod("card")
                                                    }
                                                >
                                                    <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-3 shrink-0">
                                                        <svg
                                                            className="w-5 h-5 text-primary"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">
                                                            Credit/Debit Card
                                                        </div>
                                                        <div className="text-xs text-text-secondary">
                                                            Visa, Mastercard,
                                                            RuPay
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    className={`border rounded-lg p-4 flex items-center cursor-pointer transition-all duration-200 ${paymentMethod === "upi"
                                                        ? "border-primary bg-primary bg-opacity-5"
                                                        : "border-gray-200 hover:border-primary"
                                                        }`}
                                                    onClick={() =>
                                                        setPaymentMethod("upi")
                                                    }
                                                >
                                                    <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-3 shrink-0">
                                                        <svg
                                                            className="w-5 h-5 text-primary"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">
                                                            UPI
                                                        </div>
                                                        <div className="text-xs text-text-secondary">
                                                            Google Pay, PhonePe,
                                                            Paytm
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {paymentMethod === "card" && (
                                            <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
                                                <div>
                                                    <label
                                                        htmlFor="card-name"
                                                        className="form-label"
                                                    >
                                                        Name on Card
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="card-name"
                                                        className="form-control"
                                                        placeholder="As it appears on the card"
                                                    />
                                                </div>

                                                <div>
                                                    <label
                                                        htmlFor="card-number"
                                                        className="form-label"
                                                    >
                                                        Card Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="card-number"
                                                        className="form-control"
                                                        placeholder="1234 5678 9012 3456"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label
                                                            htmlFor="card-expiry"
                                                            className="form-label"
                                                        >
                                                            Expiry Date
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="card-expiry"
                                                            className="form-control"
                                                            placeholder="MM/YY"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="card-cvv"
                                                            className="form-label"
                                                        >
                                                            CVV
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="card-cvv"
                                                            className="form-control"
                                                            placeholder="123"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {paymentMethod === "upi" && (
                                            <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
                                                <div>
                                                    <label
                                                        htmlFor="upi-id"
                                                        className="form-label"
                                                    >
                                                        UPI ID
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="upi-id"
                                                        className="form-control"
                                                        placeholder="yourname@upi"
                                                    />
                                                </div>
                                                <p className="text-sm text-text-secondary">
                                                    You will receive a payment
                                                    request on your UPI app.
                                                </p>
                                            </div>
                                        )}

                                        <div className="p-4 bg-primary bg-opacity-5 rounded-lg">
                                            <h3 className="text-lg font-semibold mb-2">
                                                Cancellation Policy
                                            </h3>
                                            <p className="text-sm text-text-secondary">
                                                You can reschedule or cancel
                                                your session up to 24 hours
                                                before the scheduled time
                                                without any penalty. For
                                                cancellations made less than 24
                                                hours before, a 50% cancellation
                                                fee will apply.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex justify-between">
                                        <button
                                            className=" border-primary border-2 rounded-xl px-4 py-2 text-black"
                                            onClick={() => goToPreviousStep()}
                                        >
                                            Back
                                        </button>
                                        <button
                                            className="btn-primary px-4 py-2 rounded-xl"
                                            disabled={
                                                !paymentMethod || isSubmitting
                                            }
                                            onClick={handleSubmit}
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center">
                                                    <svg
                                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                                    Processing...
                                                </span>
                                            ) : (
                                                `Pay ${selectedService &&
                                                formatCurrency(
                                                    selectedService.price
                                                )
                                                }`
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 6: Success */}
                            {step === 6 && (
                                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg
                                            className="w-10 h-10 text-green-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>

                                    <h2 className="text-2xl font-bold mb-2">
                                        Booking Confirmed!
                                    </h2>
                                    <p className="text-text-secondary mb-6">
                                        Your session has been successfully
                                        booked. You will receive a confirmation
                                        email shortly.
                                    </p>

                                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-text-secondary">
                                                Booking Reference:
                                            </span>
                                            <span className="font-semibold">
                                                {bookingReference}
                                            </span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-text-secondary">
                                                Service:
                                            </span>
                                            <span className="font-semibold">
                                                {selectedService?.name}
                                            </span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-text-secondary">
                                                Mentor:
                                            </span>
                                            <span className="font-semibold">
                                                {selectedMentor?.name}
                                            </span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-text-secondary">
                                                Date & Time:
                                            </span>
                                            <span className="font-semibold">
                                                {selectedDate?.toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        weekday: "short",
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                    }
                                                )}{" "}
                                                at {selectedTimeSlot}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-text-secondary">
                                                Amount Paid:
                                            </span>
                                            <span className="font-semibold">
                                                {selectedService &&
                                                    formatCurrency(
                                                        selectedService.price
                                                    )}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-text-secondary mb-6">
                                        The session link will be sent to your
                                        email ({userData.email}) 15 minutes
                                        before the scheduled time.
                                    </p>

                                    <div className="flex flex-col md:flex-row justify-center gap-4">
                                        <Link
                                            href="/dashboard"
                                            className="btn-primary px-2 py-2 rounded-xl"
                                        >
                                            Go to Dashboard
                                        </Link>
                                        <Link
                                            href="/"
                                            className="border-primary border-2 rounded-xl px-4 py-2 text-black"
                                        >
                                            Back to Home
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Order Summary Sidebar */}
                        {step > 4 && (
                            <div className="lg:col-span-1">
                                <div className="bg-white p-6 rounded-lg shadow-sm sticky top-20">
                                    <h2 className="text-xl font-bold mb-6">
                                        Booking Summary
                                    </h2>

                                    {/* Service */}
                                    <div className="mb-4 pb-4 border-b border-gray-100">
                                        <div className="text-text-secondary text-sm mb-1">
                                            Service
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">
                                                {selectedService
                                                    ? selectedService.name
                                                    : "Not selected"}
                                            </span>
                                            {selectedService && (
                                                <span className="font-semibold">
                                                    {formatCurrency(
                                                        selectedService.price
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Mentor */}
                                    <div className="mb-4 pb-4 border-b border-gray-100">
                                        <div className="text-text-secondary text-sm mb-1">
                                            Mentor
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">
                                                {selectedMentor
                                                    ? selectedMentor.name
                                                    : "Not selected"}
                                            </span>
                                        </div>
                                        {selectedMentor && (
                                            <div className="text-sm text-text-secondary mt-1">
                                                {selectedMentor.title},{" "}
                                                {selectedMentor.company}
                                            </div>
                                        )}
                                    </div>

                                    {/* Date & Time */}
                                    <div className="mb-4 pb-4 border-b border-gray-100">
                                        <div className="text-text-secondary text-sm mb-1">
                                            Date & Time
                                        </div>
                                        <div className="font-medium">
                                            {selectedDate
                                                ? selectedDate.toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        weekday: "short",
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                    }
                                                )
                                                : "Not selected"}
                                        </div>
                                        {selectedTimeSlot && (
                                            <div className="text-sm text-text-secondary mt-1">
                                                {selectedTimeSlot}
                                            </div>
                                        )}
                                    </div>

                                    {/* Pricing */}
                                    <div className="mb-6">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-text-secondary">
                                                Service Fee
                                            </span>
                                            <span>
                                                {selectedService
                                                    ? formatCurrency(
                                                        selectedService.price
                                                    )
                                                    : "-"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-text-secondary">
                                                GST (18%)
                                            </span>
                                            <span>
                                                {selectedService
                                                    ? formatCurrency(
                                                        selectedService.price *
                                                        0.18
                                                    )
                                                    : "-"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between font-bold pt-3 border-t border-gray-100">
                                            <span>Total</span>
                                            <span>
                                                {selectedService
                                                    ? formatCurrency(
                                                        selectedService.price *
                                                        1.18
                                                    )
                                                    : "-"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Help */}
                                    <div className="bg-background p-4 rounded-lg">
                                        <h3 className="font-semibold mb-2">
                                            Need Help?
                                        </h3>
                                        <p className="text-sm text-text-secondary mb-3">
                                            If you have any questions or issues
                                            with the booking process, feel free
                                            to contact us.
                                        </p>
                                        <a
                                            href="mailto:support@mentoverse.com"
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
                                            support@mentoverse.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
