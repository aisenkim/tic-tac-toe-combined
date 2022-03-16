/**
 * For making http request
 */

const register = async (userData) => {
    const res = await fetch(process.env.REACT_APP_API_URL +"/api/adduser", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {"Content-type": "application/json;charset=UTF-8"}
    })

    const data = await res.json();
    console.log(data)
    return data;
}

const login = async (userData) => {
    const res = await fetch(process.env.REACT_APP_API_URL +"/api/login", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {"Content-type": "application/json;charset=UTF-8"},
    })

    const data = await res.json();
    if (data && data.username) {
        localStorage.setItem('username', data.username)
    }
    console.log(`Data inside login: ${data}`);
    console.log(data)
    return data;
}

const logout = async () => {
    const res = await fetch(process.env.REACT_APP_API_URL +"/api/logout", {
        method: "POST",
        headers: {"Content-type": "application/json;charset=UTF-8"}
    })
    localStorage.removeItem('username')
    const data = await res.json();
    console.log("logout performed")
    return data;
}

const verify = async (userData) => {
    const res = await fetch(process.env.REACT_APP_API_URL + "/api/verify", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {"Content-type": "application/json;charset=UTF-8"}
    })
    const data = await res.json();
    console.log("verify performed")
    return data;
}

const authService = {
    register,
    logout,
    verify,
    login
}

export default authService;