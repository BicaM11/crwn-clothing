import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDE6GnEDiCl2paF6OV_GL01Vg8aTpYT3ec",
  authDomain: "crwn-db-a4422.firebaseapp.com",
  projectId: "crwn-db-a4422",
  storageBucket: "crwn-db-a4422.appspot.com",
  messagingSenderId: "527339303533",
  appId: "1:527339303533:web:b12d6ab003dc0fddbec564",
  measurementId: "G-GGD2WFMQ53",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
