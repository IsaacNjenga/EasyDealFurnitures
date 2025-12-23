import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../FirebaseProvider";

//get ID token and send to backend
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken(); //issued by firebase
    return { user: result.user, idToken };
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};
