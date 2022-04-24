import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessSubmit = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onFailure = error => {
    console.log(error)
    this.setState({showError: true, errorMsg: error})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(response)
    if (response.ok === true) {
      this.onSuccessSubmit(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-form-container">
        <form className="input-container" onSubmit={this.submitForm}>
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
              className="logo"
            />
          </div>

          <div className="input-elements">
            <label className="text" htmlFor="uname">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="Username"
              id="uname"
              className="input"
              onChange={this.onChangeUsername}
              value={username}
            />
          </div>
          <div className="input-elements">
            <label className="text" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="input"
              onChange={this.onChangePassword}
              value={password}
            />
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
          {showError ? <p className="error-msg">*{errorMsg}</p> : ''}
        </form>
      </div>
    )
  }
}

export default LoginPage
