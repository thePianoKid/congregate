import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCXHAq9TJ9hmDbZrSkFqQSIvQmro0ev0IY",
    authDomain: "instagram-clone-52b49.firebaseapp.com",
    databaseURL: "https://instagram-clone-52b49.firebaseio.com",
    projectId: "instagram-clone-52b49",
    storageBucket: "instagram-clone-52b49.appspot.com",
    messagingSenderId: "300843470641",
    appId: "1:300843470641:web:84ac833da866b027b2ea10",
    measurementId: "G-4LRWV70ZE4"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
