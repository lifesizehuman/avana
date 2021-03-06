# avana
A Language Interpretation and Recognition Iterface
A homework assignment by Slater Combes

## In order for this program to work, you must request API keys for Twitter and Spotify

Commands:
- tweets-of
- spotify-this
- movie-this


tweets-of
-------------
Description: Uses the twitter api to pull the 20 most recent tweets of any public user. You can search by real name or by user name.

> Usage:
- ``` $ node avana.js tweets-of barackobama```
- ``` $ node avana.js tweets-of "lady gaga" ```




spotify-this
-------------
Description: Uses the node-spotify-api to pull song details
Note: include both the song title AND the artist in the same search for a more accurate response

> Usage: 
- ``` $ node avana.js spotify-this "lady gaga just dance" ```

> Returns:
``` 
Top Result
---------------
Song Title: "Just Dance"
Artist: "Lady Gaga"
Album: "The Fame"
Song Link: "https://open.spotify.com/artist/1HY2Jd0NmPuamShAr6KMms"
```


movie-this
-------------
Description: Uses the OMDB api to pull details of the requested movie.
Note: the exact movie title must be provided in your search query

> Usage: 
- ``` $ node avana.js movie-this "inception" ```

> Returns:
```
Title: Inception
---------------
Year: 2010
---------------
iMDB Rating: 8.8
---------------
Rotten Tomatoes Rating: "86%"
---------------
Country: USA, UK
---------------
Language: English, Japanese, French
---------------
Actors: Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy
---------------
Plot: A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.
---------------
```

