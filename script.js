console.log("Lets write some javascript");
let songs;
let currentSong = new Audio();
function secondsToMinutesSeconds(totalSeconds) { // It is used for converting seconds to minute seconds.
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
    
    let a = await fetch("https://debarghya21.github.io/My-Spotify-Clone/songs");
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
const playMusic = (track,pause=false)=>{ // It is used for playing the music and showing the name.
    //let audio = new Audio("/songs/"+track);
    currentSong.src="/My-Spotify-Clone/songs/"+track;
    if(!pause){
    currentSong.play();
    play.src="pause.svg";
    }
    document.querySelector(".songinfo").innerHTML=decodeURI(track);
    document.querySelector(".songtime").innerHTML="00:00 / 00:00";
}
async function main() {
    songs = [
        "Amar%20Swapna%20Tumi%20Ogo.mp3",
        "Asha%20Chhilo%20Bhalobasa%20Chhilo.mp3",
        "Bheegi%20Bheegi%20Raaton%20Mein.mp3",
        "Prithibi%20Bodle%20Gechhe.mp3",
        "Raat%20Kali%20Ek.mp3",
        "Roop%20Tera%20Mastana.mp3",
        "Yeh%20Shaam%20Mastani.mp3"
      ];
    console.log(songs);
    playMusic(songs[0],true);
    let songUL = document.querySelector(".songLists").getElementsByTagName("ul")[0];
    for (const song of songs) { // It is used for displaying the songs in the songlist.
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
   Array.from(document.querySelector(".songLists").getElementsByTagName("li")).forEach(e=>{ // It is used for playing music on clicking.
    e.addEventListener("click",element => {
        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
} )
   })
   play.addEventListener("click", ()=>{ // It is used for handling the play and the pause button.
    if(currentSong.paused){
        currentSong.play();
        play.src="pause.svg";
    } else {
        currentSong.pause();
        play.src="play.svg";
    }
   })
   currentSong.addEventListener("timeupdate", ()=>{ // It is used for time update on the top of the seekbar.
    console.log(currentSong.currentTime, currentSong.duration)
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
    document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100 + "%"
})
document.querySelector(".seekbar").addEventListener("click", e=>{ // It helps to forward the music in the seekbar.
    let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent)/100;
    
})
document.querySelector(".hamburger").addEventListener("click", ()=>{ // It is used to make the hamburger icon functional incase of small screen.
    document.querySelector(".left").style.left="0";
})
document.querySelector(".close").addEventListener("click", ()=>{ // It is used to make the close button functional incase of small screen.
    document.querySelector(".left").style.left="-120%";
})
previous.addEventListener("click", ()=>{ // It is used for playing the previous song.
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if(index - 1 >= 0){
        playMusic(songs[index-1]);
    }
})
next.addEventListener("click", ()=>{ // It is used for playing the next song.
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if(index + 1 < songs.length ){
        playMusic(songs[index+1]);
    }
})
}

main()
