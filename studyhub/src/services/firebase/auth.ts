import { auth, isFirebaseConfigured } from './firebase'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

const provider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth) {
        throw new Error(
            "Firebase is not configured. Set the VITE_FIREBASE_* values in .env before using Google sign-in.",
        )
    }

    const result = await signInWithPopup(auth, provider)

    const user = result.user

    return {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
    }
}

export const logout = async () => {
    if (!auth) {
        return
    }

    return signOut(auth)
}