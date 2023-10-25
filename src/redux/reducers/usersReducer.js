const initialState = {
  name: null,
  token: null,
  email: null,
  picture: null,
}

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      const user = {
        name: action.payload.name,
        token: action.payload.token,
        email: action.payload.email,
        picture: action.payload.picture,
      };
      return  user;
    }
    case 'LOGOUT' : {
      const user = {
        name: null,
        token: null,
        email: null,
        picture: null,
      };
      return  user;
    }
    default: return state;
  }
}

export default UserReducer;
