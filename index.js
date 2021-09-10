const player = {
  songs: [
    {
      id: 1,
      title: 'Vortex',
      album: 'Wallflowers',
      artist: 'Jinjer',
      duration: 242,
    },
    {
      id: 2,
      title: 'Vinda',
      album: 'Godtfolk',
      artist: 'Songleikr',
      duration: 160,
    },
    {
      id: 7,
      title: 'Shiroyama',
      album: 'The Last Stand',
      artist: 'Sabaton',
      duration: 213,
    },
    {
      id: 3,
      title: 'Thunderstruck',
      album: 'The Razors Edge',
      artist: 'AC/DC',
      duration: 292,
    },
    {
      id: 4,
      title: 'All is One',
      album: 'All is One',
      artist: 'Orphaned Land',
      duration: 270,
    },
    {
      id: 5,
      title: 'As a Stone',
      album: 'Show Us What You Got',
      artist: 'Full Trunk',
      duration: 259,
    },
  ],
  playlists: [
    { id: 1, name: 'Metal', songs: [1, 7, 4] },
    { id: 5, name: 'Israeli', songs: [4, 5] },
  ],
  playSong(song) {
    console.log("Playing " + song.title + " from " + song.album + " by " + song.artist + " | " + durationFormat(song.duration) + ".")
  },
}

function playSong(id) {
  let songIndex = player.songs.findIndex(i => i.id === id) // finds the index of the id in the songs array
  if (songIndex !== -1){
    player.playSong(player.songs[songIndex])
  }
  else{
    throw Error("Song Doesn't Exist");
  }    
  
}

function removeSong(id) {
  let songIndex = player.songs.findIndex(i => i.id === id)
  if (songIndex !== -1){
    player.songs.splice(songIndex, 1)
  }
  else {
    throw Error("Song Doesn't Exist");
  }
  let playlistIndex = -1;
  let removed = false; // Indicates if the song was removed.
  for (let i = 0; i<player.playlists.length; i++){ // Checks every playlist if it has the song.
    playlistIndex = player.playlists[i].songs.indexOf(id);
    if (player.playlists[i].songs.indexOf(id) !== -1){
      player.playlists[i].songs.splice(playlistIndex, 1);
      removed = true; 
    }
  }
  if (removed === false){
    throw Error("Song Doesn't Exist");
  }
}

function addSong(title, album, artist, duration, id) {
  let idArray = []
  for (let i = 0; i<player.songs.length; i++)
  {
    idArray.push(player.songs[i].id); // Adds to array the ids that already in use.
  }

  if (!idArray.includes(id)){

    if (!id){ // Checks if the id is given.  
      let empty = true; 
      while (empty === true){ // Generates new id.
        id = Math.floor(Math.random() * 101);
        if (!idArray.includes(id)){
          empty = false;
        }
      }
    }

    let song = {
      id: id,
      title: title,
      album: album,
      artist: artist,
      duration: durationFormatReverse(duration),
    }

    player.songs.push(song);
    return id;
  }  
  else {
    throw Error("ID Is taken.")
  }
  


}

function removePlaylist(id) {
  let playlistArray = [];
  for (let i = 0; i<player.playlists.length; i++){
    playlistArray.push(player.playlists[i].id)
  }
  if (!playlistArray.includes(id)){
    throw Error("ID is Unavailable.")
  }

  player.playlists.splice(player.playlists.indexOf(id), 1);

}

function createPlaylist(name, id) {
  let idArray = []
  for (let i = 0; i<player.playlists.length; i++)
  {
    idArray.push(player.playlists[i].id); // Adds to array the ids that already in use.
  }

  if (!idArray.includes(id)){

    if (!id){ // Checks if the id is given.  
      let empty = true; 
      while (empty === true){ // Generates new id.
        id = Math.floor(Math.random() * 101);
        if (!idArray.includes(id)){
          empty = false;
        }
      }
    }

    let playlist = 
      { id: id, name: name, songs: [] }
    

    player.playlists.push(playlist);
    return id;
  }  
  else {
    throw Error("ID Is taken.")
  }
}

function playPlaylist(id) {
  // your code here
}

function editPlaylist(playlistId, songId) {
  // your code here
}

function playlistDuration(id) {
  // your code here
}

function searchByQuery(query) {
  // your code here
}

function searchByDuration(duration) {
  // your code here
}

function durationFormat(duration) { // Converts the duration to mm:ss format
  let date = new Date(duration * 1000);
  let mm = date.getUTCMinutes();
  let ss = date.getSeconds();
  if(mm<10 && ss < 10){
    return "0" + mm + ":" + "0" + ss
  }

  if(mm<10){
    return "0" + mm + ":" + ss
  }

  if(ss<10){
    return  mm + ":" + "0" + ss
  }
  
}

function durationFormatReverse(duration){ // Converts the duration to seconds format
    let a = duration.split(':');
    let seconds = parseInt(a[0], 10)*60 + parseInt(a[1], 10);
    return seconds
}

module.exports = {
  player,
  playSong,
  removeSong,
  addSong,
  removePlaylist,
  createPlaylist,
  playPlaylist,
  editPlaylist,
  playlistDuration,
  searchByQuery,
  searchByDuration,
}
