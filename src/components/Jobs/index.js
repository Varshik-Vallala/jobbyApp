import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import JobCard from '../JobCard'

import Header from '../Header'

import './index.css'

import Filters from '../Filters'

const apiStatusConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
    salaryPackage: '',
    typeOfEmployment: '',
    searchInput: '',
  }

  componentDidMount() {
    this.renderAllJobs()
  }

  updateData = job => ({
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    id: job.id,
    jobDescription: job.job_description,
    location: job.location,
    packagePerAnnum: job.package_per_annum,
    rating: job.rating,
    title: job.title,
  })

  renderAllJobs = async () => {
    const {searchInput, salaryPackage, typeOfEmployment} = this.state

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs?employment_type=${typeOfEmployment}&minimum_package=${salaryPackage}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => this.updateData(eachJob))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })

      console.log(updatedData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  fetchAllJobs = () => {
    this.renderAllJobs()
  }

  clickRadio = salary => {
    this.setState({salaryPackage: salary}, this.renderAllJobs)
  }

  selectCheckBox = selectedCheckBox => {
    const string = selectedCheckBox.join(',')
    this.setState({typeOfEmployment: string}, this.renderAllJobs)
  }

  renderJobsList = () => {
    const {jobsList} = this.state

    if (jobsList.length === 0) {
      return (
        <div className="no-jobs-display">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h2>No Jobs Found</h2>
          <p>We could not find any jobs. Try other filters</p>
        </div>
      )
    }

    return (
      <ul className="jobs-list">
        {jobsList.map(eachJob => (
          <JobCard eachJob={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="jobs-loader-container">
      <Loader type="ThreeDots" color="#fff" height="50" width="50" />
    </div>
  )

  clickRetry = () => {
    this.renderAllJobs()
  }

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

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {jobsList} = this.state

    console.log(jobsList)

    return (
      <>
        <Header />
        <div className="jobs-page-container">
          <Filters
            changeRadio={this.clickRadio}
            changeCheckBoxes={this.selectCheckBox}
          />
          <div className="jobs-container">
            <div className="search-bar">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.changeSearchInput}
              />
              <div className="search">
                <BsSearch className="search-icon" onClick={this.fetchAllJobs} />
              </div>
            </div>
            {this.renderApiStatus()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
