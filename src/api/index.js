const BASE_URL = "http://fitnesstrac-kr.herokuapp.com/api";

export async function fetchAPI(url, method = "GET", sendData = null) {
  const fetchOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAzLCJ1c2VybmFtZSI6ImV2b25zYW5kZXJzIiwiaWF0IjoxNjA2MTgyNzM2LCJleHAiOjE2MDY3ODc1MzZ9.ZRFmbahrnLeJhfc8s-OtsAve2r41MlkReZyJcLtvUCo",
    },
  };

  if (sendData) {
    fetchOptions.body = JSON.stringify(sendData);
  }

  const response = await fetch(url, fetchOptions);
  const data = await response.json();

  return data;
}

export const getToken = () => {
  return localStorage.getItem("auth-token");
};

export const clearToken = () => {
  localStorage.removeItem("auth-token");
};

const setToken = (token) => {
  localStorage.setItem("auth-token", token);
};
export async function sendUserRegistration(username, password){
    const response = await fetchAPI('https://fitnesstrac-kr.herokuapp.com/api/users/register',
    "POST", {
        username: username,
        password: password

    })

}
export const registerUser = async (username, password) => {
    const url = 'https://fitnesstrac-kr.herokuapp.com/api/users/register'
  const response = await fetchAPI(`${url}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        username: username,
        password: password,
      },
    }),
  });

  const { error, data } = await response.json();

  if (error) {
    throw Error(error.message);
  }

  if (data && data.token) {
    setToken(data.token);
  }

  return data;
};

export const loginUser = async (username, password) => {
  const response = await fetchAPI(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        username: username,
        password: password,
      },
    }),
  });

  const { error, data } = await response.json();

  if (error) {
    throw Error(error.message);
  }

  if (data && data.token) {
    setToken(data.token);
  }

  return data;
};
