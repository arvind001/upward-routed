import React, { createContext, useReducer } from "react";
import cloneDeep from "lodash/cloneDeep";

const initialState = {
  myBuildings: [],
  loggedIn: false,
  userData: {},
  myBuildingsView: {
    type: "preview",
    index: 0,
  },
  myProjectsView: {
    type: "preview",
    index: 0,
  },
  complianceView: {
    type: "preview",
    index: 0,
  },
  navigation: {
    current: "myBuildings",
  },
  solutions: [],
  inAddBuildingFlow: false,
  meterDataProps: {
    propertyId: null,
    BBL: null,
  },
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SET_SOLUTIONS":
        return {
          ...state,
          solutions: cloneDeep(action.payload),
        };
      case "ADD_BUILDING":
        return {
          ...state,
          myBuildings: cloneDeep(action.payload),
        };
      case "LOGGED_IN":
        return {
          ...state,
          loggedIn: true,
        };
      case "SET_USER_DATA":
        return {
          ...state,
          userData: cloneDeep(action.payload),
        };
      case "LOGGED_OUT":
        return {
          ...state,
          loggedIn: false,
        };
      case "SET_MY_BUILDINGS_VIEW":
        return {
          ...state,
          myBuildingsView: action.payload,
        };
      case "SET_MY_PROJECTS_VIEW":
        return {
          ...state,
          myProjectsView: action.payload,
        };
      case "SET_COMPLIANCE_VIEW":
        return {
          ...state,
          complianceView: action.payload,
        };
      case "SET_CURRENT_PAGE":
        return {
          ...state,
          navigation: {
            current: action.payload,
          },
        };
      case "SET_METER_DATA_PROPS":
        return {
          ...state,
          meterDataProps: {
            ...state.meterDataProps,
            ...action.payload,
          },
        };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
