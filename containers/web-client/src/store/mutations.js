const SET_USER = (state, user) => {
  state.user = user
}

const SET_TOKEN = (state, token) => {
  window.localStorage.setItem('token', token)
}

export {
  SET_USER,
  SET_TOKEN
}
