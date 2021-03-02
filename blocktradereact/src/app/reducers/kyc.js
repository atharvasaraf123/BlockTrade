const initialState = {
  kycStatus: false,
  msg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'KYC_SUCCESS':
      return {
        ...state,
        kycStatus: true,
        msg: action.payload,
      };
    case 'KYC_ERROR':
      return {
        ...state,
        kycStatus: false,
        msg: action.payload,
      };
    default:
      return state;
  }
};
