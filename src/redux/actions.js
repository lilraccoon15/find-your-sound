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

export const updateUser = (updatedUser) => {
  return async (dispatch) => {
    console.log(updatedUser.jwt)
    try {
      const response = await fetch('http://localhost:8000/users/', {
          method: 'PUT',
          headers: {
              "Authorization": updatedUser.jwt,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: updatedUser.name,
              picture : updatedUser.picture
          })
      })
      if(!response.ok) {
        throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
      }
      
      dispatch({
        type: 'UPDATE_USER',
        payload: updatedUser,
      })
    } catch (error) {
      console.error(error);
    }
  }
}

export const updateUserArtist = (artist) => {
  return async (dispatch, getState) => {

    const user = getState().user;
    try {
      const response = await fetch(`http://localhost:8000/artists/`, {
        method: 'POST',
        headers: {
          "Authorization": user.jwt,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artist: artist 
        })
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
      }

    } catch (error) {
      console.error(error);
    }
  }
}

export const deleteUserArtist = (artist) => {
  return async (dispatch, getState) => {
    const user = getState().user;

    try {
      const response = await fetch(`http://localhost:8000/artists/`, {
        method: 'DELETE',
        headers: {
          "Authorization": user.jwt,
        },
        
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
      }

    } catch (error) {
      console.error(error);
    }
  }
}

export const deleteUser = (jwt) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:8000/users/`, {
        method: 'DELETE',
        headers: {
          "Authorization": jwt,
          },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'utilisateur');
      }

      dispatch({
        type: 'DELETE_USER',
        payload: email // Si vous souhaitez conserver une trace de l'email supprimé dans le state Redux
      });
    } catch (error) {
      console.error(error);
    }
  }
}