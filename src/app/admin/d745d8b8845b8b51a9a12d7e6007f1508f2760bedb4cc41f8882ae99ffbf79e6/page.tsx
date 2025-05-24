'use client';
import MentorOnboarding from '@/components/MentorOnBoarding';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Page = () => {
    const router = useRouter();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [router]);

    return <MentorOnboarding />;
};

export default Page;
