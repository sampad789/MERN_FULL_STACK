import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from "./types";

// Check the authentication token and load the authorized User
// {getState} as a parameter to get the token from the state
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Register User
export const register = ({ name, email, password }) => dispatch => {
  // Passing headers for registration
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/users", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Login users
export const login = ({ email, password }) => dispatch => {
  // Passing headers for registration
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/auth", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// LOgout users
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};
// Setup  config/headers and token{}
export const tokenConfig = getState => {
  // GET Token from localStorage
  const token = getState().auth.token;
  // Set headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // IF token is there add to headers
  if (token) {
    // the token header set on the Backend
    config.headers["x-auth-token"] = token;
  }
  return config;
};
