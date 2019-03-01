require("dotenv").config();
console.log("Hello my name is Sirie")

let keys = require ("./keys");

let Spotify = require ("node-spotify-api");
let axios = require ("axios");
let moment = require ("moment");
let fs = require ("fs");
let spotify = new Spotify (keys.spotify);


let getBands = function(artist){
        let url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        axios.get(url).then(function(response){
                let data = response.data;
                if(!data.length){
                        console.log("No results sorry try again");
                        return;
                }

                console.log("Here are the concerts for this band: " + artist);
                for(let i = 0; i < data.length; i++){
                        let show = data[i];
                        //console.log(show);
                        console.log("City: ", show.venue.city);
                        console.log("Region: ", show.venue.region)
                        console.log("Country: ", show.venue.country);
                        console.log(moment(show.datetime).format("MM/DD/YYYY"));
                        console.log();


                }
        })
}


let getSpotifySongs = function(nameOfSongs){
        spotify.search({
                type:"track",
                query:nameOfSongs
        }, (error,data) => {
                if(error){
                        console.log("Error occurred");
                        return;
                }
                console.log(data["tracks"]["items"])
                var songs = data.tracks.items;
                //console.log(songs);
                for (var index = 0; index < songs.length; index++){
                        console.log(index);
      
                        console.log("artists: " + songs[index].artists[0].name)
                        console.log('song name: ' + songs[index].name)
                        console.log('preview song: ' + songs[index].preview_url)
                        console.log('album: ' + songs[index].album.name);

                }
        })
}


let getPelicula = function(movies){
    let url = "http://www.omdbapi.com/?t=" + movies + "&plot=full&tomatoes=true&apikey=79397e32"
    axios.get(url).then(function(responce){
        var jsonData = responce.data;
        //console.log(jsonData);
        console.log("Title: " + jsonData["Title"]);
        console.log("Year: " + jsonData["year"]);
        console.log("Rated: " + jsonData["Rated"]);
        console.log("Released: " + jsonData["Released"]);
        console.log("Runtime: "  + jsonData["Runtime"]);
        console.log("Genre: " + jsonData["Genre"]);
        console.log("Director: " + jsonData["Director"]);
        console.log("Writer: " + jsonData["Writer"]);
        console.log("Actors: " + jsonData["Actors"]);
        console.log("Plot: " + jsonData["Plot"]);
        console.log("Language: " + jsonData["Language"]);
        

        });
};




let textFile = function(){
    fs.readFile('random.txt','utf8',function(error,d){
            console.log(d);
            let dataArray = d.split(",")
            choice = dataArray[0];
            data = dataArray[1]
            if(choice === "concert-this"){
                getBands(data);
            }
            else if(choice === 'spotify-this-song'){
                getSpotifySongs(data);
            }
            else if(choice === "movie-this"){
                getPelicula(data);
            }
            else if (choice === "do-what-it-says") {
                textFile()
            }
            else {
                console.log("LIRI does not know what you mean");
            }
    });
}


choice = process.argv[2];
data = process.argv.slice(3).join(" ");
console.log(choice)
console.log(data);
if(choice === "concert-this"){
        getBands(data);
}
else if(choice === 'spotify-this-song'){
        getSpotifySongs(data);
}
else if(choice === "movie-this"){
        getPelicula(data);
}
else if (choice === "do-what-it-says") {
        textFile()
}
else {
        console.log("LIRI does not know what you mean");
}

