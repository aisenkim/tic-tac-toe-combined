
const move = async (payload) => {
    console.log(payload)
    const body = {move: payload}
    const res = await fetch(process.env.REACT_APP_API_URL + "/api/ttt/play", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {"Content-type": "application/json;charset=UTF-8"},
    })

    const data = await res.json();
    return data;
}

const getScore = async (payload) => {
    const res = await fetch(process.env.REACT_APP_API_URL + "/api/getscore", {
        method: "POST",
        body: JSON.stringify(),
        headers: {"Content-type": "application/json;charset=UTF-8"},
    })

    const data = await res.json();
    console.log(data);
    return data;
}

const listGames = async (payload) => {
    const res = await fetch(process.env.REACT_APP_API_URL + "/api/listgames", {
        method: "POST",
        body: JSON.stringify(),
        headers: {"Content-type": "application/json;charset=UTF-8"},
    })

    const data = await res.json();
    console.log(data);
    return data;
}

const gameDetails = async (payload) => {
    const res = await fetch(process.env.REACT_APP_API_URL + "/api/getgame", {
        method: "POST",
        body: JSON.stringify({id : payload}),
        headers: {"Content-type": "application/json;charset=UTF-8"},
    })

    const data = await res.json();
    console.log(data);
    return data;
}

const playService = {
    move,
    getScore,
    listGames,
    gameDetails
}

export default playService;