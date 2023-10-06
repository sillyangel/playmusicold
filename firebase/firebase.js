import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";

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
 
 // Firebase initialization code (already defined)
 
 // Check for user authentication when the page is loadedMake sure 'app' is properly initialized
 
 auth.onAuthStateChanged(async (user) => {
   if (user) {
     // User is authenticated
     const userId = user.uid;
     // Check if the user has a playlist (assuming you have a 'playlists' collection)
     const playlistsCollection = collection(db, "playlists");
     const q = query(playlistsCollection, where("userId", "==", userId));
 
     try {
       const querySnapshot = await getDocs(q);
       if (!querySnapshot.empty) {
         // User has a playlist, load and display it
         querySnapshot.forEach((doc) => {
           const playlistData = doc.data();
           // Load and display the playlist data as needed
           console.log("Loaded playlist:", playlistData);
           displayUserPlaylists(userId);
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

 auth.onAuthStateChanged(async (user) => {
  if (user) {
    const nameu = document.getElementById('username');
    var divsl = document.getElementById("lisuf");
    nameu.innerHTML = ''
    nameu.innerHTML = `${user.email}`
    divsl.style.display = "none";

  } else {
    const nameu = document.getElementById('username');  
    nameu.innerHTML = "Not Logged In"
  }
 });
 
 const playlistContainer = document.getElementById("playlistContainer"); // Assuming you have a container in your HTML with this ID

 // Function to retrieve and display playlist data for a specific user
 async function displayUserPlaylists(userId) {
   // Query Firestore to get playlist data for the specific user
   const playlistsCollection = collection(db, "playlists");
   const q = query(playlistsCollection, where("userId", "==", userId));
   const querySnapshot = await getDocs(q);
 
   // Clear existing content in the playlistContainer
   playlistContainer.innerHTML = '';
 
   // Loop through the retrieved documents and create buttons
   querySnapshot.forEach((doc) => {
     const playlistData = doc.data();
 
     // Create a button for each playlist
     const button = document.createElement("button");
     button.setAttribute("src", "playlistcustom"); // Set the 'src' attribute
 
     const image = document.createElement("img");
     image.setAttribute("src", playlistData.imageUrl); // Set the 'src' attribute for the image
     button.appendChild(image); // Append the image to the button
 
     // Set the button's text (playlist name)
     button.textContent = playlistData.name;
 
     // Add a click event listener to the button if needed
     button.addEventListener("click", () => {
       // Handle button click here, e.g., navigate to the playlist
     });
 
     // Append the button to the container
     playlistContainer.appendChild(button);
   });
 }
 
 // Example usage: Call the function to display playlists for a specific user (replace 'userId123' with the actual user ID)