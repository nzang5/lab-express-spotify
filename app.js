require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

// Our routes go here:
app.get("/",(req,res)=>{
  res.render('home');
});

//ARTIST
app.get("/artist-search",(req,res)=>{
  spotifyApi.searchArtists(req.query.theArtistName)
  .then(data =>{res.render('artist-search-results', {artists: data.body.artists.items})})
  .catch(error => console.log(error))
});


/// ALBUMS

// app.get('/albums/:artistId', (req, res, next) => {
//   spotifyApi.getArtistAlbums(req.query.theArtistID)
//   .then(data =>{res.render('view-albums', {albums: data.body.items})})
//   .catch(error => console.log(error)) 
// });



app.listen(4000, () => console.log('My Spotify project running on port 4000 🎧 🥁 🎸 🔊'));
