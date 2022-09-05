import axios from "axios";

export default function () {
    axios.defaults.baseURL = "http://localhost:8080/api";
    axios.defaults.withCredentials = true;

    axios.interceptors.request.use(
        request => {
            // console.log(request)
            console.log("PRE API REQUEST to : " + request.baseURL+request.url);
            return request;
        }, error => {
            console.log("FAIL API PRE REQUEST : '" + error.baseURL+error.url+"'");
            return Promise.reject(error);
        }
    )
    axios.interceptors.response.use(
        async response => {
            console.log(response);
            console.log(localStorage.getItem("_logged"))
            return response;
        }, async error => {
            console.log(error.response.status+" ERROR ON API REQUEST: "+error.request.responseURL);
            console.log(localStorage.getItem("_logged"))
            if (error.response.status === 401 || error.response.status === 500) {
                const refresh = await axios.get("/auth/refresh");
                console.log("refreshing finished with status : " + refresh.status);
                if (refresh.status === 200) {
                    console.log("access_token refreshed")
                    console.log(error)
                    return await axios(error.config.url, {method: error.config.method});
                }
                console.log("Uncatched error after 401")
                return error;
            } else if (error.response.status === 403) {
                window.location.replace("http://localhost:3000/login");
                console.log("403 catched");
                return error;
            } else if (error.response.status === 404) {
                window.location.replace("http://localhost:3000/registration");
                return error;
            }
            return Promise.reject(error);
        });
}