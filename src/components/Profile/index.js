import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileData: {},
  }

  componentDidMount() {
    this.renderUserProfile()
  }

  renderUserProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/profile'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updateProfileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      // console.log(data.profile_details)
      this.setState({
        profileData: updateProfileData,
        apiStatus: apiStatusConstants.success,
      })
      // console.log(updateProfileData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailure = () => (
    <div className="profile-failure-view">
      <button type="button" className="retry-btn" onClick={this.clickRetry}>
        Retry
      </button>
    </div>
  )

  clickRetry = () => {
    this.renderUserProfile()
  }

  renderLoadingView = () => (
    <div className="profile-loader">
      <Loader type="ThreeDots" color="#fff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {profileData} = this.state

    return (
      <div className="profile-container">
        <img
          className="profile-image"
          src={profileData.profileImageUrl}
          alt="profile"
        />
        <h1 className="profile-name">{profileData.name}</h1>
        <p>{profileData.shortBio}</p>
      </div>
    )
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfile()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="profile-main-container">{this.renderApiStatus()}</div>
    )
  }
}

export default Profile
