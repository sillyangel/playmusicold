var audio = document.getElementById("myAudio");
var playButton = document.getElementById("playbuttonthung");
var volumeControl = document.getElementById("volume");
var progressBar = document.getElementById("progress");
var currentTrackIndex = 0;
var audioTracks = {
    "tylerthecreator/wolf": [
        "WOLF.mp3",
        "Jamba.mp3",
        "Cowboy.mp3",
        "Awkward.mp3",
        "Domo23.mp3",
        "Answer.mp3",
        "Slater.mp3",
        "48.mp3",
        "Colossus.mp3",
        "10 PartyIsntOver_Campfire_Bimmer.mp3",
        "IFHY.mp3",
        "Pigs.mp3",
        "Parking Lot.mp3",
        "Rusty.mp3",
        "Trashwang.mp3",
        "Treehome95.mp3",
        "Tamale.mp3",
        "Lone.mp3"
    ],
    "tylerthecreator/flowerboy": [
        "01 Foreword (feat. Rex Orange County).mp3",
        "02 Where This Flower Blooms (feat. Frank Ocean).mp3",
        "Sometimes....mp3",
        "04 See You Again (feat. Kali Uchis).mp3",
        "05 Who Dat Boy (feat. A$AP Rocky).mp3",
        "06 Pothole (feat. Jaden Smith).mp3",
        "07 Garden Shed (feat. Estelle).mp3",
        "08 Boredom (feat. Rex Orange County _ Anna of the North).mp3",
        "09 I Ain_t Got Time!.mp3",
        "10 911 _ Mr. Lonely (feat. Frank Ocean _ Steve Lacy).mp3",
        "11 Droppin _ Seeds (feat. Lil Wayne).mp3",
        "November.mp3",
        "Glitter.mp3",
        "Enjoy Right Now, Today.mp3"
    ],
    "tylerthecreator/igor": [
        "01 IGOR_S THEME (feat. Lil Uzi Vert _ Kali Uchis).mp3",
        "02 EARFQUAKE (feat. Playboi Carti _ Charlie Wilson).mp3",
        "03 I THINK (feat. Solange).mp3",
        "04 BOYFRIEND (feat. Charlie Wilson _ Santigold).mp3",
        "05 RUNNING OUT OF TIME (feat. Jessy Wilson).mp3",
        "06 NEW MAGIC WAND (feat. Santigold _ Jessy Wilson).mp3",
        "07 A BOY IS A GUN_.mp3",
        "08 PUPPET (feat. Kanye West).mp3",
        "09 WHAT_S GOOD (feat. Slowthai).mp3",
        "10 GONE, GONE _ THANK YOU (feat. CeeLo Green, Cullen Omori _ La Roux).mp3",
        "11 I DON_T LOVE YOU ANYMORE (feat. Charlie Wilson, Jessy Wilson _ Solange).mp3",
        "12 ARE WE STILL FRIENDS_ (feat. Pharell Williams).mp3"
    ],
    "tylerthecreator/cherrybomb": [
        "1 Deathcamp.mp3",
        "2 Buffalo.mp3",
        "3 PILOT.mp3",
        "4 RUN.mp3",
        "5 FIND YOUR WINGS.mp3",
        "6 Cherry Bomb.mp3",
        "7 BLOW MY LOAD.mp3",
        "8 2SEATER.mp3",
        "9 THE BROWN STAINS OF DARKEESE.mp3",
        "10 F YOUNG _ PERFECT.mp3",
        "11 SMUCKERS.mp3",
        "12 KEEP DA O_S.mp3",
        "13 OKAGA, CA.mp3"
    ],
    "tylerthecreator/goblin": [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ],
    "arcticmonkeys/am": [
        "01 - Do I Wanna Know.mp3",
        "02 - R U Mine.mp3",
        "03 - One For the Road.mp3",
        "04 - Arabella.mp3",
        "05 - I Want It All.mp3",
        "06 - No. 1 Party Anthem.mp3",
        "07 - Mad Sounds.mp3",
        "08 - Fireside.mp3",
        "09 - Why'd You Only Call Me When You're High.mp3",
        "10 - Snap Out of It.mp3",
        "11 - Knee Socks.mp3",
        "12 - I Wanna Be Yours.mp3"
    ],
    "arcticmonkeys/humbug": [
        "01. My Propeller.mp3",
        "02. Crying Lightning.mp3",
        "03. Dangerous Animals.mp3",
        "04. Secret Door.mp3",
        "05. Potion Approaching.mp3",
        "06. Fire And The Thud.mp3",
        "07. Cornerstone.mp3",
        "08. Dance Little Liar.mp3",
        "09. pretty visitors.mp3",
        "10 the jeweller's hands.mp3",
        "11_red right hand(2)(2).mp3"
    ],
    "wallows/nonthinghappens": [
        "Only Friend.mp3",
        "Treacherous Doctor.mp3",
        "Sidelines.mp3",
        "Are You Bored Yet (feat. Clairo).mp3",
        "Scrawny.mp3",
        "Ice Cold Pool.mp3",
        "Worlds Apart.mp3",
        "What You Like.mp3",
        "Remember When.mp3",
        "I_m Full.mp3",
        "Do Not Wait.mp3"
    ],
    "tylerthecreator/bas": [
      ""
    ],
    "arcticmonkeys/wpsiatwin": [
      "01 The View from the Afternoon.mp3",
      "02 I Bet You Look Good on the Dancefloor.mp3",
      "03 Fake Tales of San Francisco.mp3",
      "04 Dancing Shoes.mp3",
      "05 You Probably Couldn't See for the Lights But You Were Staring.mp3",
      "06 Still Take You Home.mp3",
      "07 Riot Van.mp3",
      "08 Red Light Indicates Doors Are Secured.mp3",
      "09 Mardy Bum.mp3",
      "10 Perhaps Vampires Is a Bit Strong But.mp3",
      "11 When the Sun Goes Down.mp3",
      "12 From the Ritz to the Rubble.mp3",
      "13 A Certain Romance.mp3",
    ],
    "arcticmonkeys/fwn": [
      "01 Brainstorm.mp3",
      "02 Teddy Picker.mp3",
      "03 D is For Dangerous.mp3",
      "04 Balaclava.mp3",
      "05 Fluorescent Adolescent.mp3",
      "06 Only Ones Who Know.mp3",
      "07 Do Me a Favour.mp3",
      "08 This House Is A Circus.mp3",
      "09 If You Were There, Beware.mp3",
      "10 The Bad Thing.mp3",
      "11 Old Yellow Bricks.mp3",
      "12 505.mp3",
    ],
    "arcticmonkeys/sias": [
      ""
    ],
    "arcticmonkeys/tbhc": [
      ""
    ],
    "arcticmonkeys/car": [
      ""
    ],
    "melanie/crybaby": [],
    "melanie/k12": [],
    "melanie/portals": [],
    "theweekend/kissland": [],
    "theweekend/bbtm": [],
    "theweekend/starboy": [],
    "theweekend/afterhours": [],
    "theweekend/dawnfm": [],
    "laufey/bewitched": [],
    "laufey/eikal": [],
    "rr/llf": [],
    "rr/pemfba": [],
    "ld/sp": [],
    "ld/cc": []
};
var currentAlbum = "tylerthecreator/wolf";
var albums = [
    { artist: "Tyler, The Creator", album: "Wolf", folder: "tylerthecreator/wolf", image: "songs/tylerthecreator/wolf/albumcover.png" },
    { artist: "Tyler, The Creator", album: "Flower Boy", folder: "tylerthecreator/flowerboy", image: "songs/tylerthecreator/flowerboy/albumcover.png" },
    { artist: "Tyler, The Creator", album: "Igor", folder: "tylerthecreator/igor", image: "songs/tylerthecreator/igor/igorcover.png" },
    { artist: "Tyler, The Creator", album: "Cherry Bomb", folder: "tylerthecreator/cherrybomb", image: "songs/tylerthecreator/cherrybomb/cherrybomb.png" },
    { artist: "Tyler, The Creator", album: "Goblin", folder: "tylerthecreator/goblin", image: "songs/tylerthecreator/goblin/Goblincover.png" },
    { artist: "Arctic Monkeys", album: "AM", folder: "arcticmonkeys/am", image: "songs/arcticmonkeys/am/albumcover.jpg"},
    { artist: "Arctic Monkeys", album: "Humbug", folder: "arcticmonkeys/humbug", image: "songs/arcticmonkeys/humbug/albumcover.jpg"},
    { artist: "Wallows", album: "Nothing Happens", folder: "wallows/nonthinghappens", image: "songs/wallows/nonthinghappens/albumcover.png"},
    { artist: "Tyler, The Creator", album: "Bastard", folder: "tylerthecreator/bas", image: "songs/tylerthecreator/bas/bas.png" },
    { artist: "Arctic Monkeys", album: "WPSIATWIN", folder: "arcticmonkeys/wpsiatwin", image: "songs/arcticmonkeys/wpsiatwin/albumcover.jpg"},
    { artist: "Arctic Monkeys", album: "Favourite Worst Nightmare", folder: "arcticmonkeys/fwn", image: "songs/arcticmonkeys/fwn/albumcover.jpg"},
    { artist: "Arctic Monkeys", album: "Suck It and See", folder: "arcticmonkeys/sias", image: "songs/arcticmonkeys/sias/albumcover.jpg"},
    { artist: "Arctic Monkeys", album: "Tranquility Base Hotel & Casino", folder: "arcticmonkeys/tbhc", image: "songs/arcticmonkeys/tbhc/albumcover.png"},
    { artist: "Arctic Monkeys", album: "The Car", folder: "arcticmonkeys/car", image: "songs/arcticmonkeys/car/albumcover.jpg"},
    { artist: "Melanie Martinez", album: "Crybaby", folder: "melanie/crybaby", image: "songs/melanie/crybaby/albumcover.png"},
    { artist: "Melanie Martinez", album: "K-12", folder: "melanie/k12", image: "songs/melanie/k12/albumcover.png"},
    { artist: "Melanie Martinez", album: "Portals", folder: "melanie/portals", image: "songs/melanie/portals/albumcover.png"},
    { artist: "The weeknd", album: "Kiss Land", folder: "theweekend/kissland", image: "songs/theweekend/kissland/albumcover.png"},
    { artist: "The weeknd", album: "Beauty Behind the Madness", folder: "theweekend/bbtm", image: "songs/theweekend/bbtm/albumcover.png"},
    { artist: "The weeknd", album: "starboy", folder: "theweekend/starboy", image: "songs/theweekend/starboy/albumcover.png"},
    { artist: "The weeknd", album: "Afterhours", folder: "theweekend/afterhours", image: "songs/theweekend/afterhours/albumcover.png"},
    { artist: "The weeknd", album: "Dawnfm", folder: "theweekend/dawnfm", image: "songs/theweekend/dawnfm/albumcover.png"},
    { artist: "Laufey", album: "Bewitched", folder: "laufey/bewitched", image: "songs/laufey/bewitched/albumcover.png"},
    { artist: "Laufey", album: "Everything I know about love", folder: "laufey/eikal", image: "songs/laufey/eikal/albumcover.png"},
    { artist: "Roddy Ricch", album: "life lives fast", folder: "rr/llf", image: "songs/rr/llf/albumcover.png"},
    { artist: "Roddy Ricch", album: "Please excuse me for being antisocial", folder: "rr/pemfba", image: "songs/rr/pemfba/albumcover.png"},
    { artist: "Lemon Demon", album: "Spirit phone", folder: "ld/sp", image: "songs/ld/sp/albumcover.png"},
    { artist: "Lemon Demon", album: "Clown", folder: "ld/cc", image: "songs/ld/cc/albumcover.png"}
    // Add more albums here
];
var currentAlbumIndex = 0;
var currentTrackElements = document.querySelectorAll(".currentTrack");
var currentTrack2Elements = document.querySelectorAll(".currentTrack2");

