var getLyrics = function() {
    var songName = document.getElementById("track").value;
    var artistName = document.getElementById("artist").value;
    var request = new XMLHttpRequest();
    request.open('GET', 'https://private-anon-52a9fd176e-lyricsovh.apiary-proxy.com/v1/' + artistName + '/' + songName, true);

    request.onload = function() {
        var data = JSON.parse(this.response);
        var lyricsSrc = data.lyrics;
        document.getElementById("lyrics").innerHTML = lyricsSrc;
    }
    request.send();
}
