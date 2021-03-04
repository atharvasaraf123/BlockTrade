import axios from 'axios';

export const kycDl = (formData) => async (dispatch) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const res = await axios.post('/kyc/dl', formData, {
      headers: headers,
    });
    console.log(res);
    if (res.data.msg === 'KYC done') {
      dispatch({
        type: 'KYC_SUCCESS',
        payload: res.data.msg,
      });
    } else {
      dispatch({
        type: 'KYC_ERROR',
        payload: res.data.msg,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const kycPass = (formData) => async (dispatch) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const res = await axios.post('/kyc/passport', formData, {
      headers: headers,
    });
    console.log(res);
    if (res.data.msg === 'KYC done') {
      dispatch({
        type: 'KYC_SUCCESS',
        payload: res.data.msg,
      });
    } else {
      dispatch({
        type: 'KYC_ERROR',
        payload: res.data.msg,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
