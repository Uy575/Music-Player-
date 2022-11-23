const imgContainer = document.getElementById('imgContainer');
const musicContainer = document.getElementById('musicContainer');
const songAndArtist = document.getElementById('songAndArtist');
const songName = document.getElementById('songName');
const artistName = document.getElementById('artistName');
const currentDuration = document.getElementById('currentDuration');
const fullTime = document.getElementById('fullTime');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progressBar');
const icons = document.getElementById('icons');
const audio = document.getElementById('audio');
const backward = document.getElementById('backward');
const play = document.getElementById('play');
const forward = document.getElementById('forward');
const imgInside = document.getElementById('imgInside');


const songs = [
    {
        img : 'jacinto-1',
        songName : 'Ice And Fire',
        artistName : 'Usama', 
    },
    {
        img : 'jacinto-2',
        songName : 'Fire Inside Me',
        artistName : 'chandio', 
    },
    {
        img : 'jacinto-3',
        songName : 'Ice Outside',
        artistName : 'gujjar', 
    },
    {
        img : 'metric-1',
        songName : 'Fire vs Ice',
        artistName : 'Lashari', 
    }
];


let isplaying = false;
let songIndex = 0;
function playaud(){
   isplaying = true;
   audio.play();
   play.classList.replace('fa-circle-play','fa-circle-pause');
   play.setAttribute('title',"Pause");

}

function pause(){
   isplaying = false;
   audio.pause();
   play.classList.replace('fa-circle-pause','fa-circle-play')
   play.setAttribute('title',"Play");

}
function something(a){
    imgInside.src = `./img/${songs[a].img}.jpg`;
    songName.textContent = songs[a].songName;
    artistName.textContent = songs[a].artistName;
    audio.src = `./music/${songs[a].img}.mp3`;
    
}
function forwardSong(){
    
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    currentMinutes = 0;
    currentSeconds = 0;
    currentDuration.textContent = `${currentMinutes}:0${currentSeconds}`;
    width = 0;
    progressBar.style.width = `${width}%`;
    something(songIndex);

    if(isplaying){

        audio.play();
    }
    else{
        audio.pause();
    }


  
}

function backwordSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length -1;
    }
    currentMinutes = 0;
    currentSeconds = 0;
    currentDuration.textContent = `${currentMinutes}:0${currentSeconds}`;
    width = 0;
    progressBar.style.width = `${width}%`;
    something(songIndex);
    if(isplaying){

        audio.play();
    }
    else{
        audio.pause();
    }


}

function progressOfSong(e){
if(isplaying){
    const {currentTime,duration} = e.srcElement;
   const progressTime = (currentTime/duration)*100;
   progressBar.style.width = `${progressTime}%`;

   const finalDurationMinutes = Math.floor(duration/60);
   let fullDurationSeconds = Math.floor(duration % 60);
   if(fullDurationSeconds < 10){
    fullDurationSeconds = `0${fullDurationSeconds}`
   }
   if(fullDurationSeconds){

       fullTime.textContent = `${finalDurationMinutes}:${fullDurationSeconds}`;
   }
   const currentMinutes = Math.floor(currentTime/60);
  let currentSeconds = Math.floor(currentTime % 60);
  if(currentSeconds < 10){
   currentSeconds = `0${currentSeconds}`
  }
  currentDuration.textContent = `${currentMinutes}:${currentSeconds}`;
}
else{
    const {currentTime,duration} = e.srcElement;
    const progressTime = (currentTime/duration)*100;
    progressBar.style.width = `${progressTime}%`;
 
    const finalDurationMinutes = Math.floor(duration/60);
    let fullDurationSeconds = Math.floor(duration % 60);
    if(fullDurationSeconds < 10){
     fullDurationSeconds = `0${fullDurationSeconds}`
    }
    if(fullDurationSeconds){
 
        fullTime.textContent = `${finalDurationMinutes}:${fullDurationSeconds}`;
    }
    const currentMinutes = Math.floor(currentTime/60);
   let currentSeconds = Math.floor(currentTime % 60);
   if(currentSeconds < 10){
    currentSeconds = `0${currentSeconds}`
   }
   currentDuration.textContent = `${currentMinutes}:${currentSeconds}`;
}
 
}

function userClick(e){

    const width = this.clientWidth;
    let userClicked = e.offsetX;
    let widthchecking = (userClicked/width)*audio.duration;
    audio.currentTime = widthchecking;

}

play.addEventListener("click",()=> (isplaying? pause(): playaud()));

forward.addEventListener("click",forwardSong);
backward.addEventListener("click",backwordSong);
audio.addEventListener("timeupdate",progressOfSong);
audio.addEventListener("ended",forwardSong);
progress.addEventListener("click",userClick);
