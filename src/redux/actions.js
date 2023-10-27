export const login = (name, email, picture, token, artists, genres, recommendations, jwt) => ({
  type: 'LOGIN',
  payload: {
    name,
    email,
    picture,
    token,
    artists,
    genres,
    recommendations,
    jwt
  }
});

export const logout = () => ({
  type: "LOGOUT",
})

export const updateUser = (name, picture) => ({
  type:'UPDATE_USER',
  payload: {
    name,
    picture
  }
});

export const addArtist = (name, id) => ({
  type: 'ADD_ARTIST',
  payload: {
    name,
    id
  }
})

export const deleteArtist = (id) => ({
  type: 'DELETE_ARTIST',
  payload: {id}
})

export const addGenre = (genre) => ({
  type: 'ADD_GENRE',
  payload: {genre}
})

export const deleteGenre = (genre) => ({
  type: 'DELETE_GENRE',
  payload: {genre}
})