import ProfileCircle from "../profileCircle"
import "./style.css"

const CohortCard = ({ cohort }) => {
  return (
    <>
      <section className="cohort-card">
        <ProfileCircle className="cohort-card-icon" initials={"<>"} />
        <div className="cohort-card-info">
          <div className="cohort-card-department">
            <strong>{cohort.department.name}</strong>
          </div>
          <div className="cohort-card-name">
            <p>{cohort.name}</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default CohortCard
