'use client';

import DashboardPageClient from "./DashboardPageClient";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const menteeUserRef = doc(db, 'mentee', 'menteeData', 'userData', currentUser.uid);

                    const menteeDocSnap = await getDoc(menteeUserRef);

                    if (menteeDocSnap.exists()) {
                        console.log('User is authenticated and exists in the database.');
                        setUser(menteeDocSnap.data() as User);
                        router.push('/dashboard');
                    } else {
                        console.log('User is authenticated but does not exist in the database.');
                        await signOut(auth);
                        setUser(null);
                        router.push('/signup');
                    }
                } catch (error) {
                    console.error('Error checking user status:', error);
                    setUser(null);
                    router.push('/signup');
                }
            } else {
                setUser(null);
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

    return <DashboardPageClient userData={user} />;
}
