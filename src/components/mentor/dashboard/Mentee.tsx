'use client';

import { useState } from 'react';
import { Mail, Calendar, Search, ChevronDown, ArrowUpDown } from 'lucide-react';

interface Mentee {
    id: string;
    name: string;
    email: string;
    joinedDate: Date;
    lastSessionDate: Date | null;
    sessionsCompleted: number;
    upcomingSession: Date | null;
}

const initialMentees: Mentee[] = [
    {
        id: '1',
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        joinedDate: new Date('2023-07-15'),
        lastSessionDate: new Date('2023-10-02'),
        sessionsCompleted: 5,
        upcomingSession: new Date('2023-10-25')
    },
    {
        id: '2',
        name: 'Priya Patel',
        email: 'priya.patel@example.com',
        joinedDate: new Date('2023-06-22'),
        lastSessionDate: new Date('2023-09-28'),
        sessionsCompleted: 8,
        upcomingSession: null
    },
    {
        id: '3',
        name: 'Vikram Singh',
        email: 'vikram.singh@example.com',
        joinedDate: new Date('2023-09-03'),
        lastSessionDate: null,
        sessionsCompleted: 0,
        upcomingSession: new Date('2023-10-18')
    },
    {
        id: '4',
        name: 'Neha Gupta',
        email: 'neha.gupta@example.com',
        joinedDate: new Date('2023-08-10'),
        lastSessionDate: new Date('2023-10-05'),
        sessionsCompleted: 3,
        upcomingSession: new Date('2023-11-01')
    },
    {
        id: '5',
        name: 'Amit Verma',
        email: 'amit.verma@example.com',
        joinedDate: new Date('2023-05-18'),
        lastSessionDate: new Date('2023-09-15'),
        sessionsCompleted: 12,
        upcomingSession: null
    }
];

export default function MenteesTab() {
    const [mentees, setMentees] = useState<Mentee[]>(initialMentees);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<keyof Mentee>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Filter mentees based on search term
    const filteredMentees = mentees.filter(mentee =>
        mentee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentee.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort mentees
    const sortedMentees = [...filteredMentees].sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        // Handle null dates
        if (sortField === 'lastSessionDate' || sortField === 'upcomingSession') {
            aValue = aValue || new Date(0);
            bValue = bValue || new Date(0);
        }

        if ((aValue ?? 0) < (bValue ?? 0)) return sortDirection === 'asc' ? -1 : 1;
        if ((aValue ?? 0) > (bValue ?? 0)) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const handleSort = (field: keyof Mentee) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Format date to readable string
    const formatDate = (date: Date | null) => {
        if (!date) return 'N/A';
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Mentees</h1>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search mentees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-control pl-10 py-2 w-64"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {mentees.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-gray-500">You don't have any mentees yet</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('name')}
                                    >
                                        <div className="flex items-center">
                                            <span>Name</span>
                                            {sortField === 'name' && (
                                                <ChevronDown className={`w-4 h-4 ml-1 transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                                            )}
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('joinedDate')}
                                    >
                                        <div className="flex items-center">
                                            <span>Joined Date</span>
                                            {sortField === 'joinedDate' && (
                                                <ChevronDown className={`w-4 h-4 ml-1 transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('sessionsCompleted')}
                                    >
                                        <div className="flex items-center">
                                            <span>Sessions</span>
                                            {sortField === 'sessionsCompleted' && (
                                                <ChevronDown className={`w-4 h-4 ml-1 transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('lastSessionDate')}
                                    >
                                        <div className="flex items-center">
                                            <span>Last Session</span>
                                            {sortField === 'lastSessionDate' && (
                                                <ChevronDown className={`w-4 h-4 ml-1 transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => handleSort('upcomingSession')}
                                    >
                                        <div className="flex items-center">
                                            <span>Next Session</span>
                                            {sortField === 'upcomingSession' && (
                                                <ChevronDown className={`w-4 h-4 ml-1 transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                                            )}
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sortedMentees.map((mentee) => (
                                    <tr key={mentee.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{mentee.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{mentee.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{formatDate(mentee.joinedDate)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium">{mentee.sessionsCompleted}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{formatDate(mentee.lastSessionDate)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {mentee.upcomingSession ? (
                                                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    {formatDate(mentee.upcomingSession)}
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-500">No session scheduled</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                className="text-primary hover:text-primary-dark mr-3"
                                                onClick={() => window.open(`mailto:${mentee.email}`)}
                                            >
                                                <Mail className="w-4 h-4" />
                                            </button>
                                            <button className="text-primary hover:text-primary-dark">
                                                <Calendar className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}