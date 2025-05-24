'use client';

import { useState } from 'react';
import { Download, Filter, ChevronDown } from 'lucide-react';

interface Transaction {
    id: string;
    date: Date;
    mentee: string;
    service: string;
    amount: number;
    status: 'completed' | 'pending' | 'failed';
}

const initialTransactions: Transaction[] = [
    {
        id: 'TX123456',
        date: new Date('2023-10-05'),
        mentee: 'Rahul Sharma',
        service: 'Career Guidance Session',
        amount: 1800,
        status: 'completed'
    },
    {
        id: 'TX123457',
        date: new Date('2023-10-02'),
        mentee: 'Priya Patel',
        service: 'Mock Interview',
        amount: 1500,
        status: 'completed'
    },
    {
        id: 'TX123458',
        date: new Date('2023-09-28'),
        mentee: 'Vikram Singh',
        service: 'CV Review',
        amount: 1200,
        status: 'completed'
    },
    {
        id: 'TX123459',
        date: new Date('2023-09-15'),
        mentee: 'Neha Gupta',
        service: 'LinkedIn Profile Review',
        amount: 1200,
        status: 'completed'
    },
    {
        id: 'TX123460',
        date: new Date('2023-10-10'),
        mentee: 'Amit Verma',
        service: 'Career Guidance Session',
        amount: 1800,
        status: 'pending'
    }
];

export default function TransactionsTab() {
    const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
    const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    // Filter transactions
    const filteredTransactions = transactions.filter(transaction => {
        if (filter === 'all') return true;
        return transaction.status === filter;
    });

    // Sort transactions by date
    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
        const result = a.date.getTime() - b.date.getTime();
        return sortDirection === 'asc' ? result : -result;
    });

    // Calculate total earnings
    const totalEarnings = transactions
        .filter(t => t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0);

    // Calculate pending amount
    const pendingAmount = transactions
        .filter(t => t.status === 'pending')
        .reduce((sum, t) => sum + t.amount, 0);

    // Function to format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    // Format date to readable string
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Transactions</h1>
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Total Earnings</h3>
                    <p className="text-2xl font-bold mt-2">{formatCurrency(totalEarnings)}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Pending Amount</h3>
                    <p className="text-2xl font-bold mt-2">{formatCurrency(pendingAmount)}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Total Sessions</h3>
                    <p className="text-2xl font-bold mt-2">{transactions.length}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex space-x-2">
                        <button
                            className={`px-3 py-1 rounded text-sm ${filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </button>
                        <button
                            className={`px-3 py-1 rounded text-sm ${filter === 'completed' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                            onClick={() => setFilter('completed')}
                        >
                            Completed
                        </button>
                        <button
                            className={`px-3 py-1 rounded text-sm ${filter === 'pending' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                            onClick={() => setFilter('pending')}
                        >
                            Pending
                        </button>
                    </div>

                    <button
                        className="flex items-center text-sm text-gray-600"
                        onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                    >
                        <Filter className="w-4 h-4 mr-1" />
                        <span>Date</span>
                        <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {transactions.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-gray-500">No transactions found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Transaction ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Mentee
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Service
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sortedTransactions.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{formatDate(transaction.date)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium">{transaction.mentee}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{transaction.service}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium">{formatCurrency(transaction.amount)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.status === 'completed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : transaction.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                            </span>
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