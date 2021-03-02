const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
  msg: '',
  avatar: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'ACTIVATE_SUCCESS':
      return {
        ...state,
        msg: action.payload,
      };
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        msg: action.payload,
      };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        msg: 'Login successful',
      };
    case 'SIGNUP_ERROR':
    case 'AUTH_ERROR':
    case 'ACTIVATE_ERROR':
    case 'LOGIN_ERROR':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'CLEAR_MSG':
      return {
        ...state,
        msg: '',
      };
    case 'USER_LOADED':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'COMPANY_INFO_LOADED':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'GET_AVATAR':
      return {
        ...state,
        avatar: action.payload,
      };
    default:
      return state;
  }
};
