import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useDebounce } from "../../hooks/useDebounce";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchPage() {

    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const searchTerm = query.get("q");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchSearchMovie(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    const fetchSearchMovie = async (searchTerm) => {
        try {
            const request = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`);
            console.log(request);
            setSearchResults(request.data.results);
        } catch (error) {
            console.log("ERROR", error);
        }
    }

    const renderSearchResults = () => {
        return searchResults.length > 0 ? (
            <section className="search-container">
                {searchResults.map((movie) => {
                    if (movie.backdrop.path !== null && movie.media_type !== "person") {
                        const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
                        return (
                            <div className="movie" key={movie.id}>
                                <div className="movie__column-poster" onClick={() => navigate(`/${movie.id}`)}>
                                    <img src={movieImageUrl} alt="movie" className="movie__poster" />
                                </div>
                            </div>
                        );
                    }
                })}
            </section>
        ) : (
            <section className="no-results">
                <div className="no-results__text">
                    <p>찾고자 하는 검색어 "{debouncedSearchTerm}"에 맞는 영화가 없습니다.</p>
                </div>
            </section>
        );
    }

    return renderSearchResults();
}
