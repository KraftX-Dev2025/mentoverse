'use client';

import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { createUserDocument } from '@/services/firebaseServices';
import { getDoc, doc } from 'firebase/firestore';

export default function SignupForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const menteeUserRef = doc(db, 'mentee', 'menteeData', 'userData', currentUser.uid);
                    const mentorUserRef = doc(db, 'mentor', 'mentorData', 'userData', currentUser.uid);

                    const menteeDocSnap = await getDoc(menteeUserRef);
                    const mentorDocSnap = await getDoc(mentorUserRef);

                    if (menteeDocSnap.exists() || mentorDocSnap.exists()) {
                        console.log('User is authenticated and exists in the database.');
                        router.push('/dashboard');
                    } else {
                        console.log('User is authenticated but does not exist in the database.');
                        await signOut(auth);
                        router.push('/signup');
                    }
                } catch (error) {
                    console.error('Error checking user status:', error);
                    router.push('/signup');
                }
            } else {
                router.push('/signup');
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="loading-spinner" style={{ border: '4px solid #e0e0e0', borderTop: '4px solid purple', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }}></div>
                <style jsx>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await createUserDocument('mentee', user.uid, name, email);
            router.push('/');
        } catch (error: any) {
            console.error('Error signing up:', error.message);
            alert(error.message);
        }
    };

    const handleGoogleSignup = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await createUserDocument('mentee', user.uid, user.displayName || '', user.email || '');
            router.push('/');
        } catch (error: any) {
            console.error('Google sign-in error:', error.message);
            alert(error.message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f5ede3] px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Sign up for Mentoverse</h2>
                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-purple-500 focus:ring-purple-500"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-purple-500 focus:ring-purple-500"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-purple-500 focus:ring-purple-500"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full rounded-lg bg-purple-600 py-3 text-white transition hover:bg-purple-700">
                        Sign Up
                    </button>
                </form>

                <div className="mt-6 flex items-center justify-center">
                    <span className="text-sm text-gray-500">OR</span>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleSignup}
                    className="mt-4 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                    <FcGoogle size={20} />
                    Sign up with Google
                </button>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="font-medium text-purple-600 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
