'use client';

import { useState } from 'react';
import { SaveIcon, User, Mail, Phone, Briefcase, Building, BookOpen } from 'lucide-react';

export default function ProfileTab() {
    const [formData, setFormData] = useState({
        name: 'Rajiv Mehta',
        email: 'rajiv.mehta@example.com',
        phone: '+91 9876543210',
        title: 'Senior Finance Manager',
        company: 'Mahindra Group',
        bio: '15+ years of experience in corporate finance with expertise in financial planning and analysis.',
        expertise: 'Finance, Career Guidance, Corporate Strategy',
        hourlyRate: '1500',
        education: 'MBA Finance, University of Delhi',
        linkedIn: 'linkedin.com/in/rajiv-mehta'
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Saving profile data:', formData);
        setIsEditing(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Profile</h1>
                <button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-4 py-2 rounded-lg ${isEditing
                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                        : 'bg-primary hover:bg-primary-dark text-white'} transition-colors`}
                >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b border-gray-200">
                        {/* Profile Header */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                            <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold">
                                {formData.name.charAt(0)}
                            </div>

                            <div className="flex-1">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="form-control text-xl font-semibold w-full"
                                    />
                                ) : (
                                    <h2 className="text-xl font-semibold">{formData.name}</h2>
                                )}

                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="form-control text-primary mt-1 w-full"
                                    />
                                ) : (
                                    <p className="text-primary">{formData.title}</p>
                                )}

                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="form-control text-gray-600 mt-1 w-full"
                                    />
                                ) : (
                                    <p className="text-gray-600">{formData.company}</p>
                                )}
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="form-control pl-10"
                                        />
                                    ) : (
                                        <div className="form-control pl-10 bg-gray-50">{formData.email}</div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="form-control pl-10"
                                        />
                                    ) : (
                                        <div className="form-control pl-10 bg-gray-50">{formData.phone}</div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Briefcase className="h-5 w-5 text-gray-400" />
                                    </div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className="form-control pl-10"
                                        />
                                    ) : (
                                        <div className="form-control pl-10 bg-gray-50">{formData.title}</div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company/Organization</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Building className="h-5 w-5 text-gray-400" />
                                    </div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="form-control pl-10"
                                        />
                                    ) : (
                                        <div className="form-control pl-10 bg-gray-50">{formData.company}</div>
                                    )}
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Professional Bio</label>
                                {isEditing ? (
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        rows={4}
                                        className="form-control"
                                    />
                                ) : (
                                    <div className="form-control bg-gray-50 min-h-[100px]">{formData.bio}</div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Areas of Expertise</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="expertise"
                                        value={formData.expertise}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Separate with commas"
                                    />
                                ) : (
                                    <div className="form-control bg-gray-50">{formData.expertise}</div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate (₹)</label>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        name="hourlyRate"
                                        value={formData.hourlyRate}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                ) : (
                                    <div className="form-control bg-gray-50">₹{formData.hourlyRate}</div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="education"
                                        value={formData.education}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                ) : (
                                    <div className="form-control bg-gray-50">{formData.education}</div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="linkedIn"
                                        value={formData.linkedIn}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                ) : (
                                    <div className="form-control bg-gray-50">{formData.linkedIn}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {isEditing && (
                        <div className="p-6 bg-gray-50 flex justify-end">
                            <button
                                type="submit"
                                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center"
                            >
                                <SaveIcon className="w-4 h-4 mr-2" />
                                Save Changes
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}