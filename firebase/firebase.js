import firebase from "firebase";
import "firebase/firestore";
import config from "../config";
import store from "../redux/store";
import { setIsSignedIn } from "../redux/appSlice";

//redux
const dispatch =  store.dispatch;

const firebaseConfig = {
  apiKey: config.FB_API_KEY,
  authDomain: config.FB_AUTH_DOMAIN,
  projectId: config.FB_PROJECT_ID,
  storageBucket: config.FB_STORAGEBUCKET,
  messagingSenderId: config.FB_MESSAGING_ID,
  appId: config.FB_APP_ID,
  measurementId: config.FB_MEASUREMENT_ID,
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
export const auth = firebase.auth();

//user auth status tracker
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log(`User: ${user.email} is signed in`);
    dispatch(setIsSignedIn(true));
  } else {
    console.log("No user is signed in at this time");
    dispatch(setIsSignedIn(false));
  }
});

export default firebase;