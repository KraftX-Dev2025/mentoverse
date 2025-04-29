// TypeScript type definitions

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
    calendlyUrl: string;
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
    status: "pending" | "confirmed" | "cancelled" | "completed";
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
