// Database schema (placeholder)
// In a real implementation, this would define your database schema

export const schema = {
    mentors: {
        id: "string",
        name: "string",
        title: "string",
        company: "string",
        expertise: "string[]",
        bio: "string",
        image: "string",
        hourlyRate: "number",
        rating: "number",
    },
    services: {
        id: "string",
        name: "string",
        description: "string",
        price: "number",
        icon: "string",
        benefits: "string[]",
    },
    users: {
        id: "string",
        name: "string",
        email: "string",
        image: "string?",
        role: "enum(user,mentor,admin)",
    },
    bookings: {
        id: "string",
        userId: "string",
        mentorId: "string",
        serviceId: "string",
        date: "date",
        status: "enum(pending,confirmed,cancelled,completed)",
        amount: "number",
    },
    resources: {
        id: "string",
        title: "string",
        type: "enum(video,document)",
        url: "string",
        description: "string",
        category: "string",
    },
};
