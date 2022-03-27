/**
 * For making http request
 */

const register = async (userData) => {
  const res = await fetch(
    process.env.REACT_APP_API_URL + "/ttt/api/v1/adduser",
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-type": "application/json;charset=UTF-8" },
    }
  );

  const data = await res.json();
  console.log(data);
  return data;
};

const login = async (userData) => {
  const res = await fetch(process.env.REACT_APP_API_URL + "/ttt/api/v1/login", {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "Content-type": "application/json;charset=UTF-8" },
  });

  const data = await res.json();
  if (data && data.username) {
    localStorage.setItem("username", data.username);
  }
  console.log(`Data inside login: ${data}`);
  console.log(data);
  return data;
};

const logout = async () => {
  const res = await fetch(
    process.env.REACT_APP_API_URL + "/ttt/api/v1/logout",
    {
      credentials: "include",
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
    }
  );
  localStorage.removeItem("username");
  const data = await res.json();
  console.log("logout performed");
  return data;
};

const verify = async (userData) => {
  const res = await fetch(
    process.env.REACT_APP_API_URL + "/ttt/api/v1/verify",
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-type": "application/json;charset=UTF-8" },
    }
  );
  const data = await res.json();
  console.log("verify performed");
  return data;
};

const authService = {
  register,
  logout,
  verify,
  login,
};

export default authService;
