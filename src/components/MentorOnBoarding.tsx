'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { doc, setDoc, collection, addDoc, serverTimestamp, getDocs, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { EXPERTISE_AREAS } from '@/lib/constants';
import { Loader, AlertCircle, CheckCircle, Info, Upload, X, Camera, Edit, Trash2, Plus, List, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { signOut } from 'firebase/auth';

// Helper function for Cloudinary upload
const uploadToCloudinary = async (file: File) => {
    // Create form data for upload
    const formData = new FormData();
    formData.append('file', file);

    const cloudName = "dahi6sue2"
    const uploadPreset = 'ml_default';

    formData.append('upload_preset', uploadPreset);

    try {
        console.log(`Uploading to Cloudinary (cloud: ${cloudName}, preset: ${uploadPreset})`);

        // Make API request to Cloudinary
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: 'POST',
                body: formData
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Cloudinary error response:', errorText);
            throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Cloudinary upload successful:', data.secure_url);
        return data.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};

// Component for image upload with drag and drop
const ImageUpload = ({
    onImageUpload,
    imagePreview,
    uploadStatus
}: {
    onImageUpload: (file: File) => void;
    imagePreview: string | null;
    uploadStatus: 'idle' | 'uploading' | 'success' | 'error';
}) => {
    const [isDragging, setIsDragging] = useState(false);

    // Handle drag events
    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onImageUpload(e.dataTransfer.files[0]);
        }
    }, [onImageUpload]);

    // Handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onImageUpload(e.target.files[0]);
        }
    };

    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Picture
            </label>

            <div
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors ${isDragging ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-300 hover:border-primary'
                    } ${uploadStatus === 'error' ? 'border-red-500' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{ minHeight: '200px' }}
            >
                {imagePreview ? (
                    <div className="relative w-32 h-32 mb-4">
                        <Image
                            src={imagePreview}
                            alt="Profile preview"
                            fill
                            className="rounded-full object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => onImageUpload(null as any)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            aria-label="Remove image"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                        <Camera className="w-10 h-10 text-gray-400" />
                    </div>
                )}

                {uploadStatus === 'uploading' ? (
                    <div className="flex flex-col items-center">
                        <Loader className="w-8 h-8 text-primary animate-spin mb-2" />
                        <span className="text-sm text-gray-500">Uploading image...</span>
                    </div>
                ) : imagePreview ? (
                    <div className="text-center">
                        <p className="text-sm text-gray-500 mb-2">Image uploaded successfully</p>
                        <label className="cursor-pointer text-primary hover:text-opacity-80 text-sm font-medium">
                            Choose a different image
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-sm text-gray-500 mb-2">
                            Drag and drop your profile picture here, or
                        </p>
                        <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors">
                            <Upload className="w-4 h-4 mr-2" />
                            Browse Files
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                        <p className="mt-2 text-xs text-gray-500">
                            Supported formats: JPG, PNG. Max size: 5MB
                        </p>
                    </div>
                )}
            </div>

            {uploadStatus === 'error' && (
                <p className="mt-1 text-sm text-red-500">
                    There was an error uploading your image. Please try again.
                </p>
            )}
        </div>
    );
};

