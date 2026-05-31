import { createUserProfile } from "@/queries/user/user_profile";
import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const provider = new GoogleAuthProvider();

// export const signInWithGoogle = async () => {
//     const result = await signInWithPopup(auth, provider)

//     const user = result.user

//     return {
//         uid: user.uid,
//         displayName: user.displayName,
//         email: user.email,
//         photoURL: user.photoURL,
//     }
// }

export async function signInWithGoogle(extraData?: {
  university: string;
  degree: string;
}) {
  const result = await signInWithPopup(auth, provider);

  const user = result.user;

  if (extraData) {
    await createUserProfile({
      uid: user.uid,
      university: extraData.university,
      degree: extraData.degree,
    });
  }
}

export const logout = async () => {
  if (!auth) {
    return;
  }

  return signOut(auth);
};
