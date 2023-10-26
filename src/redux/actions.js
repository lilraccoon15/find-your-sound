export const login = (name, email, picture, token) => ({
  type: 'LOGIN',
  payload: {
    name,
    email,
    token,
    picture,
  }
});

export const logout = () => ({
  type: "LOGOUT",
})

export const updateUser = (updatedUser) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:8000/users/', {
          method: 'PUT',
          headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: updatedUser.email,//identifier via token
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
// export const updateUser = (user) => {
//   return async (dispatch) => {
//     try {
//       const response = await fetch('http://localhost:8000/users/', {
//           method: 'PUT', 
//           headers: {  
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(user)
//       })
//       if(!response.ok) {
//         throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
//       }
      
//       dispatch({
//         type: 'UPDATE_USER',
//         payload: user,
//       })
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }

export const deleteUser = (email) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:8000/users/`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            email: email
        })
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