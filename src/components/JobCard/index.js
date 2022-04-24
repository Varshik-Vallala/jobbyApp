import {Link} from 'react-router-dom'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobCard = props => {
  const {eachJob} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJob

  return (
    <Link to={`/jobs/${id}`} className="job-card">
      <li className="job-card-text">
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
        <p className="card-text">Description</p>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobCard
