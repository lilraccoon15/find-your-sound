export const login = (name, email, picture, token) => ({
  type: 'LOGIN',
  payload: {
    name,
    email,
    token,
    picture,
  }
});