import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props

  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>
      <ul className="links">
        <Link className="nav-link hover-link" to="/">
          <li>Home</li>
        </Link>
        <Link className="nav-link hover-link" to="/jobs">
          <li>Jobs</li>
        </Link>
        <Link className="nav-link hover-link" to="/palces">
          <li>Places</li>
        </Link>
      </ul>
      <button className="header-btn" type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
