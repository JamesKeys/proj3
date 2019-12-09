var getLyrics = function() {
    var songName = document.getElementById("track").value;
    var artistName = document.getElementById("artist").value;
    var request = new XMLHttpRequest();
    request.open('GET', 'https://private-anon-52a9fd176e-lyricsovh.apiary-proxy.com/v1/' + artistName + '/' + songName, true);

    request.onload = function() {
        try {
            var data = JSON.parse(this.response);
            var lyricsSrc = data.lyrics;
            document.getElementById("lyrics").innerHTML = lyricsSrc;
            document.getElementById("lyrics").style.color = "black";
            document.getElementById("lyrics").style.padding = "20px";
        }
        catch(err) {
            document.getElementById("lyrics").style.color = "red";
            document.getElementById("lyrics").style.padding = "20px";
            document.getElementById("lyrics").innerHTML = "Make sure to enter both the song name and the artist name!";
        }
    }
    request.send();
}
