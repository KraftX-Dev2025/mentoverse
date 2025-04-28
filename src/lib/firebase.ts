import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAMr9wFFYxzxRsbuHefOJifVibEum_qNeQ",
    authDomain: "mentoverse-web.firebaseapp.com",
    projectId: "mentoverse-web",
    storageBucket: "mentoverse-web.firebasestorage.app",
    messagingSenderId: "361456596911",
    appId: "1:361456596911:web:4e23ba98b5bff7e663a15a",
    measurementId: "G-3BMJBJFL2Y"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
