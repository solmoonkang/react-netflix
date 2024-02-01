import axios from "../../api/axios";
import React, { useState, useEffect } from "react";
import requests from "../../api/requests";
import "./Banner.css";

export default function Banner() {

    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // 현재 상영 중인 영화 정보를 가져오기 ( 여러 영화 )
        const request = await axios.get(requests.fetchNowPlaying);

        // 여러 영화 중 하나의 영화 ID를 가져오기
        const movieId = request.data.results[Math.floor(Math.random() * request.data.results.length)].id;

        // 특정 영화의 상세 정보를 가져오기 ( 비디오 정보 포함 )
        const { data: movieDetail } = await axios.get(`movie/${movieId}`, { params: { append_to_response: "videos" }});

        setMovie(movieDetail);
    }

    const truncate = (str, n) => {
        // 설명이 100자 이상이면 자른 후 ... 붙이기
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover"}}
        >
            <div className="banner__contents">
                <h1 className="banner__title">{ movie.title || movie.name || movie.original_name }</h1>

                <div className="banner__buttons">
                    <button className="banner__button play" onClick={() => setIsClicked(true)}>Play</button>
                    <button className="banner__button info">More Information</button>
                </div>
                <h1 className="banner__description">{truncate(movie.overview, 100)}</h1>
            </div>
            <div className="banner--fadeBottom" />
        </header>
    );
}
