import CohortCard from "../cohortCard"

const CohortList = ({ cohorts }) => {
  return cohorts.map((item, index) => (
    <CohortCard key={`cohortListItem${index}`} cohort={item.cohort.id} />
  ))
}

export default CohortList
