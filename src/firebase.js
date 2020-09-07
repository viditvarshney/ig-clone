import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD9vQmFW-UX2DlHu4rrBwQySdUZZo978oo",
  authDomain: "clone-ig.firebaseapp.com",
  databaseURL: "https://clone-ig.firebaseio.com",
  projectId: "clone-ig",
  storageBucket: "clone-ig.appspot.com",
  messagingSenderId: "344220243543",
  appId: "1:344220243543:web:61648f9506ec4292dc7512",
  measurementId: "G-LV5DYXFPZV",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();
const db = firebaseApp.firestore();

export { db, auth, storage };
