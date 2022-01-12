import { useReducer } from 'react'
import AlertContest from "./alertContext"
import AlertReducer from "./alertReducer"
import {
  SET_ALERT,
  REMOVE_ALERT
} from "../types"

const AlertState = props => { 
  const initialState = null;

  const [state, dispatch ] = useReducer(AlertReducer, initialState);

// Set alerts if there is no input
const setAlert = (msg, type) => {
  dispatch({
    type: SET_ALERT,
    payload: {msg, type}
  })
  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: null
    })
   
  }, 4000);
};

  return <AlertContest.Provider
  value ={{
    aletr: state,
    setAlert
  }}
  >
    {props.children}
   
  </AlertContest.Provider>
}

export default AlertState