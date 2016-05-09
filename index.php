<!DOCTYPE html>
<html lang="en">
  <?php
    include('includes/header.inc');
    include('includes/menu.inc');
  ?>
  <body>
    <div class="jumbotron" id="help">
      <div class="container">
        <h1>How it works</h1>
        <p>1. Give the textbox at the top a subreddit</p>
        <p>2. Click search or press enter and you'll see a bunch of artists come up</p>
        <p>3. Click on Create Playlist. A popup will appear asking you to sign in to Spotify</p>
        <p>4. Once signed in click on Open Playlist in Spotify. Spotify will open with your glorious new playlist</p>
        <p>5. Press the play button and enjoy!</p>
      </div>
    </div>

    <div class="row">
      <!-- <div id="status"></div> -->
      <div id="playlist"></div>
      <div id="results"></div>
    </div>

    <?php include('includes/footer.inc'); ?>
  </body>
</html>
