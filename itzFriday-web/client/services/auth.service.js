import request from 'superagent';

export default {
  login(email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    authenticate(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  getToken() {
    return localStorage.token
  },

  logout(cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  getNameFromToken() {
    let name = JSON.parse(atob(localStorage.token.split('.')[1])).name;
    return name;
  },

  getEmailFromToken() {
    let email = JSON.parse(atob(localStorage.token.split('.')[1])).user;
    return email;
  },

  loggedIn() {
    return !!localStorage.token
  },

  onChange() {}
}

function authenticate (email, pass, callback) {
  let body = {email: email, password: pass}

  request
    .post('/api/auth/login')
    .send(body)
    .end((err, res) => {
      let result = JSON.parse(res.text)
      if (!result.error) {
        callback({
          authenticated: true,
          token: result.message
        })
      } else {
        callback({
          authenticated: false,
          errMessage: result.message
        })
      }
  })
}
