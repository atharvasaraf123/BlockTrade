import axios from 'axios';

const setAuthToken = ({ token }) => {
  console.log(token);
  if (token) {
    axios.defaults.headers.common['token'] = token;
    console.log(axios.defaults.headers);
  } else {
    delete axios.defaults.headers.common['token'];
  }
};

export default setAuthToken;
