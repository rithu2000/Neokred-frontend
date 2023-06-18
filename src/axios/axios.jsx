import axios from 'axios'

const Api = axios.create({
    baseURL: 'http://localhost:8000/api'
})

Api.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
        req.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    return req;
});

export async function registerUser(credentials) {
    try {
      

        const { data } = await Api.post(`/register`, credentials, { withCredentials: true })

        return data
    } catch (error) {
        return { error: 'Cannot find the User' }
    }
};

export async function userLogin(credentials) {
    try {
        const { data } = await Api.post(`/login`, credentials, { withCredentials: true })

        return data
    } catch (error) {
        return { error: 'login failed' }
    }
};

export async function userProfile(credentials) {
    try {
        const { data } = await Api.get(`/profile`, credentials, { withCredentials: true })

        return data
    } catch (error) {
        console.log(error);
        return { error: 'Data Fetch error' }
    }
};

export async function Auth() {
    try {
        const { data } = await Api.post(`/authenticate`, { withCredentials: true })

        return data
    } catch (error) {
        console.log(error);
        return { error: 'Data Fetch error' }
    }
};