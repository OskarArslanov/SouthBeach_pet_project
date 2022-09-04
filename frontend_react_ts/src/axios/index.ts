import axios from "axios";

export default function () {
    axios.defaults.baseURL = "http://localhost:8080/api";
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.get["Content-Type"] = "application/json";
    axios.defaults.withCredentials = true

    axios.interceptors.request.use(
        request => {
            console.log(request)
            console.log("PRE REQUEST to : " + request.baseURL+request.url);
            return request;
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
            if (error.response.status === 401 || error.response.status === 500) {
                const refresh = await axios.get("/auth/refresh", {withCredentials:true});
                console.log("refreshing finished with status : " + refresh.status);
                if (refresh.status === 200) {
                    console.log("access_token refreshed")
                    return await axios.get(error.config.url, {withCredentials:true});
                }
                console.log("Uncatched error after 401")
                return error;
            } else if (error.response.status === 403) {
                window.location.replace("http://localhost:3000/login");
                console.log("403 catched");
                localStorage.setItem("auth", "false");
                return error;
            } else if (error.response.status === 404) {
                // window.location.replace("http://localhost:3000/registration");
                return error;
            }
            return Promise.reject(error);
        });
}