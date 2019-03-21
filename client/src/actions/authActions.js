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

// Setup  config/headers and token
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
