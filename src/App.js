import "./App.css";
import axios from "./api/axios";
import requests from "./api/requests";
import Banner from "./components/Banner";
import Nav from "./components/Nav";
import Row from "./components/Row";

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />
      <Row title="NETFLIX ORIGINALS" id="NO" fetchUrl={requests.fetchNetflixOriginals} largeRow />
      <Row title="Trending Now" if="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" if="TR" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" if="AM" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" if="CM" fetchUrl={requests.fetchComedyMovies} />
    </div>
  );
}

export default App;
