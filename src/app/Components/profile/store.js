import { createStore } from "redux";

// Define the initial state of the store
const initialState = {
  selectedTab: 0
};

// Define a reducer function to update the state
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_TAB":
      return {
        ...state,
        selectedTab: action.payload
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(reducer);

export default store;