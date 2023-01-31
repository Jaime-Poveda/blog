
// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyBhmv5vLy8m7KUYQ4jsGXMAWlUEqO2y6os",
  authDomain: "blog-f108e.firebaseapp.com",
  projectId: "blog-f108e",
  storageBucket: "blog-f108e.appspot.com",
  messagingSenderId: "992813154494",
  appId: "1:992813154494:web:392d260b33ca010456deef"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
let db = firebase.firestore();