function loadTrack() {
var trackPath = audioTracks[currentAlbum][currentTrackIndex];
audio.src = "songs/" + currentAlbum + "/" + trackPath;
audio.load();
updateTrackText();
mediathinggy();
}

function playPause() {
if (audio.paused) {
    audio.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
} else {
    audio.pause();
    playButton.innerHTML = '<i class="fas fa-play"></i>';
}
}

function setVolume() {
audio.volume = volumeControl.value;
}

function skipTrack() {
currentTrackIndex++;
if (currentTrackIndex >= audioTracks[currentAlbum].length) {
    currentTrackIndex = 0; // Loop back to the first track
}
loadTrack();
audio.play();
}

function previousTrack() {
currentTrackIndex--;
if (currentTrackIndex < 0) {
    currentTrackIndex = audioTracks[currentAlbum].length - 1; // Go to the last track
}
loadTrack();
audio.play();
}

function seek(event) {
const percent = event.offsetX / progressBar.offsetWidth;
const seekTime = percent * audio.duration;
audio.currentTime = seekTime;
}
// Modify the updateAlbumCover function
function updateAlbumCover() {
    // Get all elements with the same ID "albumCover"
    var albumCovers = document.querySelectorAll('[id="albumCover"]');
    var selectedAlbum = albums[currentAlbumIndex];

    // Loop through each element with the same ID and update its src attribute
    albumCovers.forEach(function (element) {
        element.src = selectedAlbum.image;
    });
}


