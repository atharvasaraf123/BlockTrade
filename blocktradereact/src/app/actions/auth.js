import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const signup = ({ formData }) => async (dispatch) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const res = await axios.post('/signup', formData, {
      headers: headers,
    });
    console.log(res.data.message);

    dispatch({
      type: 'SIGNUP_SUCCESS',
      payload: res.data.message,
    });
  } catch (err) {
    dispatch({
      type: 'SIGNUP_ERROR',
      payload: err.response.data.msg,
    });
  }
};

export const activateUser = ({ token }) => async (dispatch) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  console.log(token);
  const body = {
    token,
  };
  try {
    const res = await axios.post('/activate', body, {
      headers: headers,
    });
    console.log(res.data.msg);
    dispatch({
      type: 'ACTIVATE_SUCCESS',
      payload: res.data.msg,
    });
  } catch (err) {
    dispatch({
      type: 'ACTIVATE_ERROR',
      payload: err.response.data.msg,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  // @todo - load token into global header
  console.log('Load user');
  if (localStorage.token) {
    console.log(localStorage.token);
    setAuthToken({ token: localStorage.token });
  }
  try {
    const res = await axios.get('/login');
    console.log(res);
    dispatch({
      type: 'USER_LOADED',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'AUTH_ERROR',
    });
  }
};

export const login = ({ formData, loadUser }) => async (dispatch) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const res = await axios.post('/login', formData, {
      headers: headers,
    });
    console.log(res);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data,
    });
    await loadUser();
  } catch (err) {
    console.log(err.response.data.msg);
    dispatch({
      type: 'LOGIN_ERROR',
      payload: err.response.data.msg,
    });
  }
};

export const companyInfo = (companyFormData) => async (dispatch) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const res = await axios.post('/companyInfo', companyFormData, {
      headers: headers,
    });

    console.log(res);
    dispatch({
      type: 'COMPANY_INFO_LOADED',
      payload: res.data,
    });
  } catch (err) {}
};

export const clearMsg = () => async (dispatch) => {
  dispatch({
    type: 'CLEAR_MSG',
  });
};

export const clearError = () => async (dispatch) => {
  dispatch({
    type: 'CLEAR_ERROR',
  });
};
