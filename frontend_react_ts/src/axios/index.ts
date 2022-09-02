import axios from "axios";

export default function () {
    axios.defaults.baseURL = "http://localhost:8080/api";
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.get["Content-Type"] = "application/json";
    axios.interceptors.request.use(
        config => {
            console.log("PRE REQUEST");
            if (config.baseURL) {
                let requestUrl = config.baseURL+config.url;
                console.log("SUCCESS PRE REQUEST : '"+requestUrl+"'");
            }
            return config;
        }, error => {
            console.log("FAIL PRE REQUEST : '" + error.baseURL+error.url+"'");
            return Promise.reject(error);
        }
    )
    axios.interceptors.response.use(
        async response => {
            console.log("PRE RESPONSE");
            return response;
        }, async error => {
            console.log(error.response.status+" ERROR ON REQUEST: "+error.request.responseURL);
            if (error.response.status === 401) {
                const refresh = await axios.get("/auth/refresh", {withCredentials:true});
                console.log("refreshing finished with status : " + refresh.status);
                if (refresh.status === 200) {
                    localStorage.setItem("auth", "true");
                    console.log("access_token refreshed")
                    return await axios.get(error.config.url, {withCredentials:true});
                }
                console.log("Uncatched error after 401")
                localStorage.setItem("auth", "false");
                return error;
            } else if (error.response.status === 403) {
                window.location.replace("http://localhost:3000/login");
                console.log("403 catched");
                localStorage.setItem("auth", "false");
                return error;
            } else if (error.response.status === 404) {
                window.location.replace("http://localhost:3000/registration");
                return error;
            }
            localStorage.setItem("auth", "false");
            return Promise.reject(error);
        });
}