const initialState = {
  name: null,
  token: null,
  email: null,
  picture: null,
  artists: null,
  genres: null,
  recommendations: null,
  jwt: null
}

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      const user = {
        name: action.payload.name,
        token: action.payload.token,
        email: action.payload.email,
        picture: action.payload.picture,
        artists: action.payload.artists,
        genres: action.payload.genres,
        recommendations: action.payload.recommendations,
        jwt: action.payload.jwt
      };
      return  user;
    }
    case 'LOGOUT' : {
      const user = {
        name: null,
        token: null,
        email: null,
        picture: null,
        artists: null,
        genres: null,
        recommendations: null
      };
      return  user;
    }
    case 'UPDATE_USER' : {
      return {
        ...state,
        name: action.payload.name,
        picture: action.payload.picture,
      }
    }
    case 'DELETE_USER' : {
      return {
        name: null,
        token: null,
        email: null,
        picture: null,
        artists: null,
        genres: null,
        recommendations: null
      }
    }
    default: return state;
  }
}

export default UserReducer;
