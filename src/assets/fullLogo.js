import logo from "../assets/logo.jpg"
const FullLogo = () => {
  return (
    <figure className="header-logo">
      <img
        src={logo}
        alt="Cohort Manager Logo"
        style={{
          width: "80px",
          borderRadius: "50%",
        }}
      />
    </figure>
  )
}

export default FullLogo
