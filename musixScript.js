
var apikey = "055f4eeef49f8d3f6efbafee95fa0939"; 
var request = new XMLHttpRequest();
var songid = "https//www.api.musixmatch.com/ws/1.1/chart.tracks.get?apikey=" + apikey + "&chart_name=top&page=1&page_size=1&country=us&f_has_lyrics=1";
request.open('GET', 'https://www.api.musixmatch.com/ws/1.1/', true);

request.onload = function() {
    var data = JSON.parse(this.response());
    data.forEach(title => {
        console.log(title);
    })
}
loadNewSong = function() {

    request.send();
}
