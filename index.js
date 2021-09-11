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
  let idArray = []
  for (let i = 0; i<player.playlists.length; i++)
  {
    idArray.push(player.playlists[i].id); // Adds to array the ids that already in use.
  }
  if (idArray.includes(id)){
    let playlistIndex = player.playlists.findIndex(i => i.id === id); // Finding the index of the playlist
    let songsArray = [];
    
    for (let i =0; i<player.playlists[playlistIndex].songs.length; i++){ // Adds the playlist songs to array.
      songsArray.push(player.playlists[playlistIndex].songs[i]);
    }

    for (let i =0; i<songsArray.length; i++){ // Play songs in the songs array
      player.playSong(player.songs[player.songs.findIndex(a => a.id === songsArray[i])])
    }

}
else{
  throw Error("Playlist Doesn't Exist");
}
}

function editPlaylist(playlistId, songId) {
  let playlistIdArray = [];
  let songIdArray = [];

  for (let i = 0; i<player.playlists.length; i++)
  {
    playlistIdArray.push(player.playlists[i].id); // Adds to array the ids that already in use.
  }

  let playlistIndex = player.playlists.findIndex(i => i.id === playlistId); // Finding the index of the playlist.

  if (!playlistIdArray.includes(playlistId)){
    throw Error("No Such Playlist")
  }

  for (let i = 0; i<player.songs.length; i++)
  {

    songIdArray.push(player.songs[i].id); // Adds to array the ids that already in use.
  }

  if (!songIdArray.includes(songId)){
    throw Error("No Such Song")
  }

  if (playlistIdArray.includes(playlistId)){

  if (player.playlists[playlistIndex].songs.includes(songId)){ // Checks if the song is in the playlist.
    let songIndex = player.playlists[playlistIndex].songs.indexOf(songId)
    player.playlists[playlistIndex].songs.splice(songIndex,1); // Removes the song from the playlist.
    if (player.playlists[playlistIndex].songs.length === 0){ // Checks if the playlist is empty.
      removePlaylist(playlistId);
    }

  }
  else if (!player.playlists[playlistIndex].songs.includes(songId)){ // Checks if the song is not in the playlist.
    player.playlists[playlistIndex].songs.push(songId); // Adds the song to the playlist

  } 
}
}

function playlistDuration(id) {
  let totalDuration = 0;
  let playlistIndex = player.playlists.findIndex(i => i.id === id)

  if (playlistIndex === -1){
    throw Error("No Such Playlist");
  }

  let songsArr = player.playlists[playlistIndex].songs
  let songIndex;

  for (let i =0; i<songsArr.length; i++){
    songIndex = player.songs.findIndex(a => a.id === songsArr[i]) // finds the index of the id in the songs array.
    totalDuration += player.songs[songIndex].duration; // Sums the durations. 
  }
  return totalDuration;
}

function searchByQuery(query) {
  let songsArr = [] ; // Songs that the query exist in them.
  let playlistArr = [] ; // Playlists that the query exist in them.
  let results = {}

  for (let i =0; i<player.songs.length; i++) // Checks each song if contains the query text
  {
    if (player.songs[i].title.includes(query)){
      songsArr.push(player.songs[i].title);
    }
    else if(player.songs[i].album.includes(query)){
      songsArr.push(player.songs[i].title);
    }
    else if(player.songs[i].artist.includes(query)){
      songsArr.push(player.songs[i].title);
    }
  }

  for (let i =0; i<player.playlists.length; i++) // Checks each playlist if contains the query text
  {
    if (player.playlists[i].name.includes(query)){
      playlistArr.push(player.playlists[i].name);
    }
  }

  // Sorts the array by their names.
  songsArr = songsArr.sort()
  playlistArr = playlistArr.sort()

  let songsArrSorted = [];
  let playlistsArrSorted = [];
  let songIndex;
  let playlistIndex;

  for (let i =0; i<songsArr.length; i++){
    songIndex = player.songs.findIndex(a => a.title === songsArr[i]) // finds the index of the id in the songs array
    songsArrSorted.push(player.songs[songIndex]);
  }

  for (let i =0; i<playlistArr.length; i++){
    playlistIndex = player.playlists.findIndex(a => a.name === playlistArr[i]) // finds the index of the id in the playlists array
    playlistsArrSorted.push(player.playlists[playlistIndex]);
  }
  
  results = {
    songs : songsArrSorted,
    playlists : playlistsArrSorted,
  }

  return results
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
