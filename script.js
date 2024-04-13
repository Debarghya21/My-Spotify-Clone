console.log("Lets write some javascript");
let songs;
let currentSong = new Audio();
function secondsToMinutesSeconds(totalSeconds) {
    totalSeconds = Math.round(Number(totalSeconds));

    // Calculate minutes and seconds
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;

    // Format minutes and seconds
    var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    var formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    // Return the formatted time
    return formattedMinutes + ':' + formattedSeconds;
  }
async function getSongs(){
    let a = await fetch("songs");
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = []
    for(let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs;
}
const playMusic = (track,pause=false)=>{
    //let audio = new Audio("/songs/"+track);
    currentSong.src="/songs/"+track;
    if(!pause){
    currentSong.play();
    play.src="pause.svg";
    }
    document.querySelector(".songinfo").innerHTML=decodeURI(track);
    document.querySelector(".songtime").innerHTML="00:00 / 00:00";
}
async function main() {
    songs = await getSongs()
    console.log(songs);
    playMusic(songs[0],true);
    let songUL = document.querySelector(".songLists").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `
        <li>
        <img class="invert" src="music.svg" alt="">
        <div class="info">
            <div>  ${song.replaceAll("%20"," ")}</div>
            <div>-- Kishore Kumar</div>
        </div>
        <div class="playnow">
            <span>Play</span>
            <img class="invert" src="play.svg" alt="">

            
        </div>
       </li>`
      
    }
   Array.from(document.querySelector(".songLists").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click",element => {
        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
} )
   })
   play.addEventListener("click", ()=>{
    if(currentSong.paused){
        currentSong.play();
        play.src="pause.svg";
    } else {
        currentSong.pause();
        play.src="play.svg";
    }
   })
   currentSong.addEventListener("timeupdate", ()=>{
    console.log(currentSong.currentTime, currentSong.duration)
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
    document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100 + "%"
})
document.querySelector(".seekbar").addEventListener("click", e=>{
    let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent)/100;
    
})
document.querySelector(".hamburger").addEventListener("click", ()=>{
    document.querySelector(".left").style.left="0";
})
document.querySelector(".close").addEventListener("click", ()=>{
    document.querySelector(".left").style.left="-120%";
})
previous.addEventListener("click", ()=>{
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if(index - 1 >= 0){
        playMusic(songs[index-1]);
    }
})
next.addEventListener("click", ()=>{
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if(index + 1 < songs.length ){
        playMusic(songs[index+1]);
    }
})
}

main()