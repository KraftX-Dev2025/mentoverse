'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Mentor } from "@/lib/types";
import { MOCK_MENTORS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Briefcase, Building, Award, Star, Linkedin, Youtube, Instagram, Calendar } from 'lucide-react';

export default function MentorProfilePage() {
    const params = useParams();
    const [mentor, setMentor] = useState<Mentor | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

                const slug = params.slug as string;

                // Find the mentor by comparing lowercase slug with lowercase name
                const foundMentor = MOCK_MENTORS.find(
                    m => m.name.toLowerCase().replace(/\s+/g, '-') === slug
                );

                if (foundMentor) {
                    setMentor(foundMentor);
                } else {
                    setError("Mentor not found");
                }
                setLoading(false);
            } catch (error) {
                setError("Failed to load mentor profile. Please try again later.");
                setLoading(false);
            }
        };

        fetchMentor();
    }, [params.slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (error || !mentor) {
        return (
            <div className="container py-16 text-center">
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
                        <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center text-white text-7xl font-semibold ${colorClass}`}>
                            {mentor.name.charAt(0).toUpperCase()}
                        </div>
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

                                {/* Additional Bio - In a real app, this would come from the database */}
                                <p className="text-text-secondary">
                                    With over {Math.floor(Math.random() * 10) + 5} years of professional experience in the industry,
                                    {mentor.name} has helped numerous professionals achieve their career goals through
                                    personalized mentorship and guidance. Their approach focuses on practical advice
                                    and actionable insights that can be immediately applied to your career journey.
                                </p>
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
                                        <span className="font-medium">Weekdays, Evenings</span>
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

            {/* Other Mentors You May Like */}
            <section className="py-16 bg-white">
                <div className="container">
                    <h2 className="text-2xl font-bold mb-8 text-center">Other Mentors You May Like</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {MOCK_MENTORS.filter(m => m.id !== mentor.id)
                            .slice(0, 3)
                            .map((otherMentor) => {
                                const otherMentorColorClass = getColorForMentor(otherMentor.id);
                                const mentorSlug = otherMentor.name.toLowerCase().replace(/\s+/g, '-');

                                return (
                                    <Link
                                        key={otherMentor.id}
                                        href={`/mentors/${mentorSlug}`}
                                        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                                    >
                                        <div className="p-6">
                                            <div className="flex items-start space-x-4">
                                                <div
                                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-semibold ${otherMentorColorClass}`}
                                                >
                                                    {otherMentor.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold">{otherMentor.name}</h3>
                                                    <p className="text-primary text-sm">{otherMentor.title}</p>
                                                    <p className="text-sm text-text-secondary">{otherMentor.company}</p>
                                                    <div className="flex items-center mt-1">
                                                        <span className="text-secondary font-semibold">{otherMentor.rating}</span>
                                                        <span className="ml-1 text-secondary">★</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                    </div>
                </div>
            </section>
        </>
    );
}