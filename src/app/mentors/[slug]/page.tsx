'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Mentor } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Briefcase, Building, Award, Star, Linkedin, Youtube, Instagram, Calendar, Loader, AlertCircle } from 'lucide-react';
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function MentorProfilePage() {
    const params = useParams();
    const router = useRouter();
    const [mentor, setMentor] = useState<Mentor | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Avatar colors for fallback
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

    useEffect(() => {
        const fetchMentor = async () => {
            try {
                setLoading(true);
                const slug = params.slug as string;

                // Query the Firestore collection
                const mentorsRef = collection(db, 'mentor', 'mentorData', 'mentorDetails');
                const querySnapshot = await getDocs(mentorsRef);

                // Find the mentor by comparing slugified name with route slug
                let foundMentor: Mentor | null = null;

                querySnapshot.forEach((doc) => {
                    const data = doc.data() as Mentor;
                    const mentorSlug = data.name?.toLowerCase().replace(/\s+/g, '-');

                    if (mentorSlug === slug) {
                        foundMentor = {
                            id: doc.id,
                            name: data.name || 'Unknown Name',
                            title: data.title || 'Mentor',
                            company: data.company || 'Company',
                            expertise: data.expertise || [],
                            bio: data.bio || 'No bio available',
                            image: data.profileImageUrl || '',
                            hourlyRate: data.hourlyRate || 1500,
                            rating: 4.9,
                            calendlyUrl: data.calendlyUrl,
                            experience: data.experience || 'No experience information available'
                        };
                    }
                });

                if (foundMentor) {
                    setMentor(foundMentor);
                } else {
                    console.log('No mentor found with slug:', slug);
                    setError("Mentor not found");
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching mentor data:", error);
                setError("Failed to load mentor profile. Please try again later.");
                setLoading(false);
            }
        };

        if (params.slug) {
            fetchMentor();
        }
    }, [params.slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader className="animate-spin h-10 w-10 text-primary" />
            </div>
        );
    }

    if (error || !mentor) {
        return (
            <div className="container py-16 text-center">
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 mb-4">{error || "Mentor not found"}</h1>
                <p className="text-gray-600 mb-8">The mentor you're looking for doesn't seem to exist.</p>
                <Link href="/mentors" className="btn-primary px-6 py-2 rounded-lg">
                    Back to Mentors
                </Link>
            </div>
        );
    }

    const colorClass = getColorForMentor(mentor.id);

    // Mock courses for the mentor
    const mentorCourses = [
        {
            id: "course1",
            title: "Interview Mastery",
            description: "Learn how to ace your interviews with proven techniques",
            price: 1200
        },
        {
            id: "course2",
            title: "Career Development",
            description: "Strategic career planning and professional growth",
            price: 1500
        }
    ];

    // Mock social links
    const socialLinks = [
        { name: "LinkedIn", url: "https://linkedin.com/in/profile", icon: <Linkedin className="h-5 w-5" /> },
        { name: "YouTube", url: "https://youtube.com/@channel", icon: <Youtube className="h-5 w-5" /> },
        { name: "Instagram", url: "https://instagram.com/handle", icon: <Instagram className="h-5 w-5" /> }
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-primary text-white py-12">
                <div className="container">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {mentor.image ? (
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden relative">
                                <Image
                                    src={mentor.image}
                                    alt={mentor.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center text-white text-7xl font-semibold ${colorClass}`}>
                                {mentor.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">{mentor.name}</h1>
                            <p className="text-xl mb-2">{mentor.title}</p>
                            <div className="flex items-center text-gray-200 mb-4">
                                <Building className="h-5 w-5 mr-2" />
                                <span>{mentor.company}</span>
                            </div>
                            <div className="flex items-center">
                                <div className="flex items-center bg-white bg-opacity-20 px-3 py-1 rounded-full mr-3 text-primary">
                                    <Star className="h-4 w-4 text-yellow-300 mr-1 fill-current" />
                                    <span className="font-semibold">{mentor.rating}</span>
                                </div>
                                <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-primary">
                                    {formatCurrency(mentor.hourlyRate)}/hour
                                </div>
                            </div>
                        </div>
                        <div className="md:ml-auto mt-6 md:mt-0">
                            <Link
                                href={`/booking?mentor=${mentor.id}`}
                                className="btn-secondary px-6 py-3 rounded-xl shadow-lg text-white font-medium"
                            >
                                Book a Session
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-background">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - About and Expertise */}
                        <div className="lg:col-span-2">
                            {/* About Section */}
                            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                                <h2 className="text-2xl font-bold mb-4">About {mentor.name}</h2>
                                <p className="text-text-secondary mb-6">{mentor.bio}</p>

                                {/* Additional Bio - only show if not empty and different from main bio */}
                                {mentor.experience && mentor.experience !== mentor.bio && (
                                    <div className="mt-4">
                                        <h3 className="text-xl font-semibold mb-2">Experience</h3>
                                        <p className="text-text-secondary">
                                            {mentor.experience}
                                        </p>
                                    </div>
                                )}

                                {/* Education - only show if available */}
                                {mentor.education && (
                                    <div className="mt-4">
                                        <h3 className="text-xl font-semibold mb-2">Education & Background</h3>
                                        <p className="text-text-secondary whitespace-pre-line">
                                            {mentor.education}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Expertise Section */}
                            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                                <h2 className="text-2xl font-bold mb-4">Areas of Expertise</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {mentor.expertise.map((skill, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center p-4 border border-gray-200 rounded-lg"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-secondary bg-opacity-10 flex items-center justify-center mr-3">
                                                <Award className="h-5 w-5 text-white" />
                                            </div>
                                            <span className="font-medium">{skill}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Courses Section */}
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h2 className="text-2xl font-bold mb-4">Courses by {mentor.name}</h2>
                                <div className="space-y-6">
                                    {mentorCourses.map((course) => (
                                        <div
                                            key={course.id}
                                            className="border border-gray-200 rounded-lg p-5 hover:border-primary transition-colors"
                                        >
                                            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                                            <p className="text-text-secondary mb-4">{course.description}</p>
                                            <div className="flex justify-between items-center">
                                                <div className="font-bold text-primary">
                                                    {formatCurrency(course.price)}
                                                </div>
                                                <Link
                                                    href="#"
                                                    className="btn-primary px-4 py-2 rounded-lg"
                                                >
                                                    Learn More
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="lg:col-span-1">
                            {/* Booking Info Card */}
                            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                                <h3 className="text-xl font-bold mb-4">Book a Session</h3>
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-text-secondary">Session Fee:</span>
                                        <span className="font-bold">{formatCurrency(mentor.hourlyRate)}/hour</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-text-secondary">Availability:</span>
                                        <span className="font-medium">
                                            {mentor.availability && mentor.availability.length > 0
                                                ? Array.isArray(mentor.availability) ? mentor.availability.join(', ') : "Weekdays, Evenings"
                                                : "Weekdays, Evenings"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="text-text-secondary">Session Duration:</span>
                                        <span className="font-medium">60 minutes</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center mb-4">
                                    <Calendar className="h-5 w-5 text-primary mr-2" />
                                    <span className="text-sm text-text-secondary">Book at least 24 hours in advance</span>
                                </div>
                                <Link
                                    href={`/booking?mentor=${mentor.id}`}
                                    className="btn-primary w-full py-3 rounded-xl text-center block"
                                >
                                    Check Availability
                                </Link>
                            </div>

                            {/* Social Links Card */}
                            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                                <h3 className="text-xl font-bold mb-4">Connect with {mentor.name}</h3>
                                <div className="space-y-4">
                                    {socialLinks.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                                {link.icon}
                                            </div>
                                            <span className="font-medium">{link.name}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Skills Tags */}
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="text-xl font-bold mb-4">Specializations</h3>
                                <div className="flex flex-wrap gap-2">
                                    {[...mentor.expertise, "Career Coaching", "Professional Development", "Interview Preparation"].map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-100 text-text-secondary px-3 py-1 rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Book Session CTA */}
            <section className="py-16 bg-white">
                <div className="container">
                    <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                            Ready to accelerate your career growth?
                        </h2>
                        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white opacity-90">
                            Book a session with {mentor.name} and get personalized guidance from an industry expert.
                        </p>
                        <Link
                            href={`/booking?mentor=${mentor.id}`}
                            className="btn-secondary px-6 py-3 rounded-xl shadow-lg text-white font-medium"
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}