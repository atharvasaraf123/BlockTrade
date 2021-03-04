import axios from 'axios';

export const avatarUpdate = ({ file }) => async (dispatch) => {
  try {
    let formData = new FormData();
    formData.append('img', file);
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const res = await axios.post('/profile/user-avatar', formData, {
      headers: headers,
    });
    console.log(res);
  } catch (e) {}
};

export const getAvatar = ({ fileName }) => async (dispatch) => {
  try {
    const res = await axios.get(`/profileimage/${fileName}`);
    const data = res.data;
    var binary = '';
    var bytes = new TextDecoder('utf-8').decode(new Uint8Array(res.data));
    console.log(bytes);
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    var base64Flag = 'data:image/jpeg;base64,';
    var imageStr = window.btoa(binary);
    console.log(imageStr);
    dispatch({ type: 'GET_AVATAR', payload: data });
  } catch (e) {}
};

export const editProfile = ({ profile }) => async (dispatch) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const res = await axios.post('/trade/update', profile, {
      headers: headers,
    });
    console.log(res);
  } catch (e) {}
};
