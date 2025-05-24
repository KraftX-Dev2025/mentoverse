// TypeScript type definitions
import { StaticImageData } from "next/image";

export interface Mentor {
    id: string;
    name: string;
    title: string;
    company: string;
    expertise: string[];
    bio: string;
    image: string;
    hourlyRate: number;
    rating: number;
    calendlyUrl?: string;
    experience: string;
}

export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    icon: string;
    benefits: string[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    role: "user" | "mentor" | "admin";
}

export interface Booking {
    id: string;
    userId: string;
    mentorId: string;
    serviceId: string;
    date: Date;
    status: "confirmed" | "pending" | "cancelled" | "completed";
    amount: number;
}

export interface Resource {
    id: string;
    title: string;
    type: "video" | "document";
    url: string;
    description: string;
    category: string;
}

export interface Transaction {
    id: string;
    date: Date;
    description: string;
    amount: number;
    status: string;
}

export interface MentorEarning {
    id: string;
    date: Date;
    description: string;
    amount: number;
    status: string;
}

export interface MentorStats {
    totalSessions: number;
    completedSessions: number;
    upcomingSessions: number;
    averageRating: number;
    totalEarnings: number;
    pendingPayments: number;
}

export interface FooterService {
    id: string;
    name: string;
    icon: string;
}

export type NavLink = {
    href: string;
    label: string;
};

export interface FooterProps {
    logo: StaticImageData;
    siteName: string;
    services: FooterService[];
    navLinks: NavLink[];
}