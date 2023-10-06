import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";


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
const auth = getAuth();
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
    const user = userCredential.user;
    alert("Logged in as: " + user.email);
    // Update the UI with user information
  })
  .catch((error) => {
    alert("Login error: " + error.message);
  });

}
function handlereset(event) {
  event.preventDefault();
  const email = emailforreset.value; // Assuming you have an element with id "emailforreset"
  
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password reset email sent. Check your inbox.");
    })
    .catch((error) => {
      alert("Error sending password reset email: " + error.message);
    });
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
      alert("Signup error:", error.message);
    });
}
function logout(event) {
  event.preventDefault();
  signOut(auth).then(() => {
    // Sign-out successful.
    alert("Log Out")
  }).catch((error) => {
    alert("a error happened when loging out", error.message)
  });
}

// Attach event listeners to forms
loginForm.addEventListener("submit", handleLogin);
signupForm.addEventListener("submit", handleSignup);
logoutButton.addEventListener("click", logout);


async function createPlaylistInFirestore() {
  const nameofplaylist = prompt("Name of new playlist?");
  const urltonewplaylistimg = prompt("URL for the playlist image");
  const user = auth.currentUser;
  if (nameofplaylist && urltonewplaylistimg) {
    // Check the user's authentication status using your preferred method

    if (user.uid) {
      // Replace 'userId123' with the actual user ID or identifier
      const userId = user.uid;

      const playlistData = {
        name: nameofplaylist,
        imageUrl: urltonewplaylistimg,
        // Add more properties as needed
      };

      const playlistsCollection = collection(db, "playlists");

      try {
        await addDoc(playlistsCollection, {
          userId: userId,
          data: playlistData,
        });
        alert("Playlist data saved in Firestore.");
        // Optionally, you can reload the page or update the UI here
      } catch (error) {
        alert("Error adding playlist data: " + error.message);
      }
    } else {
      alert("You need to be logged in to create a playlist.");
    }
  }
}


 createPlaylistButton.addEventListener("click", createPlaylistInFirestore);

 // Check for user authentication when the page is loaded
auth.onAuthStateChanged(async (user) => {
  if (user) {
    // User is authenticated
    const userId = auth.currentUser.uid;

    // Check if the user has a playlist (assuming you have a 'playlists' collection)
    const playlistsCollection = collection(db, "playlists");
    const query = query(playlistsCollection, where("userId", "==", userId));

    try {
      const querySnapshot = await getDocs(query);
      if (!querySnapshot.empty) {
        // User has a playlist, load and display it
        querySnapshot.forEach((doc) => {
          const playlistData = doc.data();
          // Load and display the playlist data as needed
          console.log("Loaded playlist:", playlistData);
        });
      } else {
        // User doesn't have a playlist
        console.log("User doesn't have a playlist.");
      }
    } catch (error) {
      console.error("Error checking for playlist:", error);
    }
  } else {
    // User is not authenticated
    console.log("User is not authenticated.");
  }
});
