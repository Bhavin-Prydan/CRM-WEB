refreshToken = localStorage.getItem("refreshToken")

function getdata(url) {
    return fetch('http://127.0.0.1:5000/api/token/refresh/', { mode: 'cors', method: 'post', headers: { "Content-type": "application/json; charset=UTF-8" }, body: JSON.stringify({ refresh: refreshToken }) })
        .then((response) => {
            if (response.status >= 200) {
                return response.json();
            } else {

                return response.json();
            }
        })
        .then((myJson) => {
            // console.log(myJson);
            if (myJson.detail == "Token is invalid or expired") {
                window.location = "/crm_login";
            }
            // console.log("myJson");
            localStorage.setItem("accessToken", myJson.access);
            AToken = localStorage.getItem("accessToken");

            return fetch(url, { mode: 'cors', method: 'get', headers: { "Content-type": "application/json; charset=UTF-8", "Authorization": "Bearer " + AToken } })
                .then((response) => {
                    // debugger;
                    // console.log(response.json());
                    if (response.status >= 200 && response.status <= 299) {
                        return response.json();
                    }
                    else if (response.status == 401) {
                        // debugger;
                        return response.json();
                    }
                    else {
                        throw Error(response.statusText);
                    }
                })
                .then((myJson) => {
                    // console.log("/api/userViewSet/ recalled!!!")
                    // console.log(myJson)

                    return myJson;
                })
        })
}
