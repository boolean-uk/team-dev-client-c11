import CohortCard from "../cohortCard"

const CohortList = ({ cohorts }) => {
  return cohorts.map((cohort, index) => (
    <CohortCard key={`cohortListItem${index}`} cohort={cohort} />
  ))
}

export default CohortList
