import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';


export const createUserDocument = async (
    roleType: 'mentor' | 'mentee', 
    userId: string, 
    name: string, 
    email: string
  ) => {
    const userRef = doc(db, `${roleType}/${roleType}Data/userData/${userId}`);
    
    await setDoc(userRef, {
      name,
      email,
      role: roleType,
    });
  };