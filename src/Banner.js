import React, { useState, useEffect } from 'react'
import axios from './axios';
import requests from './requests';
import './Banner.css';

function Banner() {

    const [movie,setMovie] = useState([]);

    //random function i.e
    //Math.random() * request.data.results.length - 1
    //i.e it will select an random number between 0 and array length that we got which we will use as index of the array to get the details of the movie as an object
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);

            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            )
            return request;
        }
        fetchData();
    }, [])


    //it is for truncating the extra text in the movie description of the banner that we used
    function truncate(str,n){
        return str?.length > n ? str.substr(0,n-1) + '...' : str;
    }



    // we are adding condition in background image of header because say if there is no image found then the app will not crash it will handle it
    return (
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "center center",
            }}
        >
        {/* background image */}
            <div className="banner_contents">
                {/* title */}
                {/* here we have used condition as some movies gives there movie name as title and some as original name and some as name so whichever is present take that */}
                <h1 className="banner_title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>



                {/* play and mylist button */}
                <div className="banner_buttons">
                    <button className="banner_button">
                        Play
                    </button>
                    <button className="banner_button">
                        My List
                    </button>
                </div>


                {/* desciption */}
                <h1 className="banner_description">
                    {truncate(movie?.overview,150)}
                </h1>
            </div>
            
            {/* it is for providing the fade shadow effect in bottom of the banner i.e we inserted empty div and then used linear gradient for that using css*/}
            <div className="banner_fadeBottom"></div>
        </header>
    )
}

export default Banner;