import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
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

// Firebase authentication and Firestore database
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
const savebutton = document.getElementById("savebutton");
const emailforreset = document.getElementById("emailforreset");
var createPlaylistButton = document.getElementById("createplaylist");
const userdiv = document.getElementById("user");


// Function to handle login
function handleLogin(event) {
  event.preventDefault(); // Prevent form submission
  const email = loginEmail.value;
  const password = loginPassword.value;
  
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    alert("Logged in as: " + user.email);
    window.location.href = "https://sillyangel.me/"
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
      window.location.reload();
    window.location.href = "https://sillyangel.me/"
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
    window.location.href = "https://sillyangel.me/"
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
         });
         playlistdatathn(user);         
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

async function playlistdatathn(user) {
  if (user) {
    const playlistContainer = document.getElementById("playlistContainer"); // Assuming you have a container in your HTML with this ID
    const userId = user.uid;
    const playlistsCollection = collection(db, "playlists");
    const q = query(playlistsCollection, where("userId", "==", userId));
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // User has a playlist, load and display it
        querySnapshot.forEach((doc) => {
          const playlistData = doc.data().data;
  
          const button = document.createElement("button");
          button.setAttribute("id", "playlistcustom");
      
          const image = document.createElement("img");
          image.src = playlistData.imageUrl;
          image.alt = playlistData.name; 
          button.appendChild(image);
      
          button.addEventListener("click", () => {
            alert('Playlist : ' + playlistData.name + " is not available yet")
          });
      
          playlistContainer.appendChild(button);
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
};

 auth.onAuthStateChanged(async (user) => {
  if (user) {
    const nameu = document.getElementById('username');
    var divsl = document.getElementById("lisuf");
    nameu.innerHTML = ''
    nameu.innerHTML = `${user.displayName}`

  } else {
    const nameu = document.getElementById('username');  
    nameu.innerHTML = "Not Logged In"
  }
 });
 

 // if userdiv is clicked check if the user is logged if so show the settings
 auth.onAuthStateChanged(async (user) => {
  if (user) {
  const accountmain = document.getElementById("accountmainbutton");
  var home = document.getElementById("songselector");
  var search = document.getElementById("searching");
  var libaraby = document.getElementById("lilbrary");
  var login = document.getElementById("mlogin");
  var accountsettings = document.getElementById("accountsettings");

  // Define a function to handle the click event
  function handleAccountMainButtonClick() {
    home.style.display = "none";
    search.style.display = "none";
    libaraby.style.display = "none";
    login.style.display = "none";
    accountsettings.style.display = "block";
  }

  // Set the onclick property to the function reference
  accountmain.onclick = handleAccountMainButtonClick;

}});

async function updateProfileWithFormData() {
  const displayNameV = document.getElementById("displayname").value;
  const photoURLV = document.getElementById("PhotoUrl").value;
  updateProfile(auth.currentUser, {
    displayName: displayNameV, photoURL: photoURLV 
  }).then(() => {
    console.log("Updated Profile Details");
  }).catch((error) => {
    alert("a error happened when updatingProfile out ", error.message)
  });
}
savebutton.onclick = updateProfileWithFormData;

