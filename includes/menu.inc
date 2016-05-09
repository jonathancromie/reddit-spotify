<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="index.php">
        <img alt="reddit" src="images/reddit.png">
      </a>
      <a class="navbar-brand" href="index.php">
        <img alt="spotify" src="images/spotify.png">
      </a>
    </div>
    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <form class="navbar-form navbar-left" role="search" onSubmit="return false;">
        <div class="input-group">
          <span class="input-group-addon" id="basic-addon3">https://reddit.com/r/</span>
          <input type="text" class="form-control" id="subreddit" placeholder="Enter subreddit" aria-describedby="basic-addon3">
        </div>
        <button type="submit" class="btn btn-default" id="search">Search</button>
      </form>
      <p class="navbar-text navbar-left" id="title"></p>
    </div>
  </div>
</nav>
