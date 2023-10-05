import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCrXbgrgnkGFfPkbHdJ5oRD4ezbv5ypWbE",
  authDomain: "playmusichtml.firebaseapp.com",
  projectId: "playmusichtml",
  storageBucket: "playmusichtml.appspot.com",
  messagingSenderId: "485050816009",
  appId: "1:485050816009:web:c1630df9ed354c33d98ad8",
  measurementId: "G-DZ88CYJF8L"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase authentication
const auth = getAuth(app);
const db = getFirestore(app);

// Get HTML elements
const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const signupForm = document.getElementById("signup-form");
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
const logoutButton = document.getElementById("logout-button");
var createPlaylistButton = document.getElementById("createplaylist");

// Function to handle login
function handleLogin(event) {
  event.preventDefault(); // Prevent form submission
  const email = loginEmail.value;
  const password = loginPassword.value;
  
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      let user = auth.currentUser;
      alert("Logged in:", user);
    })
    .catch((error) => {
      alert("Login error:", error);
    });
}
function handlereset(event) {
  event.preventDefault();
  const email = .value
}

// Function to handle signup
function handleSignup(event) {
  event.preventDefault(); // Prevent form submission
  const email = signupEmail.value;
  const password = signupPassword.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      let user = auth.currentUser;
      alert("Signed up:", user);
      return userCredential.user.updateProfile({
        displayName: document.getElementById("displayname").value
      })
    })
    .catch((error) => {
      alert("Signup error:", error);
    });
}
function logout(event) {
  event.preventDefault();
  signOut(auth).then(() => {
    // Sign-out successful.
    alert("Log Out")
  }).catch((error) => {
    alert("a error happened when loging out", error)
  });
}

// Attach event listeners to forms
loginForm.addEventListener("submit", handleLogin);
signupForm.addEventListener("submit", handleSignup);
let user = firebase.auth().currentUser;

function createPlaylistInFirestore() {
    const nameofplaylist = prompt("Name of new playlist?");
    const urltonewplaylistimg = prompt("URL for the playlist image");
  
    if (nameofplaylist && urltonewplaylistimg) {
      // Replace 'userId123' with the actual user ID or identifier
      const userId = user.uid;
  
      // Define the playlist data
      const playlistData = {
        name: nameofplaylist,
        imageUrl: urltonewplaylistimg,
        // Add more properties as needed
      };
  
      // Create a reference to the "playlists" collection
      const playlistsCollection = collection(db, "playlists");
  
      // Add the playlist data to Firestore
      addDoc(playlistsCollection, {
        userId: userId,
        data: playlistData
      })
        .then(() => {
          alert("Playlist data saved in Firestore.");
          // Optionally, you can reload the page or update the UI here
        })
        .catch((error) => {
          alert("Error adding playlist data: ", error);
        });
    }
  }
 createPlaylistButton.addEventListener("submit", createPlaylistInFirestore);