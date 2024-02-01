import React from "react";
import Banner from "../../components/Banner";
import Row from "../../components/Row";
import requests from "../../api/requests";

export default function MainPage() {
  return (
    <div>
      <Banner />
      
      <Row title="NETFLIX ORIGINALS" id="NO" fetchUrl={requests.fetchNetflixOriginals} largeRow />
      <Row title="Trending Now" if="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" if="TR" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" if="AM" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" if="CM" fetchUrl={requests.fetchComedyMovies} />
    </div>
  )
}
