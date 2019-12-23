export const userStatus = (state, user) => {
    if (user) {
        state.user = user
        state.status = true
    } else if (user === null) {
        localStorage.setItem('userName', null)
        localStorage.setItem('userToken', '')
        state.user = null
        state.status = false
        state.token = ''
    } else {
        console.log('login error')
    }
}

export const userToken = (state, userToken) => {
    if (userToken) {
      state.token = userToken
    } else {
      state.token = null
    }
}
