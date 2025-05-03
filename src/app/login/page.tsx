'use client';
import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { auth, db } from '@/lib/firebase';
import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { getDoc, doc } from 'firebase/firestore';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                setUser(null);
                router.push('/login');
                return;
            }

            setIsLoading(true);

            try {
                const isAdmin = currentUser.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

                if (isAdmin) {
                    setUser(currentUser);
                    router.push('/mentor-onboarding');
                    return;
                }

                const menteeUserRef = doc(db, 'mentee', 'menteeData', 'userData', currentUser.uid);
                const mentorUserRef = doc(db, 'mentor', 'mentorData', 'userData', currentUser.uid);

                const [menteeDocSnap, mentorDocSnap] = await Promise.all([
                    getDoc(menteeUserRef),
                    getDoc(mentorUserRef),
                ]);

                if (menteeDocSnap.exists() || mentorDocSnap.exists()) {
                    console.log('User is authenticated and exists in the database.');
                    setUser(currentUser);
                    router.push('/dashboard');
                } else {
                    console.log('User is authenticated but not registered.');
                    await signOut(auth);
                    setUser(null);
                    router.push('/login');
                }

            } catch (error) {
                console.error('Error during auth check:', error);
                setUser(null);
                router.push('/login');
            } finally {
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, [router]);


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (error: any) {
            console.error('Error logging in:', error.message);
            alert(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push('/');
        } catch (error: any) {
            console.error('Google login error:', error.message);
            alert(error.message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f5ede3] px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Login to Mentoverse</h2>
                <form onSubmit={handleLogin} className="space-y-4">
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
                        Login
                    </button>
                </form>

                <div className="mt-6 flex items-center justify-center">
                    <span className="text-sm text-gray-500">OR</span>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="mt-4 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                    <FcGoogle size={20} />
                    Login with Google
                </button>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don&apos;t have an account?{' '}
                    <a href="/signup" className="font-medium text-purple-600 hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
}