// Call the updateAlbumCover function when changing albums
function nextAlbum() {
currentAlbumIndex++;
if (currentAlbumIndex >= albums.length) {
    currentAlbumIndex = 0; // Loop back to the first album
}
currentAlbum = albums[currentAlbumIndex].folder;
currentTrackIndex = 0;
// Check if audioTracks[currentAlbum] exists before loading
if (audioTracks[currentAlbum]) {
    loadTrack();
    audio.play();
    // Update the album cover image
    updateAlbumCover();
} else {
    // Handle the case when the album is not found
    console.error("Album not found: " + currentAlbum);
}
}

function previousAlbum() {
currentAlbumIndex--;
if (currentAlbumIndex < 0) {
    currentAlbumIndex = albums.length - 1; // Go to the last album
}
currentAlbum = albums[currentAlbumIndex].folder;
currentTrackIndex = 0;
loadTrack();
audio.play();
// Update the album cover image
updateAlbumCover();
}
audio.addEventListener("timeupdate", function() {
var currentTime = audio.currentTime;
var duration = audio.duration;
// Check if duration is a finite number before calculating percentComplete
if (isFinite(duration)) {
    var percentComplete = (currentTime / duration) * 100;
    progressBar.value = percentComplete;
}
});
// Load the first track when the page loads
loadTrack();
// Event listener for when the current track ends
audio.addEventListener("ended", function() {
// Play the next track automatically
skipTrack();
});



