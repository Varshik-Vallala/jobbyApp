import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FaExternalLinkAlt} from 'react-icons/fa'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobsData: {},
    similarProductsData: [],
    lifeAtCompany: {},
    skills: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.renderJobData()
  }

  updateData = job => ({
    companyLogoUrl: job.company_logo_url,
    companyWebsiteUrl: job.company_website_url,
    employmentType: job.employment_type,
    id: job.id,
    jobDescription: job.job_description,
    location: job.location,
    packagePerAnnum: job.package_per_annum,
    rating: job.rating,
    title: job.title,
  })

  updateSkill = skill => ({
    imageUrl: skill.image_url,
    name: skill.name,
  })

  renderJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedJobDetailsData = this.updateData(data.job_details)
      const updatedSimilarJobs = data.similar_jobs.map(similarJob =>
        this.updateData(similarJob),
      )
      const updatedLifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }

      const updatedSkills = data.job_details.skills.map(eachSkill =>
        this.updateSkill(eachSkill),
      )

      //   const updatedSimilarJobsData = data.similar_jobs.map(eachJob =>
      //     this.updateData(eachJob),
      //   )

      //   console.log(data)
      //   console.log(updatedJobDetailsData)
      //   console.log(updatedSkills)

      this.setState({
        jobsData: updatedJobDetailsData,
        similarProductsData: updatedSimilarJobs,
        lifeAtCompany: updatedLifeAtCompany,
        skills: updatedSkills,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  clickRetry = () => {
    this.renderJobData()
  }

  renderSimilarJobsField = similarJob => {
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      id,
      rating,
      title,
    } = similarJob

    return (
      <li className="similar-job-card" key={id}>
        <div className="job-heading">
          <img src={companyLogoUrl} alt="id" className="company-logo" />
          <div>
            <p className="title">{title}</p>
            <span className="align-details">
              <BsStarFill className="icon star" />
              <p className="car-text">{rating}</p>
            </span>
          </div>
        </div>
        <p className="card-text similar-card-heading">Description</p>
        <p className="description">{jobDescription}</p>
        <div className="location-details">
          <div className="align-details">
            <MdLocationOn className="icon" />
            <p>{location}</p>
          </div>
          <div className="align-details">
            <BsBriefcaseFill className="icon" />
            <p>{employmentType}</p>
          </div>
        </div>
      </li>
    )
  }

  renderLifeAtCompany = () => {
    const {lifeAtCompany} = this.state
    const {description, imageUrl} = lifeAtCompany
    return (
      <>
        <h1 className="all-headings">Life at Company</h1>
        <div className="life-at-company-desc">
          <p className="description life-text all-desc-text">{description}</p>
          <img src={imageUrl} alt="company text" className="company-image" />
        </div>
      </>
    )
  }

  renderSkills = skill => {
    const {imageUrl, name} = skill

    return (
      <li className="skill" key={name}>
        <img src={imageUrl} alt={name} className="skill-logo" />
        <p>{name}</p>
      </li>
    )
  }

  renderLoadingView = () => (
    <div className="jobs-loader-container">
      <Loader type="ThreeDots" color="#fff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="no-jobs-display">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Opps! Something Went Wrong</h1>
      <p className="failure-text">
        We cannot seen to find the page you are looking for.
      </p>
      <button type="button" className="retry-btn" onClick={this.clickRetry}>
        Retry
      </button>
    </div>
  )

  renderJobDataDetails = () => {
    const {jobsData, similarProductsData, skills} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobsData
    return (
      <div>
        <div className="job-card-text">
          <div className="job-heading">
            <img src={companyLogoUrl} alt="id" className="company-logo" />
            <div>
              <p className="title">{title}</p>
              <span className="align-details">
                <BsStarFill className="icon star" />
                <p className="car-text">{rating}</p>
              </span>
            </div>
          </div>
          <div className="job-details">
            <div className="location-details">
              <div className="align-details">
                <MdLocationOn className="icon" />
                <p>{location}</p>
              </div>
              <div className="align-details">
                <BsBriefcaseFill className="icon" />
                <p>{employmentType}</p>
              </div>
            </div>
            <p className="card-text">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="job-details-description">
            <p className="card-text all-headings">Description</p>
            <a href={companyWebsiteUrl} className="link">
              <p>
                Visit <FaExternalLinkAlt />
              </p>
            </a>
          </div>
          <p className="description all-desc-text">{jobDescription}</p>
          <h1 className="all-headings">Skills</h1>
          <ul className="skills-list">
            {skills.map(eachSkill => this.renderSkills(eachSkill))}
          </ul>
          {this.renderLifeAtCompany()}
        </div>
        <h1 className="all-headings">Similar Jobs</h1>
        <ul className="similar-products-list">
          {similarProductsData.map(eachJob =>
            this.renderSimilarJobsField(eachJob),
          )}
        </ul>
      </div>
    )
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDataDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-main-container">
          {this.renderApiStatus()}
        </div>
      </>
    )
  }
}

export default JobDetails
