const UserSession = {
  logInUser(id) {
    sessionStorage.setItem("id", id)
  },

  getUser() {
    return parseInt(sessionStorage.getItem("id"))
  },

  logOutUser() {
    sessionStorage.clear()
  }
}

export default UserSession
