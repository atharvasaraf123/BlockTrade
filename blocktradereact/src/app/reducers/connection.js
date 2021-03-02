const initialState = {
  conn: null,
  trades_contract: null,
  current_account: null,
  main_contract: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACCOUNT':
      return {
        ...state,
        current_account: action.payload,
      };
    case 'SET_TRADES_CONTRACT':
      return {
        ...state,
        trades_contract: action.payload,
      };
    case 'SET_MAIN_CONTRACT':
      return {
        ...state,
        main_contract: action.payload,
      };
    default:
      return state;
  }
};
