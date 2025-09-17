import axios from "axios";
import toast from "react-hot-toast";

interface PropData {
    action: string;
    body?: any;
    isFormData?: boolean;
    isShowError?: boolean;
    id?: string;
    type?: string;
    key?: any;
    file?: any;
}

const WebService = {

    getBaseUrl(type?: string) {
        return "http://127.0.0.1:8001/api";
    },

    getHeaders: function () {
        return {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        };
    },

    // FOR IMAGE UPLOAD
    getFormdataHeaders: function () {
        return {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + localStorage.getItem("token"),
        };
    },

    getAccesstoken: function <T>(props: PropData) {
        this.addLoader(props?.id);
        let url = this.getBaseUrl(props.type);
        return new Promise((resolve, reject) => {
            var bodyFormData = new URLSearchParams();
            for (let key in props.body) {
                bodyFormData.append(key, props.body[key]);
            }
            const headers = {
                "Content-Type": "application/x-www-form-urlencoded",
            };
            axios
                .post(`${url}${props.action}`, bodyFormData, {
                    headers: headers,
                })
                .then((response) => {
                    const data = response.data as { access_token: string };
                    localStorage.setItem("token", data.access_token);
                    resolve(response.data as T);
                    this.removeLoader(props?.id);

                })
                .catch((error) => {
                    // this.removeLoader(props?.id);
                    reject(this.errorHandler(error));
                });

        });
    },

    postAPI: function <T>(props: PropData) {
        this.addLoader(props?.id);
        let url = this.getBaseUrl(props.type);
        return new Promise<T>((resolve, reject) => {
            var bodyFormData = new URLSearchParams();
            for (let key in props.body) {
                bodyFormData.append(key, props.body[key]);
            }
            axios
                .post(
                    `${url}${props.action}`,
                    props.isFormData ? bodyFormData : props.body,
                    {
                        headers: this.getHeaders(),
                    }
                )
                .then((response) => {
                    resolve(response.data as T);
                    this.removeLoader(props?.id);
                })
                .catch((error) => {
                    // if (error && error.response && error.response.status == 401) {
                    //     this.clearLocalStorage();
                    //     window.location.href = "/";
                    // }
                    // this.removeLoader(props?.id);
                    // reject(this.errorHandler(error));
                });
        });
    },

    putAPI: function <T>(props: PropData) {
        this.addLoader(props?.id);
        let url = this.getBaseUrl(props.type);
        return new Promise((resolve, reject) => {
            var bodyFormData = new URLSearchParams();
            for (let key in props.body) {
                bodyFormData.append(key, props.body[key]);
            }
            axios
                .put(`${url}${props.action}`, props.body, {
                    headers: this.getHeaders(),
                })
                .then((response) => {
                    resolve(response.data as T);
                    this.removeLoader(props?.id);
                })
                .catch((error) => {
                    if (error && error.response && error.response.status === 401) {
                        this.clearLocalStorage();
                        window.location.href = "/";
                    }
                    //   this.removeLoader(props?.id);
                    reject(this.errorHandler(error));
                });
        });
    },

    getAPI: function <T>(props: PropData) {
        this.addLoader(props?.id);
        let params = new URLSearchParams();
        for (let key in props.body) {
            params.set(key, props.body[key]);
        }
        // this.addLoader(props?.id);
        let url = this.getBaseUrl(props.type);
        return new Promise<T>((resolve, reject) => {
            axios
                .get(`${url}${props.action}`, {
                    params: params,
                    headers: this.getHeaders(),
                })
                .then((response) => {
                    resolve(response.data as T);
                    this.removeLoader(props?.id);
                })
                .catch((error) => {
                    // console.log("error", error);
                    // if (error && error.response && error.response.status == 401) {
                    //     this.clearLocalStorage();
                    //     window.location.href = "/";
                    // }
                    // this.removeLoader(props?.id);
                    // reject(this.errorHandler(error));
                });
        });
    },

    fileUploadAPI: function (props: PropData) {
        var formData = new FormData();
        if (!props.key && props.file) {
            props.key = "file";
        } else {
            if (props.file) {
                formData.append(props.key, props.file);
            }
        }
        for (let key in props.body) {
            formData.append(key, props.body[key]);
        }

        this.addLoader(props?.id);
        let url = this.getBaseUrl();
        // console.log("formData", formData);
        return new Promise((resolve, reject) => {
            axios
                .post(`${url}${props.action}`, formData, {
                    headers: this.getFormdataHeaders(),
                })
                .then((response) => {
                    resolve(response.data);
                    this.removeLoader(props?.id);
                })
                .catch((error) => {
                    // props.isShowError ? reject(this.errorHandler(error)) : reject(error);
                    this.errorHandler(error);
                    this.removeLoader(props?.id);
                });
        });
    },

    addLoader(id: any) {
        if (id) {
            var button = document.getElementById(id) as HTMLButtonElement | null;
            if (button != null) {
                button.disabled = true;
                var loader = document.createElement("img");
                loader.src = "/images/loading.gif";
                loader.className = "button-loader";
                button.prepend(loader);
            }
        }
    },

    removeLoader(id: any) {
        if (id) {
            var button = document.getElementById(id) as HTMLButtonElement | null;
            if (button != null) {
                button.disabled = false;
                button.removeChild(button.childNodes[0]);
            }
        }
    },

    errorHandler: function (error: any) {
        if (error?.response) {
            error = error.response;
        }
        var errorMessage;
        if (!error || !error.status) {
            errorMessage = "Server Not Responding";
        } else if (error.status === 401) {
            this.clearLocalStorage();
            window.location.href = "/";
        } else if (error.status === 500) {
            errorMessage =
                (error &&
                    error.data &&
                    error.data.ErrorDetails &&
                    error.data.ErrorDetails.message) ||
                "An unkown exception has occured. Please contact to administrator";
        } else {
            errorMessage = error.data.message;
        }
        toast.error(errorMessage);
        return errorMessage;
    },

    clearLocalStorage() {
        localStorage.removeItem("token");
        localStorage.removeItem("UserData");
    },
}

export default WebService;