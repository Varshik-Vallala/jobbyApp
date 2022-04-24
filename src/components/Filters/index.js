import Profile from '../Profile'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const selectedCheckBoxes = []

const Filters = props => {
  const {changeRadio, changeCheckBoxes} = props

  const clickRadio = event => changeRadio(event.target.value)

  const onSelectEmployment = event => {
    if (!selectedCheckBoxes.includes(event.target.value)) {
      selectedCheckBoxes.push(event.target.value)
    } else {
      selectedCheckBoxes.splice(
        selectedCheckBoxes.indexOf(event.target.value),
        1,
      )
    }
    changeCheckBoxes(selectedCheckBoxes)

    console.log(selectedCheckBoxes)
  }

  return (
    <>
      <div className="filters-container">
        <Profile />

        <div className="type-of-employment-container">
          <p>Type of Employment</p>
          <ul className="checkboxes-list">
            {employmentTypesList.map(eachType => (
              <li className="checkbox" key={eachType.employmentTypeId}>
                <input
                  type="checkbox"
                  id={eachType.employmentTypeId}
                  value={eachType.employmentTypeId}
                  onClick={onSelectEmployment}
                />
                <label
                  className="input-label"
                  htmlFor={eachType.employmentTypeId}
                >
                  {eachType.label}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="type-of-employment-container">
          <p>Salary Range</p>
          <ul className="checkboxes-list">
            {salaryRangesList.map(eachSalary => (
              <li
                key={eachSalary.salaryRangeId}
                className="checkbox"
                onChange={clickRadio}
              >
                <input
                  type="radio"
                  name="salary"
                  id={eachSalary.salaryRangeId}
                  value={eachSalary.salaryRangeId}
                />
                <label
                  className="input-label"
                  htmlFor={eachSalary.salaryRangeId}
                >
                  {eachSalary.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Filters
