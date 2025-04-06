// Modified db/client.ts with proper typing
import { Mentor, Service, User, Booking, Resource } from "../types";

type Collection = "mentors" | "services" | "users" | "bookings" | "resources";

type CollectionType = {
    mentors: Mentor;
    services: Service;
    users: User;
    bookings: Booking;
    resources: Resource;
};

type Database = {
    [K in Collection]: CollectionType[K][];
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

    public async get<T extends Collection>(
        collection: T,
        id?: string
    ): Promise<CollectionType[T][] | CollectionType[T] | undefined> {
        if (id) {
            return this.data[collection].find(
                (item) => item.id === id
            ) as CollectionType[T];
        }
        return this.data[collection];
    }

    public async add<T extends Collection>(
        collection: T,
        item: CollectionType[T]
    ): Promise<CollectionType[T]> {
        this.data[collection].push(item);
        return item;
    }

    public async update<T extends Collection>(
        collection: T,
        id: string,
        updates: Partial<CollectionType[T]>
    ): Promise<CollectionType[T] | null> {
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

    public async delete<T extends Collection>(
        collection: T,
        id: string
    ): Promise<CollectionType[T] | null> {
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