function updateTrackText() {
    var artist = albums[currentAlbumIndex].artist;
    var track = audioTracks[currentAlbum][currentTrackIndex];
    
    // Loop through each element with class "currentTrack" and update its content
    currentTrackElements.forEach(function (element) {
        element.textContent = artist + " - " + track;
    });

    // Loop through each element with class "currentTrack2" and update its content
    currentTrack2Elements.forEach(function (element) {
        element.textContent = artist + " - " + track;
    });
}

// Call the function to update both elements
updateTrackText();
// Add these lines to update the song duration and current time
var songTimeElement = document.getElementById("songTime");
var songDurationElement = document.getElementById("songDuration");
audio.addEventListener("timeupdate", function() {
var currentTime = audio.currentTime;
var duration = audio.duration;
// Check if duration is a finite number before calculating percentComplete
if (isFinite(duration)) {
    var percentComplete = (currentTime / duration) * 100;
    progressBar.value = percentComplete;
    // Update the song duration and current time
    var currentMinutes = Math.floor(currentTime / 60);
    var currentSeconds = Math.floor(currentTime % 60);
    var durationMinutes = Math.floor(duration / 60);
    var durationSeconds = Math.floor(duration % 60);
    // Display current time and duration in the format "M:SS"
    songTimeElement.textContent = currentMinutes + ":" + (currentSeconds < 10 ? "0" : "") + currentSeconds;
    songDurationElement.textContent = durationMinutes + ":" + (durationSeconds < 10 ? "0" : "") + durationSeconds;
}
});
function albumsec(albumnumber) {
currentAlbumIndex = albumnumber
currentAlbum = albums[currentAlbumIndex].folder;
currentTrackIndex = 0;
loadTrack();
audio.play();
// Update the album cover image
updateAlbumCover();

}
function mediathinggy() {
if ("mediaSession" in navigator) {
navigator.mediaSession.metadata = new MediaMetadata({
title: audioTracks[currentAlbum][currentTrackIndex],
artist: albums[currentAlbumIndex].artist,
album: albums[currentAlbumIndex].album,
artwork: [
{
src: albums[currentAlbumIndex].image,
sizes: "96x96",
type: "image/png",
},
{
src: albums[currentAlbumIndex].image,
sizes: "128x128",
type: "image/png",
},
{
src: albums[currentAlbumIndex].image,
sizes: "192x192",
type: "image/png",
},
{
src: albums[currentAlbumIndex].image,
sizes: "256x256",
type: "image/png",
},
{
src: albums[currentAlbumIndex].image,
sizes: "384x384",
type: "image/png",
},
{
src: albums[currentAlbumIndex].image,
sizes: "512x512",
type: "image/png",
},
],
});


navigator.mediaSession.setActionHandler("play", () => {
playPause();
});
navigator.mediaSession.setActionHandler("pause", () => {
playPause();
});
/*
navigator.mediaSession.setActionHandler("seekbackward", () => {

});
navigator.mediaSession.setActionHandler("seekforward", () => {

});
navigator.mediaSession.setActionHandler("seekto", () => {

});*/
navigator.mediaSession.setActionHandler("previoustrack", () => {
previousTrack();
});
navigator.mediaSession.setActionHandler("nexttrack", () => {
skipTrack();
});

}
}
function switchthingy(st) {
var home = document.getElementById("songselector")
var search = document.getElementById("searching")
var libaraby = document.getElementById("lilbrary")
if (st == "hom") {
home.style.display = "block";
search.style.display = "none";
libaraby.style.display = "none";
} else if (st == "lil"){
home.style.display = "none";
search.style.display = "none";
libaraby.style.display = "block";
} else {
home.style.display = "none";
search.style.display = "block";
libaraby.style.display = "none";
}


}