import React, { useState, useEffect } from 'react';
import './Row.css';
//it is for embedding the trailer of movies from youtube
import axios from './axios'; //importing the file not the axios node package and exported instance which is default so we are calling that 'instance' from axio.js here as axios

import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

//this base_url is for images of the movies data that we have fetched as in data we will only get last url not baseurl included so we need to include it by ourself
const base_url = "https://image.tmdb.org/t/p/original/";





//here instead of taking props as object name and then using props.title etc we are directly doing object destructuring
let Row = ({title,fetchUrl, isLargeRow}) =>{
    const [movies, setMovies] = useState([]);
    const [trailerUrl,setTrailerUrl] = useState("");

    //A SNIPPET OF CODE WHICH RUNS BASED ON A SPECIFIC CONDITION/VARIABLE
    //i.e we are using useEffect to request data of a row say Trending Now only when the row gets loaded on the page
    useEffect(() => {
        async function fetchData () {
            const request = await axios.get(fetchUrl)
            //so here we are doing like baseUrl/fetchUrl , fetchUrl is that we passed in App.js as props and baseUrl is that we defined in axios inside instance as baseUrl
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);
    // console.log(movies);

    //it is just the info of trailer player
    const opts = {
        height:"390",
        width:"100%",
        playerVars:{
            autoplay:1,
        },
    };

    // this function is used when the user clicks on the picture
    //if condition is used when the trailer is already running when you click again it should be removed
    //else if not started set the trailerUrl and pass to youtube
    const handleClick = (movie ) =>{
        if(trailerUrl){
            setTrailerUrl("");
        }
        else{
            //after searching on youtube with the movie name it will give us an url as it returns promise so we will use then to catch url and catch for error if not found
            movieTrailer(movie?.name || movie?.title || movie?.original_name || "").then((url) => {
                // https://www.youtube.com/watch?v=XtMThy8QKqU
                //so it will give use url like this but we only need key i.e v value i.e here it is XtMThy8QKqU
                //so urlParams will hold the data after '?'
                const urlParams = new URLSearchParams(new URL(url).search);
                //now after getting the values we will get value of 'v' even if something more is present after v value and we asked for v value then it will only give as v value
                setTrailerUrl(urlParams.get('v'));
            }).catch((err)=>
            {
                console.log(err);
            });
        }
    }


    return (
        <div className="row">
            {/* title */}
            <h2>{title}</h2>
            
            <div className="row_posters">
                {/* posters container*/}
                {/* iterating the data of movies object that we got */}
                {/* we are adding key because it will decrease the loading time as we have provided the unique identity of every movie to react */}
                {/* we are using isLargeRow as netflix originals row in the app has larger posters then other rows so we need to change that */}
                {/* inside className it is checking if isLargeRow is true then given one more additional class i.e row_posterLarge */}
                {movies.map(movie => (
                    <img key={movie.id}
                        onClick = { () =>{ 
                            return handleClick(movie);
                        }}
                        className={`row_poster 
                        ${isLargeRow && "row_posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
                ))}
            </div>

            {/*here we will add trailer from youtube i.e beneath the row*/}
            {/*here we have added a condition that start the trailer only when trailer is present on youtube i.e trailerUrl is tru*/}
            {trailerUrl && <YouTube videoId = {trailerUrl}  opts={opts}/>}
        </div>
    );
}

export default Row;