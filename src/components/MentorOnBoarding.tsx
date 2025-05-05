'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { EXPERTISE_AREAS } from '@/lib/constants';
import { Loader, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';


export default function MentorOnboardingPage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState<{
        name: string;
        email: string;
        phone: string;
        title: string;
        company: string;
        expertise: string[];
        bio: string;
        experience: string;
        education: string;
        linkedIn: string;
        hourlyRate: number;
        availability: string[];
        location: string;
    }>({
        name: '',
        email: '',
        phone: '',
        title: '',
        company: '',
        expertise: [],
        bio: '',
        experience: '',
        education: '',
        linkedIn: '',
        hourlyRate: 1500,
        availability: [],
        location: ''
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleExpertiseChange = (expertise: string) => {
        setFormData(prev => {
            const updatedExpertise = prev.expertise.includes(expertise)
                ? prev.expertise.filter(item => item !== expertise)
                : [...prev.expertise, expertise];

            return { ...prev, expertise: updatedExpertise };
        });
    };

    const handleAvailabilityChange = (day: string) => {
        setFormData(prev => {
            const updatedAvailability = prev.availability.includes(day)
                ? prev.availability.filter(item => item !== day)
                : [...prev.availability, day];

            return { ...prev, availability: updatedAvailability };
        });
    };

    const validateForm = () => {
        // Basic validation logic
        if (!formData.name || !formData.email || !formData.phone || !formData.title || !formData.company) {
            setError('Please fill in all required fields');
            return false;
        }

        if (formData.expertise.length === 0) {
            setError('Please select at least one area of expertise');
            return false;
        }

        if (formData.availability.length === 0) {
            setError('Please select at least one day of availability');
            return false;
        }

        if (!formData.bio || formData.bio.length < 50) {
            setError('Please provide a detailed professional bio (at least 50 characters)');
            return false;
        }

        setError(null);
        return true;
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!validateForm()) {
            // Scroll to the top to show error
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setSubmitting(true);

        try {
            // Using the path structure from your firebaseServices.ts

            const mentorDetailsRef = collection(db, 'mentor', 'mentorData', 'mentorDetails');

            await addDoc(mentorDetailsRef, {
                ...formData,
                createdAt: new Date(),
                updatedAt: new Date(),
                status: 'pending'
            });


            setSuccessMessage('Your mentor profile has been submitted successfully! Redirecting to dashboard...');
            setSubmitted(true);

            // Redirect to dashboard after a delay
            setTimeout(() => {
                router.push('/');
            }, 3000);

        } catch (error) {
            console.error("Error saving mentor data:", error);
            setError('There was an error submitting your profile. Please try again.');
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="bg-gray-50 min-h-screen py-10">

                <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                    <div className="bg-green-200 rounded-xl shadow-lg p-6 text-center">
                        {/* <CheckCircle className="w-16 h-16 text-green-500 mb-4" /> */}
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h2>
                        <p className="text-gray-600">{successMessage}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Become a Mentor</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Share your expertise with aspiring professionals and make a meaningful impact on their careers
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
                        <div className="flex items-center">
                            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                            <p className="text-red-700">{error}</p>
                        </div>
                    </div>
                )}

                {/* Success Message */}
                {successMessage && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-md">
                        <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            <p className="text-green-700">{successMessage}</p>
                        </div>
                    </div>
                )}

                {/* Main Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
                    {/* Section: Personal Information */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                            Personal Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name*
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address*
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number*
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="e.g., 9876543210"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Location*
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="City, Country"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    LinkedIn Profile URL
                                </label>
                                <input
                                    type="url"
                                    name="linkedIn"
                                    value={formData.linkedIn}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="https://linkedin.com/in/yourprofile"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section: Professional Information */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                            Professional Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Professional Title*
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="e.g., Senior Finance Manager, Chartered Accountant"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Company/Organization*
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Your current company"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Education Background
                                </label>
                                <textarea
                                    name="education"
                                    value={formData.education}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    rows={2}
                                    placeholder="Share your educational qualifications, institutions, certifications, etc."
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Areas of Expertise*
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    {EXPERTISE_AREAS.map((area) => (
                                        <div key={area} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`expertise-${area}`}
                                                checked={formData.expertise.includes(area)}
                                                onChange={() => handleExpertiseChange(area)}
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                            />
                                            <label htmlFor={`expertise-${area}`} className="ml-2 text-sm text-gray-700">
                                                {area}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Professional Bio*
                                </label>
                                <div className="mb-1 flex items-center text-xs text-gray-500">
                                    <Info className="w-3 h-3 mr-1" />
                                    <span>Describe your background, expertise, and what makes you a great mentor</span>
                                </div>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Professional Experience*
                                </label>
                                <div className="mb-1 flex items-center text-xs text-gray-500">
                                    <Info className="w-3 h-3 mr-1" />
                                    <span>Share your work experience relevant to the areas you want to mentor in</span>
                                </div>
                                <textarea
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    rows={4}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section: Mentorship Details */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                            Mentorship Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Hourly Rate (₹)*
                                </label>
                                <input
                                    type="number"
                                    name="hourlyRate"
                                    value={formData.hourlyRate}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    min="500"
                                    required
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Recommended rate range: ₹1,000 - ₹3,000 per hour
                                </p>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Availability*
                                </label>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <p className="text-sm text-gray-500 mb-3">
                                        Select the days you are generally available for mentoring sessions
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                                            <div key={day} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={`day-${day}`}
                                                    checked={formData.availability.includes(day)}
                                                    onChange={() => handleAvailabilityChange(day)}
                                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                                />
                                                <label htmlFor={`day-${day}`} className="ml-2 text-sm text-gray-700">
                                                    {day}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-500 mb-4 md:mb-0 md:mr-4">
                            By submitting this form, you agree to our Terms of Service and Privacy Policy. Your profile will be reviewed by our team before being approved.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                type="button"
                                onClick={() => router.push('/dashboard')}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                disabled={submitting}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center"
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <>
                                        <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Application'
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}