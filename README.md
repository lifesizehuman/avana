# avana
A Language Interpretation and Recognition Iterface
A homework assignment by Slater Combes

## In order for this program to work, you must request API keys for Twitter and Spotify

Commands:
- tweets
- spotify-this
- movie-this


tweets
-------------
Description: Uses the twitter api to pull the 20 most recent tweets of any public user
Please note that you must know the EXACT twitter handle in order to pull that user's recent tweets

> Usage: ``` $ node avana.js tweets barackobama```


spotify-this
-------------
Description: Uses the node-spotify-api to pull song details
Note: include both the song title AND the artist in the same search for a more accurate response

> Usage: ``` $ node avana.js spotify-this "lady gaga just dance" ```


movie-this
-------------
Description: Uses the OMDB api to pull details of the requested movie

> Usage: ``` $ node avana.js movie-this "inception" ```
