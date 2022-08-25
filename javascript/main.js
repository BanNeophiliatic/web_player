//Imported functions from export.js
import { createList, findFileName, parseFileName, parseTime, audioData, playlistsData } from "./functions/export.js";

//Variables
var currentSong = null, currentSongIndex = -2, currentPlaylist = null, paused = false, songs = {}, playlists = {};

//HTML elements
var pauseBtn = document.getElementById("pauseBtn");
var previousBtn = document.getElementById("previousBtn");
var nextBtn = document.getElementById("nextBtn");
var loopBtn = document.getElementById("loopBtn");
var currentSongName = document.getElementById("currentSongName");
var progressBar = document.getElementById("progressBar");
var currentTime = document.getElementById("currentTime");
var duration = document.getElementById("duration");


/*
    Changes the time in the progress bar and in the song if there's any input

    time(int): Value to set in the bar
    changeSongTime(bool): If input from the progress bar is received, this bool is triggered and the song time is changed
*/
async function updateSongBar(time, changeSongTime){
    if(time == undefined) return;

    if(changeSongTime){
        if(!paused) currentSong.pause();
        currentSong.currentTime = time;
        if(!paused) currentSong.play();
    }

    progressBar.value = time;
    progressBar.max = currentSong.duration;

    currentTime.innerText = parseTime(time);
    duration.innerText = parseTime(currentSong.duration);

    if(currentSong.ended){
        if(currentSong.loop == false){
            currentSong = null;

            progressBar.value = "0";
            currentSongName.innerText = "";

            currentTime.innerText = "00:00";
            duration.innerText = "00:00";

            changeSongByIndex(1);
        }
    }
}

/*
    Change the song that's currently playing

    song(string): Path to the audio file
    name(string): Name of the song for the button
    index(int): Index of the song in the list
*/
async function changeSong(song, name, index, playlist){
    if(currentSongName.innerText == name) return;
    if(paused) pauseSong();
    if(currentSong != null) currentSong.pause();
    
    let s = new Audio(song);
    
    currentSong = s;

    currentSongName.innerText = name;
    currentSongIndex = index;
    progressBar.value = 0;
    currentPlaylist = playlist;

    currentSong.play();
    currentSong.onloadeddata = function() {
        currentSong.addEventListener("timeupdate", () => {
            updateSongBar(currentSong.currentTime, false);
        });
    };
}

/*
    Pauses or resumes the song (depending on the state of the song)
*/
async function pauseSong(){
    if(currentSong == null) return;

    if(paused){
        currentSong.play();
        paused = false;

        pauseBtn.setAttribute("mode", "pause");
    }else{
        currentSong.pause();
        paused = true;

        pauseBtn.setAttribute("mode", "resume");
    }
}

/*
    Loops the current song
*/
async function loopSong(){
    if(currentSong == null) return;
    
    if(currentSong.loop){
        currentSong.loop = false;
        
        loopBtn.setAttribute("mode", "idle");
    }else{
        currentSong.loop = true;

        loopBtn.setAttribute("mode", "loop");
    }
}

/*
    This function is used by the skip buttons, change the song with the given id

    index(int): Index of the song in the list
*/
async function changeSongByIndex(index){
    if(currentPlaylist[currentSongIndex + index] == undefined) return;

    changeSong(currentPlaylist[currentSongIndex + index].path, currentPlaylist[currentSongIndex + index].name, currentSongIndex + index, currentPlaylist);
}


//Listeners for the buttons
pauseBtn.addEventListener("click", pauseSong)
previousBtn.addEventListener("click", () => {
    changeSongByIndex(-1);
});
nextBtn.addEventListener("click", () => {
    changeSongByIndex(1);
});
loopBtn.addEventListener("click", () => {
    loopSong();
});
progressBar.addEventListener("click", () => {
    updateSongBar(progressBar.value, true);
});

//Loads the songs from the export.js and converts them into an object (songs)
for(let i = 0; i < audioData.length; i++){
    songs[i] = {
        "name" : parseFileName(findFileName(audioData[i])),
        "path" : "../resources/audio/" + audioData[i]
    }
}

//Loads the songs for each playlist
let int = 0;

for(let i in playlistsData){
    if(playlistsData.hasOwnProperty(i)){
        let obj = {
            "name" : parseFileName(findFileName(i)),
            "songs" : {}
        };

        for(let s in playlistsData[i]){
            if(playlistsData[i].hasOwnProperty(s)){
                obj["songs"][s] = {
                    "name" : parseFileName(findFileName(playlistsData[i][s])),
                    "path" : "../resources/audio/" + playlistsData[i][s]
                }
            }
        }

        playlists[int] = obj;
        int += 1;
    }
}

int = null;

createList(songs, "songs", false, songs, changeSong);
createList(playlists, "playlists", true, playlists, changeSong)