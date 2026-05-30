import { auth } from './firebase'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

const provider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
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
    return signOut(auth)
}