// Success/Confirmation Component
const SubmissionSuccess = ({
    mentorData,
    profileImage,
    isEditing,
    onDone
}: {
    mentorData: any;
    profileImage: string | null;
    isEditing: boolean;
    onDone: () => void;
}) => {
    const router = useRouter();

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {isEditing ? 'Mentor Profile Updated Successfully!' : 'Profile Submitted Successfully!'}
            </h2>

            <div className="max-w-md mx-auto mb-8">
                <div className="flex items-center mb-6">
                    {profileImage ? (
                        <div className="w-24 h-24 mr-4">
                            <Image
                                src={profileImage}
                                alt="Profile"
                                width={100}
                                height={100}
                                className="rounded-xl object-contain"
                            />
                        </div>
                    ) : (
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <span className="text-2xl font-bold text-gray-400">
                                {mentorData.name.charAt(0)}
                            </span>
                        </div>
                    )}

                    <div className="text-left">
                        <h3 className="font-bold text-2xl">{mentorData.name}</h3>
                        <p className="text-gray-600 font-semibold">{mentorData.title} at {mentorData.company}</p>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-left mb-4">
                    <h4 className="font-semibold mb-2">Experience</h4>
                    <p className="text-gray-700 whitespace-pre-line">{mentorData.experience}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-left mb-4">
                    <h4 className="font-semibold mb-2">Areas of Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                        {mentorData.expertise.map((area: string) => (
                            <span key={area} className="bg-secondary bg-opacity-10 text-white px-3 py-2 rounded-full text-sm font-semibold">
                                {area}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <p className="text-gray-600 mb-6">
                {isEditing
                    ? 'The mentor profile has been updated successfully.'
                    : 'Thank you for adding a new mentor to Mentoverse! The profile will be reviewed by the team.'}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                    onClick={onDone}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                    {isEditing ? 'Return to Mentor List' : 'Add Another Mentor'}
                </button>
                <button
                    onClick={() => router.push('/')}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

// Create a type for our form data to improve type safety
interface MentorFormData {
    id?: string;
    name: string;
    email: string;
    phone: string;
    title: string;
    company: string;
    expertise: string[];
    bio: string;
    experience: string;
    education: string;
    linkedIn: string;
    hourlyRate: number;
    availability: string[];
    location: string;
    profileImageUrl: string;
    status?: string;
    createdAt?: any;
}

// Define mentor list item component
const MentorListItem = ({
    mentor,
    onEdit,
    onDelete
}: {
    mentor: MentorFormData,
    onEdit: (mentor: MentorFormData) => void,
    onDelete: (mentorId: string) => void
}) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = () => {
        setIsDeleting(true);
    };

    const confirmDelete = () => {
        if (mentor.id) {
            onDelete(mentor.id);
        }
        setIsDeleting(false);
    };

    const cancelDelete = () => {
        setIsDeleting(false);
    };

    return (
        <div className="border border-gray-200 rounded-lg p-4 mb-4 hover:border-primary transition-all">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="h-12 w-12 relative mr-4">
                        {mentor.profileImageUrl ? (
                            <Image
                                src={mentor.profileImageUrl}
                                alt={mentor.name}
                                fill
                                className="rounded-full object-cover"
                            />
                        ) : (
                            <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center">
                                {mentor.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">{mentor.name}</h3>
                        <p className="text-sm text-gray-600">{mentor.title} • {mentor.company}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {mentor.expertise.slice(0, 3).map(skill => (
                                <span key={skill} className="inline-block bg-gray-100 text-primary text-xs px-2 py-1 rounded-full">
                                    {skill}
                                </span>
                            ))}
                            {mentor.expertise.length > 3 && (
                                <span className="text-xs text-gray-500">+{mentor.expertise.length - 3} more</span>
                            )}
                        </div>
                    </div>
                </div>

                {!isDeleting ? (
                    <div className="flex space-x-2">
                        <button
                            onClick={() => onEdit(mentor)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                            aria-label="Edit mentor"
                        >
                            <Edit size={18} />
                        </button>
                        <button
                            onClick={handleDeleteClick}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            aria-label="Delete mentor"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-red-600 mr-2">Confirm delete?</span>
                        <button
                            onClick={confirmDelete}
                            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                        >
                            Yes
                        </button>
                        <button
                            onClick={cancelDelete}
                            className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300"
                        >
                            No
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// Define the tabs for the admin interface
type AdminTab = 'newMentor' | 'editMentors' | 'form';

export default function MentorOnboardingPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<AdminTab>('newMentor');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [mentors, setMentors] = useState<MentorFormData[]>([]);
    const [loading, setLoading] = useState(false);

    // Image upload state
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

    // Default form data
    const defaultFormData: MentorFormData = {
        name: '',
        email: '',
        phone: '',
        title: '',
        company: '',
        expertise: [],
        bio: '',
        experience: '',
        education: '',
        linkedIn: '',
        hourlyRate: 1500,
        availability: [],
        location: '',
        profileImageUrl: ''
    };

    // Form data state
    const [formData, setFormData] = useState<MentorFormData>(defaultFormData);

    // Fetch mentors from Firebase
    const fetchMentors = async () => {
        setLoading(true);
        try {
            const mentorsRef = collection(db, 'mentor', 'mentorData', 'mentorDetails');
            const snapshot = await getDocs(mentorsRef);

            const mentorsList: MentorFormData[] = [];
            snapshot.forEach(doc => {
                const data = doc.data() as Omit<MentorFormData, 'id'>;
                mentorsList.push({
                    id: doc.id,
                    ...data
                });
            });

            setMentors(mentorsList);
        } catch (error) {
            console.error('Error fetching mentors:', error);
            setError('Failed to load mentors. Please refresh the page.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch mentors on initial load
    useEffect(() => {
        if (activeTab === 'editMentors') {
            fetchMentors();
        }
    }, [activeTab]);

    // Handle image upload
    const handleImageUpload = async (file: File | null) => {
        if (!file) {
            setImageFile(null);
            setImagePreview(null);
            setUploadStatus('idle');
            setFormData(prev => ({
                ...prev,
                profileImageUrl: ''
            }));
            return;
        }

        // File validation
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setError('Image size exceeds 5MB limit');
            setUploadStatus('error');
            return;
        }

        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            setError('Only JPG and PNG formats are supported');
            setUploadStatus('error');
            return;
        }

        setImageFile(file);
        setUploadStatus('uploading');

        // Create object URL for preview (local preview before upload)
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);

        // For form submission, we'll upload to Cloudinary when the form is submitted
        // This keeps the upload logic in one place and prevents unnecessary uploads
        // if the user doesn't complete the form
        setUploadStatus('success');
    };

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleExpertiseChange = (expertise: string) => {
        setFormData(prev => {
            const updatedExpertise = prev.expertise.includes(expertise)
                ? prev.expertise.filter(item => item !== expertise)
                : [...prev.expertise, expertise];

            return { ...prev, expertise: updatedExpertise };
        });
    };

    const handleAvailabilityChange = (day: string) => {
        setFormData(prev => {
            const updatedAvailability = prev.availability.includes(day)
                ? prev.availability.filter(item => item !== day)
                : [...prev.availability, day];

            return { ...prev, availability: updatedAvailability };
        });
    };

    const validateForm = () => {
        // Basic validation logic
        if (!formData.name || !formData.title || !formData.company) {
            setError('Please fill in all required fields');
            return false;
        }

        if (formData.expertise.length === 0) {
            setError('Please select at least one area of expertise');
            return false;
        }

        if (formData.availability.length === 0) {
            setError('Please select at least one day of availability');
            return false;
        }

        setError(null);
        return true;
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!validateForm()) {
            // Scroll to the top to show error
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setSubmitting(true);

        try {
            // Upload image to Cloudinary if not already done
            let cloudinaryUrl = formData.profileImageUrl;

            if (imageFile && (!cloudinaryUrl || cloudinaryUrl.startsWith('blob:'))) {
                setUploadStatus('uploading');
                try {
                    cloudinaryUrl = await uploadToCloudinary(imageFile);
                    setFormData(prev => ({ ...prev, profileImageUrl: cloudinaryUrl }));
                    setUploadStatus('success');
                } catch (error) {
                    console.error("Error uploading image to Cloudinary:", error);
                    setError('Failed to upload profile image. Please try again.');
                    setUploadStatus('error');
                    setSubmitting(false);
                    return;
                }
            }

            // Prepare data for Firebase
            const mentorData = {
                ...formData,
                profileImageUrl: cloudinaryUrl || '',
                updatedAt: serverTimestamp(),
            };

            if (!isEditing) {
                // Add new mentor
                mentorData.createdAt = serverTimestamp();
                mentorData.status = 'pending';

                // Save to Firestore
                try {
                    console.log('Adding new mentor:', mentorData.name);
                    const mentorDetailsRef = collection(db, 'mentor', 'mentorData', 'mentorDetails');
                    const docRef = await addDoc(mentorDetailsRef, mentorData);
                    console.log('New mentor added with ID:', docRef.id);

                    // Also create a user profile document if needed
                    if (formData.email) {
                        console.log('Creating mentor user profile...');
                        const mentorRef = doc(db, 'mentors', formData.email);
                        await setDoc(mentorRef, {
                            name: formData.name,
                            email: formData.email,
                            role: 'mentor',
                            profileComplete: true,
                            profileImageUrl: cloudinaryUrl || '',
                            createdAt: serverTimestamp()
                        }, { merge: true });
                        console.log('Mentor user profile created successfully');
                    }
                } catch (firestoreError) {
                    console.error("Error saving to Firestore:", firestoreError);
                    throw new Error(`Firestore error: ${firestoreError}`);
                }
            } else {
                // Update existing mentor
                if (!formData.id) {
                    throw new Error('Cannot update mentor: Missing ID');
                }

                try {
                    console.log('Updating mentor:', formData.name, 'ID:', formData.id);
                    const mentorDocRef = doc(db, 'mentor', 'mentorData', 'mentorDetails', formData.id);

                    // Remove the id from the data before updating
                    const { id, ...dataWithoutId } = mentorData;
                    await updateDoc(mentorDocRef, dataWithoutId);
                    console.log('Mentor updated successfully');

                    // Update the mentor profile if email exists
                    if (formData.email) {
                        const mentorRef = doc(db, 'mentors', formData.email);
                        await setDoc(mentorRef, {
                            name: formData.name,
                            email: formData.email,
                            profileImageUrl: cloudinaryUrl || '',
                            updatedAt: serverTimestamp()
                        }, { merge: true });
                    }
                } catch (firestoreError) {
                    console.error("Error updating Firestore document:", firestoreError);
                    throw new Error(`Firestore update error: ${firestoreError}`);
                }
            }

            setSubmitted(true);
        } catch (error) {
            console.error("Error saving mentor data:", error);
            setError('There was an error submitting your profile. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditMentor = (mentor: MentorFormData) => {
        setFormData(mentor);
        setIsEditing(true);
        setImagePreview(mentor.profileImageUrl || null);
        setActiveTab('form');
    };

    const handleDeleteMentor = async (mentorId: string) => {
        try {
            // Find the mentor to delete
            const mentorToDelete = mentors.find(m => m.id === mentorId);
            if (!mentorToDelete) {
                throw new Error('Mentor not found');
            }

            // Delete from Firestore
            const mentorDocRef = doc(db, 'mentor', 'mentorData', 'mentorDetails', mentorId);
            await deleteDoc(mentorDocRef);

            // Delete from mentors collection if email exists
            if (mentorToDelete.email) {
                const mentorUserRef = doc(db, 'mentors', mentorToDelete.email);
                await deleteDoc(mentorUserRef);
            }

            // Update the local state
            setMentors(prev => prev.filter(mentor => mentor.id !== mentorId));

            // Show success notification
            alert('Mentor deleted successfully');
        } catch (error) {
            console.error('Error deleting mentor:', error);
            alert('Failed to delete mentor. Please try again.');
        }
    };

    const resetForm = () => {
        setFormData(defaultFormData);
        setImageFile(null);
        setImagePreview(null);
        setUploadStatus('idle');
        setIsEditing(false);
        setSubmitted(false);
        setError(null);
    };

    const handleDone = () => {
        resetForm();
        if (isEditing) {
            setActiveTab('editMentors');
            fetchMentors();
        } else {
            setActiveTab('newMentor');
        }
    };

    const handleNewMentorClick = () => {
        resetForm();
        setActiveTab('form');
    };

    const handleBackButton = () => {
        if (isEditing) {
            setActiveTab('editMentors');
        } else {
            setActiveTab('newMentor');
        }
        resetForm();
    };

    if (submitted) {
        return (
            <div className="bg-gray-50 min-h-screen py-10">
                <div className="container mx-auto px-4 max-w-4xl">
                    <SubmissionSuccess
                        mentorData={formData}
                        profileImage={imagePreview}
                        isEditing={isEditing}
                        onDone={handleDone}
                    />
                </div>
            </div>
        );
    }
    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Failed to log out. Please try again.');
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className='flex justify-between items-center mb-4'>

                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Mentor Management</h1>
                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center text-sm"
                        >
                            Logout
                        </button>
                    </div>
                    {/* Tabs */}
                    {activeTab !== 'form' && (
                        <div className="flex border-b border-gray-200 mb-4">
                            <button
                                className={`py-2 px-4 mr-2 font-medium transition-colors ${activeTab === 'newMentor' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setActiveTab('newMentor')}
                            >
                                <Plus size={18} className="inline mr-2" />
                                New Mentor
                            </button>
                            <button
                                className={`py-2 px-4 font-medium transition-colors ${activeTab === 'editMentors' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => {
                                    setActiveTab('editMentors');
                                    fetchMentors();
                                }}
                            >
                                <List size={18} className="inline mr-2" />
                                Edit Mentors
                            </button>
                        </div>
                    )}

                    {/* Back button when in form view */}
                    {activeTab === 'form' && (
                        <button
                            onClick={handleBackButton}
                            className="flex items-center text-primary hover:underline mb-4"
                        >
                            <ChevronLeft size={16} className="mr-1" />
                            Back to {isEditing ? 'Mentor List' : 'Options'}
                        </button>
                    )}

                    {/* Tab content */}
                    {activeTab === 'newMentor' && (
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">Add a New Mentor</h2>
                            <p className="text-gray-600 mb-6">
                                Create a new mentor profile by filling out the mentor details form. You'll be able to add all necessary information including profile picture, expertise areas, and availability.
                            </p>
                            <button
                                onClick={handleNewMentorClick}
                                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors flex items-center"
                            >
                                <Plus size={18} className="mr-2" />
                                Add New Mentor
                            </button>
                        </div>
                    )}

                    {activeTab === 'editMentors' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Manage Existing Mentors</h2>

                            {loading ? (
                                <div className="flex items-center justify-center py-10">
                                    <Loader className="w-8 h-8 text-primary animate-spin" />
                                    <span className="ml-3 text-gray-600">Loading mentors...</span>
                                </div>
                            ) : mentors.length === 0 ? (
                                <div className="bg-gray-50 p-8 text-center rounded-lg">
                                    <p className="text-gray-500 mb-4">No mentors found in the database. Add a new mentor to get started.</p>
                                    <button
                                        onClick={handleNewMentorClick}
                                        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors flex items-center mx-auto"
                                    >
                                        <Plus size={18} className="mr-2" />
                                        Add First Mentor
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <div className="mb-4 flex justify-between items-center">
                                        <p className="text-gray-600">Showing {mentors.length} mentors</p>
                                        <button
                                            onClick={handleNewMentorClick}
                                            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center text-sm"
                                        >
                                            <Plus size={16} className="mr-1" />
                                            Add New
                                        </button>
                                    </div>

                                    <div className="divide-y divide-gray-100">
                                        {mentors.map(mentor => (
                                            <MentorListItem
                                                key={mentor.id}
                                                mentor={mentor}
                                                onEdit={handleEditMentor}
                                                onDelete={handleDeleteMentor}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
                        <div className="flex items-center">
                            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                            <p className="text-red-700">{error}</p>
                        </div>
                    </div>
                )}

                {/* Main Form */}
                {activeTab === 'form' && (
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                            {isEditing ? 'Edit Mentor Profile' : 'New Mentor Profile'}
                        </h2>



                        {/* Section: Personal Information */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                                Personal Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name*
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="e.g., 8080899428"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="City, Country"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        LinkedIn Profile URL
                                    </label>
                                    <input
                                        type="url"
                                        name="linkedIn"
                                        value={formData.linkedIn}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="https://linkedin.com/in/yourprofile"
                                    />
                                </div>
                            </div>
                            {/* Profile Image Upload */}
                            <ImageUpload
                                onImageUpload={handleImageUpload}
                                imagePreview={imagePreview}
                                uploadStatus={uploadStatus}
                            />
                        </div>

                        {/* Section: Professional Information */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                                Professional Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Professional Title*
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="e.g., Senior Finance Manager, Chartered Accountant"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Company/Organization*
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Your current company"
                                        required
                                    />
                                </div>

                                {/* <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Education Background
                                    </label>
                                    <textarea
                                        name="education"
                                        value={formData.education}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        rows={5}
                                        placeholder="Share your educational qualifications, institutions, certifications, etc."
                                    />
                                </div> */}

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Areas of Expertise*
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        {EXPERTISE_AREAS.map((area) => (
                                            <div key={area} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={`expertise-${area}`}
                                                    checked={formData.expertise.includes(area)}
                                                    onChange={() => handleExpertiseChange(area)}
                                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                                />
                                                <label htmlFor={`expertise-${area}`} className="ml-2 text-sm text-gray-700">
                                                    {area}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Professional Bio
                                    </label>
                                    <div className="mb-1 flex items-center text-xs text-gray-500">
                                        <Info className="w-3 h-3 mr-1" />
                                        <span>Describe background, expertise, and what makes a great mentor</span>
                                    </div>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        rows={4}
                                    />
                                </div> */}

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Professional Experience*
                                    </label>
                                    <div className="mb-1 flex items-center text-xs text-gray-500">
                                        <Info className="w-3 h-3 mr-1" />
                                        <span>Share work experience relevant to mentoring areas</span>
                                    </div>
                                    <textarea
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        rows={4}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Mentorship Details */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                                Mentorship Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Hourly Rate (₹)*
                                    </label>
                                    <input
                                        type="number"
                                        name="hourlyRate"
                                        value={formData.hourlyRate}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        min="500"
                                        required
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Recommended rate range: ₹1,000 - ₹3,000 per hour
                                    </p>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Availability*
                                    </label>
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <p className="text-sm text-gray-500 mb-3">
                                            Select the days generally available for mentoring sessions
                                        </p>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                                                <div key={day} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id={`day-${day}`}
                                                        checked={formData.availability.includes(day)}
                                                        onChange={() => handleAvailabilityChange(day)}
                                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                                    />
                                                    <label htmlFor={`day-${day}`} className="ml-2 text-sm text-gray-700">
                                                        {day}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
                            <p className="text-sm text-gray-500 mb-4 md:mb-0 md:mr-4">
                                {isEditing
                                    ? 'Update this mentor profile with the latest information.'
                                    : 'By submitting this form, you agree to our Terms of Service and Privacy Policy. The mentor profile will be reviewed before being approved.'}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    type="button"
                                    onClick={handleBackButton}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    disabled={submitting}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center"
                                    disabled={submitting}
                                >
                                    {submitting ? (
                                        <>
                                            <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                                            {isEditing ? 'Updating...' : 'Submitting...'}
                                        </>
                                    ) : (
                                        isEditing ? 'Update Mentor' : 'Add Mentor'
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}