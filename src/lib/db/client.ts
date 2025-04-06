// Mock database client
// In a real implementation, this would connect to your actual database

type Collection = "mentors" | "services" | "users" | "bookings" | "resources";

type Database = {
    [key in Collection]: any[];
};

class MockDatabase {
    private static instance: MockDatabase;
    private data: Database;

    private constructor() {
        // Initialize with mock data
        this.data = {
            mentors: [],
            services: [],
            users: [],
            bookings: [],
            resources: [],
        };
    }

    public static getInstance(): MockDatabase {
        if (!MockDatabase.instance) {
            MockDatabase.instance = new MockDatabase();
        }
        return MockDatabase.instance;
    }

    public async get(collection: Collection, id?: string) {
        if (id) {
            return this.data[collection].find((item) => item.id === id);
        }
        return this.data[collection];
    }

    public async add(collection: Collection, item: any) {
        this.data[collection].push(item);
        return item;
    }

    public async update(collection: Collection, id: string, updates: any) {
        const index = this.data[collection].findIndex((item) => item.id === id);
        if (index >= 0) {
            this.data[collection][index] = {
                ...this.data[collection][index],
                ...updates,
            };
            return this.data[collection][index];
        }
        return null;
    }

    public async delete(collection: Collection, id: string) {
        const index = this.data[collection].findIndex((item) => item.id === id);
        if (index >= 0) {
            const deleted = this.data[collection][index];
            this.data[collection].splice(index, 1);
            return deleted;
        }
        return null;
    }
}

export const db = MockDatabase.getInstance();
