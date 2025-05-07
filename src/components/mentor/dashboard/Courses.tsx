'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';

interface Course {
    id: string;
    title: string;
    description: string;
    price: number;
    status: 'active' | 'draft' | 'archived';
}

const initialCourses: Course[] = [
    {
        id: '1',
        title: 'Finance Fundamentals for Beginners',
        description: 'Learn the basics of finance and accounting in this comprehensive course designed for beginners.',
        price: 1999,
        status: 'active'
    },
    {
        id: '2',
        title: 'Advanced Corporate Strategy',
        description: 'Master strategic planning and execution for corporate growth and competitive advantage.',
        price: 2499,
        status: 'active'
    },
    {
        id: '3',
        title: 'Interview Preparation Masterclass',
        description: 'Prepare for finance and accounting interviews with this comprehensive guide and practice sessions.',
        price: 1499,
        status: 'draft'
    }
];

export default function CoursesTab() {
    const [courses, setCourses] = useState<Course[]>(initialCourses);
    const [isAddingCourse, setIsAddingCourse] = useState(false);
    const [editingCourseId, setEditingCourseId] = useState<string | null>(null);

    const [newCourse, setNewCourse] = useState<Omit<Course, 'id'>>({
        title: '',
        description: '',
        price: 0,
        status: 'draft'
    });

    const handleAddCourse = () => {
        setIsAddingCourse(true);
        setNewCourse({
            title: '',
            description: '',
            price: 0,
            status: 'draft'
        });
    };

    const handleCancelAdd = () => {
        setIsAddingCourse(false);
    };

    const handleSaveNewCourse = () => {
        // Generate a random id
        const id = Math.random().toString(36).substring(2, 9);
        setCourses([...courses, { ...newCourse, id }]);
        setIsAddingCourse(false);
    };

    const handleEditCourse = (id: string) => {
        const courseToEdit = courses.find(course => course.id === id);
        if (courseToEdit) {
            setNewCourse({
                title: courseToEdit.title,
                description: courseToEdit.description,
                price: courseToEdit.price,
                status: courseToEdit.status
            });
            setEditingCourseId(id);
        }
    };

    const handleSaveEdit = () => {
        if (editingCourseId) {
            setCourses(courses.map(course =>
                course.id === editingCourseId ? { ...course, ...newCourse } : course
            ));
            setEditingCourseId(null);
        }
    };

    const handleCancelEdit = () => {
        setEditingCourseId(null);
    };

    const handleDeleteCourse = (id: string) => {
        setCourses(courses.filter(course => course.id !== id));
    };

    const handleNewCourseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewCourse({
            ...newCourse,
            [name]: name === 'price' ? parseFloat(value) : value
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Courses</h1>
                {!isAddingCourse && !editingCourseId && (
                    <button
                        onClick={handleAddCourse}
                        className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Course
                    </button>
                )}
            </div>

            {/* Course List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {courses.length === 0 && !isAddingCourse ? (
                    <div className="p-12 text-center">
                        <p className="text-gray-500 mb-4">You haven't created any courses yet</p>
                        <button
                            onClick={handleAddCourse}
                            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center mx-auto"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Create Your First Course
                        </button>
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {courses.map(course => (
                            <li key={course.id} className={`p-6 ${editingCourseId === course.id ? 'bg-blue-50' : ''}`}>
                                {editingCourseId === course.id ? (
                                    // Edit Course Form
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={newCourse.title}
                                                onChange={handleNewCourseChange}
                                                className="form-control"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                            <textarea
                                                name="description"
                                                value={newCourse.description}
                                                onChange={handleNewCourseChange}
                                                rows={3}
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={newCourse.price}
                                                    onChange={handleNewCourseChange}
                                                    className="form-control"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                                <select
                                                    name="status"
                                                    value={newCourse.status}
                                                    onChange={handleNewCourseChange}
                                                    className="form-control"
                                                >
                                                    <option value="draft">Draft</option>
                                                    <option value="active">Active</option>
                                                    <option value="archived">Archived</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="flex space-x-3 justify-end pt-2">
                                            <button
                                                onClick={handleCancelEdit}
                                                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-50"
                                            >
                                                <X className="w-4 h-4 mr-2" />
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSaveEdit}
                                                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    // Course Item
                                    <div>
                                        <div className="flex justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold">{course.title}</h3>
                                                <p className="text-gray-600 mt-1">{course.description}</p>
                                            </div>
                                            <div className="flex items-start space-x-2">
                                                <button
                                                    onClick={() => handleEditCourse(course.id)}
                                                    className="text-gray-600 hover:text-primary p-1"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCourse(course.id)}
                                                    className="text-gray-600 hover:text-red-500 p-1"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center mt-3">
                                            <span className="text-lg font-bold text-gray-800">₹{course.price}</span>

                                            <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${course.status === 'active' ? 'bg-green-100 text-green-800' :
                                                    course.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Add New Course Form */}
                {isAddingCourse && (
                    <div className="p-6 bg-blue-50 border-t border-gray-200">
                        <h2 className="text-lg font-semibold mb-4">Add New Course</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newCourse.title}
                                    onChange={handleNewCourseChange}
                                    placeholder="e.g., Financial Planning Fundamentals"
                                    className="form-control"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={newCourse.description}
                                    onChange={handleNewCourseChange}
                                    rows={3}
                                    placeholder="Describe your course content and target audience"
                                    className="form-control"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={newCourse.price}
                                        onChange={handleNewCourseChange}
                                        className="form-control"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        name="status"
                                        value={newCourse.status}
                                        onChange={handleNewCourseChange}
                                        className="form-control"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="active">Active</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex space-x-3 justify-end pt-2">
                                <button
                                    onClick={handleCancelAdd}
                                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-50"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveNewCourse}
                                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center"
                                >
                                    Create Course
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}