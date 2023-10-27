const initialState = {
  name: null,
  token: null,
  email: null,
  picture: null,
  artists: [],
  genres: [],
  recommendations: [],
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
        artists: [],
        genres: [],
        recommendations: []
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
    case 'ADD_ARTIST' : {
      const artists = [...state.artists];
      const idx = artists.findIndex(artist => JSON.stringify(artist) === JSON.stringify({name: action.payload.name, id: action.payload.id}));
      console.log(idx);
      if(idx >= 0){
        return state;
      } 
      const newArtists = [...state.artists, {name: action.payload.name, id: action.payload.id}];
      return { ...state, artists: newArtists};
      
    }
    case 'DELETE_ARTIST' : {
      let newArtists = [...state.artists];
      newArtists.splice(action.payload.id, 1);
      return { ...state, artists: newArtists};
    }
    case 'ADD_GENRES' : {
      return {
        ...state,
        genres: action.payload.genres
      }
    }

    case 'ADD_RECO': {
      const recommendations = [...state.recommendations];
      const idx = recommendations.findIndex(reco => JSON.stringify(reco) === JSON.stringify({name: action.payload.name, artist: action.payload.artist, album: action.payload.album, url: action.payload.url}));
      console.log(idx);
      if(idx >= 0){
        return state;
      } 
      const newRecommendations = [...state.recommendations, {name: action.payload.name, artist: action.payload.artist, album: action.payload.album, url: action.payload.url}];
      return { ...state, recommendations: newRecommendations};
    }

    default: return state;
  }
}

export default UserReducer;
