import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import MovieModal from "./MovieModal";
import "./Row.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Row({ id, title, fetchUrl, isLargeRow }) {

    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});

    useEffect(() => {
        fetchMovieData();
    }, []);

    const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl);
        console.log("request", request);
        setMovies(request.data.results);
    }

    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
    }

    return (
        <section className="row">
            <h2>{title}</h2>
            <Swiper 
                modules={[Navigation, Pagination, Scrollbar, A11y]}     // install Swiper modules
                loop={true}                                             // loop 기능을 사용할 것인지
                navigation                                              // arrow 버튼 사용 유무 
                pagination={{ clickable: true }}                        // 페이지 버튼 보이게 할지 
                breakpoints={{
                1378: {slidesPerView: 6, slidesPerGroup: 6},
                998: {slidesPerView: 5, slidesPerGroup: 5},
                625: {slidesPerView: 4, slidesPerGroup: 4},
                0: {slidesPerView: 3, slidesPerGroup: 3},
                }}
            >
                <div id={id} className="row__posters">
                    {movies.map((movie) => (
                        <SwiperSlide>
                            <img
                                key={movie.id}
                                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                style={{ padding: "25px 0" }}
                                onClick={() => handleClick(movie)}
                                src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name}
                            />
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
            {modalOpen && (<MovieModal {...movieSelected} setModalOpen={setModalOpen} />)}
        </section>
    );
}
