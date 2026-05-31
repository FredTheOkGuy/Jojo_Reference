import { createUserProfile } from '@/queries/user/user_profile'
import { db, auth } from './firebase'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const provider = new GoogleAuthProvider()


export async function signInWithGoogle(extraData?: {
    university: string,
    degree: string
}){
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    const userRef = doc(db, "users", user.uid)
    const userSnapshot = await getDoc(userRef)

    if (userSnapshot.exists()) {
        return;
    }

    if (extraData){
        await createUserProfile({
            uid: user.uid,
            university: extraData.university,
            degree: extraData.degree
        })
    }
}

export const logout = async () => {
    return signOut(auth)
}