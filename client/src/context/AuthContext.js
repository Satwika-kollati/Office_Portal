import React, { createContext,useEffect,useReducer } from 'react'

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username,
        user_id : action.payload.user_id,
        userType: action.payload.userType
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        username: null,
        user_id : null,
        userType : null
      };
    default:
      return state;
  }
}

export const AuthContextProvider = ({ children }) => {
  const initialState = {
    token: null,
    userType:null,
    username: null,
    user_id : null
  }
  const [state, dispatch] = useReducer(authReducer, initialState)


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      dispatch({type : 'LOGIN', payload: {userType:user.userType, token: user.token, username: user.username, user_id : user.user_id }})
    }
  },[])

  const loginSuccess = (token,user_id,username,userType) => dispatch({ type: 'LOGIN', payload: {token,user_id,username,userType}})
  const logoutSuccess = () => dispatch({ type: 'LOGOUT' })

  return (
    <AuthContext.Provider value={{...state, loginSuccess , logoutSuccess }}>
      {children}
    </AuthContext.Provider>
  )
}


