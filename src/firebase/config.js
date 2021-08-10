import firebase from "firebase";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyD8cQ7mKyX562PCi7l5nZMRxRI1nfKzb6k",
    authDomain: "chat-app-18a58.firebaseapp.com",
    projectId: "chat-app-18a58",
    storageBucket: "chat-app-18a58.appspot.com",
    messagingSenderId: "196301988622",
    appId: "1:196301988622:web:cef4957d8416711850ad5f",
    measurementId: "G-FN578JE12C"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator("http://localhost:9099", { disableWarnings: true });
if (window.location.hostname === "localhost") {
    db.useEmulator("localhost", 8080);
}

export { auth, db };
export default firebase;
