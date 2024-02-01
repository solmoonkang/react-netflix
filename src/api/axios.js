import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "83afe8eb888a67d46eaf30c7b7d67e9b",
        language: "ko-KR",
    },
});

export default instance;
