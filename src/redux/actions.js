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