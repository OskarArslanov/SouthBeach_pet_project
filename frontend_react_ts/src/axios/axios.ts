import axios from "axios";

export default function () {
    axios.defaults.baseURL = "http://localhost:8080/api";
    axios.defaults.withCredentials = true;

    axios.interceptors.request.use(
        request => {
            return request;
        }, error => {
            console.log("FAIL API PRE REQUEST : '" + error.baseURL+error.url+"'");
            return Promise.reject(error);
        }
    )
    axios.interceptors.response.use(
        async response => {
            if (response.headers["cookie"]) {
                // @ts-ignore
                const _logged = response.headers["cookie"].split(";").at(0).split("=").at(1)
                localStorage.setItem("_logged", _logged || "false")
            }
            return response;
        }, async error => {
            console.log(error.response.status+" ERROR ON API REQUEST: "+error.request.responseURL);
            if (error.response.status === 401 || error.response.status === 500) {
                const refresh = await axios.get("/auth/refresh");
                console.log("refreshing finished with status : " + refresh.status);
                if (refresh.status === 200) {
                    console.log("access_token refreshed")
                    return axios(error.config.url, {method: error.config.method});
                }
                localStorage.setItem("_logged", "false")
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