const move = async (payload) => {
  console.log(payload);
  const body = { move: payload };
  const res = await fetch(
    process.env.REACT_APP_API_URL + "/ttt/api/v1/ttt/play",
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-type": "application/json;charset=UTF-8" },
    }
  );

  const data = await res.json();
  return data;
};

const getScore = async (payload) => {
  const res = await fetch(
    process.env.REACT_APP_API_URL + "/ttt/api/v1/getscore",
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(),
      headers: { "Content-type": "application/json;charset=UTF-8" },
    }
  );

  const data = await res.json();
  console.log(data);
  return data;
};

const listGames = async (payload) => {
  const res = await fetch(
    process.env.REACT_APP_API_URL + "/ttt/api/v1/listgames",
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(),
      headers: { "Content-type": "application/json;charset=UTF-8" },
    }
  );

  const data = await res.json();
  console.log(data);
  return data;
};

const gameDetails = async (payload) => {
  const res = await fetch(
    process.env.REACT_APP_API_URL + "/ttt/api/v1/getgame",
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ id: payload }),
      headers: { "Content-type": "application/json;charset=UTF-8" },
    }
  );

  const data = await res.json();
  console.log(data);
  return data;
};

const playService = {
  move,
  getScore,
  listGames,
  gameDetails,
};

export default playService;
