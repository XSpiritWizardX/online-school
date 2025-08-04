const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

export const thunkAuthenticate = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const response = await fetch("/api/v0/auth/verify", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data.user));
  } else {
    localStorage.removeItem("token");
  }
};

export const thunkLogin = (credentials) => async (dispatch) => {
  // Convert email to username for backend compatibility
  const loginData = {
    email: credentials.email,
    password: credentials.password,
  };
  const response = await fetch("/api/v0/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("token", data.token);
    dispatch(setUser(data.user));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
  return null;
};

export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/v0/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data.user));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkLogout = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const response = await fetch("/api/v0/auth/logout", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  /**
     response should have status 200
   */
  if (!response.ok) {
    console.error("logout failed");
    const data = await response.json();
    return data;
  }

  localStorage.removeItem("token");
  dispatch(removeUser());
  return null;
};

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default sessionReducer;
