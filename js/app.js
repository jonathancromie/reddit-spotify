$(document).ready(function() {
  // $('#playlist').hide();

  $('#search').click(function() {
    buttonPressed();
  });

  $('#playlist').click(function(){
    //login to Spotify
    login();
    window.location.reload();
  });
});

var buttonPressed = function() {
  $('#help').hide();
  if (localStorage.getItem('createplaylist-name') != getSubreddit()) {
    updateButton("Create Playlist");
  }
  else {
    updateButton("Update Playlist");
  }
  if (getSubreddit() != '') {
    setTitle(getSubreddit());
    searchReddit(getSubreddit());
    $('#results').css("color", "#333");
    $('#playlist').show();
  }
  else {
    var nothing = "nothing";
    setTitle(nothing);
    searchReddit(nothing);
    $('#results').css("color", "red");
    $('#results').html("there doesn't seem to be anything here");
    $('#playlist').hide();
  }
}

var searchReddit = function(subreddit) {
	console.log('Searching for tracks in /r/' + subreddit);
  clearResults();
  var limit = '10'; // Spotify has a cap of 100 on tracks in a playlist so let's limit this to 10. 10 artists * 10 tracks retrieved from Spotify search = 100
  var sort = 'new';
  var url = 'https://www.reddit.com/r/'+subreddit+'/new.json?limit='+limit+'&sort='+sort+'';
	$.ajax(url, {
    dataType: 'json',
    type: 'GET',
    success: function(data) {

      console.log("Found " + data.data.children.length + " artists!");
      $.each(data.data.children, function(i, item) {
        var title = splitText(item.data.title);
        if (title != '' && title != 'undefined') {
          searchSpotify(title, function(result){
            displayResults(result);
            getArtistTracks(result);
          });
        }
      });
    },
    error: function() {
      console.log("Oh no, something went wrong!");
    },
    timeout: 3000
  });
}

var splitText = function(text) {
  var artist = '';
  var track = '';

  if (text.indexOf('-') !== -1) {
    var text1 = text.split('-');
    artist = text1[0];
    var text2 = text1[1];
    if (text2.indexOf('[') !== -1) {
      var text3 = text2.split('[');
      track = text3[0];
    }
  }

  return artist;

  // var text2 = text1[1].split('['); // Need to find a way to remove the rest of the bs in the string
  // var track = text2[0];
  // console.log(artist);
  // if (artist != '' || artist != 'undefined') {
  //   return artist;
  // }
}

var searchSpotify = function(artist, callback) {
  console.log("Searching Spotify for " + artist);
  var wildcard = '*';
  var url = 'https://api.spotify.com/v1/search?type=artist&limit=10&q=' + encodeURIComponent('artist:"'+artist+'"');
  $.ajax(url, {
    dataType: 'json',
    type: 'GET',
    success: function(data) {
      var record = {
        id: '',
        name: '',
        cover_url: ''
      }
      if (data.artists.items.length > 0) {
        // console.log("Found " + artist + "!");
        $.each(data.artists.items, function(i, item) {
          // console.log("Found result for " + item.name + "!");
          record.id = item.id;
          record.name = item.name;
          if (item.images.length > 0) {
            record.cover_url = item.images[0].url;
          }
        });

        callback({
            record
        });
      }
    },
    error: function() {
      console.log("Couldn't find result for " + artist);
    },
    timeout: 3000
  });
}

var displayResults = function(result) {
  txt = '';
  $.each(result, function(i, item){
    console.log("Found " + item.name + "!");
    txt += "<div class='col-md-4'>";
    txt += "<h4>"+item.name+"</h4>";
    txt += "<img src="+item.cover_url+" alt="+item.name+" width=300px height=300px/>";
    txt += "</div>";
  });
  $('#results').append(txt);
}

var clearResults = function() {
  $('#results').html('');
}

var setTitle = function(title) {
  $('#title').html("Searching " + "r/" + title);
}

var getSubreddit = function() {
  return $('#subreddit').val();
}

var getArtistTracks = function(artist) {
  $.each(artist, function(i, item){
    console.log("Finding tracks for " + item.name);
    var limit = 10;
    var url = 'https://api.spotify.com/v1/artists/' + item.id + '/top-tracks?country=AU&limit=1';
    $.ajax(url, {
      dataType: 'json',
      type: 'GET',
      success: function(data) {

        var record = {
          id: '',
          name: '',
          uri: '',
        }

        if (data.tracks.length > 0) {
          console.log("Found tracks for: " + item.name);
          $.each(data.tracks, function (j, track){
            console.log(j+1 + ": " + track.name);
            record.id = track.id;
            record.name = track.name;
            record.uri = track.uri;
            tracks.push(record.uri);
          });
        }
        else {
          console.log("Could not find tracks for: " + item.name);
        }
      }
    });
  });
}

var updateButton = function(text) {
  $('#playlist').html(
    '<button type="button" class="btn btn-default btn-lg">' +
    '<span class="glyphicon glyphicon-play" aria-hidden="true"></span>' +
    text +
    '</button>'
  );
}

var tracks = [];

var access_token = '';
var username = '';

var client_id = 'd55a0035952a48a7b0aa0cc802483b4a';
var redirect_uri = 'http://reddit-spotify.com/callback.html';

var login = function(callback) {
  var url = 'https://accounts.spotify.com/authorize?client_id=' + client_id +
			        '&response_type=token' +
			        '&scope=playlist-read-private%20playlist-modify%20playlist-modify-private' +
			        '&redirect_uri=' + encodeURIComponent(redirect_uri);

  localStorage.setItem('createplaylist-tracks', JSON.stringify(tracks));
  localStorage.setItem('createplaylist-name', getSubreddit());
  var w = window.open(url, 'asdf', 'width=400, height-500');
}
