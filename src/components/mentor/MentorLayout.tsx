'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, BookOpen, CreditCard, User, LogOut } from 'lucide-react';

export default function MentorLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <div className="bg-background min-h-screen">
            <div className="container py-8">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Sidebar */}
                        <div className="bg-gray-50 p-6 w-full md:w-64 border-r border-gray-200">
                            <h2 className="text-xl font-bold mb-6 text-primary">Mentor Dashboard</h2>

                            <nav className="space-y-1">
                                <Link
                                    href="/mentor/dashboard"
                                    className={`flex items-center px-3 py-2 rounded-lg transition-colors ${isActive('/mentor/dashboard')
                                        ? 'bg-primary text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <User className="w-5 h-5 mr-3" />
                                    <span>Profile</span>
                                </Link>

                                <Link
                                    href="/mentor/dashboard/courses"
                                    className={`flex items-center px-3 py-2 rounded-lg transition-colors ${isActive('/mentor/dashboard/courses')
                                        ? 'bg-primary text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <BookOpen className="w-5 h-5 mr-3" />
                                    <span>Courses</span>
                                </Link>

                                <Link
                                    href="/mentor/dashboard/mentees"
                                    className={`flex items-center px-3 py-2 rounded-lg transition-colors ${isActive('/mentor/dashboard/mentees')
                                        ? 'bg-primary text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <Users className="w-5 h-5 mr-3" />
                                    <span>My Mentees</span>
                                </Link>

                                <Link
                                    href="/mentor/dashboard/transactions"
                                    className={`flex items-center px-3 py-2 rounded-lg transition-colors ${isActive('/mentor/dashboard/transactions')
                                        ? 'bg-primary text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <CreditCard className="w-5 h-5 mr-3" />
                                    <span>Transactions</span>
                                </Link>

                                <Link
                                    href="/mentor/logout"
                                    className="flex items-center px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut className="w-5 h-5 mr-3" />
                                    <span>Logout</span>
                                </Link>
                            </nav>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 p-6">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}