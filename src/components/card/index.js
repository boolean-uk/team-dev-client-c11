import "./style.css"

const Card = ({ children, boxShadow = false, header = null }) => {
  return (
    <>
      <div className={`card ${boxShadow && "card-shadow"}`}>
        {header && <h3>{header}</h3>}
        {children}
      </div>
    </>
  )
}

export default Card
