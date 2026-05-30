import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/services/firebase/firebase";

type UserProfile = {
    uid: string,
    university: string,
    degree: string
}

export async function createUserProfile(data: UserProfile) {
    await setDoc(doc(db, "users", data.uid), {
        university: data.university,
        degree: data.degree,
        createdAt: serverTimestamp()
    });
}

export async function getUserProfile(uid: string) {
    const snapshot = await getDoc(doc(db, "users", uid));

    return !snapshot.exists() ? null : snapshot.data();
}